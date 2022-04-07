import React from 'react';
import NavbarAdmin from './NavbarAdmin';
import NavBarEmpty from './NavBarEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getBulkAdmin, putBulkOrders, changeOrderStatus } from '../Redux/Actions/actions';
import { BiSearchAlt } from 'react-icons/bi';
var dayjs = require('dayjs');

export default function ListOfOrders() {
  const dispatch = useDispatch();
  const allOrdersBulk = useSelector((state) => state.home.bulkAdmin);
  const [detail, setDetail] = useState(1);
  const [input, setInput] = useState({ status: '', userId: '' });

  useEffect(() => {
    dispatch(getBulkAdmin());
  }, []);
  function handelChangeStatus(e) {
    console.log(e);
    dispatch(getBulkAdmin({ status: input.status }));
  }

  function handelChangeId() {
    dispatch(getBulkAdmin({ userId: input.userId }));
  }
  function handelChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function mostrarDetallado(e) {
    const detalle = document.getElementById('detail' + e.target.id);
    if (detalle) {
      if (detail === e.target.id) {
        setDetail(false);
        detalle.classList.add('hidden');
      } else {
        setDetail(e.target.id);
        detalle.classList.remove('hidden');
      }
    }
  }

  function CambiarStatus(e, idOrder) {
    dispatch(putBulkOrders({ status: e.target.value }, idOrder));
  }

  function CambiarStatusOrder(e, idOrder) {
    dispatch(changeOrderStatus({ status: e.target.value, id: idOrder }));
  }
  return (
    <>
      <NavBarEmpty />
      <div className="flex flex-col sm:flex-row">
        <NavbarAdmin />
        <div className="justify-center w-11/12 h-screen">
          <h1 className="text-center text-white bg-primary-500 font-lora  m-5">
            All Orders
          </h1>
          <div className="flex">
            <input
              type="number"
              name="userId"
              value={input.userId}
              onChange={(e) => handelChange(e)}
              placeholder="id User..."
              className="m-3 border-primary-200 border-2 rounded-lg"
            ></input>
            <BiSearchAlt
              onClick={(e) => handelChangeId(e)}
              className="items-center my-3 w-8 h-6 cursor-pointer"
            />
          </div>
          <div className="flex">
            <input
              type="text"
              name="status"
              value={input.status}
              placeholder="Status..."
              onChange={(e) => handelChange(e)}
              className="m-3 border-primary-200 border-2 rounded-lg "
            ></input>
            <BiSearchAlt
              onClick={(e) => handelChangeStatus(e)}
              className="items-center my-3 w-8 h-6 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex m-2 justify-between bg-secondary-200 border-white border-t rounded-lg ">
              <div className="w-36 m-2 text-center">Date</div>
              <div className="w-20 m-2 text-center">Status</div>
              <div className="w-20 m-2 text-center">Price</div>
              <div className="w-20 m-2 text-center">ID User</div>
            </div>
            {allOrdersBulk &&
              allOrdersBulk.length > 0 &&
              allOrdersBulk.map((b, i) => {
                if (b.orders) {
                  return (
                    <>
                      <div
                        id={i}
                        onClick={(e) => mostrarDetallado(e)}
                        className="flex m-2 justify-between bg-secondary-100 border-white border-t rounded-lg hover:bg-primary-300"
                      >
                        <div className="w-36 m-2 text-center">
                          {dayjs(b.orders[0].serverPurchaseDate).format('MMMM D, YYYY')}
                        </div>

                        <div className="w-20 m-2 text-center">
                          <select
                            className="form-select form-select-lg mb-3"
                            onChange={(e) => CambiarStatusOrder(e, b.orders[0].id)}
                            arial-label=".form-select-lg example"
                          >
                            <option>{b.orders[0].status} </option>
                            <option name="status" value="delivered">
                              Delivered{' '}
                            </option>
                            <option name="status" value="finished">
                              Finished{' '}
                            </option>
                            <option name="status" value="preparing">
                              Preparing{' '}
                            </option>
                            <option name="status" value="onDelivery">
                              On Delivery{' '}
                            </option>
                            <option name="status" value="cancelled">
                              Cancelled
                            </option>
                          </select>
                        </div>

                        <div className="w-20 m-2 text-center">${b.price.toFixed(2)}</div>
                        <div className="w-20 m-2 text-center">{b.orders[0].userId}</div>
                      </div>

                      <div id={'detail' + i} className="hidden">
                        <div className="flex mx-3 mb-3 justify-between bg-white rounded-lg hover:bg-primary-300">
                          <div className="w-96 m-1 mx-3">{b.title}</div>
                          <div className="w-40 m-1 mx-3">${b.price.toFixed(2)}</div>
                        </div>{' '}
                      </div>
                    </>
                  );
                }

                if (!b.orders) {
                  return (
                    <>
                      <div
                        onClick={(e) => mostrarDetallado(e)}
                        id={i}
                        className="flex m-2 justify-between bg-secondary-100 border-white border-t rounded-lg hover:bg-primary-300"
                      >
                        <div className="w-36 m-2 text-center">
                          {dayjs(b.serverPurchaseDate).format('MMMM D, YYYY')}
                        </div>

                        <div className="w-20 m-2 text-center">
                          <select
                            className="form-select form-select-lg mb-3"
                            onChange={(e) => CambiarStatus(e, b.id)}
                            arial-label=".form-select-lg example"
                          >
                            <option>{b.status} </option>
                            <option name="status" value="delivered">
                              Delivered{' '}
                            </option>
                            <option name="status" value="finished">
                              Finished{' '}
                            </option>
                            <option name="status" value="preparing">
                              Preparing{' '}
                            </option>
                            <option name="status" value="onDelivery">
                              On Delivery{' '}
                            </option>
                            <option name="status" value="cancelled">
                              Cancelled
                            </option>
                          </select>
                        </div>
                        <div className="w-20 m-2 text-center">${b.combinedPrice}</div>
                        <div className="w-20 m-2 text-center"> {b.userId}</div>
                      </div>
                      <div id={'detail' + i} className="hidden">
                        {b.products.map((g) => {
                          return (
                            <div>
                              <div className="flex mx-3 mb-3 justify-between bg-white rounded-lg hover:bg-primary-300">
                                <div className="w-96 m-1 mx-3">{g.title}</div>
                                <div className="w-40 m-1 mx-3">${g.price}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                }
              })}
          </div>
          <div className="justify-center w-11/12">
            {/* <div className="ml-8 flex justify-center ">
            <table className="lg:table border-separate content-center font-lora text-sm  w-11/12 border-separated mx-2 hidden md:block">
              <thead>
                <tr>
                  <th className="p-3 rounded-lg bg-primary-200  border-2 border-white  ">Order</th>
                  <th className="p-3 rounded-lg bg-primary-200  border-2 border-white ">Product</th>
                  <th className="p-3 rounded-lg bg-primary-200  border-2 border-white ">Estado</th>
                  <th className="p-3 rounded-lg bg-primary-200  border-2 border-white ">Saldo</th>
                  <th className="p-3 rounded-lg bg-primary-200  border-2 border-white ">Data</th>

                </tr>
              </thead>
              <tbody>
                    <tr>
                    
                        
                         
                      </tr>
                    
              </tbody>
            </table>
          </div> */}
          </div>
          {/* condicion */}
        </div>
      </div>
    </>
  );
}
