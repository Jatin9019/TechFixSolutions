import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Dashboard = () => {
  return (
    <Layout title="User Dashboard">
        <div className='container-fuid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'><UserMenu /></div>
                <div className='col-md-9'></div>
            </div>
        </div>
    </Layout>
  )
}

export default Dashboard