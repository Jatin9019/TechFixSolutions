import { camparePassword, hashPassword } from "../helpers/authHelper.js";
import  JWT  from "jsonwebtoken";
import userModel from "../models/userModel.js";
export const registerController = async(req,res) => {
    try{
        const {Name, EmailID, Password, MobileNumber,Address , Answer,Role} = req.body;
        //validations
        if (!Name){
            return res.send({error: "Name is required!"})
        }
        if (!Password){
            return res.send({error: "Password is required!"})
        }
        if (!EmailID){
            return res.send({error: "EmailID is required!"})
        }
        if (!MobileNumber){
            return res.send({error: "Mobile Number is required!"})
        }
        /*
        if (!StreetNumber){
            return res.send({error: "Street Number is required!"})
        }
        if (!StreetName){
            return res.send({error: "Street Name is required!"})
        }
        if (!City){
            return res.send({error: "City is required!"})
        }
        if (!Province){
            return res.send({error: "Province is required!"})
        }
        if (!Pincode){
            return res.send({error: "Pincode is required!"})
        }
        */
        if (!Address){
            return res.send({error: "Address is required!"})
        }
        if (!Answer){
            return res.send({error: "Answer is required!"})
        }
        //check if user is registered or not
        const existingUser = await userModel.findOne({EmailID});
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: "User Already exist. Please Login."
            })
        }
        //hash password
        const hashedPassword = await hashPassword(Password);

        //create user entry in database
        const user = await new userModel({Name,EmailID,Password:hashedPassword,MobileNumber,Address,Answer}).save()
        res.status(201).send({
            success: true,
            message: "User Registered. Please Proceed to Login now",
            user
        })
        
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message:"Error is registration",
            error
        })
    }
}

export const getAllUsersController = async(req,res) => {
    try{
        const users = await userModel.find({isTechnician:{$eq : false}}).select("-Password").sort("Name")
        res.send({
            success: true,
            message: "All users",
            users
        })
    }
    catch(error){
        console.log(error);;
        res.status(500).send({
            success: false,
            message: "Error in getting all users",
            error
        })
    }
}

export const loginController = async(req,res) => {
    try{
        const {EmailID,Password} = req.body;
        if(!EmailID || !Password){
            return res.status(404).send({
                success: false,
                message: "Invalid EmailID or password"
            })
        }
        const user = await userModel.findOne({EmailID});
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User Not Found !!"
            })
        }
        const checkPassword  = await camparePassword(Password,user.Password)
        if(!checkPassword){
            return res.status(200).send({
                success: false,
                message: "Password is incorrect !!"
            })
        }
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
        res.status(200).send({
            success: true,
            message:"Login Successfully",
            user:{
                Name: user.Name,
                EmailID: user.EmailID,
                MobileNumber: user.MobileNumber,
                Address: user.Address,
                Role: user.Role,
                isTechnician: user.isTechnician
            },
            token
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error
        })
    }
}

export const ForgetPasswordController = async(req,res) => {
    try{
        const {emailID,answer,newPassword} = req.body;
        if(!emailID){
            res.status(400).send({
                success: false,
                message: "Email ID is required"
            })
        }
        if(!answer){
            res.status(400).send({
                success: false,
                message: "Answer is required"
            })
        }
        if(!newPassword){
            res.status(400).send({
                success: false,
                message: "New Password is required"
            })
        }
        const user = await userModel.findOne({EmailID:emailID,Answer:answer})
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email ID or Security Answer is incorrect"
            })
        }
        const hashedNewPassword = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{Password:hashedNewPassword});
        res.status(200).send({
            success: true,
            message:"Password changed successfully"
        })
    }
    catch(error){
        console.log(error)
        res.status(404).send({
            success: false,
            message: "Error in Changing Password",
            error
        })
    }
}

export const updateProfileController = async(req,res) => {
    try{
        const {Name, MobileNumber, Address} = req.body
        const user = await userModel.findById(req.user._id)
        if (Address){
            Address.StreetNumber ? Address.StreetNumber : Address.StreetNumber=user.Address.StreetNumber
            Address.StreetName ? Address.StreetName : Address.StreetName=user.Address.StreetName
            Address.City ? Address.City : Address.City=user.Address.City
            Address.userProvince ? Address.Province=Address.userProvince : Address.Province=user.Address.Province
            Address.Pincode ? Address.Pincode : Address.Pincode=user.Address.Pincode
        }
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            Name: Name || user.Name,
            MobileNumber: MobileNumber || user.MobileNumber,
            Address: Address || user.Address,
        },{new: true})
        res.status(200).send({
            success: true,
            message: "Updated Successfully",
            updatedUser
        })
    }
    catch(error){
        console.log(error)
    }
}

export const deleteUserController = async(req,res) => {
    try{
        const {id} = req.params;
        const user = await userModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "User Deleted succcessfully",
            user
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "User Deletion failed"
        })
    }
}

export const getTechniciansController = async(req,res) => {
    try{
        const users = await userModel.find({isTechnician:{$eq: true}})
        res.status(200).send({
            success: true,
            message: "All Technicians Details",
            users
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Get All Technicians failed"
        })
    }
}

