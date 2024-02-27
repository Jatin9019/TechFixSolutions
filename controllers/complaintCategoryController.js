import slugify from "slugify";
import complaintCategory from "../models/complaintCategory.js";

export const addComplaintCategory = async(req,res) => {
    try{
        const {ServiceName,Price} = req.body;
        if(!ServiceName) return res.status(500).send({error:"ServiceName is required"})
        if(!Price) return res.status(500).send({error:"Price is required"})

        const existingComplaintCategory = await complaintCategory.findOne({ServiceName})
        if(existingComplaintCategory){
            return res.status(200).send({
                success: false,
                message: "Complaint Category exists"
            })
        }
        const newComplaintCategory = await new complaintCategory({ServiceName,Slug:slugify(ServiceName),Price}).save()
        res.status(201).send({
            success: true,
            message: "Added new complaint category",
            newComplaintCategory
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in adding Complaint category",
            error
        })
    }
}

export const showComplaintCategory = async(req,res) => {
    try{
        const complaintCategories = await complaintCategory.find({});
        res.status(200).send({
            success: true,
            message: "All complaint categories",
            complaintCategories
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in showing complaint Categories",
            error
        })
    }
}

export const deleteComplaintCategory = async(req,res) => {
    try{
        const id = req.params.categoryID;
        await complaintCategory.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Complaint Category Deleted successfully"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Complaint Category deletion failed"
        })
    }
}