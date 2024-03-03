import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import moment from 'moment'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import UpdateComplaint from '../../components/Forms/UpdateComplaint'

const AllComplaints = () => {
  const [complaints,setComplaints] = useState([])
  const [auth] = useAuth()
  const [updateValues,setUpdate] = useState(false)

  const [complaintDetails,setComplaintDetails] = useState({});
  

  const handleRefresh = () => {
    getComplaints()
  };

  useEffect(()=>{
    if(auth?.token) getComplaints()
  },[auth?.token])

  const getComplaints = async() => {
    try{
      const complaintsData = await axios.get("/api/v1/repairRequests/showRepairReqests")
      setComplaints(complaintsData?.data.repairRequestsData)
    }
    catch(error){
      toast.error("Something went wrong!!")
    }
  }

  const updateComplaint = (id,userName,technicianId,serviceDetails,problemProductDetails,date,comment,typeOfServiceNeeded,status) => {
    setUpdate(true);
    setComplaintDetails({
      "id": id,
      "userName":userName,
      "technicianId":technicianId,
      "serviceDetails":serviceDetails,
      "problemProductDetails":problemProductDetails,
      "date":date,
      "comment":comment,
      "typeOfServiceNeeded":typeOfServiceNeeded,
      "status":status
    })
  }

  const toggleChildComponent = (boolValue) => {
    setUpdate(boolValue);
  }
  
  return (
    <Layout title="All Complaints">
        <div className='container-fluid m-3 p-3'>
            <div className='row me-0'>
                <div className='col-md-2'><AdminMenu /></div>
                <div className='col-md-10'>
                  <label className='h3'>All Complaints</label>
                  <div className='border shadow'>
                        <table className='table text-center'>
                            <thead>
                              <tr>
                                <th scope='col'>UserDetails</th>
                                <th scope='col'>TechnicianDetails</th>
                                <th scope='col'>ServiceDetails</th>
                                <th scope='col'>ProblemProductDetails</th>
                                <th scope='col'>Date</th>
                                <th scope='col'>Comment</th>
                                <th scope='col'>TypeOfServiceNeeded</th>
                                <th scope='col'>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                                {complaints.map((complaint)=>(
                                    <tr key={complaint._id} className='complaintRow' onClick={()=>updateComplaint(complaint._id,complaint.UserDetails.Name,complaint?.TechnicianDetails?._id,complaint.ServiceDetails.ServiceName,complaint.ProblemProductDetails.Name,complaint.Date,complaint.Comment,complaint.TypeOfServiceNeeded,complaint.Status)}>
                                        <td>{complaint.UserDetails.Name}</td>
                                        <td>{complaint?.TechnicianDetails?.Name}</td>
                                        <td>{complaint.ServiceDetails.ServiceName}</td>
                                        <td>{complaint.ProblemProductDetails.Name}</td>
                                        <td>{moment(complaint.createdAt).fromNow()}</td>
                                        <td>{complaint.Comment}</td>
                                        <td>{complaint.TypeOfServiceNeeded}</td>
                                        <td>{complaint.Status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {!updateValues ? (
                          <div></div>
                        ) : (
                          <div className='container-fluid m-1 p-1 mt-3'><UpdateComplaint complaintDetails={complaintDetails} afterUpdatingValues = {toggleChildComponent} onRefresh={handleRefresh} /></div>
                        ) }
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AllComplaints