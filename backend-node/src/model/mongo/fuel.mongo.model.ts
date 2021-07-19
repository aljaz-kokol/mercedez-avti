import { Schema, model } from 'mongoose';

const fuelSchema = new Schema({
    type: {
        type: String,
        required: true
    }
});

export default model('Fuel', fuelSchema);

