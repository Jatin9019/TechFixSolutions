import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from 'moment'
import { Select } from 'antd'
const {Option}=Select
const AllOrders = () => {
  const [orders,setOrders] = useState([])
  const [status, setStatus]=useState(["Not Process","processing","shipped","delivered","cancel"])

  const [auth,setAuth] = useAuth()



  const handleChange = async(id,value) => {
    const {data} = await axios.put(`/api/v1/orders/order-status/${id}`,{status: value})
    console.log(data)
    if(data?.success){
      toast.success("Status updated successfully")
    }
  }

  const getOrders = async() => {
    try{
      const {data} = await axios.get("/api/v1/orders/all-orders")
      setOrders(data?.orders)
    }
    catch(error){
      toast.error("Something went wrong in getting all orders.")
    }
  }

  useEffect(()=>{
    if(auth?.token) getOrders()
  },[auth?.token])

  return (
    <Layout title="All Orders">
        <div className='container-fluid m-3 p-3'>
            <div className='row me-0'>
                <div className='col-md-2'><AdminMenu /></div>
                <div className='col-md-10'>
                  <h3 className='text-center'>All Orders</h3>
                  {orders?.map((o,i)=>{
                    return(
                      <div className='border shadow' key={o._id}>
                        <table className='table text-center'>
                          <thead>
                            <tr>
                              <th scope='col'>#</th>
                              <th scope='col'>Status</th>
                              <th scope='col'>Buyer</th>
                              <th scope='col'>date</th>
                              <th scope='col'>Payment</th>
                              <th scope='col'>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{i+1}</td>
                              <td>
                                <Select bordered={false} onChange={(value)=>handleChange(o._id,value)} defaultValue={o?.status}>
                                  {status.map((s,i)=>(
                                    <Option key={i} value={s}>{s}</Option>
                                  ))}
                                </Select>
                              </td>
                              <td>{o?.buyer?.Name}</td>
                              <td>{moment(o?.createdAt).fromNow()}</td>
                              <td>{o?.payment.success ? "Success" : "Failed" }</td>
                              <td>{o?.newProducts?.length+o?.usedProducts?.length}</td>
                            </tr>
                          </tbody>
                        </table>
                        {o?.newProducts?.length > 0 ? (
                          <div className='container'>
                            <p className='font-weight-bold'>New Products List</p>
                            {o?.newProducts?.map((p,i)=>(
                              <div className='row mb-2 p-3 card flex-row' key={p._id}>
                                <div className='col-md-4'>
                                  <img src={`/api/v1/newProducts/product-photo/${p._id}`} className="card-img-top" alt={p.Name} height={"100px"} width={"100px"} />
                                </div>
                                <div className='col-md-8'>
                                  <p>{p.Name}</p>
                                  <p>{p.Description.substring(0,30)}</p>
                                  <p>Price : ${p.Price}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (<></>)}
                        {o?.usedProducts?.length > 0 ? (
                          <div className='container'>
                            <p className='font-weight-bold'>Used Products List</p>
                            {o?.usedProducts?.map((p,i)=>(
                              <div className='row mb-2 p-3 card flex-row' key={p._id}>
                                <div className='col-md-4'>
                                  <img src={`/api/v1/usedProducts/product-photo/${p._id}`} className="card-img-top" alt={p.Name} height={"100px"} width={"100px"} />
                                </div>
                                <div className='col-md-8'>
                                  <p>{p.Name}</p>
                                  <p>{p.Description.substring(0,30)}</p>
                                  <p>Price : ${p.Price}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (<></>)}
                        
                      </div>
                    )
                  })}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AllOrders