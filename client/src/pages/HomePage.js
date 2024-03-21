import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Checkbox,Radio } from 'antd';
import { Prices } from '../components/Prices'
import moment from 'moment';
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
const HomePage = () => {
  const [auth] = useAuth()
  const [cart,setCart] = useCart();
  const [toggle,setToggle]=useState(false);
  const [newProducts, setNewProducts]= useState([]);
  const [usedProducts, setUsedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked,setChecked]=useState([])
  const [radio,setRadio]=useState([])
  const navigate = useNavigate()

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

  const getUsedProducts = async() => {
    try{
      const usedProductsList = await axios.get("/api/v1/usedProducts/showUsedProducts");
      if(usedProductsList?.data.success){
        setUsedProducts(usedProductsList?.data.products)
      }
    }
    catch(error){
      toast.error("Something went wrong!!")
    }
  }

  const handleMoreDetails = async(id,productStatus) => {
    try{
      navigate(`/MoreDetails/${productStatus}/${id}`)
    }
    catch(error){
      toast.error("Something went wrong !!")
    }
  }

  const handleFilters = async(value,id) => {
    let all = [...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter(c=>c!==id)
    }
    setChecked(all)
  }

  const filterProduct = async()=>{
    try{
      const {data} = await axios.post("/api/v1/newProducts/product-filters",{checked,radio})
      setNewProducts(data?.products)
    }
    catch(errror){
      console.log(errror);

    }
  }
  useEffect(()=>{
    console.log(checked)
    console.log(radio)
    if(!checked.length || !radio.length){
      getNewProducts();
      getUsedProducts();
    }
    if(checked.length || radio.length){
      filterProduct();
    }

    getCategories();
  },[checked, radio])
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
                <Checkbox key={c._id} onChange={(e)=>handleFilters(e.target.checked,c._id)}>{c.Name}</Checkbox>
              ))}
            </div>
          </div>
          <div className='border-black border-top mt-3 mb-3'>
            <div className='d-flex flex-column ms-3'>
              <label className='h3 mt-3'>Filter By Price</label>
              <Radio.Group onChange={e=>setRadio(e.target.value)}>
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
                                <button className="btn btn-primary" onClick={()=>handleMoreDetails(product._id,"newProducts")} >More Details</button>
                                <button className="btn btn-secondary m-1" onClick={()=>{
                                  setCart([...cart,product])
                                  localStorage.setItem('cart',JSON.stringify([...cart,product]))
                                  toast.success("Product added to cart")
                                }}>Add to cart</button>
                            </div>
                        </div>
                    ))}
                    </div>
            </div>
          ):(
            <div>
              <label className='h3 text-center'>Used Products</label>
              <div className='d-flex flex-wrap'>
                {usedProducts.map(((product)=>(
                  <div className="card m-2" key={product._id} style={{width: '18rem'}}>
                  <img src={`/api/v1/usedProducts/product-photo/${product._id}`} className="card-img-top" alt={product.Slug} />
                  <div className="card-body">
                      <h5 className="card-title">{product.Name}</h5>
                      <p className="card-text">{product.Description}</p>
                      <label className='form-label'>Condition -{product.Condition.Name}</label><br />
                      <label className='form-label'>Price - ${product.Price}</label><br />
                      <label className='form-label'>Seller - {product.Seller.Name}</label><br />
                      <label className='form-label'>Tentative purchase date - {moment(product.TentativePurchaseDate).format('MMMM Do YYYY')}</label>
                      {product.WarrentyStatus ? (
                        <>
                          <label className='form-label'>Warrenty expiry date - {moment(product.WarrentyExpiryDate).format('MMMM Do YYYY')}</label><br />
                        </>
                      ) : (
                        <>
                          <label className='form-label'>Warrenty status - <span className='text-danger'>Expired</span></label><br />
                        </>
                      ) }
                      <button className="btn btn-primary" onClick={()=>handleMoreDetails(product._id,"usedProducts")} >More Details</button>
                      <button className="btn btn-secondary m-1" onClick={()=>{
                        setCart([...cart,product])
                        localStorage.setItem('cart',JSON.stringify([...cart,product]))
                        toast.success("Product added to cart")
                      }}>Add to cart</button>
                  </div>
              </div>
                )))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default HomePage