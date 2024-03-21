import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { braintreePaymentController, braintreeTokenController, getAllOrdersController, getIndividualOrdersController, orderStatusController } from '../controllers/ordersController.js';

const router = express.Router()

router.get("/braintree/token",braintreeTokenController)
router.post("/braintree/payment", requireSignIn,braintreePaymentController)
router.get("/showIndividualOrders/:id", requireSignIn, getIndividualOrdersController)
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController)
router.put("/order-status/:orderID",requireSignIn, isAdmin, orderStatusController)
export default router;