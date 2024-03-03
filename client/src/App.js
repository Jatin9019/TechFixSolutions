import './App.css';
import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import ForgetPassword from './pages/Auth/ForgetPassword';
import FileComplaint from './pages/User/FileComplaint';
import Private from './components/Routes/Private';
import Dashboard from './pages/User/Dashboard';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AllUsers from './pages/Admin/AllUsers';
import AllTechnicians from './pages/Admin/AllTechnicians';
import ServicesCategory from './pages/Admin/ServicesCategory';
import AllComplaints from './pages/Admin/AllComplaints';
import AllOrders from './pages/Admin/AllOrders';
import UserProfile from './pages/User/UserProfile';
import MyOrders from './pages/User/MyOrders';
import MyComplaints from './pages/User/MyComplaints';
import SellProduct from './pages/User/SellProduct';
import AddProduct from './pages/Admin/AddProduct';
import ProductCategory from './pages/Admin/ProductCategory';
import ManageProducts from './pages/Admin/ManageProducts';
import UpdateNewProduct from './pages/Admin/UpdateNewProduct';
import WorkToDo from './pages/Technician/WorkToDo';
import ManageUsedProductConditions from './pages/Admin/ManageUsedProductConditions';
import ManageListedProducts from './pages/User/ManageListedProducts';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/contactus' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/dashboard' element={<Private />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/fileComplaint' element={<FileComplaint />} />
          <Route path='user/userProfile' element={<UserProfile />} />
          <Route path='user/myOrders' element={<MyOrders />} />
          <Route path='user/myComplaints' element={<MyComplaints />} />
          <Route path='user/sellProducts' element={<SellProduct />} />
          <Route path='user/manageListedProducts' element={<ManageListedProducts />} />
          <Route path='user/workToDo' element={<WorkToDo />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/users' element={<AllUsers />} />
          <Route path='admin/technicians' element={<AllTechnicians />} />
          <Route path='admin/services' element={<ServicesCategory />} />
          <Route path='admin/allComplaints' element={<AllComplaints />} />
          <Route path='admin/allOrders' element={<AllOrders />} />
          <Route path='admin/productCategories' element={<ProductCategory />} />
          <Route path='admin/addProduct' element={<AddProduct />} />
          <Route path='admin/manageProducts' element={<ManageProducts />} />
          <Route path='admin/updateNewProduct/:pid' element={<UpdateNewProduct />} />
          <Route path='admin/manageUsedProductsCondition' element={<ManageUsedProductConditions />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </>
  );
}

export default App;
