import React, { useEffect, useState } from 'react'
import { Checkbox,Radio, Select } from 'antd';

import axios from 'axios';
import toast from 'react-hot-toast';
const {Option}=Select

const UpdateComplaint = ({afterUpdatingValues,complaintDetails,onRefresh}) => {

  
  const [id,setID]=useState(complaintDetails.id);
  const [assignedTechnician,setAssignedTechnician] = useState(complaintDetails.technicianId);
  const [technicians,setTechnicians] = useState([])
  const [status,setStatus] = useState("")
  const [updatedTypeofService, setUpdatedTypeofService] = useState(null);
  const [totalPayment,setTotalPayment] = useState(complaintDetails.totalPayment);
  const updateValues = async() => {
    try{
      const updateValues = await axios.put(`/api/v1/repairRequests/updateRepairRequest/${id}`,{TechnicianID: assignedTechnician || "", TypeOfService: updatedTypeofService, Status: status, priceCharged: totalPayment})
      if(updateValues?.data.success){
        toast.success(updateValues?.data.message)
        onRefresh();
      }
      afterUpdatingValues(false)
    }
    catch(error){
      toast.error("Something went wrong")
    }
  }

  const deleteComplaint = async() => {
    try{
      const deleteData = await axios.delete(`/api/v1/repairRequests/deleteRepairRequest/${id}`)
      if(deleteData?.data.success){
        toast.success(deleteData?.data.message)
        onRefresh();
      }
      afterUpdatingValues(false)
    }
    catch(error){
      toast.error("Something went wrong")
    }
  }

  const showAllTechnicians = async(req,res) => {
    const {data} = await axios.get("/api/v1/auth/getAllTechnicians")
    setTechnicians(data.users);
  }

  const handleRadioChange = (e) => {
    setUpdatedTypeofService(e.target.value);
  };
  
 
  useEffect(()=>{
    showAllTechnicians()
  },[])

  return (
    <>
      <label className='h6 text-center mb-4'>Update Complaint</label><br />
      <div className='text-start'>
        <div className='mb-3'>
          <label className='form-label'>Complaint Id</label>
          <input type='text' className='form-control' value={complaintDetails.id} disabled />
        </div>
        <div className="mb-3">
          <Select bordered={false} placeholder="Choose Technician" size='large' showSearch className='form-select mb-3 w-35' onChange={(value)=>{setAssignedTechnician(value)}}>
            {technicians.map((technician)=>(
              <Option value={technician._id} key={technician._id}>{technician.Name}</Option>
            ))}
          </Select>
        </div>
        <div className='mb-3'>
          <label className='h6'>Type of service</label><br />
          <Radio.Group onChange={handleRadioChange} value={updatedTypeofService}>
            <Radio value="In Person">In Person</Radio>    
            <Radio value="Remote">Remote</Radio>        
          </Radio.Group>
        </div>
        <div className='mb-3'>
          <label className='h6'>Total payment technician is charging</label>
          <input type='text' value = {totalPayment} onChange={(e)=>setTotalPayment(e.target.value)} className='form-control' />
        </div>
        <div className="mb-3">
          <Select bordered={false} placeholder="Status" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setStatus(value)}}>
            <Option value="Complaint filed">Complaint filed</Option>
            <Option value="Technician Assigned">Technician Assigned</Option>
            <Option value="On Hold">On hold</Option>
            <Option value="Technician working on it">Technician working on it</Option>
            <Option value="Problem resolved">Problem resolved</Option>
            <Option value="Cancel repair request">Cancel repair request</Option>
          </Select>
        </div>
        <button className='btn btn-primary' onClick={updateValues}>Update</button>
        <button className='btn btn-danger ms-3' onClick={deleteComplaint}>Delete</button>
      </div>
      
    </>
  )
}

export default UpdateComplaint