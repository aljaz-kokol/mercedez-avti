import mongoose from 'mongoose';
import sinon from 'sinon';
import request from 'supertest';
import { Request, Response } from 'express';

import app from '../app';
import Car, { CarDocument } from '../model/car.model';
import CarClass from '../model/car-class.model';
import CarType from '../model/car-type.model';
import Fuel from '../model/fuel.model';
import Drive from '../model/drive.model';
import GearBox from '../model/gearbox.model';
import { mongoTestId, mongoTestUri } from '../util/variables.util';
import { getCars } from '../controller/car.controller';

const carObj = {
    class: mongoTestId,
    type: mongoTestId,
    fuel: mongoTestId,
    engine: {
        kilowatts: 10,
        torque: 10,
        volume: 10
    },
    drive: mongoTestId,
    gearbox: mongoTestId,
    imagePath: '/',
    name: '/',
    releaseYear: new Date('2019-01-01').toISOString(),
    doors: 4,
    weight: 10,
    height: 10,
    length: 10,
    width: 10,
    topSpeed: 10
};

describe('/car end point testing', () => {
    // Connect to the test database and create necessary reference documents (CarType, CarClass...)
    beforeAll(async () => {
        await mongoose.connect(mongoTestUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        // Create reference documents
        await CarClass.create({ _id: mongoTestId, name: 'Test' });
        await CarType.create({ _id: mongoTestId, type: 'Test', abbreviation: 'T' });
        await Fuel.create({ _id: mongoTestId, type: 'Test' });
        await Drive.create({ _id: mongoTestId, type: 'Test' });
        await GearBox.create({ _id: mongoTestId, type: 'Test' });
    });
    // Delete reference documents and disconnect from the test database
    afterAll(async () => {
        // Delete reference documents
        await CarClass.deleteMany();
        await CarType.deleteMany();
        await Fuel.deleteMany();
        await Drive.deleteMany();
        await GearBox.deleteMany();
        // Disconnect from database
        await mongoose.disconnect();
    });
    
    describe('Fetching all Car documents', () => {
        // Crate a test Car document to be fetched later
        beforeAll(async () => {
            await Car.create(carObj);
        });
        // Delete test Car documents
        afterAll(async () => {
            await Car.deleteMany();
        });
        // Response should have a Content-Type of JSON and status code of 200
        test('GET /car --> should have a response with Content-Type of JSON and status code of 200', async () => {
            await request(app).get('/car').expect('Content-Type', /json/).expect(200);
        });
        // Response body should be an array of Car objects
        test('GET /car --> should have a response body with array of Car objects', async () => {
            const result = (await request(app).get('/car')).body;
            expect(result).toBeInstanceOf(Array);
            expect(result).toEqual(expect.arrayContaining([
                expect.objectContaining(carObj)
            ]));
        });
        // Throw error with status code of 500 if there was an error connecting to the database
        test('GET /car --> should return an error with status code of 500 if there was an error connecting to the database', async () => {
            const findStub = sinon.stub(Car, 'find');
            findStub.throws();
            const res = {
                status: function(code) {return this;},
                json: function(data) {}
            } as Response;
            const result = await getCars({} as Request, res, () => {});
            findStub.restore();
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('statusCode', 500);
        });
    });
});