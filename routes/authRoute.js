import express from 'express'
import {ForgetPasswordController, deleteUserController, getAllUsersController, loginController, registerController, updateProfileController} from '../controllers/authController.js' 
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
const router = express.Router()

//route for Register new user
router.post("/register",registerController)
//route for login
router.post("/login",loginController)
//route to change password
router.post("/forgetPassword",ForgetPasswordController)
//route to check user validation
router.get("/user-auth", requireSignIn, (req,res)=>{
    res.status(200).send({ok: true});
})
//route to check admin validation
router.get("/admin-auth", requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({ok: true});
})
//Route to update user details
router.put("/profile", requireSignIn, updateProfileController)
//route for getting all users
router.get("/getAllUsers", requireSignIn, isAdmin, getAllUsersController)
//route to delete user
router.delete("/user/:id", requireSignIn, isAdmin, deleteUserController)
export default router