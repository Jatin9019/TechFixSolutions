import React from 'react'
import { NavLink } from 'react-router-dom'
const AdminMenu = () => {
  return (
    <div className='text-center'>
        <div className='list-group'>
            <h4>Admin Dashboard</h4>
                <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Add Complaint Category</NavLink>
                <NavLink to="/dashboard/fileComplaint" className="list-group-item list-group-item-action">All Complaints</NavLink>
                <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">All Users</NavLink>
                <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">All Technicians</NavLink>
                <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">All Orders</NavLink>
        </div>
    </div>
  )
}

export default AdminMenu