import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAdmin } from "../../Redux/Actions/actions";

export default function ModalConfirm({ estado, cambiarEstado, id }) {
  const dispatch = useDispatch();

  function deleteUser(id) {
    dispatch(deleteUserAdmin(id));
    cambiarEstado(false);
  }

  return (
    <>
      {estado && (
        <div className="flex absolute  w-full h-full justify-center items-center font-lora ">
          <div className="p-2  w-80 h-50 bg-white rounded-lg ring-1 ">
            <div className=" mx-3 flex justify-between border-b border-gray-200 p-2">
              <h3>Confirmation</h3>
              <button
                onClick={() => cambiarEstado(false)}
                className=" text-gray-500  px-1 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#f84d4dd1] hover:text-white shadow-lg shadow-primary-200/80"
              >
                x
              </button>
            </div>
            <br />
            <span className="m-8"> Delete the User ? </span>
            <br />
            <br />
            <div className="flex justify-evenly m-3">
              <button
                onClick={() => deleteUser(id)}
                className="bg-primary-600 px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80"
              >
                Accept
              </button>
              <button
                onClick={() => cambiarEstado(false)}
                className="bg-primary-600 px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
