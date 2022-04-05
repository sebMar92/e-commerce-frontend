import React from 'react';
import NavbarAdmin from './NavbarAdmin';
import NavBarEmpty from './NavBarEmpty';
import { useDispatch, useSelector } from "react-redux";



export default function ListOfOrders() {
  const dispatch = useDispatch();
 const allOrdersBulk =useSelector((state)=> state.admin.bulkAdmin)
console.log(allOrdersBulk)
    return (
        <>
        <NavBarEmpty/>
        <div className='flex flex-col sm:flex-row' >
            <NavbarAdmin />
            <div className='justify-center w-11/12'>
                <h1 className="text-center text-white bg-primary-500 font-lora  m-5">All Orders
                </h1>

                <div className="justify-center w-11/12">
          
          <div className="ml-8 flex justify-center ">
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
                        <th
                          className="p-3  border rounded-lg bg-secondary-100 border-white "
                          scope="row"
                        >
                          123546
                        </th>
                        <td className="p-3  border rounded-lg bg-secondary-100 border-white ">
                          Producto1
                        </td>
                        <td className="p-3  border rounded-lg bg-secondary-100 border-white ">
                        Estado
                        </td>
                        <td className="p-3  border rounded-lg bg-secondary-100 border-white ">
                          $ 325.32
                        </td>
                        <td className="p-3  border rounded-lg bg-secondary-100 border-white ">
                          02/02/2022
                        </td>
                         
                      </tr>
                    
              </tbody>
            </table>
          </div>
        </div>
       {/* condicion */}
        
              <div className="p-4 m-2 ml-8 border border-secondary-400 md:hidden rounded-lg w-11/12">
                <p>
                  <span className="mx-2 w-1/2">35468 </span>
                  <p className=" ">Productos </p>
                  <span className=" ">Estados </span>{" "}
                </p>
                <p>
                  <span className=" ">Data</span>{" "}
                </p>
                <p>
                  <span className=" ">Saldo</span>
                </p>
                
                <p className="flex  ">
                  
                </p>
              </div>
           


            </div>
        </div>
        </>
    );
}