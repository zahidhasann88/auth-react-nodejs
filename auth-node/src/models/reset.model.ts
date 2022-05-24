import {model, Schema} from 'mongoose';

export interface Reset{
    email: string; 
    token: string;
}

const schema = new Schema<Reset>({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    }
});

export const ResetModel = model<Reset>('Reset', schema);