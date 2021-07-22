import { Request, Response } from 'express';
import request from 'supertest';
import sinon from 'sinon';
import mongoose from 'mongoose';

import GearBoxMongo from '../model/mongo/gearbox.mongo.model';
import app from '../app';
import { mongoTestUri, mongoTestId } from '../util/variables.util';
import { getGearBoxes, getGearBoxFromId, createGearBox } from '../controller/gearbox.controller';

describe('/gearbox end point testing', () => {
    // Connect to the database before any tests run
    beforeAll(async () => {
        await mongoose.connect(mongoTestUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    // Disconnect from the database after all the tests run
    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('Fetching all gearboxes', () => {
        // Create GearBox documents to be fetched
        beforeAll(async () => {
            await new GearBoxMongo({ type: 'Test' }).save();
        });

        // Delete any GearBox documents
        afterAll(async () => {
            await GearBoxMongo.deleteMany();
        });

        // Response should have Content-Type of json
        test('GET /gearbox --> should have a response with Content-Type of JSON', async () => {
            await request(app).get('/gearbox').expect('Content-Type', /json/);
        });

        // Response should have status code of 200
        test('GET /gearbox --> should have a response with status code of 200', async () => {
            await request(app).get('/gearbox').expect(200);
        });

        // Response body should return an array of objects representing the GearBox documents
        test('GET /gearbox --> should have a response body with array of GearBox objects', async () => {
            const result = (await request(app).get('/gearbox')).body;
            expect(result).toBeInstanceOf(Array);
            expect(result).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    type: expect.any(String)
                })
            ]));
        });
        
        // Throw error with status code of 500 if there was an error connecting to the database
        test('GET /gearbox --> should return an error with status code of 500 if there was an error connecting to the database', async () => {
            const findStub = sinon.stub(GearBoxMongo, 'find');
            findStub.throws();
            const res = ({
                status: function(code) {return this},
                json: function(data) {}
            }) as Response;
            const result = await getGearBoxes({} as Request, res, () => {});
            findStub.restore();
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('statusCode', 500);
        });
    });

    describe('Fetching a single GearBox from id', () => {
        // Create GearBox document with test id
        beforeAll(async () => {
            await new GearBoxMongo({
                _id: mongoTestId,
                type: 'Test'
            }).save();
        });

        // Delete test GearBox document
        afterAll(async () => {
            await GearBoxMongo.deleteMany();
        });

        // Response should have a Content-Type of json
        test('GET /gearbox/:gearId --> should have a response with Content-Type of JSON', async () => {
            await request(app).get(`/gearbox/${mongoTestId}`).expect('Content-Type', /json/);
        });

        // Response status code should be 200
        test('GET /gearbox/:gearId --> should have a response with Content-Type of JSON', async () => {
            await request(app).get(`/gearbox/${mongoTestId}`).expect(200);
        });

        // Response body should have an object representing the GearBox document
        test('GET /gearbox/:gearId --> should have a response body with GearBox object', async () => {
            const result = (await request(app).get(`/gearbox/${mongoTestId}`)).body;
            expect(result).toEqual(expect.objectContaining({
                _id: mongoTestId,
                type: 'Test'
            }));
        });

        // Throw error with status code 500 if there was an error connecting to the database
        test('GET /gearbox/:gearId --> should return an error with status code of 500 if there was an error connecting to the database', async () => {
            const findByIdStub = sinon.stub(GearBoxMongo, 'findById');
            findByIdStub.throws();
            const req  = ({
                params: ({
                    gearId: mongoTestId
                }) as Partial<Request>
            }) as Request;

            const res = ({
                status: function(code) {return this;},
                json: function(data) {}
            }) as Response;

            const result = await getGearBoxFromId(req, res, () => {}); 
            findByIdStub.restore();

            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('statusCode', 500);
        });

        // Throw error with message if a GearBox document with the given id does not exist 
        test('GET /gearbox/:gearId --> should return an error with message if a GearBox document with the given id does no exists', async () => {
            const req = ({
                params: ({
                    gearId: '60e3429ab33c3461ecc40f85'
                }) as Partial<Request>
            }) as Request;
            const result = await getGearBoxFromId(req, {} as Response, () => {});

            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('message', 'GearBox document with this id does not exist!');
        });
    });

    describe('Crating a GearBox document', () => {
        // After every test delete any GearBox documents that were created
        afterEach(async () => {
            await GearBoxMongo.deleteMany();
        });

        // Response should have Content-Type of json
        test('POST /gearbox --> should have a response with Content-Type of JSON', async () => {
            await request(app).post('/gearbox').send({
                type: 'Test'
            }).expect('Content-Type', /json/);
        });

        // Response should have status code 201
        test('POST /gearbox --> should have a response with status code of 201', async () => {
            await request(app).post('/gearbox').send({
                type: 'Test'
            }).expect(201);
        });

        // Response body should contain a success message and an object representing the created GearBox
        test('POST /gearbox --> should have a response body with a success message and an object representing the new GearBox', async () => {
            const result = (await request(app).post('/gearbox').send({ type: 'Test' })).body;
            expect(result).toEqual(expect.objectContaining({
                message: 'GearBox document successfully created',
                gearBox: expect.objectContaining({
                    type: 'Test'
                })
            }))
        });

        // Throw error with status code of 500 if there was an error connecting to the database
        test('POST /gearbox --> should return an error with status code of 500 if there was an error connecting to the database', async () => {
            const saveStub = sinon.stub(GearBoxMongo.prototype, 'save');
            saveStub.throws();
            const req = {
                body: {
                    type: 'Test'
                }
            } as Request;

            const res = {
                status: function(code) {return this},
                json: function(data) {}
            } as Response;

            const result = await createGearBox(req, res, () => {});
            saveStub.restore();

            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('statusCode', 500);
        });

        // Throw error with message if GearBox with the given type already exists
        test('POST /gearbox --> should return an error with a message if a GearBox document with the given type already exists', async () => {
            // Create a GearBox document with type 'Test'
            await new GearBoxMongo({ type: 'Test' }).save();

            const req = {
                body: {
                    type: 'Test'
                }
            } as Request;

            // Try creating another Gearbox document with type 'Test'
            const result = await createGearBox(req, {} as Response, () => {});
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('message', 'GearBox document with this type already exists!')
        });
    });
});