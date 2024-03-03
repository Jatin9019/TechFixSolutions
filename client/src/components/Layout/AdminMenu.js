import React from 'react'
import { NavLink } from 'react-router-dom'
const AdminMenu = () => {
  return (
    <div className='text-center'>
        <div className='list-group'>
            <h4>Admin Dashboard</h4>
                <NavLink to="/dashboard/admin/services" className="list-group-item list-group-item-action">Complaint Categories</NavLink>
                <NavLink to="/dashboard/admin/allComplaints" className="list-group-item list-group-item-action">All Complaints</NavLink>
                <NavLink to="/dashboard/admin/productCategories" className="list-group-item list-group-item-action">Product Categories</NavLink>
                <NavLink to="/dashboard/admin/addProduct" className="list-group-item list-group-item-action">Add a new product</NavLink>
                <NavLink to="/dashboard/admin/manageProducts" className="list-group-item list-group-item-action">Manage Products</NavLink>
                <NavLink to="/dashboard/admin/manageUsedProductsCondition" className="list-group-item list-group-item-action">Manage used products condition</NavLink>
                <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">All Users</NavLink>
                <NavLink to="/dashboard/admin/technicians" className="list-group-item list-group-item-action">All Technicians</NavLink>
                <NavLink to="/dashboard/admin/allOrders" className="list-group-item list-group-item-action">All Orders</NavLink>
        </div>
    </div>
  )
}

export default AdminMenu