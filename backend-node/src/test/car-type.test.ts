import request from 'supertest';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

import app from '../app';
import CarType from '../model/car-type.model';
import { mongoTestId, mongoTestUri } from '../util/variables.util';
import { getCarTypes, getCarTypeFromId, createCarType } from '../controller/car-type.controller';

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

    describe('Fetching a single CarType document by id', () => {
        // Create a CarType document with test id
        beforeAll(async () => {
            await CarType.create({
                _id: mongoTestId,
                type: 'Test',
                abbreviation: 'T'
            });
        });
        // Delete the test CarType document
        afterAll(async () => {
            await CarType.deleteMany();
        });
        // Response should have a Content-Type of JSON and status code of 200
        test('GET /car-type/:typeId --> should have a response with Content-Type of JSON and status code of 200',async () => {
            await request(app).get(`/car-type/${mongoTestId}`).expect('Content-Type', /json/).expect(200);
        });
        // Response body should be a CarType object
        test('GET /car-type/:typeId --> should have a response body with CarType object', async () => {
            const result = (await request(app).get(`/car-type/${mongoTestId}`)).body;
            expect(result).toEqual(expect.objectContaining({
                _id: mongoTestId,
                type: 'Test',
                abbreviation: 'T'
            }));
        });
        // Throw error with status code of 500 if there was an error connecting to the database
        test('GET /car-type/:typeId --> should return an error with status code of 500 if there was an error connecting to the database', async () => {
            const findByIdStub = sinon.stub(CarType, 'findById');
            findByIdStub.throws();
            const req = {
                params: {
                    typeId: mongoTestId
                } as Partial<Request>
            } as Request;
            const res = {
                status: function(code) {return this;},
                json: function(data) {}
            } as Response;
            const result = await getCarTypeFromId(req, res, () => {});
            findByIdStub.restore();
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('statusCode', 500);
        });
        // Throw error with a message if CarType document with the given id does not exist
        test('GET /car-type/:typeId --> should return an error with a message if CarType document with the given id does not exits', async () => {
            const req = {
                params: {
                    typeId: '60e3429ab33c3461ecc40f85', // CarType document with this id does not exist
                } as Partial<Request>
            } as Request;
            const result = await getCarTypeFromId(req, {} as Response, () => {});
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('message', 'CarType document with this id does not exist!');
        });
    });

    describe('Creating a CarType document', () => {
        // Delete any created documents after each test
        afterEach(async () => {
            await CarType.deleteMany();
        });
        // Response should have a Content-Type of JSON and status code of 201
        test('POST /car-type --> should have a response with Content-Type of JSON and status code of 201', async () => {
            await request(app).post('/car-type').send({
                type: 'Test',
                abbreviation: 'T'
            }).expect('Content-Type', /json/).expect(201);
        });
        // Response body should contain a message and an object representing the new CarType document
        test('POST /car-type --> should have a response body with a message and an object representing the new document', async () =>{
            const result = (await request(app).post('/car-type').send({
                type: 'Test',
                abbreviation: 'T'
            })).body;
            expect(result).toEqual({
                message: 'Successfully created a CarType document',
                carType: expect.objectContaining({
                    _id: expect.any(String),
                    type: 'Test',
                    abbreviation: 'T'
                })
            });
        });
        // Throw an error with status code of 500 if there was an error connecting to the database
        test('POST /car-type --> should return an error with status code of 500 if there was an error connecting to the database', async () => {
            const createStub = sinon.stub(CarType, 'create');
            createStub.throws();
            const req = {
                body: {
                    type: 'Test',
                    abbreviation: 'T'
                }
            } as Request;
            const res = {
                status: function(code) {return this;},
                json: function(data) {}
            } as Response;
            const result = await createCarType(req, res, () => {});
            createStub.restore();
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('statusCode', 500);
        });
        // Throw an error with a message if a CarType with the given type already exists
        test('POST /car-type --> should return an error with a message if CarType with a given type already exists', async () => {
            // Create CarType document with type 'Test'
            await CarType.create({ type: 'Test', abbreviation: 'T' });
            const req = {
                body: {
                    type: 'Test',
                    abbreviation: 'T'
                }
            } as Request;
            // Try to create another CarType with type 'Test'
            const result = await createCarType(req, {} as Response, () => {});
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('message', 'CarType document with this type already exists!');
        });
    });
});