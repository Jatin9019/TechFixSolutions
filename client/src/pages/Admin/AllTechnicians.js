import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'
import Layout from '../../components/Layout/Layout';

const AllTechnicians = () => {
    const [users, setUsers] = useState([])
    const [auth] = useAuth()
    useEffect(()=>{
        if(auth?.token) showAllUsers()
    },[auth?.token])

    const showAllUsers = async(req,res) => {
        const {data} = await axios.get("/api/v1/auth/getAllTechnicians")
        setUsers(data.users);
        console.log(data.users);
    }

    const handleDelete = async(userID) => {
        try{
            const {data} = await axios.delete(`/api/v1/auth/user/${userID}`)
            console.log(data);
            if(data?.success){
                toast.success("User Deleted Successfully")
                showAllUsers();
            }else{
                toast.error("User Deletion failed")
            }
        }catch(error){
            console.log(error);
            toast.error("Something went wrong!")
        }
    }

    const checkAssignedTask = async(userID) => {
        alert(`${userID}`)
    }
  return (
    <Layout title="All Registered Users">
        <div className='container-fluid m-3 p-3'>
            <div className='row me-0'>
                <div className='col-md-2'><AdminMenu /></div>
                <div className='col-md-10'>
                    <h1 className='text-center'>All Users</h1>
                    <div className='border shadow'>
                        <table className='table text-center'>
                            <thead>
                                <th scope='col'>Name</th>
                                <th scope='col'>Email ID</th>
                                <th scope='col'>Mobile Number</th>
                                <th scope='col'>Address</th>
                                <th scope='col'>Actions</th>
                            </thead>
                            <tbody>
                                {users.map((user)=>(
                                    <tr key={user._id}>
                                        <td>{user.Name}</td>
                                        <td>{user.EmailID}</td>
                                        <td>{user.MobileNumber}</td>
                                        <td>{user.Address.StreetNumber},{user.Address.StreetName},{user.Address.City},{user.Address.Province},{user.Address.Pincode}</td>
                                        <td><button className='btn btn-danger m-1' onClick={()=>{handleDelete(user?._id)}} disabled={user?.Role ===1}>Delete</button><button className='btn btn-success m-1' onClick={()=>{checkAssignedTask(user?._id)}} disabled={user?.Role ===1}>Check Assigned Task</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AllTechnicians