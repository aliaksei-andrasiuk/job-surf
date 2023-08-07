import mongoose from 'mongoose';

const users = new mongoose.Schema({
    tgId: {
        required: true,
        type: String
    },
    userId: {
        required: true,
        type: String,
    }
});

export const UsersModel = mongoose.model('users', users)
