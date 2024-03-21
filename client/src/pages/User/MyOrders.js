import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from 'moment'

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [auth,setAuth] = useAuth()
  const getOrders = async() => {
    try{
      const {data} = await axios.get(`/api/v1/orders/showIndividualOrders/${auth?.user.id}`)
      if(data?.success){
        setOrders(data?.individualOrders)
        console.log(orders)
      }
    }
    catch(error){
      toast.error("Error in finding individual orders")
    }
  }
  useEffect(()=>{
    if(auth?.token) getOrders()
  },[auth?.token])
  return (
    <Layout title="User orders">
        <div className='container-fluid m-3 p-3'>
            <div className='row me-0'>
                <div className='col-md-2'><UserMenu /></div>
                <div className='col-md-10'>
                  <h3 className='text-center'>All Orders</h3>
                  <div className='border shadow'>
                    {orders?.map((o,i)=>{
                      return(
                        <div className='border shadow mt-3'>
                          <table className='table'>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Order Status</th>
                                <th>Order date</th>
                                <th>Payment Status</th>
                                <th>Products Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{i+1}</td>
                                <td>{o?.status}</td>
                                <td>{moment(o?.createdAt).fromNow()}</td>
                                <td>{o?.payment.success?"Success":"Failed"}</td>
                                <td>{o?.newProducts.length + o?.usedProducts.length}</td>
                              </tr>
                            </tbody>
                          </table>
                          {o?.newProducts?.length > 0 ? (
                            <div className='container'>
                              <p className='font-weight-bold'>New Products List</p>
                              { o?.newProducts?.map((p)=>(
                                <div className='row  mb-2 p-3 card flex-row' key={p._id}>
                                  <div className='col-md-4'>
                                    <img src={`/api/v1/newProducts/product-photo/${p._id}`} className="card-img-top" alt={p.name} height={"100px"} width={"100px"} />
                                  </div>
                                  <div className='col-md-8'>
                                    <p>{p.Name}</p>
                                    <p>Price : ${p.Price}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (<></>)}
                          {o?.usedProducts?.length > 0 ? (
                            <div className='container'>
                              <p className='font-weight-bold'>Used Products List</p>
                              { o?.usedProducts?.map((p)=>(
                                <div className='row  mb-2 p-3 card flex-row' key={p._id}>
                                  <div className='col-md-4'>
                                    <img src={`/api/v1/usedProducts/product-photo/${p._id}`} className="card-img-top" alt={p.name} height={"100px"} width={"100px"} />
                                  </div>
                                  <div className='col-md-8'>
                                    <p>{p.Name}</p>
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
        </div>
    </Layout>
  )
}

export default MyOrders