import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import moment from 'moment'
import axios from 'axios'

const ManageUsedProducts = () => {
    const [auth] = useAuth()
    const [products,setProducts] = useState([])

    const getProducts = async() => {
        try{
            const {data} = await axios.get("/api/v1/usedProducts/showUsedProducts")
            console.log(data.products)
            if(data?.success){
                setProducts(data?.products)
            }
        }
        catch(error){
            toast.error("Something went wrong!")
        }
    }

    useEffect(()=>{
        if(auth?.token) getProducts()
    },[auth?.token])

    const handleDelete = async(id) => {
        try{
          const {data} = await axios.delete(`/api/v1/usedProducts/deleteUsedProduct/${id}`)
          if(data?.success){
            toast.success("Successfully deleted product")
            getProducts()
          }
        }
        catch(error){
          toast.error("Something went wrong !!")
        }
      }

  return (
    <Layout title="Manage all used products">
        <div className='container-fluid m-3 p-3'>
            <div className='row me-0'>
                <div className='col-md-2'><AdminMenu /></div>
                <div className='col-md-10'>
                    <h3>All Used Products</h3>
                    <div className='d-flex flex-wrap'>
                        {products.map((product)=>(
                            <div className="card m-2" key={product._id} style={{width: '18rem'}}>
                                <img src={`/api/v1/usedProducts/product-photo/${product._id}`} className="card-img-top" alt={product.Slug} />
                                <div className="card-body">
                                    <div className='text-center mb-2'>
                                        <h5 className="card-title">{product.Name}</h5>
                                        <p className="card-text">{product.Description}</p>
                                    </div>
                                    <label className='form-label'><b>Seller -</b> {product.Seller?.Name}</label><br />
                                    <label className='form-label'><b>Condition -</b> {product.Condition?.Name}</label><br />
                                    <label className='form-label'><b>Price -</b> ${product.Price}</label><br />
                                    <label className='form-label'><b>Tentative purchase date -</b> {moment(product.TentativePurchaseDate).format('MMMM Do YYYY')}</label>
                                    <label className='form-label'><b>Warrenty expiry date -</b> {moment(product.WarrentyExpiryDate).format('MMMM Do YYYY')}</label><br />
                                    <div className='text-center'>
                                        <button className="btn btn-danger m-1 text-center" onClick={()=>handleDelete(product._id)}>Delete</button>
                                    </div>
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

export default ManageUsedProducts