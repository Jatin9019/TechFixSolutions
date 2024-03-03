import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import TechnicanComment from '../../components/Forms/TechnicanComment';

const WorkToDo = () => {
  const [auth,setAuth]=useAuth();
  const [allpendingWorks,setAllpendingWorks] = useState([]);
  const [updateValues,setUpdateValues] = useState(false)
  const [repairID,setRepairID] = useState("")
  const handleUpdate = async(id) => {
    setRepairID(id)
    setUpdateValues(true)
  }

  const getIndividualWork = async() => {
    try{
      const data = await axios.get(`/api/v1/repairRequests/showTechnicianWork/${auth?.user.id}`)
      setAllpendingWorks(data?.data.individualRepairRequest)
      console.log(allpendingWorks)
    }catch(error){
      toast.error("Something went wrong!!")
    }
  }

  const toggleChildComponent = (boolValue) => {
    setUpdateValues(boolValue);
    toast.success("send to admin for final checking")
  }

  useEffect(()=>{
    getIndividualWork()
  },[auth?.token])

  return (
    <Layout title="Work to do">
        <div className='container-fluid m-3 p-3'>
            <div className='row me-0'>
                <div className='col-md-2'><UserMenu /></div>
                <div className='col-md-10'>
                    <label className='h3'>Work to Do</label>
                    <br />
                    <div className='border shadow'>
                      <table className='table text-center'>
                        <thead>
                          <tr>
                            <th>Status</th>
                            <th>Username</th>
                            <th>Mobile Number</th>
                            <th>Issue</th>
                            <th>Product</th>
                            <th>Comment</th>
                            <th>Type of service needed</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allpendingWorks.map((pendingwork)=>(
                            <tr key={pendingwork._id}>
                              <td>{(pendingwork.Status == "Problem resoved") ? <span className='custom-success-badge'>Done</span>:<span className='custom-pending-badge'>Pending</span> }</td>
                              <td>{pendingwork.UserDetails.Name}</td>
                              <td>{pendingwork.UserDetails.MobileNumber}</td>
                              <td>{pendingwork.ServiceDetails.ServiceName}</td>
                              <td>{pendingwork.ProblemProductDetails.Name}</td>
                              <td>{pendingwork.Comment}</td>
                              <td>{pendingwork.TypeOfServiceNeeded}</td>
                              <td>
                                {(pendingwork.Status == "Problem resoved") ? "": 
                                <>
                                  <button className='btn btn-success mb-1' onClick={()=>handleUpdate(pendingwork._id)}>Task completed</button>
                                  <button className='btn btn-warning'>Report to admin for verify</button>
                                </> }
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {!updateValues ? 
                    <div></div>
                    :
                    <TechnicanComment repairID= {repairID} afterUpdatingValues={toggleChildComponent}/>}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default WorkToDo