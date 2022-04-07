import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { postOrder } from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import ModalPortal from "../../components/modals/GuestModal"
import ModalPortalDirections from "../modals/DirectionsModal"

//Componente que recibe props , si no recibe ninguna se inicializa con el valor predeterminado seteado en el parametro

export default function ButtonBuy({
  text = "Buy now",
  id,
  status,
  amount,
  onClick,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [stateModal, setStateModal] = useState(false)

  const userInfo = useSelector((state) => state.home.user);
  const direccion = userInfo.directions;

  const [stateDirectionsModal, setStateDirectionsModal] = useState(false)
  function handleCloseDirectionsModal(e) {
    e.preventDefault()
    setStateDirectionsModal(!stateDirectionsModal)
  }


  function handleBuyProduct(e) {
    e.preventDefault()
    const localStorageAccess = window.localStorage.getItem("access")
    const localStorageRefresh = window.localStorage.getItem("refresh")
    if (localStorageRefresh && localStorageAccess) {
      if (direccion && direccion.length) {
        console.log("id en boton",id)
        dispatch(
          postOrder({
            status: status,
            amount: amount,
            productId: id,
          })
        );
        navigate("/purchase")
      } else {
        handleCloseDirectionsModal(e)
      }
    } else {
      setStateModal(!stateModal)
    }
  }
  return (
    <div>
      {stateDirectionsModal ? <ModalPortalDirections onClose={(e) => handleCloseDirectionsModal(e)} /> : null}
      {stateModal ? <ModalPortal onClose={(e) => handleBuyProduct(e)} /> : null}

      <div>
        <button
          onClick={(e) => {
            handleBuyProduct(e);
            onClick();
          }}
          className="bg-primary-600 px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80 dark:hover:text-white dark:hover:bg-slate-900 dark:hover:shadow-slate-600 dark:bg-slate-400 dark:text-slate-900 dark:shadow-slate-900"
        >
          {text}
        </button>
      </div>
    </div>
  );
}