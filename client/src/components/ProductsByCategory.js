import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Footer from './Footer/Footer';
import Card from './Card';
import FilterAndOrderComponent from './FilterAndOrden';
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearProductAndCategory,
  getCategories,
  getProducts,
  getOrder
} from '../Redux/Actions/actions';
import { useLocation } from 'react-router-dom';
import useURLqueries from './hooks/useURLqueries';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './Skeletons/Loader';
import NotFound from './utils/pngwing.com.png';
import SkeletonTitle from './Skeletons/SkeletonTitle';

export default function Products() {
  const queryObjects = useURLqueries();
  const dispatch = useDispatch();
  const location = useLocation();
  const search = location.search;
  const allProducts = useSelector((state) => state.home.products);
  const globalSales = useSelector((state) => state.home.globalSales)
  const categories = useSelector((state) => state.home.categories);
  const wishListDB = useSelector((state) => state.home.inWishList);
  const cartDB = useSelector((state) => state.home.inCart)
  const token = window.localStorage.getItem("access")
  const deleted = useSelector((state) => state.home.deleted)
  const postOrders = useSelector((state) => state.home.postOrders)
  const valueTitle = categories[queryObjects.categoryId - 1];
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    dispatch(getProducts(search));
    dispatch(getCategories());
    dispatch(getOrder({ status: "inCart" }))
    dispatch(getOrder({ status: "inWishList" }))
    return () => {
      dispatch(clearProductAndCategory());
      setLoaded(false);
    };
  }, [search]);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
  }, [categories]);

  const notifyCat = () => {
    toast.success('Added to the wishlist !', {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  const notifyCat2 = () => {
    toast.success('Added to the cart !', {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  // product {
  //   sales {
  //     productSales [{
  //       porcentage,
  //       day,
  //       productAmount,
  //       id
  //     }]
  //     categorySales [{
  //       porcentage,
  //       day,
  //       productAmount,
  //       id
  //     }]
  //   }
  // }

  return (
    <>
      <NavBar />
      <ToastContainer />
      <div className="flex flex-col sm:flex-row bg-secondary-100">
        <FilterAndOrderComponent />
        {loaded ?
          <div className="w-full m-auto">
            <div className='w-[90%] p-2 m-auto justify-center items-center flex bg-white rounded shadow-sm mt-2 text-center'>
              <h1 className="font-bold font-lora p-2">
                {valueTitle ? valueTitle.name : ''}
              </h1>
            </div>
            <div className="flex flex-col lg:w-[90%] gap-5 lg:mx-auto mt-4 lg:flex-wrap lg:flex-row justify-center">
              {allProducts.length > 0 ?
                allProducts.map((item) => {
                  return (
                    <Card
                      id={item.id}
                      key={item.id}
                      path={item.id}
                      name={item.title}
                      price={item.price}
                      image={item && item.images && item.images[0].url}
                      images={item.images}
                      description={item.description}
                      shippingCost={item.shippingCost}
                      title={item.title}
                      stock={item.stock}
                      wishListDB={wishListDB}
                      cartDB={cartDB}
                      token={token}
                      deleted={deleted}
                      postOrders={postOrders}
                      categorySales={item.sales.categorySales}
                      productSales={item.sales.productSales}
                      globalSales={globalSales}
                    />
                  );
                })
                :
                <div className="flex flex-col w-80 ml-auto mr-auto">
                  <h1 className="text-center font-lora translate-y-48">No results found</h1>
                  <img src={NotFound} className="my-40"/>
                </div>
              }
            </div>
          </div>
          :
          <>
            <Loader />
          </>}
      </div>
      <Pagination />
      <Footer />
    </>
  );
}
