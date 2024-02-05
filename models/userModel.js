import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required,
        trim: true
    },
    EmailID: {
        type: String,
        required,
        unique: true
    },
    Password: {
        type: String,
        required,
    },
    MobileNumber: {
        type: String,
        required
    },
    Address: {
        type: String,
        required
    },
    Roll: {
        type: Number,
        default: 0
    }

},{timestamps: true})

export default mongoose.model('users',userSchema)