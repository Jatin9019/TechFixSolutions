import React, { useEffect, useState } from 'react'
import {NavLink,Link} from 'react-router-dom'
import {FcElectronics} from 'react-icons/fc'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast';
import {Badge} from 'antd'
import { useCart } from '../../context/cart';
import axios from 'axios';
const Header = () => {
  const [auth,setAuth]= useAuth()
  const [cart] = useCart()

  const handleLogout = () => {
    setAuth({
        ...auth,
        user: null,
        token: ''
    })
    localStorage.removeItem('auth');
    toast.success("Logout Successfully");
  }

  useEffect(()=>{
    
  },[])

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#"><FcElectronics />TechFix Solutions</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" href="#">Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to={"/services"} data-bs-toggle="dropdown">Services</Link>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to={"/services"}>All Services</Link></li>
                </ul>
              </li>
              {!auth.user?(
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                  </li>
                </>
              ):(
                <>
                <li className='nav-item dropdown'>
                  <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {auth?.user?.Name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li className="nav-item"><NavLink to={`/dashboard/${auth?.user?.Role===1 ? "admin" : "user" }`} className="dropdown-item">Dashboard</NavLink></li>
                    <li className="nav-item"><NavLink to="/login" onClick={handleLogout} className="dropdown-item">Logout</NavLink></li>
                  </ul>
                </li>
                </>
              )}
              <li className='nav-item'>
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link">Cart</NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
 
    </>
  )
}

export default Header