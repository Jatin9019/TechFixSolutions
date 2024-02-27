import mongoose from "mongoose";

const complaintSchema = mongoose.Schema({
    ServiceName:{
        type: String,
        required: true
    },
    Slug:{
        type: String,
        lowercase: true
    },
    Price:{
        type: Number,
        required: true
    }
},{timestamps: true})

export default mongoose.model("Complaint Category",complaintSchema)