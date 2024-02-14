import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios'
import {useAuth} from '../../context/auth'

const Login = () => {
  const [EmailID,setEmail]=useState("");
  const [Password,setPassword]=useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useAuth("");

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
        const res = await axios.post("/api/v1/auth/login",{EmailID,Password})
        if(res&&res.data.success){
            toast.success(res.data.message)
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token
            })
            localStorage.setItem("auth",JSON.stringify(res.data))
            navigate(location.state||"/")
        }else{
            toast.error(res.data.message)
        }
    }
    catch(error){
        console.log(error);
        toast.error("Something went wrong!!")
    }
  }
  return (
    <Layout title="Login - TechFixSolutions Application">
        <div className='form-container'>
            <h1 className='AuthTitle'>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div className=' pb-7'>
                    <div className="mb-3">
                        <input type="email" value={EmailID} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Enter your Email' required />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={Password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter your Password' required/>
                    </div>
                    <div className='mb-3'>
                        <button type="button" className="btn btn-primary" onClick={()=>{navigate("/forget-password")}}>Forgot password</button>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>

            </form>
        </div>
    </Layout>
  )
}

export default Login