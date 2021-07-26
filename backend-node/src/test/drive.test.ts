import request from 'supertest';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

import app from '../app';
import Drive from '../model/drive.model';
import { mongoTestId, mongoTestUri } from '../util/variables.util';
import { getDrives } from '../controller/drive.controller';

describe('/drive end point testing', () => {
    // Connect to test db
    beforeAll(async () => {
        await mongoose.connect(mongoTestUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });
    // Disconnect from the test db
    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('Fetching all Drive documents', () => {
        // Create a test Drive document to fetch later
        beforeAll(async () => {
            await Drive.create({ type: 'Test' });
        });
        // Delete any test Drive documents after all the tests run
        afterAll(async () => {
            await Drive.deleteMany();
        });
        // Response Content-Type should be JSON
        test('GET /drive --> should have a response with Content-Type of JSON', async () => {
            await request(app).get('/drive').expect('Content-Type', /json/);
        });
        // Response status code should be 200
        test('GET /drive --> should have a response with status code of 200', async () => {
            await request(app).get('/drive').expect(200);
        });
        // Response body should return array of Drive objects
        test('GET /drive --> should have a response body containing the array of Drive objects', async () => {
            const result = (await request(app).get('/drive')).body;
            expect(result).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    type: expect.any(String)
                })
            ]));
        });
        // Throw error with status code of 500 if there was an error connecting to the database
        test('GET /drive --> should return an error with status code of 500 if there was an error connecting to the database', async () => {
            const findStub = sinon.stub(Drive, 'find');
            findStub.throws();
            const res = {
                status: function(code) {return this;},
                json: function(data) {}
            } as Response;
            const result = await getDrives({} as Request, res, () => {});
            findStub.restore();
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('statusCode', 500);
        });
    });
});