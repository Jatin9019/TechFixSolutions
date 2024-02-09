import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    EmailID: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
    },
    MobileNumber: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Answer: {
        type: String,
        required: true
    },
    Role: {
        type: Number,
        default: 0
    }

},{timestamps: true})

export default mongoose.model('users',userSchema)