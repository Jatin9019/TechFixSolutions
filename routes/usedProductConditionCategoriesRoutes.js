import express from 'express';
import { addUsedProductCondition, deleteUsedProductConditionCategory, showUsedProductCondition } from '../controllers/usedProductsConditionCategories.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
const router = express.Router()

router.get("/showUsedProductCondition",showUsedProductCondition)
router.post("/addUsedProductCondition",addUsedProductCondition)
router.delete("/deleteUsedProductConditionCategory/:categoryID", requireSignIn, isAdmin, deleteUsedProductConditionCategory)

export default router

