import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'

const UserMenu = () => {
  const [auth, setAuth] = useAuth()
  useEffect(()=>{
    console.log(auth)
  },[])
  return (
    <>
        <div className='text-center'>
            <div className="list-group">
                {auth?.user.isTechnician ? (
                  <>
                    <h4>Technician Dashboard</h4>
                    <NavLink to="/dashboard/user/userProfile" className="list-group-item list-group-item-action">Profile</NavLink>
                    <NavLink to="/dashboard/user/workToDo" className="list-group-item list-group-item-action">Work To Do</NavLink>
                  </>
                ) : (
                  <>
                    <h4>Dashboard</h4>
                    <NavLink to="/dashboard/user/userProfile" className="list-group-item list-group-item-action">Profile</NavLink>
                    <NavLink to="/dashboard/user/fileComplaint" className="list-group-item list-group-item-action">File a complaint</NavLink>
                    <NavLink to="/dashboard/user/sellProducts" className="list-group-item list-group-item-action">Sell Product</NavLink>
                    <NavLink to="/dashboard/user/myOrders" className="list-group-item list-group-item-action">My Orders</NavLink>
                    <NavLink to="/dashboard/user/myComplaints" className="list-group-item list-group-item-action">My Complaints</NavLink>
                  </>
                )}
            </div>
        </div>
    </>

    
  )
}

export default UserMenu