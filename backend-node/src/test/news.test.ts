import request from 'supertest';
import app from '../app';

describe('/news end point testing', () => {
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

        // If body not empty expect array of news objects
        if (response.body.length > 0) {
            expect(response.body).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    _id: expect.any(String),
                    description: expect.any(String),
                    shortDescription: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                })
            ]))
        }
    });

});