import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const WorkToDo = () => {
  return (
    <Layout title="Work to do">
        <div className='container-fluid m-3 p-3'>
            <div className='row'>
                <div className='col-md-3'><UserMenu /></div>
                <div className='col-md-9'>
                    <label className='h3'>Work to Do</label>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default WorkToDo