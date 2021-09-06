import { Schema, model, Document } from 'mongoose';
export interface CarClassDocument extends Document {
    _id: string;
    name: string;
    subclasses: CarClassDocument[];
}

const carClassSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    subclasses: [this]
}); 

const CarClass = model<CarClassDocument>('CarClass', carClassSchema);

export default CarClass;