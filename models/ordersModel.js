import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    newProducts:[
        {
            type: mongoose.ObjectId,
            ref: "New Products"
        }
    ],
    usedProducts:[
        {
            type: mongoose.ObjectId,
            ref: "Used Products"
        }
    ],
    payment:{},
    buyer:{
        type:mongoose.ObjectId,
        ref: "users"
    },
    status:{
        type: String,
        default:"Not Process",
        enum:["Not Process","processing","shipped","delivered","cancel"]
    }
},{timestamps: true})

export default mongoose.model("Order",orderSchema)