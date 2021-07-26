import { Schema, model, Document } from 'mongoose';

export interface GearBoxDocument extends Document {
    type: string;
}

const gearBoxSchema = new Schema({
    type: {
        type: String,
        required: true
    }
});

export default model('GearBox', gearBoxSchema);