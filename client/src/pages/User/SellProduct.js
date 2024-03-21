import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { Select, Radio } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth'
const {Option}=Select

const SellProduct = () => {
  const [Name,setName] = useState("")
  const [Description,setDescription] = useState("")
  const [Price,setPrice] = useState("")
  const [TentativePurchaseDate,setTentativePurchaseDate] = useState("")
  const [WarrentyExpiryDate,setWarrentyExpiryDate] = useState("")
  const [Photo,setPhoto]=useState("")
  const [categories, setCategories]=useState([])
  const [Category,setCategory]=useState("")
  const [conditions,setConditions] = useState([])
  const [warrentyStatus,setWarrentyStatus] = useState(false)
  const [condition,setCondition] = useState("")
  const [auth,setAuth] = useAuth()
  const navigate = useNavigate()
    useEffect(()=>{
        getCategories()
        getConditions()
    },[])

    const getCategories = async() => {
        try{
            const {data} = await axios.get("/api/v1/productCategory/showProductCategory")
            if(data?.success){
                setCategories(data?.productCategories);                
            }
        }
        catch(error){
            console.log(error);
            toast.error("Something went wrong")
        }
    }

    const getConditions = async() => {
      try{
          const {data} = await axios.get("/api/v1/usedProductConditions/showUsedProductCondition")
          if(data?.success){
              setConditions(data?.usedProductConditionCategories);                
          }
      }
      catch(error){
          console.log(error);
          toast.error("Something went wrong")
      }
  }

  const handleCreate = async(e) => {
    e.preventDefault()
    try{
      const productData = new FormData()
      productData.append("Name",Name)
      productData.append("Description",Description)
      productData.append("Photo",Photo)
      productData.append("Price",Price)
      productData.append("Condition",condition)
      productData.append("ProductCategory",Category)
      productData.append("TentativePurchaseDate",TentativePurchaseDate)
      productData.append("Seller",auth?.user.id)
      productData.append("WarrentyStatus",warrentyStatus)
      productData.append("WarrentyExpiryDate",WarrentyExpiryDate)
      const {data} = await axios.post("/api/v1/usedProducts/postUsedProduct",productData)
      console.log(data)
      if(data.success){
        toast.success("Product saved successfully");
        navigate("/dashboard/user/manageListedProducts");
    }
    }
    catch(error){
      toast.error("Something went wrong!!"+error)
    }
  }

  const handleRadioChange = async(e) => {
    setWarrentyStatus(e.target.value)
  }

  return (
    <Layout title="Sell Used Products">
        <div className='container-fluid m-3 p-3'>
            <div className='row me-0'>
                <div className='col-md-2'><UserMenu /></div>
                <div className='col-md-10'>
                  <h3 className='mb-3'>Sell your product</h3>
                  <div className='m-1 w-75'>
                    <div className='mb-3'>
                      <label className='form-label' for='Name'>
                        Enter Name
                      </label>
                      <input type='text' id='Name' className='form-control' placeholder='Name of product' value={Name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label' for='Description'>
                        Enter Description
                      </label>
                      <input type='text' id='Description' value={Description} onChange={(e)=>setDescription(e.target.value)} placeholder='Enter complete Description' className='form-control' />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label' for='Price'>
                        Enter Sale Price
                      </label>
                      <input type='text' value={Price} id='Price' onChange={(e)=>setPrice(e.target.value)} placeholder='$' className='form-control' />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label' for='TentativePurchaseDate'>
                        Enter Tentative purchase date
                      </label>
                      <input type='date' id='TentativePurchaseDate' value={TentativePurchaseDate} onChange={(e)=>setTentativePurchaseDate(e.target.value)} placeholder='Enter a tentative product date' className='form-control' />
                    </div>
                    <label for="category" className='form-label'>Select Category</label>
                    <Select bordered={false}
                      id='category'
                      placeholder="Choose One"
                      size='large' 
                      showSearch 
                      className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
                        {categories?.map(c=>(
                          <Option key={c._id}>{c.Name}</Option>
                        ))}
                    </Select>
                    <div className='mb-3'>
                      <label className='btn btn-outline-secondary col-md-12'>
                        {Photo ? Photo.name : "Upload Photo"} 
                        <input type='file' name='photo' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                      </label>
                    </div>
                    <div className='mb-3'>
                      {Photo && (
                      <div className='text-center'>
                        <img src={URL.createObjectURL(Photo)} alt='product_photo' height={'200px'} className='img img-responsive'/>
                      </div>
                      )}
                    </div>
                    <label for="condition" className='form-label'>Select condition of product</label>
                    <Select bordered={false}
                      placeholder="Chose One"
                      id='condition'
                      size='large' 
                      showSearch 
                      className='form-select mb-3' onChange={(value)=>{setCondition(value)}}>
                        {conditions?.map(c=>(
                          <Option key={c._id}>{c.Name}</Option>
                        ))}
                    </Select>
                    <div className='mb-3'>
                        <label className='form-label h6' for='warrentyStatus'>Choose Warrenty Status</label><br />
                        <Radio.Group onChange={handleRadioChange} id='warrentyStatus' value={warrentyStatus}>
                            <Radio value="true">True</Radio><br />  
                            <Radio value="false">False</Radio>        
                        </Radio.Group>
                    </div>
                    {warrentyStatus == "true" ? (
                      <div className='mb-3'>
                        <label for="Warrenty Expiry Date" className='form-label'>Warrenty Expiry Date</label>
                        <input type='date' id='Warrenty Expiry Date' value={WarrentyExpiryDate} onChange={(e)=>setWarrentyExpiryDate(e.target.value)} placeholder='Enter a tentative product date' className='form-control' />
                      </div>
                    ) : (
                      <div className='mb-3'></div>
                    ) }
                    
                    <div className='mb-3'>
                      <button className='btn btn-primary' onClick={handleCreate}>List Product</button>
                    </div>
                  </div>
  
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default SellProduct