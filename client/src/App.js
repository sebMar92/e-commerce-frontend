import React from 'react';
import { Route, Routes } from 'react-router-dom';

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

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';

function App() {
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
          <Route path="/admin" element={<AdminProfile />} />
          <Route path="/admin/create/Product" element={<CreateProducts />} />
          <Route path="/admin/edit/:idProduct" element={<EditProducts />} />
          <Route path="/admin/orders" element={<ListOfOrders />} />
          <Route path="/admin/order/:idOrder" element={<OrderDetails />} />
          <Route path="/admin/products" element={<AdminAllProducts />} />
          <Route path="/admin/users" element={<AdminAllUsers />} />
          <Route path="/admin/newsletter" element={<NewsletterEdit />} />
          <Route path="/admin/discounts" element={<ActivateDiscounts />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
