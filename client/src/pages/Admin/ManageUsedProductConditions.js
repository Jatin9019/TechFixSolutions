import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';

const ManageUsedProductConditions = () => {
    const [newCategory,setNewCategory] = useState("");
    const [categories,setCategories] = useState([]);
    useEffect(()=>{
        getCategories()
    },[])

    const getCategories = async() => {
        try{
            const categoriesAPI = await axios.get("/api/v1/usedProductConditions/showUsedProductCondition")
            if(categoriesAPI?.data.success){
                setCategories(categoriesAPI.data.usedProductConditionCategories);
            }
        }
        catch(error){
            toast.error("Something went wrong");
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const data = await axios.post("/api/v1/usedProductConditions/addUsedProductCondition",{Name:newCategory})
            if(data?.data.success){
                toast.success(`Category ${newCategory} created successfully`);
                getCategories();
                setNewCategory("");
            }
        }
        catch(error){
            toast.error("Something went wrong")
        }
    }
    const handleDelete = async(categoryID) => {
        try{
            const deleteCategory = await axios.delete(`/api/v1/usedProductConditions/deleteUsedProductConditionCategory/${categoryID}`)
            if(deleteCategory?.data.success){
                toast.success("Delete product condition successfull")
                getCategories();
            }else{
                toast.error(deleteCategory?.data.message)
            }
        }catch(error){
            toast.error("somethiing went wrong")
        }
    }
    const handleUpdate = async() => {}
  return (
    <Layout title="Manage used products conditions">
        <div className='container-fluid m-3 p-3'>
            <div className='row me-0'>
                <div className='col-md-2'><AdminMenu /></div>
                <div className='col-md-10'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor = "inputCategory" className='form-label h3'>Add a New Category</label>
                            <input type='text' id = "inputCategory" className='form-control w-35' value={newCategory} onChange={(e)=>setNewCategory(e.target.value)} />
                        </div>
                        <button type='submit' className='btn btn-success'>Add</button>
                    </form>
                    <div className='border shadow mt-3'>
                        <table className='table text-center'>
                            <thead>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.map((category)=>(
                                        <tr key={category._id}>
                                            <td>{category.Name}</td>
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

export default ManageUsedProductConditions