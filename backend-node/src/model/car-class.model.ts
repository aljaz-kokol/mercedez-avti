import { Schema, model, Document } from 'mongoose';
export interface CarClassDocument extends Document {
    name: string;
    subclasses: this[]
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