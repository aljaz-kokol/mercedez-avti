import { Schema, model, Document } from 'mongoose';

export interface Engine {
    kilowatts: number;
    torque: number;
    volume: number;
}

export interface CarDocument extends Document{
    class: string;
    type: string;
    fuel: string;
    engine: Engine;
    drive: string;
    gearbox: string;
    imagePath: string;
    name: string;
    releaseYear: Date;
    doors: number;
    weight: number;
    length: number;
    height: number;
    width: number;
    topSpeed: number;
    basePrice: number;
}

const carSchema = new Schema({
    class: {
        type: Schema.Types.ObjectId,
        ref: 'CarClass',
        required: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'CarType',
        required: true
    },
    fuel: {
        type: Schema.Types.ObjectId,
        ref: 'Fuel',
        required: true
    },
    drive: {
        type: Schema.Types.ObjectId,
        ref: 'Drive',
        required: true
    },
    gearbox: {
        type: Schema.Types.ObjectId,
        ref: 'GearBox',
        required: true
    },
    engine: {
        type: {
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
    imagePath: {
        type: String,
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
    },
    basePrice: {
        type: Number,
        required: true
    }
});

const Car = model<CarDocument>('Car', carSchema);

export default Car;