import { Schema, model } from 'mongoose';

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
   imageUrl: {
       type: String,
       required: true,
   }
}, {timestamps: true});

export default model('News', newsSchema);