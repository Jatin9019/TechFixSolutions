import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable';
import { ShowNewProducts, postNewProduct, NewProductPhotoController, getSingleNewProductController, deleteNewProductController, updateNewProductController, deleteCategoryWiseProductsController } from '../controllers/newProductsController.js';

const router = express.Router()

router.post("/postNewProduct", formidable(), postNewProduct)
router.get("/showNewProducts", ShowNewProducts)
router.get('/get-product/:pid', getSingleNewProductController)
router.get('/product-photo/:pid', NewProductPhotoController)
router.delete("/delete-product/:pid", deleteNewProductController)
router.delete("/delete-products/:categoryID",deleteCategoryWiseProductsController)
router.put("/update-product/:pid",updateNewProductController)
export default router;