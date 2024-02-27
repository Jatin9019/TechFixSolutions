import slugify from "slugify";
import productCategory from "../models/productCategory.js";

export const addProductCategory = async(req,res) => {
    try{
        const {Name} = req.body;
        if(!Name) return res.status(500).send({error: "Name is Required"})
        const existingProductCategory = await productCategory.findOne({Name})
        if(existingProductCategory){
            return res.status(200).send({
                success: false,
                message: "Product Category exists"
            })
        }
        const newProductCategory = await new productCategory({Name,Slug:slugify(Name)}).save()
        res.status(201).send({
            success: true,
            message: "Added new product category",
            newProductCategory
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in adding product category",
            error
        })
    }
}
export const showProductCategory = async(req,res) => {
    try{
        const productCategories = await productCategory.find({});
        res.status(200).send({
            success: true,
            message: "All product categories",
            productCategories
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in showing product category",
            error
        })
    }
}

export const deleteProductCategory = async(req,res) => {
    try{
        const {categoryID} = req.params;
        await productCategory.findByIdAndDelete(categoryID)
        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting product category",
            error
        })
    }
}