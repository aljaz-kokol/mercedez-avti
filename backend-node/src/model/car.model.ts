import { Schema, model, Document, Types } from 'mongoose';

import { FuelDocument } from '../model/fuel.model';
import { CarClassDocument } from '../model/car-class.model';
import { CarTypeDocument } from '../model/car-type.model';
import { DriveDocument } from '../model/drive.model';

export interface Engine {
    fuel: FuelDocument;
    kilowatts: number;
    torque: number;
    volume: number;
}

export interface CarDocument extends Document{
    class: CarClassDocument;
    type: CarTypeDocument;
    engine: Engine;
    drive: DriveDocument;
    name: string;
    releaseYear: Date;
    doors: number;
    weight: number;
    length: number;
    height: number;
    width: number;
    topSpeed: number;
}

const carSchema = new Schema({
    class: {
        type: Types.ObjectId,
        ref: 'CarClass',
        required: true
    },
    type: {
        type: Types.ObjectId,
        ref: 'CarType',
        required: true
    },
    engine: {
        type: {
            fuel: {
                type: Types.ObjectId,
                ref: 'Fuel',
                required: true
            },
            kilowatts: {
                type: Number,
                required: true
            },
            torque: {
                type: Number,
                required: true
            },
            volume: {
                type: Number,
                required: true
            }
        },
        required: true
    },
    drive: {
        type: Types.ObjectId,
        ref: 'Drive',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Date,
        required: true,
    },
    doors: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    topSpeed: {
        type: Number,
        required: true
    }
});

const Car = model<CarDocument>('Car', carSchema);

export default Car;