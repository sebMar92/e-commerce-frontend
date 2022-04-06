import React from 'react';
import NavbarAdmin from './NavbarAdmin';
import NavBarEmpty from './NavBarEmpty';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { getBulkAdmin } from '../Redux/Actions/actions';


export default function ListOfOrders() {
  const dispatch = useDispatch();
 const allOrdersBulk =useSelector((state)=> state.home.bulkAdmin)

console.log(allOrdersBulk)

useEffect(()=> {
  dispatch (getBulkAdmin())

},[])

    return (
        <>
        <NavBarEmpty/>
        <div className='flex flex-col sm:flex-row font-lora'>
            <NavbarAdmin />
            <div className='justify-center w-11/12 h-screen'>
                <h1 className="text-center text-white bg-primary-500 font-lora m-5">All Orders
                </h1>
<div>
{allOrdersBulk && allOrdersBulk.length>0 && allOrdersBulk.map((b)=> {
                     
                      if(!b.title ) {
                       return(
                        b.products.map((s)=> {
                          return(
                            <div className='flex  bg-secondary-100 border-white border-t rounded-lg'>
                          <div className='w-10 '>{b.id}</div>
                          <div className='w-36 '>{s.title}</div>
                          <div className='w-20 '>{b.status}</div>

                          </div>
                          )
                        })
                       ) 
                      }
                      <div>{b.id}</div>
                      if(b.title){
                        return(
                          <div className='flex  bg-secondary-100 border-white border-t rounded-lg'>
                        <div className='w-10 ' >{b.id}</div>
                        <div className='w-36 '>{b.title}</div>
                        <div className='w-20 '>{b.orders[0].status}</div>
                        </div>
                        )}
                      
                    
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