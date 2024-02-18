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
        StreetNumber:{
            type: String,
            required: true
        },
        StreetName:{
            type: String,
            required: true
        },
        City:{
            type: String,
            required: true
        },
        Province:{
            type: String,
            required: true
        },
        Pincode:{
            type: String,
            required: true
        }
    },
    Answer: {
        type: String,
        required: true
    },
    Role: {
        type: Number,
        default: 0
    },
    isTechnician: {
        type: Boolean,
        default: false
    }

},{timestamps: true})

export default mongoose.model('users',userSchema)