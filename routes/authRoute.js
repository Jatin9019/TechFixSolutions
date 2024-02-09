import express from 'express'
import {ForgetPasswordController, getAllUsersController, loginController, registerController} from '../controllers/authController.js' 
const router = express.Router()

router.post("/register",registerController)
router.get("/getAllUsers",getAllUsersController)
router.post("/login",loginController)
router.post("/forgetPassword",ForgetPasswordController)
export default router