import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import Checkout from './Mercadopago/Checkout';
import axios from 'axios';
import { getOrder } from '../Redux/Actions/actions';
import NavBarEmpty from './NavBarEmpty'
import { useLocation } from 'react-router-dom';



export default function PurchasePage() {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.home.pending);
  const direccion = useSelector((state) => state.home.user.directions); 
  const resPutOrder = useSelector((state) => state.home.resPutOrder);
  const resDelete = useSelector((state) => state.home.deleted)
  const location = useLocation()
  const [data,setData] = useState("")
  
  useEffect(() => {
    dispatch(getOrder({ status: "pending" }));
  }, [resDelete,location.search]);




  useEffect(() => {
    if(product.length){
      const item = product.map(e => ({title:e.title,amount: e.orders[0].amount,price: e.price}))
    const idToken = axios.post("http://localhost:3001/mercadopago/pay", item)
      .then((data) => {
        console.log(data)
        setData(data.data);
      })
      .catch((err) => console.error(err));
    }
  }, [product]);
  

    return (
        <>
        <NavBarEmpty />
        {data &&
        <Checkout data={data} products={product}/>}
        <Footer/>
        </>
    );
}