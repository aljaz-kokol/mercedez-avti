import mongoose from 'mongoose';
import sinon from 'sinon';
import request from 'supertest';
import {Request, Response} from 'express';

import FuelMongo from '../model/mongo/fuel.mongo.model';
import Fuel  from '../model/fuel.model';
import app from '../app';
import { getFuels, getFuelFromId } from '../controller/fuel.controller';
import { mongoTestId, mongoTestUri, mongoUri } from '../util/variables.util';

describe('/fuel end point testing', () => {
    // Connect to the database before any tests run
    beforeAll(async () => {
        await mongoose.connect(mongoTestUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    })

    // Disconnect from the database after all the tests run
    afterAll(async () => {
        await mongoose.disconnect();
    })
    
    describe('Fetching all Fuel documents', () => {
        // Create a Fuel document to be fetched
        beforeAll(async () => {
            await new FuelMongo({
                type: 'Test fuel'
            }).save();
        });

        // Delete the test Fuel document
        afterAll(async () => {
            await FuelMongo.deleteMany();
        });

        // Response Content-Type should be json
        test('GET /fuel --> should have a response with Content-Type of json', async () => {
            await request(app).get('/fuel').expect('Content-Type', /json/);
        });

        // Response status code should be 200
        test('GET /fuel --> should have a response with status code of 200', async () => {
            await request(app).get('/fuel').expect(200);
        });

        // Response body should return an array of Fuel objects
        test('GET /fuel --> should have a response body with array of Fuel objects', async () => {
            const result = ((await request(app).get('/fuel')).body) as Fuel[];
            expect(result).toBeInstanceOf(Array);
            expect(result).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        _id: expect.any(String),
                        type: expect.any(String)
                    })
                ])
            );
        });

        // Throw an error with status code of 500 if there was an error connecting to the database
        test('GET /fuel --> should throw an error with status code of 500 if there was an error connecting to the database', async () => {
            const findStub = sinon.stub(FuelMongo, 'find');
            findStub.throws();
            const res = ({
                status: function(code) {return this;},
                json: function(data) {}
            }) as Response;
            const result = await getFuels({} as Request, res, () => {});
            findStub.restore();
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('statusCode', 500);
        });
    });

    describe('Fetching a single Fuel document from fuelId', () => {
        // Create a Fuel document with test id before any tests run
        beforeAll(async () => {
            await new FuelMongo({
                _id: mongoTestId,
                type: 'Test'
            }).save();
        });

        // Delete all Fuel documents after all tests run
        afterAll(async () => {
            await FuelMongo.deleteMany();
        })

        // Response Content-Type should be json
        test('GET /fuel/:fuelId --> should have a response with Content-Type of JSON', async () => {
            await request(app).get(`/fuel/${mongoTestId}`).expect('Content-Type', /json/);
        });

        // Response status code should be 200
        test('GET /fuel/:fuelId --> should have a response with status code of 200', async () => {
            await request(app).get(`/fuel/${mongoTestId}`).expect(200);
        });

        // Response body should be a Fuel object
        test('GET /fuel/:fuelId --> should have a response body with the Fuel object', async () => {
            const result = (await request(app).get(`/fuel/${mongoTestId}`)).body as Fuel;
            expect(result).toEqual(
                expect.objectContaining({
                    _id: mongoTestId,
                    type: 'Test'
                })
            );
        });

        // Throw error with status code of 500 if there was an error connecting to the database
        test('GET /fuel/:fuelId --> should return an error with status code of 500 if there was an error connecting to the database', async () => {
            const findByIdStub = sinon.stub(FuelMongo, 'findById');
            findByIdStub.throws();
            const req = ({
                params: ({
                    fuelId: mongoTestId
                }) as Partial<Request>
            }) as Request;
            
            const res = ({
                status: function(code) {return this;},
                json: function(data) {}
            }) as Response;

            const result = await getFuelFromId(req, res, () => {});
            findByIdStub.restore();
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('statusCode', 500);
        });

        // Throw error if the Fuel document with the given id does not exist
        test('GET /fuel/:fuelId --> should throw an error if the Fuel document with the given id does not exist', async () => {
            const req = ({
                params: ({
                    fuelId: '60e3429ab33c3461ecc40f85' // There is no document with this id
                }) as Partial<Request>
            }) as Request;
            const result = await getFuelFromId(req, {} as Response, () => {});
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('message', 'Fuel document with this id does not exist!');
        });
    });
});