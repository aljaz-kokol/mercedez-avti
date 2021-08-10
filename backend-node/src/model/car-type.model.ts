import { Schema, model, Document } from 'mongoose';

export interface CarTypeDocument extends Document {
    type: string;
    abbreviation: string;
}

const carTypeSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    abbreviation: {
        type: String,
        required: true
    }
});

const CarType = model<CarTypeDocument>('CarType', carTypeSchema);

export default CarType;