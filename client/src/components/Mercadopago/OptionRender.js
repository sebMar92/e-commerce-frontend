import React, { useEffect, useState } from 'react';
import Success from './Success';
import Failure from './Failure';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  putBulkOrders,
  getBulkOrders,
  changeOrderStatus,
  getOrder,
} from '../../Redux/Actions/actions';
import axios from 'axios';

export default function OptionRender() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [res, setRes] = useState();
  const [render, setRender] = useState(true);
  const [status, setStatus] = useState(false);
  const bulkOrders = useSelector((state) => state.home.bulkOrders);
  const put = useSelector((state) => state.home.putBulkOrders);
  const product = useSelector((state) => state.home.pending);

  useEffect(() => {
    dispatch(getBulkOrders({ status: 'pending' }));
    dispatch(getOrder({ status: 'pending' }));
    const res = axios.get('/mercadopago/feedback' + location.search).then((res) => {
      setRes(res.data);
    });
  }, []);

  useEffect(() => {
    if (res) {
      let date = Date();
      console.log(date);
      if (res.Status === 'approved') {
        if (bulkOrders.length > 0) {
          let id = bulkOrders[0].id;
          console.log(bulkOrders)
          dispatch(
            putBulkOrders(
              {
                status: 'finished',
                purchaseId: res.Payment,
                date: date,
              },
              id
            )
          );
          setRender(true);
        } else if (product.length > 0) {
          dispatch(
            changeOrderStatus({
              id: product[0].orders[0].id,
              status: 'finished',
              date: date,
              purchaseId: res.Payment,
            })
          );
          setRender(true);
        }
      } else {
        setRender(false);
      }
    }
  }, [res, product, bulkOrders]);

  return <>{render ? <Success /> : <Failure />}</>;
}