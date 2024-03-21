import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DropIn from "braintree-web-drop-in-react";

const CartPage = () => {
    const [auth] = useAuth()
    const [cart,setCart] = useCart()
    const [newProducts,setnewProducts] = useState([])
    const [usedProducts,setUsedProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [clientToken, setClientToken] = useState("")
    const [instance,setInstance] = useState("")


    const navigate = useNavigate()

    const removeCartItem = (pid) => {
        try{
            let myCart = [...cart]
            let index = myCart.findIndex((item)=> item._id === pid)
            myCart.splice(index,1)
            setCart(myCart)
            localStorage.setItem('cart',JSON.stringify(myCart))
            setUsedProducts(myCart?.filter(item=>item.hasOwnProperty('Seller')))
            setnewProducts(myCart?.filter(item=>!item.hasOwnProperty('Seller')))
        }
        catch(error){
            toast.error("Something went wrong !!")
        }
    }

    const totalPrice = () => {
        try{
            let total = 0;
            cart?.map((item)=>{total = total+item.Price})
            return total.toLocaleString("en-us",{
                style:"currency",
                currency:"USD"
            });
        }
        catch(error){
            toast.error("Error in finding total price")
        }
    }

    const handlePayment = async() => {
        try{
            setLoading(true)
            const { nonce } = await instance.requestPaymentMethod();
            const {data} = await axios.post("/api/v1/orders/braintree/payment",{nonce,cart})
            setLoading(false)
            localStorage.removeItem('cart')
            setCart([])
            navigate("/dashboard/user/myOrders")
            toast.success("Payment Successfull")
        }
        catch(error){
            setLoading(false)
        }
    }

    const getToken = async() => {
        try{
            const {data} = await axios.get("/api/v1/orders/braintree/token")
            setClientToken(data?.clientToken)
        }
        catch(error){
            toast.error("Something went wrong in getting token")
        }
    }

    useEffect(()=>{
        if(auth?.token){
            setUsedProducts(cart?.filter(item=>item.hasOwnProperty('Seller')))
            setnewProducts(cart?.filter(item=>!item.hasOwnProperty('Seller')))
            getToken()
        }
    },[auth?.token])

  return (
    <Layout title="My Cart">
        <div className='container'>
            <div className='row mb-3'>
                <div className='col-md-12'>
                    <h1 className='text-center bg-light p-2 mb-1'>
                        {`Hello ${auth?.token && auth?.user?.Name}`}
                    </h1>
                    <h4 className='text-center'>{cart?.length >=1 ? `You have ${cart.length} items in your cart. ${auth?.token ? "" : "Please login to checkout."}`: "Your cart is empty "}</h4>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-8'>
                    <div>
                        <h3 className='form-label'>New Products</h3>
                        {newProducts.map((p)=>(
                            <div className='row mb-2 p-3 card flex-row' key={p._id}>
                                <div className='col-md-4'>
                                    <img src={`/api/v1/newProducts/product-photo/${p._id}`} />
                                </div>
                                <div className='col-md-8'>
                                    <p className='fw-bold'>{p.Name}</p>
                                    <p>Price is $ {p.Price}</p>
                                    <p>Category is {p.ProductCategory.Name}</p>
                                    <button className='btn btn-danger' onClick={()=>removeCartItem(p._id)}>Remove from cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                    <h3 className='form-label'>Used Products</h3>
                        {usedProducts.map((p)=>(
                            <div className='row mb-2 p-3 card flex-row' key={p._id}>
                                <div className='col-md-4'>
                                    <img src={`/api/v1/usedProducts/product-photo/${p._id}`} />
                                </div>
                                <div className='col-md-8'>
                                    <p className='fw-bold'>{p.Name}</p>
                                    <p>Price is $ {p.Price}</p>
                                    <p>Category is {p.ProductCategory.Name}</p>
                                    <p>Seller is {p.Seller.Name}</p>
                                    <button className='btn btn-danger' onClick={()=>removeCartItem(p._id)}>Remove from cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='col-md-4 text-center'>
                    <h4>Cart Summary</h4>
                    <hr />
                    <h4>Total {totalPrice()}</h4>
                    {auth?.user?.Address ? (
                        <div className='mb-3'>
                            <h4>Current Address</h4>
                            <h5>{auth?.user?.Address.StreetNumber}, {auth?.user?.Address.StreetName}, {auth?.user?.Address.City}, {auth?.user?.Address.Province}, {auth?.user?.Address.Pincode}</h5>
                        </div>
                    ) : (
                        <div className='mb-3'>
                            {auth?.token ? (
                                <buttom className="btn btn-outline-warning" onClick={()=>navigate("/dashboard/user/userProfile")}>Update Address</buttom>
                            ) : (
                                <button className='btn btn-outline-warning' onClick={()=>navigate("/login",{state:"/cart"})} >Please loging to checkout</button>
                            )}
                        </div>
                    ) }
                    <div className='mt-2'>
                    {
                        !clientToken || !cart?.length ? ("") : (
                            <>
                            <DropIn 
                            options={{
                                authorization: clientToken,
                                paypal:{
                                flow: 'vault'
                                },
                            }}
                            onInstance={instance => setInstance(instance)} 
                            />
                            </>
                        )
                    }
                        <button className='btn btn-primary' onClick={handlePayment} >{loading ? "Processing..." : "Make Payment" }</button>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage