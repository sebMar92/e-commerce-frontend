import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  clearProductDetail,
  getProductByID,
  postOrder,
  deleteOrder,
  getOrder,
  getProducts,
  clearCarrusel,
  getUserInfo,
} from '../../Redux/Actions/actions';
import Slider from './Slider';
import CreateComment from '../Comment/CreateComment';
import { FaBan } from 'react-icons/fa';
import {
  AiOutlineCheckCircle,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from 'react-icons/ai';
import { MdLocalShipping } from 'react-icons/md';
import { GoPrimitiveDot } from 'react-icons/go';
import ButtonBuy from '../commons/ButtonBuy';
import { ToastContainer, toast } from 'react-toastify';
import RealtedCarousel from '../commons/RelatedCarousel';
import ModalPortal from '../../components/modals/GuestModal';

export default function ProductDetails() {
  const admin = useSelector((state) => state.home.admin);
  const render = useSelector((state) => state.home.resAmountOrder);
  const product = useSelector((state) => state.productID.product);
  const wishListDB = useSelector((state) => state.home.inWishList);
  const cartDB = useSelector((state) => state.home.inCart);
  const token = window.localStorage.getItem('access');
  const [cartLS, setCartLS] = useState(window.localStorage.getItem('inCart'));
  const [wishListLS, setWishListLS] = useState(window.localStorage.getItem('inWishList'));
  const postOrders = useSelector((state) => state.home.postOrders);
  const deleted = useSelector((state) => state.home.deleted);
  const user = useSelector((state) => state.home.user);
  const [selectedWishList, setSelectedWishList] = useState(false);
  const [selectedCart, setSelectedCart] = useState(false);
  const globalSales = useSelector((state) => state.home.globalSales);
  const [saleON, setSaleON] = useState(false);
  const [saleSelected, setSaleSelected] = useState(undefined);
  const [productSales, setProductSales] = useState(undefined);

  const dispatch = useDispatch();
  let { idProduct } = useParams();
  const navigate = useNavigate();

  const productsCategory = useSelector((state) => state.home.products);

  const [data, setData] = useState([]);
  useEffect(() => {
    product.categories &&
      product.categories.map((e) => {
        dispatch(getProducts(`?categoryId=${e.id}&limit=100`));
      });
    dispatch(getUserInfo());
  }, [product.categories]);

  useEffect(() => {
    setData([...new Set([...data, ...productsCategory])]);
  }, [productsCategory]);

  useEffect(() => {
    setData([]);
    dispatch(clearCarrusel());
  }, [idProduct]);

  useEffect(() => {
    dispatch(getOrder({ status: 'inCart' }));
    dispatch(getOrder({ status: 'inWishList' }));
    dispatch(getProductByID(idProduct));
    return () => {
      dispatch(clearProductDetail());
    };
  }, [dispatch, idProduct, render]);

  useEffect(() => {
    if (token) {
      const foundProductInCart =
        !cartDB || cartDB.error == "couldn't find orders" || cartDB.length === 0
          ? null
          : cartDB.find((el) => el.id == idProduct);
      const foundProductInWishList =
        !wishListDB ||
        wishListDB.error == "couldn't find orders" ||
        wishListDB.length === 0
          ? null
          : wishListDB.find((el) => el.id == idProduct);
      if (foundProductInCart) {
        setSelectedCart(true);
      } else {
        setSelectedCart(false);
      }
      if (foundProductInWishList) {
        setSelectedWishList(true);
      } else {
        setSelectedWishList(false);
      }
    } else {
      setCartLS(window.localStorage.getItem('inCart'));
      setWishListLS(window.localStorage.getItem('inWishList'));

      const parsedCart = JSON.parse(cartLS);
      const parsedWishList = JSON.parse(wishListLS);

      const foundProductInCart =
        cartLS === null || cartLS.length === 0
          ? null
          : parsedCart && parsedCart.find((el) => el.productId == idProduct);

      const foundProductInWishList =
        wishListLS === null || wishListLS.length === 0
          ? null
          : parsedWishList && parsedWishList.find((el) => el.productId == idProduct);

      if (foundProductInCart) {
        setSelectedCart(true);
      } else {
        setSelectedCart(false);
      }
      if (foundProductInWishList) {
        setSelectedWishList(true);
      } else {
        setSelectedWishList(false);
      }
    }
  }, [cartLS, wishListLS, deleted, postOrders, wishListDB, cartDB]);

  useEffect(() => {
    const date = Date();
    const days = [];

    const pSales = product && product.sales && product.sales.productSales;
    setProductSales(pSales);
    const categorySales = product && product.sales && product.sales.categorySales;
    
    if (productSales && productSales.length > 0) {
      
      for (const sale of productSales) {
        if (sale.day.slice(0, 3) == date.slice(0, 3).toLowerCase() || sale.day == 'all') {
          days.push(sale);
        }
      }
    }
    if (categorySales && categorySales.length > 0) {
      for (const sale of categorySales) {
        if (sale.day.slice(0, 3) == date.slice(0, 3).toLowerCase() || sale.day == 'all') {
          days.push(sale);
        }
      }
    }
    if (globalSales && globalSales.length > 0) {
      
      for (const sale of globalSales) {
        
        if (sale.day.slice(0, 3) == date.slice(0, 3).toLowerCase() || sale.day == 'all') {
          
          days.push(sale);
        }
      }
    }
    if (days && days.length > 0) {
      const sortedDays = days.sort((a, b) => b.percentage - a.percentage);
      
      setSaleSelected(sortedDays[0]);
      setSaleON(true);
    }
  }, [product, globalSales]);

  const desc = product.description && product.description.split('. ');
  const description = desc && desc.slice(0, -1);

  const [stateModal, setStateModal] = useState(false);
  function handleCloseModal(e) {
    e.preventDefault();
    setStateModal(!stateModal);
  }

  const notifyDetail3 = (e) => {
    const localStorageAccess = window.localStorage.getItem('access');
    const localStorageRefresh = window.localStorage.getItem('refresh');
    if (!localStorageAccess && !localStorageRefresh) {
      handleCloseModal(e);
    }

    toast.success('Purchase successfull !', {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    navigate('/purchase');
    if (localStorageAccess && localStorageRefresh) {
      toast.success('Purchase successfull !', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  function addCartDetails() {
    if (!selectedCart) {
      dispatch(
        postOrder({
          status: 'inCart',
          amount: 1,
          productId: idProduct,
          title: product.title,
          shippingCost: product.shippingCost,
          stock: product.stock,
          description: product.description,
          images: product.images,
          price: product.price,
          id: idProduct,
        })
      );
      toast.success('Added to the cart !', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      const foundProductInCart = cartDB && cartDB.find((el) => el.id == idProduct);
      const orderId = foundProductInCart && foundProductInCart.orders[0].id;
      dispatch(deleteOrder(orderId, idProduct, 'inCart'));
      toast.error('Removed from cart !', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
    setCartLS(window.localStorage.getItem('inCart'));
  }

  function addFavDetails() {
    if (!selectedWishList) {
      dispatch(
        postOrder({
          status: 'inWishList',
          amount: 1,
          productId: idProduct,
          title: product.title,
          shippingCost: product.shippingCost,
          stock: product.stock,
          description: product.description,
          images: product.images,
          price: product.price,
          id: idProduct,
        })
      );
      toast.success('Added to the wishlist !', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      const foundProductInWL = wishListDB && wishListDB.find((el) => el.id == idProduct);
      const orderId = foundProductInWL && foundProductInWL.orders[0].id;
      dispatch(deleteOrder(orderId, idProduct, 'inWishList'));
      toast.error('Removed from wishlist !', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
    setWishListLS(window.localStorage.getItem('inWishList'));
  }

  return (
    <>
      {stateModal ? <ModalPortal onClose={(e) => handleCloseModal(e)} /> : null}
      <NavBar />
      <ToastContainer autoClose={2000} />
      <div className="bg-secondary-100">
        <div id="main_container" className="w-11/12 pb-2 mx-auto 2xl:w-9/12">
          <div id="category_container" className="pt-2 flex gap-2">
            {product.categories &&
              product.categories.map((el) => (
                <div className="w-fit h-fit p-2 bg-white rounded shadow-sm text-xs 2xl:text-sm">
                  {el.name}
                </div>
              ))}
          </div>

          <div id="slider_container" className="p-2 bg-white rounded shadow-sm my-2">
            <div className="p-2 border-b-[1px] border-b-primary-300 font-lora flex flex-col-reverse justify-center items-center gap-2 md:flex-row md:justify-between">
              <h2 className="2xl:text-2xl text-3xl">{product && product.title}</h2>
              {saleON &&
                ((productSales && productSales.length > 0) ||
                  saleSelected.percentage) && (
                  <div className="border-[2px] border-orange-600 h-fit w-fit p-1 rounded text-base bg-white font-lora font-extrabold md:text-2xl text-orange-600">
                    <p>
                      {saleON &&
                        ((productSales &&
                          productSales.length > 0 &&
                          productSales[0].percentage) ||
                          saleSelected.percentage)}
                      % OFF{' '}
                      {productSales && productSales.length > 0
                        ? productSales[0].productAmount > 0
                          ? `on ${productSales[0].productAmount + 1}º unit`
                          : ''
                        : saleSelected.productAmount > 0
                        ? `on ${saleSelected.productAmount + 1}º unit`
                        : ''}
                    </p>
                  </div>
                )}
            </div>
            <Slider images={product.images} />
          </div>

          <div
            id="description_addCart_container"
            className="flex flex-col w-full gap-6 pt-4 font-lora "
          >
            <div
              id="add_to_cart_container"
              className="w-full bg-white rounded p-2 flex flex-col gap-3 items-center justify-center lg:flex-row "
            >
              <div className="flex gap-2 items-center w-4/5 justify-center text-bold text-primary-700">
                {productSales && productSales.length > 0 ? (
                  productSales[0].productAmount === 0 ? (
                    <div className="flex flex-col lg:flex-row-reverse gap-2 justify-center items-center">
                      <p
                        className={
                          (saleON && saleSelected.percentage
                            ? 'text-xl md:text-3xl text-primary-400 line-through	md:text-xl '
                            : 'text-primary-700 md:text-3xl text-2xl xl:text-2xl 2xl:text-3xl 2xl:font-black') +
                          'font-bold xl:border-b-[1px] xl:border-primary-300'
                        }
                      >
                        ${product.price}
                      </p>
                      {saleON && saleSelected.percentage ? (
                        <p className="font-bold text-primary-700 text-2xl md:text-5xl xl:border-b-[1px] xl:border-primary-300 2xl:font-black">
                          $
                          {(
                            product.price -
                            product.price *
                              ((productSales && productSales.length > 0 &&
                                productSales[0].percentage / 100) ||
                                (saleSelected && saleSelected.percentage) / 100)
                          ).toFixed(2)}
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <p className="text-primary-700 text-xl xl:text-2xl 2xl:text-3xl 2xl:font-black font-bold xl:border-b-[1px] xl:border-primary-300">
                      ${product.price}
                    </p>
                  )
                ) : saleSelected && saleSelected.productAmount === 0 ? (
                  <div className="flex gap-2 flex-col lg:flex-row-reverse gap-2 justify-center items-center ">
                    <p
                      className={
                        (saleON && saleSelected.percentage
                          ? 'text-xl md:text-2xl text-primary-400 line-through '
                          : 'text-primary-700 text-2xl md:text-2xl xl:text-2xl 2xl:text-3xl 2xl:font-black ') +
                        'font-bold xl:border-b-[1px] xl:border-primary-300'
                      }
                    >
                      ${product.price}
                    </p>
                    {saleON && saleSelected.percentage ? (
                      <p className="font-bold text-primary-700 text-2xl md:text-5xl xl:border-b-[1px] xl:border-primary-300 2xl:font-black">
                        $ 
                        {
                          (
                            product.price -
                            product.price *
                              ((productSales && productSales.length > 0 &&
                                productSales[0].percentage / 100) ||
                                (saleSelected && saleSelected.percentage) / 100)
                          ).toFixed(2)}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-primary-700 text-3xl 2xl:text-5xl 2xl:font-black font-bold xl:border-b-[1px] xl:border-primary-300">
                    ${product.price}
                  </p>
                )}
              </div>

              <div className="flex justify-evenly w-full">
                <div className="flex gap-2 text-xl items-center w-full justify-center">
                  <MdLocalShipping className="h-6 w-6" color="#FEBD70" />
                  <span>u$s {product.shippingCost}</span>
                </div>

                {product && product.stock > 1 ? (
                  <div className="flex gap-2 text-xl items-center w-full justify-center">
                    <AiOutlineCheckCircle className="h-6 w-6" color="#FEBD70" />
                    <span>Stock: {product.stock}</span>
                  </div>
                ) : (
                  <div className="flex gap-2 text-xl items-center w-full justify-center">
                    <FaBan className="h-6 w-6 " color="red" />
                    <span>No stock available</span>
                  </div>
                )}
              </div>

              <div className="flex justify-evenly w-full">
                <div className="h-fit p-2 flex">
                  <button
                    onClick={(e) => {
                      addFavDetails();
                    }}
                    className={
                      (selectedWishList ? 'bg-primary-400 ' : 'bg-white ') +
                      'flex items-center justify-center gap-2 rounded no-underline h-fit w-12 bg-white font-bold p-2 border-[1px] border-primary-400 font-lora hover:border-primary-700 hover:text-primary-700 hover:shadow-md active:scale-95'
                    }
                  >
                    <AiOutlineHeart
                      className="h-6 w-6 inline-block"
                      color={selectedWishList ? '#ffffff' : '#FEBD70'}
                    />
                  </button>
                </div>

                <div className="h-fit p-2 flex">
                  <button
                    onClick={() => {
                      addCartDetails();
                    }}
                    className={
                      (selectedCart ? 'bg-primary-400 ' : 'bg-white ') +
                      'flex items-center justify-center gap-2 rounded no-underline h-fit w-12 bg-white font-bold p-2 border-[1px] border-primary-400 font-lora hover:border-primary-700 hover:text-primary-700 hover:shadow-md active:scale-95'
                    }
                  >
                    <AiOutlineShoppingCart
                      className="h-6 w-6 inline-block"
                      color={selectedCart ? '#ffffff' : '#FEBD70'}
                    />
                  </button>
                </div>
              </div>
              {user && user.rol !== 'admin' ? (
                product.stock && product.stock !== 0 ? (
                  <div>
                    <ButtonBuy
                      id={idProduct}
                      status={'pending'}
                      amount={1}
                      text={'Buy'}
                      onClick={(e) => notifyDetail3(e)}
                    />
                  </div>
                ) : (
                  <div>
                    <button className="bg-primary-400 px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 shadow-lg shadow-primary-200/80 dark:hover:text-white dark:hover:bg-slate-900 dark:hover:shadow-slate-600 dark:bg-slate-400 dark:text-slate-900 dark:shadow-slate-900 w-32">
                      No Stock
                    </button>
                  </div>
                )
              ) : (
                <div>
                  <button className="bg-primary-300 px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 shadow-lg shadow-primary-200/80 dark:hover:text-white dark:hover:bg-slate-900 dark:hover:shadow-slate-600 dark:bg-slate-400 dark:text-slate-900 dark:shadow-slate-900 ">
                    Buy
                  </button>
                </div>
              )}
            </div>

            <div
              id="description_container"
              className="p-2 full bg-white rounded flex flex-col "
            >
              <div className="p-2 border-b-[1px] border-primary-300">
                <h2 className="font-lora">Description</h2>
              </div>
              <div className="text-sm pt-2 pl-2 pr-2 flex flex-col gap-2 pb-4 marker:primary-300">
                {description &&
                  description.map((el) => (
                    <div className="flex gap-2 items-start text-base">
                      <div>
                        <GoPrimitiveDot className="w-5 h-5" color="#FEBD70" />
                      </div>
                      <div>
                        <span>{el}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <CreateComment id={idProduct} product={product} />
        </div>
      </div>
      {data && data.length > 3 && (
        <RealtedCarousel categories={product.categories} data={data} />
      )}
      <Footer />
    </>
  );
}