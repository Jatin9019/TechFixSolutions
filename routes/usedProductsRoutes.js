import express from "express";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { DeleteUsedProductController, ShowIndividualUsedProducts, ShowUsedProducts, UsedProductPhotoController, getSingleUsedProductController, postUsedProduct } from "../controllers/usedProductsController.js";
import formidable from 'express-formidable'

const router = express.Router();

router.post("/postUsedProduct",formidable(),postUsedProduct)
router.get("/showUsedProducts",ShowUsedProducts)
router.get("/get-product/:pid",getSingleUsedProductController)
router.get("/showUsedProducts/:uid",ShowIndividualUsedProducts)
router.get('/product-photo/:pid', UsedProductPhotoController)
router.delete("/deleteUsedProduct/:pid",DeleteUsedProductController)
export default router
