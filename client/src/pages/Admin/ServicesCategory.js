import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';

const ServicesCategory = () => {
  const [newCategory,setNewCategory] = useState("");
  const [Price,setPrice] = useState("")
  const [categories,setCategories] = useState([]);

  useEffect(()=>{
    getCategories()
  },[])

  const getCategories = async() => {
      try{
          const categoriesAPI = await axios.get("/api/v1/ComplaintCategory/showComplaintCategory")
          console.log(categoriesAPI)
          if(categoriesAPI?.data.success){
              setCategories(categoriesAPI.data.complaintCategories);
          }
      }
      catch(error){
          toast.error("Something went wrong");
      }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const data = await axios.post("/api/v1/ComplaintCategory/addNewComplaintCategory",{ServiceName:newCategory,Price})
      console.log(data.data);
      if(data?.data.success){
          toast.success(`Category ${newCategory} created successfully`);
          getCategories();
          setNewCategory("");
          setPrice("");
      }
    }
    catch(error){
        toast.error("Please Check DataType of the inputs provided")
    }
  }
  const handleDelete = async(userID) => {
    try{
      const data = await axios.delete(`/api/v1/ComplaintCategory/deleteComplaintCategory/${userID}`)
      if(data?.data.success){
        toast.success(data?.data.message);
        getCategories();
      }
    }
    catch(error){
      toast.error("Soomething went wrong")
    }
  }
  const handleUpdate = async(userID) => {}

  return (
    <Layout title="Services">
        <div className='container-fluid m-3 p-3'>
            <div className='row me-0'>
                <div className='col-md-2'><AdminMenu /></div>
                <div className='col-md-10'>
                  <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                      <label htmlFor = "inputCategory" className='form-label h3'>Add a New Category</label>
                      <input type='text' id = "inputCategory" className='form-control w-35' value={newCategory} onChange={(e)=>setNewCategory(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                      <label htmlFor = "inputPrice" className='form-label h5'>Price</label>
                      <input type='text' id = "inputPrice" className='form-control w-35' value={Price} onChange={(e)=>setPrice(e.target.value)} />
                    </div>
                    <button type='submit' className='btn btn-success'>Add</button>
                  </form>
                  <div className='border shadow mt-3'>
                    <table className='table text-center'>
                      <thead>
                        <tr>
                          <th scope='col'>Name</th>
                          <th scope='col'>Price</th>
                          <th scope='col'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        categories.map((category)=>(
                        <tr key={category._id}>
                            <td>{category.ServiceName}</td>
                            <td>${category.Price}</td>
                            <td>
                                <button className='btn btn-danger' onClick={()=>handleDelete(category._id)}>Delete</button>
                                <button className='btn btn-primary ms-2' onClick={()=>handleUpdate(category._id)}>Update</button>
                            </td>
                        </tr>
                        ))              
                      }    
                      </tbody>
                    </table>
                  </div>
                    
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default ServicesCategory