import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import { useDispatch, useSelector} from "react-redux"
import { useParams } from 'react-router-dom';
import { getProductByID } from '../Redux/Actions/actions';
import { useEffect } from 'react';


export default function ProductDetails() {

    const dispatch = useDispatch();
    let { idProduct } = useParams();

    useEffect(() => {
        dispatch(getProductByID(idProduct))
    },[dispatch, idProduct])

    const product = useSelector((state) => state.productID.product)

    console.log(product)

    return (
        <>
        <NavBar/>
        <div className='product'>
            <h1>This is product details</h1>

            
        </div>
        <Footer/>
        </>
    );
}