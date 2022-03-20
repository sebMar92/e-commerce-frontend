import React, { useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import { useDispatch, useSelector} from "react-redux"
import { useParams, Link } from 'react-router-dom';
import { getProductByID } from '../Redux/Actions/actions';
import { useEffect } from 'react';
import Star from "./utils/star-regular-24.png";
import Cart from "./utils/cart-alt-solid-24.png";


export default function ProductDetails() {

    const dispatch = useDispatch();
    let { idProduct } = useParams();

    useEffect(() => {
        dispatch(getProductByID(idProduct))
    },[dispatch, idProduct])

    const product = useSelector((state) => state.productID.product)

    console.log(product)

    const [index, setIndex] = useState(0)

    const handleIndex = (i) => {
        setIndex(parseInt(i));
    }

    return (
        <>
        <NavBar/>
        <div className='bg-secondary-100'>
            <div className='flex gap-2 flex-row text-xs p-2 sm:w-[640px] sm:mx-auto'>
                {product?.categories?.map(c => <div className='w-max h-max p-2 shadow-sm bg-white rounded-md'>{c.name}</div>)}
                <div className='ml-auto'>
                    <Link to={"/wishlist/:idUser"}> 
                        <img alt="S" src={Star}/>
                    </Link>
                </div>
            </div>
            <div className='grid grid-cols-3 grid-rows-3 p-2 gap-2 max-h-96 sm:w-[640px] sm:mx-auto sm:grid-rows-10 sm:max-h-[640px]'>
                <div className="p-2 shadow-sm rounded-md bg-white col-span-2 row-span-2 w-full h-full sm:col-span-3 sm:row-span-6">
                    <img className='w-full h-full object-contain rounded-md' src={product.images && product.images[index].url} alt="X" />
                </div>
                <div className='row-span-2 grid grid-rows-5 gap-2 sm:flex sm:row-span-1 sm:col-span-3 sm:justify-center sm:row-start-7'>
                    {product.images?.map(img => <div className='shadow-sm bg-white rounded-md p-2 sm:w-24 sm:h-24 hover:cursor-pointer'>
                                                    <img className='w-full h-full object-contain bg-white rounded-md' alt='X' src={img.url} onClick={()=>handleIndex(product.images.indexOf(img))}/>
                                                </div>)}
                </div>
                <div className='col-span-3 row-start-3 bg-white rounded-md shadow-sm h-full text-center p-2 flex items-center justify-center sm:row-start-9 sm:col-span-2 sm:row-span-2 sm:text-left border-[1px] border-primary-500'>
                    
                        <p className='text-sm sm:text-base'>{product.name}</p>
                    
                </div>
                <div className='w-full flex col-span-3 justify-center gap-2 p-2 sm:col-start-3 sm:row-start-9 sm:row-span-2 sm:flex-col sm:col-span-1'>
                    <div className='text-center flex justify-center'>
                        <div className='p-2 w-fit h-fit text-sm font-bold text-primary-500 antialiased bg-white rounded-md shadow-sm'>
                            <span className='antialiased'>U$S {product.price}</span>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='p-2 w-fit h-fit text-sm font-bold text-white antialiased bg-primary-500 rounded-md shadow-sm no-underline hover:bg-primary-700'>
                            <Link className="no-underline" to={"/cart/:idUser"}> 
                                <span className='text-white'>ADD TO CART</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Description*/}
             <div className='p-2 sm:w-[640px] sm:mx-auto'>
                <div className='bg-white rounded-md shadow-sm p-2 flex flex-col gap-2'>
                    <div className='border-b-[1px] border-b-primary-500 pb-2 text-center'>
                        <h2>Description</h2>
                    </div>
                    <p className='text-sm'>{product.description}</p>
                </div>
            </div>
            {/* Comments*/}
            <div className='p-2 sm:w-[640px] sm:mx-auto'>
                <div className='bg-white rounded-md shadow-sm p-2 flex flex-col gap-2 gap-2'>
                    <div className='border-b-[1px] border-b-primary-500 pb-2 text-center'>
                        <h2>Comments</h2>
                    </div>
                    <div className='bg-primary-100 w-full h-24 p-2 rounded-md'><p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente est facilis laboriosam, totam reprehenderit eligendi aspernatur porro optio! Odit, maxime!</p></div>
                    <div className='bg-primary-100 w-full h-24 p-2 rounded-md'><p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere repellendus quas dolore accusamus porro qui!</p></div>
                    <div className='bg-primary-100 w-full h-24 p-2 rounded-md'><p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere repellendus quas dolore accusamus porro qui!</p></div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}