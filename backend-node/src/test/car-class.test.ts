import request from 'supertest';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { Response, Request } from 'express';

import app from '../app';
import CarClassMongo from '../model/mongo/car-class.mongo.model';
import { getCarClasses } from '../controller/car-class.controller';
import { mongoTestUri } from '../util/variables.util';

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
});