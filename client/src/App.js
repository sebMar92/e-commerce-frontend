import React from "react";
import {Route, Routes} from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import ProductsByCategory from "./components/ProductsByCategory";
import ProductDetails from "./components/ProductDetails";
import PurchasePage from "./components/PurchasePage";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login";
import Historial from "./components/Historial";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import AdminProfile from "./components/AdminProfile";
import CreateEditProducts from "./components/CreateEditProducts";
import ListOfOrders from "./components/ListOfOrders";
import OrderDetails from "./components/OrderDetails";
import AdminAllProducts from "./components/AdminAllProducts";
import AdminAllUsers from "./components/AdminAllUsers";
import NewsletterEdit from "./components/NewsletterEdit";
import ActivateDiscounts from "./components/ActivateDiscounts";


function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/products/:idCategory'
        element={<ProductsByCategory/>}/>
        <Route path='/product/:idProduct'
        element={<ProductDetails/>}/>
        <Route path='/purchase/:idUser'
        element={<PurchasePage/>}/>
        <Route path='/user/:idUser'
        element={<UserProfile/>}/>
        <Route path='/login'
        element={<Login/>}/>
        <Route path='/historial/:idUser'
        element={<Historial/>}/>
        <Route path='/wishlist/:idUser'
        element={<Wishlist/>}/>
        <Route path='/cart/:idUser'
        element={<Cart/>}/>
        <Route path='/admin/:idUser'
        element={<AdminProfile/>}/>
        <Route path='/admin/edit/:idProduct'
        element={<CreateEditProducts/>}/>
        <Route path='/admin/orders'
        element={<ListOfOrders/>}/>
        <Route path='/admin/order/:idOrder'
        element={<OrderDetails/>}/>
        <Route path='/admin/products'
        element={<AdminAllProducts/>}/>
        <Route path='/admin/users'
        element={<AdminAllUsers/>}/>
        <Route path='/admin/newsletter'
        element={<NewsletterEdit/>}/>
        <Route path='/admin/discounts'
        element={<ActivateDiscounts/>}/>
      </Routes>
    </div>
    </>
    );
}

export default App;
