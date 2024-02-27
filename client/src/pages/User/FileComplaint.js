import Layout from '../../components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/Layout/UserMenu';

const FileComplaint = () => {
    const [Name,setName]= useState();
    const [Address,setAddress]= useState("");
    const [Comment,setComment] = useState("");
    const [auth,setAuth]=useAuth();
    useEffect(()=>{
        if(auth?.user){
            setName(auth?.user.Name)
            setAddress(auth?.user.Address.StreetNumber+" "+auth?.user.Address.StreetName+","+auth?.user.Address.City+","+auth?.user.Address.Province+", "+auth?.user.Address.Pincode)
        }else{
            setName("")
        }
    },[])
    const handleSubmit = async(e) => {
        e.preventDefault()
    }
  return (
    <Layout title="File a Complaint">
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'><UserMenu /></div>
                <div className='col-md-9'>
                    
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default FileComplaint