import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { addProductCategory, deleteProductCategory, showProductCategory } from '../controllers/productCategoryController.js';

const router = express.Router()

router.post("/addNewProductCategory",requireSignIn,isAdmin,addProductCategory)
router.get("/showProductCategory",requireSignIn,showProductCategory)
router.delete("/deleteProductCategory/:categoryID", requireSignIn, isAdmin, deleteProductCategory)
export default router