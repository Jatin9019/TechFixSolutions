import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ManageProducts = () => {
    const [products,setProducts] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        getAllProducts()
    },[])
    const getAllProducts = async() => {
        try{
            const {data} = await axios.get("/api/v1/newProducts/showNewProducts")
            setProducts(data?.products)
        }
        catch(error){
            console.log("Something went wrong !!")
            toast.error("Something went wrong !!")
        }
    }
    const handleDelete = async(newProductID) => {
        const deleteProduct = await axios.delete(`/api/v1/newProducts/delete-product/${newProductID}`)
        if(deleteProduct?.data.success){
            toast.success(deleteProduct?.data.message)
            getAllProducts();
        }
    }
    const handleUpdate = async(newProductID) => {
        navigate(`/dashboard/admin/updateNewProduct/${newProductID}`)
    }
  return (
    <Layout title='Manage all products'>
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'><AdminMenu /></div>
                <div className='col-md-9'>
                    <h3>All Products</h3>
                    <div className='d-flex flex-wrap'>
                    {products.map((product)=>(
                        <div className="card m-2" key={product._id} style={{width: '18rem'}}>
                            <img src={`/api/v1/newProducts/product-photo/${product._id}`} className="card-img-top" alt={product.Slug} />
                            <div className="card-body">
                                <h5 className="card-title">{product.Name}</h5>
                                <p className="card-text">{product.Description}</p>
                                <label className='form-label'>Price - ${product.Price}</label><br />
                                <label className='form-label'>Quantity - {product.Quantity}</label><br />
                                <button className="btn btn-primary" onClick={()=>handleUpdate(product._id)}>Update</button>
                                <button className="btn btn-danger m-1" onClick={()=>handleDelete(product._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default ManageProducts