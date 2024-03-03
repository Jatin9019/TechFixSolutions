import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Checkbox,Radio } from 'antd';
import { Prices } from '../components/Prices'
const HomePage = () => {
  const [auth] = useAuth()
  const [toggle,setToggle]=useState(false);
  const [newProducts, setNewProducts]= useState([]);
  const [categories, setCategories] = useState([]);

  const getCategories = async() => {
    try{
      const getCategoriesList = await axios.get("/api/v1/productCategory/showProductCategory")
      if(getCategoriesList?.data.success){
        setCategories(getCategoriesList?.data.productCategories);
        console.log(getCategoriesList?.data.productCategories)
      }
    }
    catch(error){
      toast.error("Something went wrong!!")
    }
  }

  const getNewProducts = async() => {
    try{
      const newProductsList = await axios.get("/api/v1/newProducts/showNewProducts");
      if(newProductsList?.data.success){
        setNewProducts(newProductsList?.data.products)
      }
    }
    catch(error){
      toast.error("Something went wrong!!")
    }
  }

  useEffect(()=>{
    getNewProducts();
    getCategories();
  },[])
  return (
    <Layout title="All products">
      <div className='row me-0'>
        <div className='col-md-3 border-black border-end'>
          <label className='h3 text-center mt-3'>Choose Used or New Products</label>
          <div className='d-flex justify-content-center mb-3'>
            <button className='btn btn-success mt-3 text-center' onClick={()=>setToggle(false)}>New Products</button><br />
          </div>
          <div className='d-flex justify-content-center mb-3'>
            <button className='btn btn-success mt-3 text-center' onClick={()=>setToggle(true)}>Used Products</button><br />
          </div>
          <div className='border-black border-top'>
            <div className='d-flex flex-column ms-3'>
              <label className='h3 mt-3'>Filter By Category</label>
              {categories?.map(c=>(
                <Checkbox key={c._id}>{c.Name}</Checkbox>
              ))}
            </div>
          </div>
          <div className='border-black border-top mt-3 mb-3'>
            <div className='d-flex flex-column ms-3'>
              <label className='h3 mt-3'>Filter By Price</label>
              <Radio.Group>
              {Prices?.map(p=>(
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
            </div>
          </div>
        </div>
        <div className='col-md-9 mt-3'>
          {!toggle ? (
            <div>
              <label className='h3 text-center'>New Products</label>
              <div className='d-flex flex-wrap'>
                    {newProducts.map((product)=>(
                        <div className="card m-2" key={product._id} style={{width: '18rem'}}>
                            <img src={`/api/v1/newProducts/product-photo/${product._id}`} className="card-img-top" alt={product.Slug} />
                            <div className="card-body">
                                <h5 className="card-title">{product.Name}</h5>
                                <p className="card-text">{product.Description}</p>
                                <label className='form-label'>Price - ${product.Price}</label><br />
                                <label className='form-label'>Quantity - {product.Quantity}</label><br />
                                <button className="btn btn-primary" >More Details</button>
                                <button className="btn btn-secondary m-1">Add to cart</button>
                            </div>
                        </div>
                    ))}
                    </div>
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