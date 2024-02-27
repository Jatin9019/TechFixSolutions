import slugify from "slugify";
import newProducts from "../models/newProducts.js";
import productCategory from "../models/productCategory.js";
import fs from 'fs';

export const postNewProduct = async(req,res) => {
    try{
        const {Name,Description,Price,Quantity,ProductCategory} = req.fields
        const {Photo} = req.files
        switch(true){
            case !Name : return res.status(500).send({error: "Name is Required"})
            case !Description : return res.status(500).send({error: "Description is Required"})
            case !Price : return res.status(500).send({error: "Price is Required"})
            case !Quantity : return res.status(500).send({error: "Quantity is Required"})
            case !ProductCategory : return res.status(500).send({error: "Product Category is Required"})
            case Photo && Photo.size > 1000000: return res.status(500).send({error:"Photo is Required and should be less than 1 MB"})
        }
        const product = await newProducts({...req.fields,Slug: slugify(Name)})
        if(Photo){
            product.Photo.data=fs.readFileSync(Photo.path)
            product.Photo.contentType=Photo.type
        }
        await product.save()
        res.status(201).send({
            success:true,
            message:"Product saved Successfully",
            product
        })

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message:"Post new products failed",
            error
        })
    }
}

export const ShowNewProducts = async(req,res) => {
    try{
        const products = await newProducts.find({}).select("-Photo").limit(12).populate("ProductCategory")
        res.status(200).send({
            success: true,
            message: "New Products List",
            products
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error is getting new products list",
            error
        })
    }
}

export const NewProductPhotoController = async(req,res) => {
    try{
        const id=req.params.pid;
        const productPhoto = await newProducts.findById(id).select("Photo")
        if(productPhoto.Photo.data){
            res.set("Content-type",productPhoto.Photo.contentType);
            return res.status(200).send(productPhoto.Photo.data);
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting product photo",
            error
        })
    }
}

export const getSingleNewProductController = async(req,res) => {
    try{
        const id = req.params.pid;
        const product = await newProducts.findById(id).select("-Photo").populate("ProductCategory")
        res.status(200).send({
            success: true,
            message:"Single product details",
            product
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting single product details",
            error
        })
    }
}

export const deleteNewProductController = async(req,res) => {
    try{
        const id = req.params.pid;
        await newProducts.findByIdAndDelete(id).select("-Photo")
        res.status(200).send({
            success: true,
            message: "Product deleted successfully"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message:"Error in deleting product failed",
            error
        })
    }
}

export const updateNewProductController = async(req,res) => {
    try{
        const {Name,Description,Price,Quantity} = req.body;
        const updatedProduct = await newProducts.findByIdAndUpdate(req.params.pid,{Name,Description,Price,Quantity,Slug:slugify(Name)},{new: true})
        res.status(200).send({
            success: true,
            message: "Successfully Updated Product",
            updatedProduct
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in updating product details",
            error
        })
    }
}

export const deleteCategoryWiseProductsController = async(req,res) => {
    try{
        const categoryID = req.params.categoryID;
        await newProducts.findOneAndDelete({ProductCategory:categoryID}).populate("ProductCategory")
        res.status(200).send({
            success: true,
            message: "Deleted all category products"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in deleting category wise products",
            error
        })
    }
}
