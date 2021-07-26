import { Schema, model, Document } from 'mongoose';

export interface NewsDocument extends Document {
    title: string;
    body: string;
    summary: string;
    imagePath: string;
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
   imagePath: {
       type: String,
       required: true,
   }
}, {timestamps: true, versionKey: false});

export default model('News', newsSchema);