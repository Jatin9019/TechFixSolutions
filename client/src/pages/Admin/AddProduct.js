import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import {Select} from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const {Option}=Select

const AddProduct = () => {
    const [categories, setCategories]=useState([])
    const [Category,setCategory]=useState("")
    const [Photo,setPhoto]=useState("")
    const [Name,setName]=useState("")
    const [Description,setDescription]=useState("")
    const [Quantity,setQuantity]=useState("")
    const [Price,setPrice]=useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        getCategories()
    },[])

    const getCategories = async() => {
        try{
            const {data} = await axios.get("/api/v1/productCategory/showProductCategory")
            console.log(data);
            if(data?.success){
                setCategories(data?.productCategories);                
            }
        }
        catch(error){
            console.log(error);
            toast.error("Something went wrong")
        }
    }

    const handleCreate = async(e) => {
        e.preventDefault()
        try{
            const productData = new FormData()
            productData.append("Name",Name)
            productData.append("Description",Description)
            productData.append("Photo",Photo)
            productData.append("Price",Price)
            productData.append("Quantity",Quantity)
            productData.append("ProductCategory",Category)
            const {data} = await axios.post("/api/v1/newProducts/postNewProduct",productData)
            if(data.success){
                toast.success("Product saved successfully");
                navigate("/dashboard/admin/manageProducts");
            }

        }
        catch(error){
            console.log("Something went wrong")
        }
    }
  return (
    <Layout title="Add a new product">
        <div className='container-fluid m-3 p-3'>
            <div className='row me-0'>
                <div className='col-md-2'><AdminMenu /></div>
                <div className='col-md-10'>
                    <h3 className='mb-3'>Create Product</h3>
                    <div className='m-1 w-75'>
                        <div className='mb-3'>
                          <input type='text' value={Name} onChange={(e)=>setName(e.target.value)} placeholder='Enter name' className='form-control' />
                        </div>
                        <div className='mb-3'>
                          <input type='text' value={Description} onChange={(e)=>setDescription(e.target.value)} placeholder='Enter a Description' className='form-control' />
                        </div>
                        <div className='mb-3'>
                          <input type='text' value={Price} onChange={(e)=>setPrice(e.target.value)} placeholder='Enter a Price' className='form-control' />
                        </div>
                        <div className='mb-3'>
                          <input type='text' value={Quantity} onChange={(e)=>setQuantity(e.target.value)} placeholder='Enter a Quantity' className='form-control' />
                        </div>
                        <Select bordered={false}
                     placeholder="Select a Category"
                      size='large' 
                      showSearch 
                      className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
                        {categories?.map(c=>(
                          <Option key={c._id}>{c.Name}</Option>
                        ))}
                        </Select>
                        <div className='mb-3'>
                          <label className='btn btn-outline-secondary col-md-12'>
                            {Photo ? Photo.name : "Upload Photo"} 
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
                          <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AddProduct