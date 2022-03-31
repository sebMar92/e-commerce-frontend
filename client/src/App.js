import React,{useEffect} from 'react';
import { Route, Routes,Navigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import ProductsByCategory from './components/ProductsByCategory';
import ProductDetails from './components/ProductDetails/ProductDetails';
import PurchasePage from './components/PurchasePage';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Historial from './components/Historial';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
import AdminProfile from './components/AdminProfile';
import CreateProducts from './components/CreateProducts';
import ListOfOrders from './components/ListOfOrders';
import OrderDetails from './components/OrderDetails';
import AdminAllProducts from './components/AdminAllProducts';
import AdminAllUsers from './components/AdminAllUsers';
import NewsletterEdit from './components/NewsletterEdit';
import ActivateDiscounts from './components/ActivateDiscounts';
import EditProducts from './components/EditProducts';
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import {getUserInfo} from './Redux/Actions/actions'
import { full } from '@cloudinary/url-gen/qualifiers/fontHinting';



axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';

function App() {
  const dispatch = useDispatch()
  const fullUser = useSelector((state) => state.home.user)
  

  useEffect(() => {
    dispatch(getUserInfo())
  }, []);


  return (
    <>
      <div className="App">
        <Routes>

                <Route exact path="/" element={<Home />} />
                <Route path="/products" element={<ProductsByCategory />} />
                <Route path="/product/:idProduct" element={<ProductDetails />} />
                <Route path="/purchase" element={<PurchasePage />} />
                <Route path="/user" element={<UserProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/historial" element={<Historial />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />

                {Object.values(fullUser).length && <>
                  <Route path="/admin" element={<ProtectedRoute user={fullUser}> <AdminProfile /> </ProtectedRoute> } />
                  <Route path="/admin/create/Product" element={<ProtectedRoute user={fullUser}> <CreateProducts/> </ProtectedRoute>} />
                  <Route path="/admin/edit/:idProduct" element={<ProtectedRoute user={fullUser}><EditProducts/></ProtectedRoute>} />
                  <Route path="/admin/orders" element={<ProtectedRoute user={fullUser}><ListOfOrders /></ProtectedRoute>} />
                  <Route path="/admin/order/:idOrder" element={<ProtectedRoute user={fullUser}><OrderDetails /></ProtectedRoute>} />
                  <Route path="/admin/products" element={<ProtectedRoute user={fullUser}><AdminAllProducts /></ProtectedRoute>} />
                  <Route path="/admin/users" element={<ProtectedRoute user={fullUser}><AdminAllUsers/></ProtectedRoute>} />
                  <Route path="/admin/newsletter" element={<ProtectedRoute user={fullUser}><NewsletterEdit /></ProtectedRoute>} />
                  <Route path="/admin/discounts" element={<ProtectedRoute user={fullUser}><ActivateDiscounts/></ProtectedRoute>} />
                </>}
        </Routes>
      </div>
    </>
  );
}

export default App;
