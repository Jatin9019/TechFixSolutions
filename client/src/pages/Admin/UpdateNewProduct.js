import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useNavigate, useParams } from 'react-router-dom'
import { Select } from 'antd'
import axios from 'axios'
import toast from 'react-hot-toast'
const {Option}=Select
const UpdateNewProduct = () => {
    const params = useParams()
    const [categories, setCategories]=useState([])
    const [Category,setCategory]=useState("")
    const [Photo,setPhoto]=useState("")
    const [Name,setName]=useState("")
    const [Description,setDescription]=useState("")
    const [Quantity,setQuantity]=useState("")
    const [Price,setPrice]=useState("")
    const navigate = useNavigate()
    const id = params.pid;

    const singleProductDetails = async(req,res) => {
        try{
            const {data} = await axios.get(`/api/v1/newProducts/get-product/${id}`)
            setName(data.product.Name)
            setDescription(data.product.Description)
            setPrice(data.product.Price)
            setQuantity(data.product.Quantity)
            setCategory(data.product.ProductCategory.Name)
        }
        catch(error){
            toast.error("Something went wrong")
        }
    }

    const getCategories = async() => {
        try{
            const categoriesAPI = await axios.get("/api/v1/productCategory/showProductCategory")
            if(categoriesAPI?.data.success){
                setCategories(categoriesAPI.data.productCategories);
            }
        }
        catch(error){
            toast.error("Something went wrong");
        
       }
    }
    const handleUpdate = async(e) => {
        e.preventDefault()
        try{
            const {data} = await axios.put(`/api/v1/newProducts/update-product/${id}`,{Name,Description,Price,Quantity})
            if(data?.success){
                toast.success(data?.message)
            }else{
                toast.success(data?.message)
            }
        }
        catch(error){
            toast.error(error)
        }
    }
    useEffect(()=>{
        if(id) {
            singleProductDetails()
            getCategories()
        }
    },[id])
    
  return (
    <Layout title="Update Product Page">
        <div className='container-fluid m-3 p-3'>
            <div className='row me-0'>
                <div className='col-md-2'><AdminMenu /></div>
                <div className='col-md-10'>
                    <h3 className='mb-3'>Update Product</h3>
                    <div className='m-1 w-75'>
                        <div className='mb-3'>
                          <input type='text' value={Name} onChange={(e)=>setName(e.target.value)} placeholder='Enter name' className='form-control' />
                        </div>
                        <div className='mb-3'>
                          <input type='text' value={Description} onChange={(e)=>setDescription(e.target.value)} placeholder='Enter a Description' className='form-control' />
                        </div>
                        <div className='mb-3'>
                          <input type='Number' value={Price} onChange={(e)=>setPrice(e.target.value)} placeholder='Enter a Price' className='form-control' />
                        </div>
                        <div className='mb-3'>
                          <input type='Number' value={Quantity} onChange={(e)=>setQuantity(e.target.value)} placeholder='Enter a Quantity' className='form-control' />
                        </div>
                        <Select bordered={false} disabled
                     placeholder="Select a Category"
                      size='large' 
                      showSearch 
                      className='form-select mb-3' value={Category} onChange={(value)=>{setCategory(value)}}>
                        {categories?.map(c=>(
                          <Option key={c._id}>{c.Name}</Option>
                        ))}
                        </Select>
                        <div className='mb-3'>
                          <label className='btn btn-outline-secondary col-md-12'>
                            {Photo ? Photo.name : "Update Photo"} 
                            <input type='file' name='photo' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                          </label>
                        </div>
                        <div className='mb-3'>
                          {Photo && (
                            <div className='text-center'>
                              <img src={URL.createObjectURL(Photo)} alt='product_photo' height={'200px'} className='img img-responsive'/>
                            </div>
                          )}
                        </div>
                        <div className='mb-3'>
                          <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default UpdateNewProduct