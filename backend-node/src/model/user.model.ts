import { model, Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
});

const User = model<UserDocument>('User', userSchema);

export default User;