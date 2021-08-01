import { Schema, model, Document } from 'mongoose';

export interface CarClassDocument extends Document {
    name: string;
}

const carClassSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
}); 

const CarClass = model<CarClassDocument>('CarClass', carClassSchema);

export default CarClass;