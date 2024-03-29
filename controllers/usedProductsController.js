import slugify from "slugify";
import usedProducts from "../models/usedProducts.js";
import fs from 'fs'
export const postUsedProduct = async(req,res) => {
    try{
        const {Name,Description,Condition,ProductCategory,Price,TentativePurchaseDate,WarrentyStatus,WarrentyExpiryDate,Seller} = req.fields
        const {Photo} = req.files
        switch(true){
            case !Name : return res.status(500).send({error: "Name is Required"})
            case !Description : return res.status(500).send({error: "Description is Required"})
            case !Condition : return res.status(500).send({error: "Condition is Required"})
            case !ProductCategory : return res.status(500).send({error: "ProductCategory is Required"})
            case !Price : return res.status(500).send({error: "Price is Required"})
            case !TentativePurchaseDate : return res.status(500).send({error: "Tentative Purchase Date is Required"})
            case !WarrentyStatus : return res.status(500).send({error: "Warrenty Status is Required"})
            case !Seller : return res.status(500).send({error: "Seller is Required"})
            case Photo && Photo.size > 1000000: return res.status(500).send({error:"Photo is Required and should be less than 1 MB"})
        }
        const product = await usedProducts({...req.fields, Slug: slugify(Name)})
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
        res.status(500).send({
            success: false,
            message: "Error in posting product to database",
            error
        })
    }

}

export const ShowUsedProducts = async(req,res) => {
    try{
        const products = await usedProducts.find({}).select("-Photo").limit(12).populate("Seller").populate("ProductCategory").populate("Condition")
        res.status(200).send({
            success: true,
            message: "Used Products List",
            products
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Error is getting used products list",
            error
        })
    }
}
export const ShowIndividualUsedProducts = async(req,res) => {
    try{
        const uid = req.params.uid;
        const products = await usedProducts.find({Seller: uid}).select("-Photo").populate("Seller").populate("ProductCategory").populate("Condition")
        res.status(200).send({
            success: true,
            message: "Used Products List",
            products
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Error in getting individual used products list",
            error
        })
    }
}

export const UsedProductPhotoController = async(req,res) => {
    try{
        const id=req.params.pid;
        const productPhoto = await usedProducts.findById(id).select("Photo")
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

export const DeleteUsedProductController = async(req,res) => {
    try{
        const id = req.params.pid;
        await usedProducts.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Used Product deleted successfully",
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Error in deleting used product",
            error
        })
    }
}

export const getSingleUsedProductController = async(req,res) => {
    try{
        const pid = req.params.pid;
        const usedProduct = await usedProducts.findById(pid).populate("Condition").populate("ProductCategory").populate("Seller")
        res.status(200).send({
            success: true,
            message: "Individual product details",
            usedProduct
        })
    }
    catch(error){
        res.status(500).send({
            success: false,
            message: "Error in getting single used product",
            error
        })
    }
}