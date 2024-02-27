import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'

const HomePage = () => {
  const [auth] = useAuth()
  const [toggle,setToggle]=useState(false);
  return (
    <Layout title="All products">
      <div className='row mt-3'>
        <div className='col-md-3 border-black border-end'>
          <label className='h3 text-center'>Choose Used or New Products</label>
          <div className='d-flex justify-content-center mb-3'>
            <button className='btn btn-success mt-3 text-center' onClick={()=>setToggle(false)}>New Products</button><br />
          </div>
          <div className='d-flex justify-content-center mb-3'>
            <button className='btn btn-success mt-3 text-center' onClick={()=>setToggle(true)}>Used Products</button><br />
          </div>
        </div>
        <div className='col-md-9'>
          {!toggle ? (
            <div>
              <label className='h3 text-center'>New Products</label>
            </div>
          ):(
            <div>
              <label className='h3 text-center'>Used Products</label>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default HomePage