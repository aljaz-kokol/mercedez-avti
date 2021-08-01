import mongoose from 'mongoose';
import sinon from 'sinon';
import request from 'supertest';
import {Request, Response} from 'express';

import Fuel from '../model/fuel.model';
import app from '../app';
import { getFuels, getFuelFromId, createFuel } from '../controller/fuel.controller';
import { mongoTestId, mongoTestUri } from '../util/variables.util';

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
        await Fuel.deleteMany();
        await mongoose.disconnect();
    })
    
    describe('Fetching all Fuel documents', () => {
        // Create a Fuel document to be fetched
        beforeAll(async () => {
            await new Fuel({
                type: 'Test fuel'
            }).save();
        });

        // Delete the test Fuel document
        afterAll(async () => {
            await Fuel.deleteMany();
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
            const result = ((await request(app).get('/fuel')).body);
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
            const findStub = sinon.stub(Fuel, 'find');
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
            await new Fuel({
                _id: mongoTestId,
                type: 'Test'
            }).save();
        });

        // Delete all Fuel documents after all tests run
        afterAll(async () => {
            await Fuel.deleteMany();
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
            const result = (await request(app).get(`/fuel/${mongoTestId}`)).body;
            expect(result).toEqual(
                expect.objectContaining({
                    _id: mongoTestId,
                    type: 'Test'
                })
            );
        });

        // Throw error with status code of 500 if there was an error connecting to the database
        test('GET /fuel/:fuelId --> should return an error with status code of 500 if there was an error connecting to the database', async () => {
            const findByIdStub = sinon.stub(Fuel, 'findById');
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

    describe('Creating a Fuel document', () => {
        // Delete any dummy Fuel documents that were created after each test
        afterEach(async () => {
            await Fuel.deleteMany();
        });

        // Response Content-Type should be json
        test('POST /fuel --> should have a response with Content-Type of JSON', async () => {
            await request(app).post('/fuel').send({
                type: 'Test'
            }).expect('Content-Type', /json/);
        });

        // Response status code should be 201
        test('POST /fuel --> should have a response with status code of 201', async () => {
            await request(app).post('/fuel').send({
                type: 'Test'
            }).expect(201);
        });

        // Response body should contain a message and an object of the new Fuel document
        test('POST /fuel --> should have a response body with a success message and an object representing the new Fuel document', async () => {
            const result = (await request(app).post('/fuel').send({ type: 'Test' })).body;
            expect(result).toEqual(
                expect.objectContaining({
                    message: 'Successfully created a Fuel document',
                    fuel: expect.objectContaining({
                        type: 'Test'
                    })
                })
            );
        });

        // Throw error with status code of 500 if there was an error connecting to the database
        test('POST /fuel --> should return an error with status code of 500 if there was an error connecting to the database', async () => {
            const saveStub = sinon.stub(Fuel.prototype, 'save');
            saveStub.throws();
            const req = ({
                body: {
                    type: 'Test'
                }
            }) as Request;

            const res = ({
                status: function(code) {return this;},
                json: function(data) {}
            }) as Response;

            const result = await createFuel(req, res, () => {});
            saveStub.restore();

            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('statusCode', 500);
        });

        // Throw error if t a Fuel with the same type already exists
        test('POST /fuel --> should return an error if a Fuel document with the same type already exists', async () => {
            // Create a Fuel document with type 'Test'
            await new Fuel({
                type: 'Test'
            }).save();

            const req = ({
                body: {
                    type: 'Test'
                }
            }) as Request;

            // Try to create another Fuel document with type 'Test'
            const result = await createFuel(req, {} as Response, () => {});
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('message', 'Fuel document with this type already exists!');
        });
    });
});