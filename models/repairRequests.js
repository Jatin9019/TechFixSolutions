import mongoose from "mongoose";
const repairRequestsSchema = mongoose.Schema({
    UserDetails: {
        type: mongoose.ObjectId,
        ref: "users",
        required: true
    },
    TechnicianDetails: {
        type: mongoose.ObjectId,
        ref: "users"
    },
    ServiceDetails: {
        type: mongoose.ObjectId,
        ref: "Complaint Category",
        required: true
    },
    ProblemProductDetails: {
        type: mongoose.ObjectId,
        ref: "Product Categories",
        required: true
    },
    Comment: {
        type: String,
        required: true
    },
    TypeOfServiceNeeded: {
        type: String,
        required: true
    },
    TechnicianComment: {
        type: String
    },
    TotalPriceCharged:{
        type: Number  
    },
    Status: {
        type: String,
        default: "Complaint filed"
    }
},{timestamps: true})
export default mongoose.model("Repair Requests",repairRequestsSchema)
