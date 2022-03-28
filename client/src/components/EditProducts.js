import React, { useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import NavbarAdmin from './NavbarAdmin';
import Formulario from './CreateProducts';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux"
import { getProductByID, putProductByID } from '../Redux/Actions/actions';

export default function EditProducts() {
const { idProduct} = useParams();
const dispatch = useDispatch();


useEffect(() => {
        dispatch(getProductByID(idProduct));
      }, [dispatch, idProduct]);

      const product = useSelector((state) => state.productID);
      console.log(product)
    return (
            <div>
          {/*  <Formulario/> */}
            </div>
            )
    }