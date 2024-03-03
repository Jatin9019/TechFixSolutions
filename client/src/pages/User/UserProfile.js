import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import { Provinces } from '../../components/Provinces'
import Select from 'react-select'
import toast from 'react-hot-toast'
import axios from 'axios'
const UserProfile = () => {
  const [auth,setAuth]=useAuth();
  const [Name,setName] = useState("");
  const [EmailID,setEmailID] = useState("");
  const [MobileNumber,setMobileNumber] = useState("");
  const [Address,setAddress] = useState();
  const [StreetNumber,setStreetNumber] = useState("");
  const [StreetName,setStreetName] = useState("");
  const [City,setCity] = useState("");
  const [userProvince,setProvince] = useState("");
  const [Pincode,setPincode] = useState("");
  const [allProvinces, setAllProvinces] = useState([])
  useEffect(()=>{
    if(auth?.token){
      console.log(auth)
      setName(auth?.user.Name);
      setEmailID(auth?.user.EmailID);
      setMobileNumber(auth?.user.MobileNumber);
      setAddress(auth?.user.Address);
      setStreetNumber(auth?.user.Address?.StreetNumber);
      setStreetName(auth?.user.Address?.StreetName);
      setCity(auth?.user.Address?.City);
      setProvince(auth?.user.Address?.Province);
      setPincode(auth?.user.Address?.Pincode);
      setAllProvinces(Provinces);
    }
  },[auth?.token])

  const handleUpdate = async(e) =>{
    e.preventDefault();
    try{
      console.log(Name, MobileNumber, Address)
      const {data} = await axios.put("/api/v1/auth/profile",{Name, MobileNumber, Address})
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth, user: data?.updatedUser})
        let localStorageData = localStorage.getItem("auth")
        localStorageData = JSON.parse(localStorageData)
        localStorageData.user = data?.updatedUser
        localStorage.setItem("auth",JSON.stringify(localStorageData))
        console.log(auth)
        toast.success(data?.message)
      }
    }
    catch(error){
      console.log(error);
      toast.error("Something went wrong!!")
    }
  }
  return (
    <Layout title="User Profile">
        <div className='container-fluid m-3 p-3'>
          <div className='row me-0'>
            <div className='col-md-2'><UserMenu /></div>
            <div className='col-md-10'>
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label htmlFor="InputName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="InputName" value={Name} onChange={(e)=>{setName(e.target.value)}} />
                </div>
                <div className="mb-3">
                  <label htmlFor="InputEmail" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" value={EmailID} onChange={(e)=>{setEmailID(e.target.value)}} disabled/>
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="InputMobileNumber" className="form-label">Mobile Number</label>
                  <input type="text" className="form-control" id="InputMobileNumber" value={MobileNumber} onChange={(e)=>{setMobileNumber(e.target.value)}} />
                </div>
                <div className="mb-3">
                  <label htmlFor="InputStreetNumber" className="form-label">Street Number</label>
                  <input type="text" className="form-control" id="InputStreetNumber" value={StreetNumber} onChange={(e)=>{setStreetNumber(e.target.value); setAddress({StreetNumber:e.target.value,StreetName,City,userProvince,Pincode})}} />
                </div>
                <div className="mb-3">
                  <label htmlFor="InputStreetName" className="form-label">Street Name</label>
                  <input type="text" className="form-control" id="InputStreetNumber" value={StreetName} onChange={(e)=>{setStreetName(e.target.value); setAddress({StreetNumber,StreetName:e.target.value,City,userProvince,Pincode})}} />
                </div>
                <div className="mb-3">
                  <label htmlFor="InputCity" className="form-label">City</label>
                  <input type="text" className="form-control" id="InputCity" value={City} onChange={(e)=>{setCity(e.target.value); setAddress({StreetNumber,StreetName,City:e.target.value,userProvince,Pincode})}} />
                </div>
                <div className='mb-3'>
                  <label htmlFor='InputProvince' className='form-label'>Province</label>
                  <Select className="form-control mb-3" id='InputProvince' value={{ label: userProvince, value: userProvince }} onChange={(e)=>{setProvince(e.value); setAddress({StreetNumber,StreetName,City,userProvince:e.value,Pincode})}} aria-label="Default select example" options={
                    allProvinces.map((province)=>({
                      label: province.name,
                      value: province.name
                    }))
                  } />
                </div>
                <div className="mb-3">
                  <label htmlFor="InputPincode" className="form-label">Pincode</label>
                  <input type="text" className="form-control" id="InputPincode" value={Pincode} onChange={(e)=>{setPincode(e.target.value); setAddress({StreetNumber,StreetName,City,userProvince,Pincode:e.target.value})}} />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
              </form>

            </div>
          </div>
        </div>
    </Layout>
  )
}

export default UserProfile