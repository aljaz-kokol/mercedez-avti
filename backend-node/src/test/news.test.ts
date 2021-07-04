import request from 'supertest';
import sinon from 'sinon';
import mongoose from 'mongoose';

import app from '../app';
import MongoNews from '../model/mongo/news.monog.model';
import { mongoTestUri } from '../util/variables.util';

describe('/news end point testing', () => {
    beforeAll(() => {
        mongoose.connect(mongoTestUri, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
    }); 

    afterAll(() => {
        mongoose.disconnect();
    });

    describe('Fetching all news documents', () => {
        // Returned Content-Type should be json
        test('/news (GET) --> should have a Content-Type of JSON', async () => {
            await request(app).get('/news').expect('Content-Type', /json/);
        });

        // Return status code of 200 when successfully accesing path '/news' (method = GET)
        test('/news (GET) --> should have a respone with status code 200 when successful', async () => {
            await request(app).get('/news').expect(200);
        });

        // Return array of 'news' when accesing path '/news' (method = GET)
        test('/news (GET) --> should get an array of news as a response when successful', async () => {
            const response = await request(app).get('/news');

            // Make sure response body is an array
            expect(response.body).toBeInstanceOf(Array);        
            // If body is not empty expect array of News objects
            if (response.body.length > 0) {
                expect(response.body).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        _id: expect.any(String),
                        title: expect.any(String),
                        body: expect.any(String),
                        summary: expect.any(String),
                        imageUrl: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String)
                    })
                ]))
            }
        });

        // Return error with status code of 500 if there was an error connecting to the database
        test('/news (GET) --> shoudl return an error with status code of 500', async () => {
            const stub = sinon.stub(MongoNews, 'find');
            stub.throws();
            const result = await request(app).get('/news');
            expect(result).toHaveProperty('statusCode', 500);
            stub.reset();
        });  
    });
});