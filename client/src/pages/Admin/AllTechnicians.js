import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'
import Layout from '../../components/Layout/Layout';

const AllTechnicians = () => {
    const [users, setUsers] = useState([])
    const [auth] = useAuth()
    const [showDetails, setShowDetails] = useState(false);
    const [assignedTasks, setAssignedTasks] = useState([]);
    useEffect(()=>{
        if(auth?.token) showAllUsers()
    },[auth?.token])

    const showAllUsers = async(req,res) => {
        const {data} = await axios.get("/api/v1/auth/getAllTechnicians")
        setUsers(data.users);
    }

    const handleDelete = async(userID) => {
        try{
            const {data} = await axios.delete(`/api/v1/auth/user/${userID}`)
            if(data?.success){
                toast.success("User Deleted Successfully")
                showAllUsers();
                const {updateStatus} = await axios.put() 
            }else{
                toast.error("User Deletion failed")
            }
        }catch(error){
            toast.error("Something went wrong!")
        }
    }

    const checkAssignedTask = async(userID) => {
        try{
            //alert(`${userID}`)
            setShowDetails(!showDetails)
            const {data} = await axios.post("/api/v1/repairRequests/checkAssignedTask",{TechnicianDetails: userID, Status: "Technician Assigned"})
            if(data?.success){
                setAssignedTasks(data?.checkAssignedTask)
            }
        }
        catch(error){
            toast.error("Something went wrong !!")
        }
    }
  return (
    <Layout title="All Registered Users">
        <div className='container-fluid m-3 p-3'>
            <div className='row me-0'>
                <div className='col-md-2'><AdminMenu /></div>
                <div className='col-md-10'>
                    <h1 className='text-center'>All Technicians</h1>
                    <div className='border shadow'>
                        <table className='table text-center'>
                            <thead>
                                <tr>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Email ID</th>
                                    <th scope='col'>Mobile Number</th>
                                    <th scope='col'>Address</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user)=>(
                                    <tr key={user._id}>
                                        <td>{user.Name}</td>
                                        <td>{user.EmailID}</td>
                                        <td>{user.MobileNumber}</td>
                                        <td>{user.Address.StreetNumber},{user.Address.StreetName},{user.Address.City},{user.Address.Province},{user.Address.Pincode}</td>
                                        <td><button className='btn btn-danger m-1' onClick={()=>{handleDelete(user?._id)}} disabled={user?.Role ===1}>Delete</button><button className='btn btn-success m-1' onClick={()=>{checkAssignedTask(user?._id)}} disabled={user?.Role ===1}>Show / Hide Assigned Task</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {showDetails ? (
                        <div className='border shadow mt-3'>
                            <table className='table text-center'>
                                <thead>
                                    <tr>
                                        <th scope='col'>ID</th>
                                        <th scope='col'>UserName</th>
                                        <th scope='col'>Complaint</th>
                                        <th scope='col'>Product Details</th>
                                        <th scope='col'>Type of service</th>
                                        <th scope='col'>Technician Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignedTasks.map((task)=>(
                                        <tr key={task._id}>
                                            <td>{task._id}</td>
                                            <td>{task.UserDetails.Name}</td>
                                            <td>{task.ServiceDetails.ServiceName}</td>
                                            <td>{task.ProblemProductDetails.Name}</td>
                                            <td>{task.TypeOfServiceNeeded}</td>
                                            <td>{task.TechnicianComment}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <></>
                    ) }
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AllTechnicians