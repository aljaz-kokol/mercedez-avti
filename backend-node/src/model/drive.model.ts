import { model, Schema, Document } from 'mongoose';

 export interface DriveDocument extends Document {
     type: string;
 }

 const driveSchema = new Schema({
     type: {
         type: String,
         required: true
     }
 });

const Drive = model<DriveDocument>('Drive', driveSchema);

 export default Drive;