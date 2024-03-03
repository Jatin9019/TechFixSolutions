import Layout from '../../components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/Layout/UserMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
const {Option} = Select
const FileComplaint = () => {
    const [Name,setName]= useState();
    const [userID,setUserID] = useState("")
    const [ComplaintCategories,setComplaintCategories] = useState([])
    const [ProductCategories,setProductCategories] = useState([])
    const [ProductCategory,setProductCategory] = useState("");
    const [ComplaintCategory,setComplaintCategory] = useState("");
    const [Comment,setComment] = useState("");
    const [updatedTypeofService, setUpdatedTypeofService] = useState(null);
    const [price,setPrice] = useState("");

    const navigate = useNavigate()
    const [auth,setAuth]=useAuth();

    useEffect(()=>{
        if(auth?.user){
            setName(auth?.user.Name)
            setUserID(auth?.user.id)
            getComplaintCategories()
            getProductCategories()
        }else{
            setName("")
        }
    },[auth?.user])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const repairRequest = await axios.post("/api/v1/repairRequests/postRepairRequests",{ServiceDetails:ComplaintCategory,ProblemProductDetails:ProductCategory,UserDetails:userID,Comment,TypeOfServiceNeeded:updatedTypeofService})
            if(repairRequest?.data.success){
                toast.success(repairRequest?.data.message)
                navigate("/dashboard/user/myComplaints")
            }
        }
        catch(error){
            toast.error("Something went wrong")
        }
    }

    const getProductCategories = async() => {
        try{
            const categoriesAPI = await axios.get("/api/v1/productCategory/showProductCategory")
            if(categoriesAPI?.data.success){
                setProductCategories(categoriesAPI?.data.productCategories);
            }
        }
        catch(error){
            toast.error("Something went wrong");
        }
    }

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

    const handleRadioChange = (e) => {
        setUpdatedTypeofService(e.target.value);
    };

    const checkPrice = async(complaintCategory) => {
        try{
            const individualComplaintCategory = await axios.get(`/api/v1/ComplaintCategory/showIndividualComplaintCategoryRequest/${complaintCategory}`)
            if(individualComplaintCategory?.data.success){
                setPrice(individualComplaintCategory?.data.individualComplaintCategoryRequest.Price)
            }
        }catch(error){
            toast.error("Something went wrong!!")
        }
    }

  return (
    <Layout title="File a Complaint">
        <div className='container-fluid m-3 p-3'>
            <div className='row me-0'>
                <div className='col-md-2'><UserMenu /></div>
                <div className='col-md-10'>
                    <h3 className='text-center mb-3'>File a complaint</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className='form-label h6'>Choose Complaint Category</label>
                            <Select bordered={false} placeholder="Complaint Category" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setComplaintCategory(value); checkPrice(value)}}>
                                {ComplaintCategories.map((c)=>(
                                    <Option key={c._id} value={c._id}>{c.ServiceName}</Option>
                                ))}
                            </Select>
                        </div>
                        <div className="mb-3">
                            <label className='form-label h6'>Price of complaint</label>
                            <input type='text' disabled value={!price ? "" : ('$ '.concat(`${price}`))} className='form-control' placeholder='Choose Complaint Category' />
                        </div>
                        <div className="mb-3">
                            <label className='form-label h6'>Choose Product Category</label>
                            <Select bordered={false} placeholder="Product Category" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setProductCategory(value)}}>
                                {ProductCategories.map((c)=>(
                                    <Option key={c._id} value={c._id}>{c.Name}</Option>
                                ))}
                            </Select>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label h6'>Additional Comment</label>
                            <input type='text' className='form-control' value={Comment} onChange={(e)=>setComment(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label h6'>Choose Type of service</label><br />
                            <Radio.Group onChange={handleRadioChange} value={updatedTypeofService}>
                                <Radio value="In Person">In Person</Radio><br />  
                                <Radio value="Remote">Remote</Radio>        
                            </Radio.Group>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default FileComplaint