import express from "express";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { ShowUsedProducts, postUsedProduct } from "../controllers/usedProductsController.js";
import formidable from 'express-formidable'

const router = express.Router();

router.post("/postUsedProduct",formidable(),postUsedProduct)
router.get("/showUsedProducts",ShowUsedProducts)

export default router
