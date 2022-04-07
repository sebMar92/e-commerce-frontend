import React, { useEffect, useState } from "react";
import { postOrder } from "../../Redux/Actions/actions";
import { useDispatch } from "react-redux";
import ModalPortal from "../../components/modals/GuestModal"

//Componente que recibe props , si no recibe ninguna se inicializa con el valor predeterminado seteado en el parametro

export default function ButtonBuy({
  text = "Buy now",
  id,
  status,
  amount,
  onClick,
}) {
  const dispatch = useDispatch();

  const [stateModal, setStateModal] = useState(false)


  function handleBuyProduct(e) {
    e.preventDefault()
    const localStorageAccess = window.localStorage.getItem("access")
    const localStorageRefresh = window.localStorage.getItem("refresh")
    if (localStorageRefresh && localStorageAccess) {
      dispatch(
        postOrder({
          status: status,
          amount: amount,
          productId: id,
        })
      );
    } else {
      setStateModal(!stateModal)
    }
  }
  return (
    <div> {stateModal ? <ModalPortal onClose={(e) => handleBuyProduct(e)} /> : null}

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