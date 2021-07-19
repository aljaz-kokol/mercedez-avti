import request from 'supertest';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { Response, Request } from 'express';

import app from '../app';
import CarClassMongo from '../model/mongo/car-class.mongo.model';
import { getCarClasses, getCarClassFromId } from '../controller/car-class.controller';
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
            const findStub = sinon.stub(CarClassMongo, 'find');
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
            const carClass = new CarClassMongo({
                _id: mongoTestId,
                name: 'A'
            });
            await carClass.save();
        });

        // Delete all dummy CarClass documents from db
        afterAll(async () => {
            await CarClassMongo.deleteMany();
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
            const findByIdStub = sinon.stub(CarClassMongo, 'findById');
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
});