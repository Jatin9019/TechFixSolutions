import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import moment from 'moment'

const ProductMoreDetails = () => {
    const params = useParams()
    const productStatus = params.productStatus;
    const pid = params.pid;
    const [product,setProduct] = useState();
    useEffect(()=>{
        getProduct(productStatus,pid)
    },[])

    const getProduct = async(productstatus,productid) => {
        try{
            const data = await axios.get(`/api/v1/${productstatus}/get-product/${productid}`)
            if(data?.data.usedProduct){
                setProduct(data?.data.usedProduct)
            }else{
                setProduct(data?.data.product)
            }
        }
        catch(error){
            toast.error("Something went wrong !!")
        }
    }
    
  return (
    <Layout title="More Details">
        <div className='container-fluid m-3 p-3'>
            <div className='row me-0'>
                <div className='col-md-3'>
                <img src={`/api/v1/${productStatus}/product-photo/${product?._id}`} className="card-img-top" alt={product?.Slug} />
                </div>
                <div className='col-md-9 w-50'>
                    <div className='mb-3'>
                        <label className='form-label'>Name of Product</label>
                        <input type='text' className='form-control' value={product?.Name}  disabled />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Description</label>
                        <input type='text' className='form-control' value={product?.Description}  disabled />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Price</label>
                        <input type='text' className='form-control' value={product?.Price}  disabled />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Product Category</label>
                        <input type='text' className='form-control' value={product?.ProductCategory.Name}  disabled />
                    </div>
                    {productStatus === "usedProducts"? 
                    (
                        <>
                            <div className='mb-3'>
                                <label className='form-label'>Seller Name</label>
                                <input type='text' className='form-control' value={product?.Seller.Name} disabled />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Condition</label>
                                <input type='text' className='form-control' value={product?.Condition.Name} disabled />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Tentative Purchase Date</label>
                                <input type='text' className='form-control' value={moment(product?.TentativePurchaseDate).format('MMMM Do YYYY')} disabled />
                            </div>
                            {product?.WarrentyStatus ? (
                                <>
                                    <div className='mb-3'>
                                        <label className='form-label'>Warrenty Expiry Date</label>
                                        <input type='text' className='form-control' value={moment(product?.WarrentyExpiryDate).format('MMMM Do YYYY')} disabled />
                                    </div>
                                </>
                            ):(
                                <>
                                    <div className='mb-3'>
                                        <label className='form-label'>Warrenty Status</label>
                                        <input type='text' className='form-control text-danger' value="Expired" disabled />
                                    </div>
                                </>
                            )}
                        </>
                    ) : 
                    (
                        <div className='mb-3'>
                            <label className='form-label'>Quantity</label>
                            <input type='text' className='form-control' value={product?.Quantity} disabled />
                        </div>
                    )
                    }
                    <div className='mb-3'>
                        <label className='form-label'>Product Listed</label>
                        <input type='text' className='form-control' value={moment(product?.createdAt).format('MMMM Do YYYY')} disabled />
                    </div>
                    <div className='mb-3 text-center'>
                        <button className='btn btn-primary'>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default ProductMoreDetails