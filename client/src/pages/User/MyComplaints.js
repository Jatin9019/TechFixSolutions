import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment'
const MyComplaints = () => {
  const [auth,setAuth] = useAuth()
  const [individualComplaints,setIndividualComplaints] = useState([])
  
  const getIndividualComplaints = async() => {
    try{
      const data = await axios.get(`/api/v1/repairRequests/showRepairReqest/${auth?.user.id}`)
      setIndividualComplaints(data?.data.individualRepairRequest)
      console.log(individualComplaints)
    }catch(error){
      toast.error("Something went wrong!!")
    }
  }

  const handleDelete = async(complaintID) => {
    try{
      const deleteComplaint = await axios.delete(`/api/v1/repairRequests/deleteRepairRequest/${complaintID}`)
      if(deleteComplaint?.data.success){
        toast.success(deleteComplaint?.data.message);
        getIndividualComplaints()
      }else{
        toast.error(deleteComplaint?.data.error);
      }
    }catch(error){
      toast.error("Something went wrong!!")
    }
  }

  useEffect(()=>{
    getIndividualComplaints();
  },[])

  return (
    <Layout title='My Complaints'>
      <div className='container-fluid m-3 p-3'>
        <div className='row me-0'>
          <div className='col-md-2'><UserMenu /></div>
          <div className='col-md-10'>
            <h3 className='text-center mb-3'>All Complaints</h3>
            <div className='border shadow-sm p-3 mb-5 bg-body-tertiary rounded'>
              <table className='table text-center border border-black'>
                <thead className='border  border-black'>
                  <tr>
                    <th>Service details</th>
                    <th>Product which needs service</th>
                    <th>Comment</th>
                    <th>Technician name</th>
                    <th>Type of service needed</th>
                    <th>Current Status</th>
                    <th>Complaint raised date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    individualComplaints.map((complaint)=>(
                      <tr key={complaint._id}>
                        <td>{complaint.ServiceDetails.ServiceName}</td>
                        <td>{complaint.ProblemProductDetails.Name}</td>
                        <td>{complaint.Comment}</td>
                        <td>{(complaint.TechnicianDetails?.Name) ? complaint.TechnicianDetails?.Name: <span className='text-warning'>Needs to be Assigned</span>}</td>
                        <td>{complaint.TypeOfServiceNeeded}</td>
                        <td>{complaint.Status}</td>
                        <td>{moment(complaint.createdAt).fromNow()}</td>
                        <td><button className='btn btn-danger' onClick={()=>handleDelete(complaint._id)}>Delete</button></td>
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

export default MyComplaints