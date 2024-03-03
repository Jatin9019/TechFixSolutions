import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const ManageListedProducts = () => {
  return (
    <Layout title="Manage Listed Products">
        <div className='container-fluid m-3 p-3'>
            <div className='row me-0'>
                <div className='col-md-2'><UserMenu /></div>
                <div className='col-md-10'></div>
            </div>
        </div>
    </Layout>
  )
}

export default ManageListedProducts