import slugify from "slugify"
import usedProductCondition from "../models/usedProductCondition.js";
export const addUsedProductCondition = async(req,res) => {
    try{
        const {Name} = req.body;
        if(!Name) return res.status(500).send({
            success: false,
            message:"Name of condition is required"
        })
        const existingUsedProductCondition = await usedProductCondition.findOne({Name})
        if(existingUsedProductCondition) return res.status(200).send({
            success: false,
            message:"usedproduct condition already exists"
        })
        const usedProductConditionCategory = await new usedProductCondition({Name,Slug:slugify(Name)}).save()
        res.status(201).send({
            success: true,
            message: "Added new usedproduct condition",
            usedProductConditionCategory
        })

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in adding usedproducts condition"
        })
    }
}

export const showUsedProductCondition = async(req,res) => {
    try{
        const usedProductConditionCategories = await usedProductCondition.find({});
        res.status(200).send({
            success: true,
            message: "All usedproduct conditions",
            usedProductConditionCategories
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in showing usedproducts condition"
        })
    }
}

export const deleteUsedProductConditionCategory = async(req,res) => {
    try{
        const {categoryID} = req.params;
        await usedProductCondition.findByIdAndDelete(categoryID)
        res.status(200).send({
            success: true,
            message: "Usedproduct condition deleted successfully"
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Error in deleting used products condition"
        })
    }
}