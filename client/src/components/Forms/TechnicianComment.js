import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const TechnicianComment = ({repairID,price,afterUpdatingValues,onRefresh}) => {
    const [additionalPrice,setAdditionalPrice]= useState(0);
    const [commmentOfTechnician,setTechnicianComment] = useState("");

    const updateValues = async() => {
        try{
            const totalPrice = parseFloat(parseFloat(price)+parseFloat(additionalPrice))
            const updateValues = await axios.put(`/api/v1/repairRequests/updateRepairRequest/${repairID}`,{priceCharged: totalPrice,commentOfTechnician: commmentOfTechnician})
          if(updateValues?.data.success){
            toast.success(updateValues?.data.message)
          }
            afterUpdatingValues(false)
        }
        catch(error){
          toast.error("Something went wrong")
        }
    }

    const completeTask = async() => {
      try{
        const totalPrice = parseFloat(parseFloat(price)+parseFloat(additionalPrice))
        const updateValues = await axios.put(`/api/v1/repairRequests/updateRepairRequest/${repairID}`,{Status:"Work completed by technician",priceCharged: totalPrice,commentOfTechnician:commmentOfTechnician})
      if(updateValues?.data.success){
        toast.success(updateValues?.data.message)
      }
      onRefresh();
      afterUpdatingValues(false)
    }
    catch(error){
      toast.error("Something went wrong")
    }
    }

  return (
    <div>
        <div className='mb-3 mt-3'>
            <label className='form-label'>Payment charged</label>
            <input type='text' className='form-control' value={price} disabled />
        </div>
        <div className='mb-3 mt-3'>
            <label className='form-label'>Additional Payment (If applicable)</label>
            <input type='Number' className='form-control' value={additionalPrice} onChange={(e)=>setAdditionalPrice(e.target.value)} />
        </div>
        <div className='mb-3 mt-3'>
            <label className='form-label'>Comment</label>
            <input type='text' className='form-control' value={commmentOfTechnician} onChange={(e)=>setTechnicianComment(e.target.value)}/>
        </div>
        <button className='btn btn-warning' onClick={updateValues}>Update Admin</button>
        <button className='btn btn-success ms-2' onClick={completeTask}>Complete Task</button>

    </div>
    
  )
}

export default TechnicianComment