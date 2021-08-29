import { Schema, model, Document } from 'mongoose';

export interface NewsImage {
    name: string;
    path: string;
}
export interface NewsDocument extends Document {
    title: string;
    body: string;
    summary: string;
    images: NewsImage[];
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