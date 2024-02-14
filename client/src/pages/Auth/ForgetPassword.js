import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const ForgetPassword = () => {
  const [emailID,setEmail] = useState(""); 
  const [newPassword,setNewPassword] = useState(""); 
  const [answer,setAnswer] = useState(""); 
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post("/api/v1/auth/forgetPassword",{emailID,newPassword,answer})
      if(res&&res.data.success){
        toast.success(res.data.message)
        navigate("/login");
      }else{
        toast.error(res.data.message)
      }
    }
    catch(error){
      console.log(error);
      toast.error("Something went wrong!")
    }
  }
  return (
    <Layout title='Forgot password - TechFixSolutions Application'>
      <div className='form-container'>
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div className='mb-3'>
              <input type='email' value={emailID} onChange={(e)=>{setEmail(e.target.value)}} className="form-control" id="exampleInputEmail" placeholder='Enter your Email' required />
            </div>
            <div className="mb-3">
              <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Enter your Favourite Sport' required />
            </div>
            <div className="mb-3">
              <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter your Password' required/>
            </div>
              <button type="submit" className="btn btn-primary">Reset</button>
          </div>
        </form>
      </div>
        
    </Layout>
  )
}

export default ForgetPassword