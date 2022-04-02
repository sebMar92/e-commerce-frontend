import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import Checkout from './Mercadopago/Checkout';
import axios from 'axios';
import { getOrder } from '../Redux/Actions/actions';



export default function PurchasePage() {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.home.pending);
  const direccion = useSelector((state) => state.home.user.directions); 
  const resPutOrder = useSelector((state) => state.home.resPutOrder);
  console.log(product)


  useEffect(() => {
    dispatch(getOrder({ status: "pending" }));
  }, []);


  const [data,setData] = useState("")


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
        <NavBar/>
        {data &&
        <Checkout data={data} products={product}/>}
        <Footer/>
        </>
    );
}


/* [{title:"Producto2",price:12,amount:2},{title:"Producto2",price:12,amount:2}] */