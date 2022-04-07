import React, { useEffect, useState } from 'react';
import Product from './utils/Notebook-Odyssey-2.jpg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getOrder } from '../Redux/Actions/actions';
import { ToastContainer, toast } from 'react-toastify';
import ButtonAddToCart from './commons/ButtonAddToCart';
import ButtonBuy from './commons/ButtonBuy'

export default function CardWishlist({
  id,
  idOrder,
  images,
  title,
  price,
  shippingCost,
  description,
  categorySales,
  productSales,
  globalSales
}) {
  console.log("id Orden",idOrder)
  console.log("id producto",id)
  const dispatch = useDispatch();
  const deleteWishList = (e) => dispatch(deleteOrder(idOrder, id, 'inWishList'));
  const [saleON, setSaleON] = useState(false);
  const [saleSelected, setSaleSelected] = useState(undefined);

  useEffect(() => {
    const date = Date();
    const days = [];
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
    if (days.length > 0) {
      const sortedDays = days.sort((a, b) => b.percentage - a.percentage);
      setSaleSelected(sortedDays[0]);
      setSaleON(true);
    }
  }, [productSales])

  return (
    <div className="flex flex-wrap justify-center mt-5 relative">
      <div className="bg-secondary-100 w-9/12 m-5 rounded-md relative">
        {saleON && (productSales && productSales.length > 0 || saleSelected.percentage) && (
          <div className="absolute inset-x-0 mx-auto -translate-y-6 border-[2px] border-orange-600 h-fit w-fit p-1 rounded text-base bg-white font-lora font-extrabold	 text-orange-600">
            <p>
              {saleON &&
                ((productSales && productSales.length > 0 && productSales[0].percentage) ||
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
        <div className="flex flex-row-reverse">
          <button
            onClick={(e) => deleteWishList(e)}
            className=" text-black items-center  m-2 px-1 rounded-md font-lora font-bold active:translate-y-1 hover:bg-[#fd1e1ed7] hover:text-[#fff]  shadow-lg shadow-primary-200/80"
          >
            x
          </button>
        </div>
        <div>
          <div className=" flex flex-wrap justify-between   rounded-lg w-11/12 h-auto">
            <Link to={'/product/' + id} className="text-inherit no-underline">
              <div className=" flex flex-wrap justify-center">
                <div className=" flex justify-center w-40">
                  <img
                    className=" items-center max-h-28 p-2  m-3 rounded-t-lg"
                    src={images}
                    alt="product image"
                  />
                </div>

                <div>
                  <h5 className="text-lg text-lefth font-thin m-2 ">{title}</h5>
                  <div>
                    <p>{description}</p>

                    {shippingCost == 0 ? (
                      <div>
                        <p className="text-xs text-blue-900 m-3">Free shipping</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs text-blue-900 m-3">{shippingCost}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
            <div>
              <div>
                <br />
                <div>

                  {productSales && productSales.length > 0 ? (
                    productSales[0].productAmount === 0 ? (
                      <div className="flex flex-col justify-center items-center font-lora">
                        <p
                          className={
                            (saleON && saleSelected.percentage
                              ? 'text-sm text-primary-400 line-through	xl:text-xl '
                              : 'text-primary-700 text-xl xl:text-2xl 2xl:text-3xl 2xl:font-black') +
                            'font-bold xl:border-b-[1px] xl:border-primary-300'
                          }
                        >
                          ${price}
                        </p>
                        {saleON && saleSelected.percentage ? (
                          <p className="font-bold text-primary-700 text-xl xl:text-2xl xl:border-b-[1px] xl:border-primary-300 2xl:text-3xl 2xl:font-black">
                            $
                            {(
                              price -
                              price *
                              ((productSales && productSales.length > 0 &&
                                productSales[0].percentage / 100) ||
                                saleSelected.percentage / 100)
                            ).toFixed(2)}
                          </p>
                        ) : null}
                      </div>
                    ) : (
                      <p className="text-primary-700 text-xl xl:text-2xl 2xl:text-3xl 2xl:font-black font-bold xl:border-b-[1px] xl:border-primary-300">
                        ${price}
                      </p>
                    )
                  ) : saleSelected && saleSelected.productAmount === 0 ? (
                    <div className="flex flex-col justify-center items-center font-lora">
                      <p
                        className={
                          (saleON && saleSelected.percentage
                            ? 'text-sm text-primary-400 line-through	xl:text-xl '
                            : 'text-primary-700 text-xl xl:text-2xl 2xl:text-3xl 2xl:font-black') +
                          'font-bold xl:border-b-[1px] xl:border-primary-300'
                        }
                      >
                        ${price}
                      </p>
                      {saleON && saleSelected.percentage ? (
                        <p className="font-bold text-primary-700 text-xl xl:text-2xl xl:border-b-[1px] xl:border-primary-300 2xl:text-3xl 2xl:font-black">
                          $
                          {(
                            price -
                            price *
                            ((productSales && productSales.length > 0 && productSales[0].percentage / 100) ||
                              saleSelected.percentage / 100)
                          ).toFixed(2)}
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <p className="text-primary-700 text-xl xl:text-2xl 2xl:text-3xl 2xl:font-black font-bold xl:border-b-[1px] xl:border-primary-300 font-lora">
                      ${price}
                    </p>
                  )}
                  <div className="flex mt-2 mb-1">
                    <ButtonBuy id={id}
                      status={"pending"}
                      amount={1}
                      text={"Buy"} />
                          
                    <ButtonAddToCart text={"Add to cart"} id={id} status={'inCart'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
