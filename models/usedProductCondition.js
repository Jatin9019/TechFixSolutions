import mongoose from "mongoose";

const usedProductConditionSchema = mongoose.Schema({
    Name:{
        type:String,
        required: true,
        unique: true
    },
    Slug:{
        type: String,
        lowercase: true
    }
},{timestamps: true})

export default mongoose.model("Usedproducts condition",usedProductConditionSchema)