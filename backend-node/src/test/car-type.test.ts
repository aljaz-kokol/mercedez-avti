import request from 'supertest';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

import app from '../app';
import CarType from '../model/car-type.model';
import { mongoTestId, mongoTestUri } from '../util/variables.util';
import { getCarTypes } from '../controller/car-type.controller';

describe('/car-type end point testing', () => {
    // Connect to the test database
    beforeAll(async () => {
        await mongoose.connect(mongoTestUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });
    // Disconnect from the test database
    afterAll(async () => {
        await mongoose.disconnect();
    });
    describe('Fetching all CarType documents', () => {
        // Crate a CarType document to be fetched later
        beforeAll(async () => {
            await CarType.create({
                type: 'Test',
                abbreviation: 'T'
            });
        });
        // Delete any CarType documents
        afterAll(async () => {
            await CarType.deleteMany();
        });
        // Response should have a Content-Type of json and status code of 200
        test('GET /car-type --> should have a response with Content-Type of JSON and status code 200', async () => {
            await request(app).get('/car-type').expect('Content-Type', /json/).expect(200);
        });
        // Response body should be an array containing CarType objects
        test('GET /car-type --> should have a response body with array containing CarType objects', async () => {
            const result = (await request(app).get('/car-type')).body;
            expect(result).toBeInstanceOf(Array);
            expect(result).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    _id: expect.any(String),
                    type: 'Test',
                    abbreviation: 'T'
                })
            ]));
        });
        // Throw error with status code of 500 if there was an error connecting to the database
        test('GET /car-type --> should return an error with status code of 500 if there was an error connecting to the database', async () => {
            const findStub = sinon.stub(CarType, 'find');
            findStub.throws();
            const res = {
                status: function(code) {return this;},
                json: function(data) {}
            } as Response;
            const result = await getCarTypes({} as Request, res, () => {});
            findStub.restore();
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('statusCode', 500);
        });
    });
});