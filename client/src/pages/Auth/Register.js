import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {Select} from 'antd'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const {Option}=Select

const Register = () => {
  const [Name,setName]=useState("")
  const [EmailID,setEmail] = useState("")
  const [Password,setPassword] = useState("")
  const [MobileNumber,setPhone] = useState("")
  const [StreetNumber,setStreetNumber] = useState("")
  const [StreetName,setStreetName] = useState("")
  const [City,setCity] = useState("")
  const [Province,setProvince] = useState("")
  const [Pincode,setPincode] = useState("")
  const [Answer,setAnswer] = useState("")

  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
        console.log(Name,EmailID,Password,MobileNumber,StreetNumber,StreetName,City,Province,Pincode,Answer)
        const res = await axios.post("/api/v1/auth/register",{Name,EmailID,Password,MobileNumber,Answer,Address:{StreetNumber,StreetName,Province,Pincode,City}})
        if(res&&res.data.success){
            toast.success(res.data.message);
            navigate("/login")
        }else{
            toast.error(res.data.message)
            console.log(res)
        }
    }
    catch(error){
        console.log("Error");
        toast.error("Something went wrong !!")
    }
  }

  return (
    <Layout title="Register - TechFixSolutions Application">
        <div className='form-container pb-4'>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="mb-3">
                        <input type="text" value={Name} onChange={(e)=>setName(e.target.value)} className="form-control" id="exampleInputName" placeholder='Enter your name' required />
                    </div>
                    <div className="mb-3">
                        <input type="email" value={EmailID} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Enter your Email' required />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={Password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter your Password' required/>
                    </div>
                    <div className="mb-3">
                        <input type="text" value={MobileNumber} onChange={(e)=>setPhone(e.target.value)} className="form-control" id="exampleInputPhone" placeholder='Enter your Phone Number' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={StreetNumber} onChange={(e)=>setStreetNumber(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='Enter your StreetNumber' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={StreetName} onChange={(e)=>setStreetName(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='Enter your StreetName' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={City} onChange={(e)=>setCity(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='Enter your City' required />
                    </div>
                    <div className="mb-3">
                        <Select bordered={false} placeholder="Select Province" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setProvince(value)}}>
                            <Option value="Ontario">Ontario</Option>
                            <Option value="Quebec">Quebec</Option>
                        </Select>
                    </div>
                    <div className="mb-3">
                        <input type="text" value={Pincode} onChange={(e)=>setPincode(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='Enter your Pincode' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={Answer} onChange={(e)=>setAnswer(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='What is your City Name?' required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>

            </form>
        </div>
    </Layout>
  )
}

export default Register