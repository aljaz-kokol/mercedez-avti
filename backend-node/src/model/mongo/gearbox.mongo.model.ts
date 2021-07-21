import { Schema, model } from 'mongoose';

const gearBoxSchema = new Schema({
    type: {
        type: String,
        required: true
    }
});

export default model('GearBox', gearBoxSchema);