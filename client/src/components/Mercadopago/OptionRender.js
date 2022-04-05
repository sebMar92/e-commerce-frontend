import React,{useEffect,useState} from 'react'
import Success from './Success'
import Failure from './Failure'
import { useDispatch,useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { putBulkOrders,getBulkOrders,changeOrderStatus, getOrder } from '../../Redux/Actions/actions'
import axios from 'axios'

export default function OptionRender() {
    const location = useLocation()
    const dispatch = useDispatch()
    const [res,setRes] = useState()
    const [render,setRender] = useState(true)
    const [status,setStatus] = useState(false)
    const bulkOrders = useSelector((state) => state.home.bulkOrders);
    const put = useSelector((state) => state.home.putBulkOrders);
    const product = useSelector((state) => state.home.pending);
  
    console.log(bulkOrders)
    console.log(product)
    useEffect(() =>{
        dispatch(getBulkOrders({status:"pending"}))
        dispatch(getOrder({status:"pending"}))
        const res = axios.get("/mercadopago/feedback" + location.search)
        .then((res) =>{
            setRes(res.data)
        })
    },[])

    useEffect(() => {
        if(res){
            console.log("entre res")
            let date = Date()
        if(res.Status === "approved"){
            console.log("entre aproved")
            if(bulkOrders.length > 0){
                console.log("entre bulk if")
            let id = bulkOrders[0].id
                dispatch(putBulkOrders({
                    status: "finished",
                    purchaseId: res.Payment,
                    date: date,
                },id))
            }else if(product.length > 0){
                console.log("entre product dis")
                dispatch(changeOrderStatus({
                    id: product[0].orders[0].id,
                    status: "finished",
                    date: date,
                    purchaseId: res.Payment
                }))
            }
        }else{
            setRender(false)
        }
    }
    }, [res,status,product,bulkOrders])
    
  

  return (
    <>
    {render ? <Success /> : <Failure />}
    </>
  )
}
