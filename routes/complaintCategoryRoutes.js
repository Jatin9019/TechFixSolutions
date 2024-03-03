import express from 'express';
import { addComplaintCategory, deleteComplaintCategory, showComplaintCategory, showIndividualComplaintCategoryRequest } from '../controllers/complaintCategoryController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post("/addNewComplaintCategory",addComplaintCategory)
router.get("/showComplaintCategory",showComplaintCategory)
router.get("/showIndividualComplaintCategoryRequest/:categoryID",showIndividualComplaintCategoryRequest)
router.delete("/deleteComplaintCategory/:categoryID", requireSignIn, isAdmin, deleteComplaintCategory)
export default router;