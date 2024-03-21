import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'


const Services = () => {

    const [ComplaintCategories,setComplaintCategories] = useState([])

    const getComplaintCategories = async() => {
        try{
            const categoriesAPI = await axios.get("/api/v1/ComplaintCategory/showComplaintCategory")
            if(categoriesAPI?.data.success){
                setComplaintCategories(categoriesAPI?.data.complaintCategories);
            }
        }
        catch(error){
            toast.error("Something went wrong");
        }
    }
    
    useEffect(()=>{
        getComplaintCategories()
    },[])
  return (
    <Layout title="All services">
        <div className='container-fluid'>
            <div className='row mt-3 text-center'>
                <h4 className='col-md-6'>Service Name</h4>
                <h4 className='col-md-6'>Price</h4>
            </div>
            {ComplaintCategories?.map((category)=>(
                <div className='row mt-3 text-center' key={category._id}>
                    <div className='col-md-6'>{category.ServiceName}</div>
                    <div className='col-md-6'>{category.Price}</div>
                </div>
            ))}
        </div>
    </Layout>
  )
}

export default Services