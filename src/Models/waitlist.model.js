import mongoose from 'mongoose';

const waitListSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
    },
    { timestamps: true }
)

export const WaitList = mongoose.model('WaitList', waitListSchema)
