import { Schema, model, Document } from 'mongoose';
import { ApiImage } from '../util/api-image';

export interface NewsDocument extends Document {
    title: string;
    body: string;
    summary: string;
    images: ApiImage[];
    createdAt: string;
    updatedAt: string;
}

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
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
}, {timestamps: true, versionKey: false});

const News = model<NewsDocument>('News', newsSchema);

export default News;