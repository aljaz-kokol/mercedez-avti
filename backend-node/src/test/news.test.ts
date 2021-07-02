import request from 'supertest';
import app from '../app';
import News from '../model/news.model';

describe('/news end point testing', () => {
    // Returned Content-Type shoudl be json
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
        expect(typeof response.body).toBe(typeof Array<News>());
    });
});