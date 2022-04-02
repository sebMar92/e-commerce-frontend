import React from 'react';
import Footer from './Footer/Footer';
import NavbarAdmin from './NavbarAdmin';
import NavBarEmpty from './NavBarEmpty';
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, deleteOrder } from "../Redux/Actions/actions";

export default function ListOfOrders() {
    const dispatch = useDispatch();
    const AllOrders = useSelector((state) => state.home.inCart);

    return (
        <>
        <NavBarEmpty/>
        <div className='flex flex-col sm:flex-row' >
            <NavbarAdmin />
            <div className='justify-center w-11/12'>
                <h1 className="text-center  font-lora  m-5">All Orders
                </h1>

                <div className="justify-center w-11/12">
          
          <div className="ml-8 flex justify-center ">
            <table className="lg:table border-separate content-center font-lora text-sm  w-11/12 border-separated mx-2 hidden md:block">
              <thead>
                <tr>
                  <th className="p-3  border-2 border-gray-400  ">Order</th>
                  <th className="p-3  border-2 border-gray-400 ">Product</th>
                  <th className="p-3  border-2 border-gray-400 ">Estado</th>
                  <th className="p-3  border-2 border-gray-400 ">Saldo</th>
                  <th className="p-3  border-2 border-gray-400 ">Data</th>
                  <th className="p-3  border-2 border-gray-400 ">Options</th>
               
                </tr>
              </thead>
              <tbody>
                    <tr>
                        <th
                          className="p-3  border border-gray-400 "
                          scope="row"
                        >
                          123546
                        </th>
                        <td className="p-3  border border-gray-400 ">
                          Producto1
                        </td>
                        <td className="p-3  border border-gray-400 ">
                        Estado
                        </td>
                        <td className="p-3  border border-gray-400 ">
                          $ 325.32
                        </td>
                        <td className="p-3  border border-gray-400 ">
                          02/02/2022
                        </td>
                          <td className="p-3  border border-gray-400 flex justify-evenly ">
                          <AiFillDelete 
                            onClick={(e) => deleteOrder(e)}
                            className="m-1 cursor-pointer h-6 w-6 md:h-5 md:w-5"
                            color="#FEBD70"
                          />
                          <FaEdit
                            className="m-1 h-6 w-6 md:h-5 md:w-5 cursor-pointer"
                            color="#FEBD70"
                          />
                        </td>
                      </tr>
                    
              </tbody>
            </table>
          </div>
        </div>
       {/* condicion */}
        
              <div className="p-4 m-2 ml-8 border border-secondary-400 md:hidden rounded-lg w-11/12">
                <p>
                  <span className="mx-2 w-1/2">35468#. </span>
                  <span className=" ">Productos </span>
                  <span className=" ">Estados </span>{" "}
                </p>
                <p>
                  <span className=" ">Data</span>{" "}
                </p>
                <p>
                  <span className=" ">Saldo</span>
                </p>
                
                <p className="flex  ">
                  <AiFillDelete
                    onClick={(e) => deleteOrder(e)}
                    className="m-1  h-6 w-6 md:h-5 md:w-5"
                    color="#FEBD70"
                  />
                  <FaEdit
                    className="m-1 h-6 w-6 md:h-5 md:w-5"
                    color="#FEBD70"
                  />
                </p>
              </div>
           


            </div>
        </div>
        </>
    );
}