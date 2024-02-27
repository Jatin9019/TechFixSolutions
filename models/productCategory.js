import mongoose from "mongoose";
const productCategorySchema = mongoose.Schema({
    Name:{
        type: String,
        required: true,
        unique: true
    },
    Slug:{
        type: String,
        lowercase: true
    }
},{timestamps: true})
export default mongoose.model("Product Categories", productCategorySchema)