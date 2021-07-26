import request from 'supertest';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

import app from '../app';
import Drive from '../model/drive.model';
import { mongoTestId, mongoTestUri } from '../util/variables.util';
import { getDrives, getDriveFromId, createDrive } from '../controller/drive.controller';

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

    describe('Fetching a single Drive document by id', () => {
        // Create a Drive document with test id
        beforeAll(async () => {
            await Drive.create({
                _id: mongoTestId,
                type: 'Test'
            });
        });
        // Delete any dummy Drive documents
        afterAll(async () => {
            await Drive.deleteMany();
        });
        // Response Content-Type should be JSON
        test('GET /drive/:driveId --> should have a response with Content-Type of JSON', async () => {
            await request(app).get(`/drive/${mongoTestId}`).expect('Content-Type', /json/);
        });
        // Response status code should be 200
        test('GET /drive/:driveId --> should have a status code of 200', async () => {
            await request(app).get(`/drive/${mongoTestId}`).expect(200);
        });
        // Response body should contain a Drive object
        test('GET /drive/:driveId --> should have a response body containing the Drive object', async () => {
            const result = (await request(app).get(`/drive/${mongoTestId}`)).body;
            expect(result).toEqual(expect.objectContaining({
                _id: mongoTestId,
                type: 'Test'
            }));
        });
        // Return error with status code of 500 if there was an error connecting to the database
        test('GET /drive/:driveId --> should return an error with status code of 500 if there wan an error connecting to the database', async () => {
            const findByIdStub = sinon.stub(Drive, 'findById');
            findByIdStub.throws();
            const req = {
                params: {
                    driveId: mongoTestId
                } as Partial<Request>
            } as Request;
            const res = {
                status: function(code) {return this;},
                json: function(data) {}
            } as Response;
            const result = await getDriveFromId(req, res, () => {});
            findByIdStub.restore();
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('statusCode', 500);
        });
        // Return error with message if a Drive document with a given id does not exist
        test('GET /drive/:driveId --> should return an error with a message if a Drive document with the given id does not exist', async () => {
            const req = {
                params: {
                    driveId: '60e3429ab33c3461ecc40f85', // Drive document with this id does not exist
                } as Partial<Request>
            } as Request;
            const result = await getDriveFromId(req, {} as Response, () => {});
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('message', 'Drive document with this id does not exist!');
        });
    });

    describe('Creating a Drive document', () => {
        // Delete created Drive documents after each test
        afterEach(async () => {
            await Drive.deleteMany();
        });
        // Response should have Content-Type of JSON
        test('POST /drive --> should have a response with Content-Type of JSON', async () => {
            await request(app).post('/drive').send({
                type: 'Test'
            }).expect('Content-Type', /json/)
        });
        // Response should have status code of 201
        test('POST /drive --> should have a response with status code of 201', async () => {
            await request(app).post('/drive').send({
                type: 'Test'
            }).expect(201);
        });
        // Response body should have a message and an object representing the new Drive document
        test('POST /drive --> should have a response body with a message and an object representing thew new Drive document', async () => {
            const result = (await request(app).post('/drive').send({ type: 'Test' })).body;
            expect(result).toEqual(expect.objectContaining({
                message: 'Successfully created a Drive document',
                drive: expect.objectContaining({
                    _id: expect.any(String),
                    type: 'Test'
                })
            }));
        });
        // Throw error with status code of 500 if there was an error connecting to the database
        test('POST /drive --> should return an error with status code of 500 if there was an error connecting to the database', async () => {
            const createStub = sinon.stub(Drive, 'create');
            createStub.throws();
            const req = {
                body: {
                    type: 'Test'
                }
            } as Request;
            const res = {
                status: function(code) {return this;},
                json: function(data) {}
            } as Response;
            const result = await createDrive(req, res, () => {});
            createStub.restore();
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('statusCode', 500);
        });
        // Throw error with a message if a Drive document with the same type already exists
        test('POST /drive --> should return an error with a message if a Drive document with the same type already exists', async () => {
            // Create a Drive document with type 'Test'
            await Drive.create({ type: 'Test' });
            const req = {
                body: {
                    type: 'Test'
                }
            } as Request;
            // Try to create another Drive document with type 'Test'
            const result = await createDrive(req, {} as Response, () => {});
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('message', 'Drive document with this type already exists!');
        });
    });
});