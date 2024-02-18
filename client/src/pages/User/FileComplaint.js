import Layout from '../../components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';

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
        <div className='form-container'>
        <h4>File a Complaint</h4>
        <form onSubmit={handleSubmit}>
            <div className='col-lg'>
                <div className="mb-3">
                    <input type="text" value={Name} onChange={(e)=>setName(e.target.value)} className="form-control" id="exampleInputName" placeholder='Enter your name' required />
                </div>
                <div className="mb-3" >
                    <input type="text" value={Address} onChange={(e)=>setAddress(e.target.value)} className="form-control" id="exampleInputName" placeholder='Enter your name' required />
                </div>
                <div className='mb-3'>
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Select Complaint</option>
                        <option value={1}>Data Recover</option>
                        <option value={2}>Remove Virus</option>
                        <option value={3}>MotherBoard Repair</option>
                    </select>
                </div>
                <div className="mb-3" >
                    <input type="text" value={Comment} onChange={(e)=>setComment(e.target.value)} className="form-control" id="exampleInputName" placeholder='Enter additional information' required />
                </div>
                <div className='mb-3'>
                    <label><b>Type of service required</b></label>
                    <div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                In-Person Service
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Remote Service
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit Complaint</button>
            </div>
        </form>
        </div>
    </Layout>
  )
}

export default FileComplaint