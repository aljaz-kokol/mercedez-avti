import { Schema, model, Document } from 'mongoose';
import { ApiImage } from '../util/api-image';
export interface CarClassDocument extends Document {
    _id: string;
    name: string;
    subclasses: CarClassDocument[];
    images: ApiImage[];
}

const carClassSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    subclasses: [this],
    images: [{
        name: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        }
    }]
}); 

const CarClass = model<CarClassDocument>('CarClass', carClassSchema);

export default CarClass;