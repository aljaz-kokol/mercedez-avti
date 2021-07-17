import { Schema, model } from 'mongoose';

const carClassShema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
}); 

export default model('CarClass', carClassShema);