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

const Fuel = model<FuelDocument>('Fuel', fuelSchema);

export default Fuel;

