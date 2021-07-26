import { Schema, model, Document } from 'mongoose';

export interface FuelDocument extends Document {
    type: string;
}

const fuelSchema = new Schema({
    type: {
        type: String,
        required: true
    }
});

export default model<FuelDocument>('Fuel', fuelSchema);

