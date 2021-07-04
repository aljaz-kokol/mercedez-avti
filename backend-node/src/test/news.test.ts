import request from 'supertest';
import sinon from 'sinon';
import mongoose from 'mongoose';
import {Request, Response} from 'express';

import app from '../app';
import MongoNews from '../model/mongo/news.monog.model';
import { mongoTestUri } from '../util/variables.util';
import { getNews, createNews } from '../controller/news.controller';

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
        test('GET /news --> should have a Content-Type of JSON', async () => {
            await request(app).get('/news').expect('Content-Type', /json/);
        });

        // Return status code of 200 when successfully accesing path '/news' (method = GET)
        test('GET /news --> should have a respone with status code 200 when successful', async () => {
            await request(app).get('/news').expect(200);
        });

        // Return array of 'news' when accesing path '/news' (method = GET)
        test('GET /news --> should get an array of news as a response when successful', async () => {
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

        // Return error with status code of 500 if there was an error accessing to the database
        test('GET /news --> should throw an error with status code of 500 if there was an errro accessing to the database', async () => {
            const stub = sinon.stub(MongoNews, 'find');
            stub.throws();
            const res: Response = ({
                status: function(code) {return this;},
                json: function(data) {}
            }) as Response;
            const result = await getNews({} as Request, res, () => {});      
            stub.reset();
            expect(result).toHaveProperty('statusCode', 500);
        });  
    });
   
    describe('Creating a new news document', () => {
        
        // Delete test db entries
        afterAll(async () => {
            await MongoNews.deleteMany();
        });

        // Returned Content-Type shoul be JSON
        test('POST /news --> should have a Content-Type of JSON', async () => {
            await request(app).post('/news').send({
                title: 'A random title 0',
                body: 'A random body',
                summary: 'A random summary',
                imageUrl: 'A random image url'
            }).expect('Content-Type', /json/);
        });

        // Status code of response must be 201
        test('POST /news --> should return a response with status code 201 when successful', async () => {
            await request(app).post('/news').send({
                title: 'A random title 1',
                body: 'A random body',
                summary: 'A random summary',
                imageUrl: 'A random image url'
            }).expect(201);
        });
        
        // Throw error with status code of 500 if there was an error accessing the database
        test('POST /news --> shoudl throw an error with statusCode of 500 if there was an error accessing the database', async () => {
            const stub = sinon.stub(MongoNews.prototype, 'save');
            stub.throws();

            const res: Response = ({
                status: function(code) {return this;},
                json: function(data) {}
            }) as Response;

            const req = ({
                body: {
                    title: 'A random title 2',
                    body: 'A random body',
                    summary: 'A random summary',
                    imageUrl: 'A random image url'
                }
            }) as Request;

            const result = await createNews(req, res, () => {});
            stub.restore();
            expect(result).toHaveProperty('statusCode', 500);
        });

        // Object sent by response must contain a message: 'News successfuly created' and a object of the created news
        test('POST /news --> should return a newly created news object and a message: "News successfuly created"', async  () => {
            const result = await request(app).post('/news').send({
                title: 'A random title 3',
                body: 'A random body',
                summary: 'A random summary',
                imageUrl: 'A random image url'
            });

            expect(result.body).toEqual(expect.objectContaining({
                message: 'News successfuly created',
                news: {
                    _id: expect.any(String),
                    title: expect.any(String),
                    body: expect.any(String),
                    summary: expect.any(String),
                    imageUrl: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                }
            }));
        });

        test('POST /news --> should throw an error if news document with the same title already exists', async () => {
            // save a news document wtih title: 'Test'
            const mongoNews = new MongoNews({
                title: 'Test',
                body: 'A random body',
                summary: 'A random summary',
                imageUrl: 'A random image url'
            });
            await mongoNews.save();

            // try creating a news doucument with the same title: 'Test' using createNews
            const req = ({
                body: {
                    title: 'Test',
                    body: 'A random body',
                    summary: 'A random summary',
                    imageUrl: 'A random image url'
                }
            }) as Request;

            const result = await createNews(req, {} as Response, () => {});
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('message', 'News with this title already exists');
        });
    });
});