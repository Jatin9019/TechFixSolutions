import mongoose from "mongoose";
const usedProductsSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Slug:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Photo:{
        data: Buffer,
        contentType: String
    },
    Condition:{
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required: true
    },
    TentativePurchaseDate:{
        type: Date,
        required: true
    },
    WarrentyStatus:{
        type: Boolean,
        required: true
    },
    WarrentyExpiryDate:{
        type: Date,
        required: true
    },
    Seller:{
        type: mongoose.ObjectId,
        ref:"users",
        required: true
    }
},{timestamps: true})
export default mongoose.model("Used Products",usedProductsSchema)