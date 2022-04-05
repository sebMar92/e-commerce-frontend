import React,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { putBulkOrders } from '../../Redux/Actions/actions'
import axios from 'axios'


export default function Success() {
  //status, date, purchaseId
  /* useEffect(() => {
    if(resp && resp.Status === "approved"){
      products &&
      products.forEach((e) => {
        const id = e.orders[0].id;
        console.log(id)
        dispatch(
          changeOrderStatus({
            id: id,
            status: "finished",
          })
        )
    })
  }
  }, [resp]) */

  return (
    <Link to={"/"}>Purchase successful, go to home</Link>
  )
}
