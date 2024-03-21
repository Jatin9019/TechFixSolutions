import braintree from "braintree";
import dotenv from 'dotenv';
import ordersModel from "../models/ordersModel.js";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

export const getIndividualOrdersController = async(req,res) => {
    try{
        const id = req.params.id;
        const individualOrders = await ordersModel.find({buyer: id}).populate("newProducts").populate("usedProducts")
        res.status(200).send({
            success: true,
            message: "Individual orders",
            individualOrders
        })
    }
    catch(error){
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in getting individual orders",
            error
        })
    }
}


export const braintreeTokenController = async(req,res) => {
    try{
        gateway.clientToken.generate({},function(error,response){
            if(error){res.status(500).send(error)}
            else{res.send(response)}
        })
    }
    catch(error){
        res.status(400).send({
            success: false,
            message: "Error while generating token",
            error
        })
    }
}

export const braintreePaymentController = async(req,res) => {
    try{
        const {cart, nonce} = req.body;
        let total = 0;
        cart.map((item)=>{
            total+=item.Price;
        })
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options:{
                submitForSettlement: true
            }
        },function(error,result){
            if(result){
                const newProducts = cart.filter(product => !product.hasOwnProperty('Seller'));
                const usedProducts = cart.filter(product => product.hasOwnProperty('Seller'));
                const order = new ordersModel({
                    newProducts: newProducts,
                    usedProducts: usedProducts,
                    payment: result,
                    buyer: req.user._id
                }).save()
                res.json({ok:true})
            }else{
                res.status(500).send(error)
            }
        })
    }
    catch(error){
        res.status(400).send({
            success: false,
            message: "Error in payment controller",
            error
        })
    }
}

export const getAllOrdersController = async(req,res) => {
    try{
        const orders = await ordersModel.find({}).populate("newProducts","-Photo").populate("usedProducts","-Photo").populate("buyer","Name")
        res.status(200).send({
            success: true,
            message: "All Orders List",
            orders
        })
    }
    catch(error){
        res.status(400).send({
            success: false,
            message: "Error in get all orders controller",
            error
        })
    }
}
export const orderStatusController = async(req,res) => {
    try{
        const {orderID} = req.params;
        const {status} = req.body;
        const orders = await ordersModel.findByIdAndUpdate(orderID,{status},{new: true})
        res.status(200).send({
            success: true,
            message: "Updated orders List",
            orders
        })
    }
    catch(error){
        res.status(400).send({
            success: false,
            message: "Order Status updation failed",
            error
        })
    }
}
