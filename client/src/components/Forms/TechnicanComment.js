import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'

const TechnicanComment = ({repairID,afterUpdatingValues}) => {
    const updateValues = async() => {
        try{ 
          afterUpdatingValues(false)
        }
        catch(error){
          toast.error("Something went wrong")
        }
      }
  return (
    <div>
        <div>{repairID}</div>
        <button className='btn btn-primary' onClick={updateValues}>Update</button>
    </div>
    
  )
}

export default TechnicanComment