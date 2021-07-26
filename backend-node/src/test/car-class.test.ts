import request from 'supertest';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { Response, Request } from 'express';

import app from '../app';
import CarClass from '../model/car-class.model';
import { getCarClasses, getCarClassFromId, createCarClass } from '../controller/car-class.controller';
import { mongoTestUri, mongoTestId } from '../util/variables.util';

describe('/car-class end point testing', () => {
    // Connect to database
    beforeAll(async () => {
        await mongoose.connect(mongoTestUri, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
    });
    
    // Disconnect from database
    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('Fetching all CarClass documents', () => {
        // Response Content-Type should be JSON
        test('GET /car-class --> should have a Content-Type of json', async () => {
            await request(app).get('/car-class').expect('Content-Type', /json/);
        });
        
        // Returned status code should be 200
        test('GET /car-class --> should have a status code of 200', async () => {
            await request(app).get('/car-class').expect(200);
        });

        // Return array of 'CarClass' documents when a successful request was made
        test('GET /car-class --> should return an array of CarClass objects', async () => {
            const result = await request(app).get('/car-class');
            expect(result.body).toBeInstanceOf(Array);
            if (result.body.length > 0) {
                expect(result.body).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        _id: expect.any(String),
                        name: expect.any(String)
                    })
                ]));
            }
        });

        // Return a error with status code of 500 if there was an error accessing the database
        test('GET /car-class --> should return an error with staus code of 500 if there was an error accessing the database', async () => {
            const findStub = sinon.stub(CarClass, 'find');
            findStub.throws();
            const res: Response = ({
                status: function(code) {return this;},
                json: function(data) {}
            }) as Response;
            const result = await getCarClasses({} as Request, res, () => {});
            findStub.restore();
            expect(result).toHaveProperty('statusCode', 500);
        });

    });

    describe('Fetching a single CarClass document', () => {
        // Create a dummy CarClass document to fetch later
        beforeAll(async () => {
            const carClass = new CarClass({
                _id: mongoTestId,
                name: 'A'
            });
            await carClass.save();
        });

        // Delete all dummy CarClass documents from db
        afterAll(async () => {
            await CarClass.deleteMany();
        });

        // Response Content-Type should be json
        test('GET /car-class/:classId --> should have a response with Content-Type of JSON', async () => {
            await request(app).get(`/car-class/${mongoTestId}`).expect('Content-Type', /json/);
        });

        // Response status code should be 200
        test('GET /car-class/:classId --> should have a response with status code 200', async () => {
            await request(app).get(`/car-class/${mongoTestId}`).expect(200);
        });
        
        // Response should contain a CarClass object
        test('GET /car-class/:classId --> should return a CarClass object', async () => {
            const result = await request(app).get(`/car-class/${mongoTestId}`);
            expect(result.body).toEqual(expect.objectContaining({
                _id: mongoTestId,
                name: 'A'
            }));
        });
        
        // Return an error with status code of 500 if there was an error connecting to the database
        test('GET /car-class/:classId --> should return an error with status code of 500 if there was an error connecting to the database', async () => {
            const findByIdStub = sinon.stub(CarClass, 'findById');
            findByIdStub.throws();
            const req: Request = ({
                params: ({
                    classId: mongoTestId
                }) as Partial<Request>
            }) as Request;

            const res: Response = ({
                status: function(code) {return this;},
                json: function(data) {}
            }) as Response;

            const result = await getCarClassFromId(req, res, () => {});
            findByIdStub.restore();
            expect(result).toHaveProperty('statusCode', 500);
        });

        // Return an error if an invalid id was sent as a parameter
        test('GET /car-class/:classId --> should return an error if classId is invalid', async () => {
            const req: Request = ({
                params: ({
                    classId: '60e3429ab33c3461ecc40f85' // Id that does not exist
                }) as Partial<Request>
            }) as Request;
            const result = await getCarClassFromId(req, {} as Response, () => {});
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('message', 'car-class with this id does not exist!');
        });
    });

    describe('Creating a CarClass document', () => {
        // Delete all CarClass documents aftery each test
        afterEach(async () => {
            await CarClass.deleteMany();
        })

        // Response Content-Type should be json
        test('POST /car-class --> should have a response with Content-Type json', async () => {
            await request(app).post('/car-class').send({
                name: 'A'
            }).expect('Content-Type', /json/);
        });

        // Response status code should be 201
        test('POST /car-class --> should have a response with status code of 201', async () => {
            await request(app).post('/car-class').send({
                name: 'A'
            }).expect(201);
        });
        
        // Response body should contain object of the new CarClass document
        test('POST /car-class --> should have response body with object of the new CarClass document', async () => {
            const result = await request(app).post('/car-class').send({ name: 'A' });
            expect(result.body).toEqual(expect.objectContaining({
                carClass: expect.objectContaining({
                    name: 'A'
                }),
                message: 'CarClass successfully created'
            }));
        });
        
        // Throw an error with status code of 500 if there was an error connecting to the database
        test('POST /car-class --> should throw an error with status code of 500 if there was an error connecting to the database', async () => {
            const saveStub = sinon.stub(CarClass.prototype, 'save');
            saveStub.throws();
            const req: Request = ({
                body: {
                    name: 'A'
                }
            }) as Request;
            const res: Response = ({
                status: function(code) {return this;},
                json: function(data) {}
            }) as Response;
            const result = await createCarClass(req, res, () => {});
            saveStub.restore();
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('statusCode', 500);
        });

        // Throw an error if CarClass with the same name already exists
        test('POST /car-class --> should throw an error if CarClass with the same name already exists', async () => {
            // Create CarClass with name A
            await new CarClass({name: 'A'}).save();

            const req: Request = ({
                body: {
                    name: 'A'
                }
            }) as Request;
            
            // Trying to crate a CarClass with the same name
            const result = await createCarClass(req, {} as Response, () => {});
            
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('message', 'CarClass with this name already exists!');
        });
    });
});