import mongoose from "mongoose";
const newProductsSchema = mongoose.Schema({
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
    Price:{
        type: Number,
        required: true
    },
    Quantity:{
        type: Number,
        required: true
    },
    ProductCategory:{
        type: mongoose.ObjectId,
        ref:"Product Categories",
        required: true
    },
    Photo:{
        data: Buffer,
        contentType: String
    }
},{timestamps: true})

export default mongoose.model("New Products", newProductsSchema)