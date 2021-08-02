import mongoose from 'mongoose';
import sinon from 'sinon';
import request from 'supertest';
import { Request, Response } from 'express';

import app from '../app';
import Car from '../model/car.model';
import CarClass from '../model/car-class.model';
import CarType from '../model/car-type.model';
import Fuel from '../model/fuel.model';
import Drive from '../model/drive.model';
import GearBox from '../model/gearbox.model';
import { mongoTestId, mongoTestId2, mongoTestUri } from '../util/variables.util';
import { getCars, getCarFromId, createCar } from '../controller/car.controller';

const carObj = {
    class: mongoTestId2,
    type: mongoTestId2,
    fuel: mongoTestId2,
    engine: {
        kilowatts: 10,
        torque: 10,
        volume: 10
    },
    drive: mongoTestId2,
    gearbox: mongoTestId2,
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

    describe('Fetching a single car document', () => {
        // Create Car document with test id
        beforeAll(async () => {
            await Car.create({
                _id: mongoTestId,
                ...carObj
            })
        });
        // Delete test Car document
        afterAll(async () => {
            await Car.deleteMany();
        });
        // Response should have a Content-Type of JSON and status code of 200
        test('GET /car/:carId --> should have a response with Content-Type of JSON and status code of 200', async () => {
            await request(app).get(`/car/${mongoTestId}`).expect('Content-Type', /json/).expect(200);
        });
        // Response body should contain a Car object
        test('GET /car/:carId --> should have a response body containing the Car object', async () => {
            const result = (await request(app).get(`/car/${mongoTestId}`)).body;
            expect(result).toEqual(expect.objectContaining({
                _id: mongoTestId,
                ...carObj
            }));
        });
        // Throw error with status code of 500 if there was an error connecting to the database
        test('GET /car/:carId --> should return an error with status code of 500 if there was an error connecting to the database', async () => {
            const findByIdStub = sinon.stub(Car, 'findById');
            findByIdStub.throws();
            const req = {
                params: {
                    carId: mongoTestId
                } as Partial<Request>
            } as Request;
            const res = {
                status: function(code) {return this;},
                json: function(data) {}
            } as Response;
            const result = await getCarFromId(req, res, () => {});
            findByIdStub.restore();
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('statusCode', 500);
        });
        // Throw error with message if the Car with the given id does not exist
        test('GET /car/:carId --> should return an error with message if a Car with the given id does not exist', async () => {
            const req = {
                params: {
                    carId: mongoTestId2, // Car document with this id does not exits
                } as Partial<Request>
            } as Request;
            const result = await getCarFromId(req, {} as Response, () => {});
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('message', 'Car document with this id does not exist!');
        });
    });

    describe('Creating a Car document', () => {
        // Delete car object after each test
        afterEach(async () => {
            await Car.deleteMany();
        });
        // Response should have Content-Type of JSON and status code of 201
        test('POST /car --> should have a response Content-Type of JSON and status code of 201', async () => {
            await request(app).post('/car').send(carObj).expect('Content-Type', /json/).expect(201);
        });
        // Response body should contain a message and an object representing the new Car document
        test('POST /car --> should have a response body with a message and a Car object', async () => {
            const result = (await request(app).post('/car').send(carObj)).body;
            expect(result).toEqual({
                message: 'Car document successfully created',
                car: expect.objectContaining(carObj)
            });
        });
        // Throw error with status code of 500 if there was an error connecting to the database
        test('POST /car --> should return an error with status code of 500 if there was an error connecting to the database', async () => {
            const createStub = sinon.stub(Car, 'create');
            createStub.throws();
            const req = {
                body: {...carObj}
            } as Request;
            const res = {
                status: function(code) {return this},
                json: function(data) {}
            } as Response;
            const result = await createCar(req, res, () => {});
            createStub.restore();
            expect(result).toBeInstanceOf(Error);
            expect(result).toHaveProperty('statusCode', 500);
        });
    });
});