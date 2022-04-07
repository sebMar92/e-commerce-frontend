import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCaretDown } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { clearTokensUser, deleteToken } from "../Redux/Actions/actions";

export default function NavbarAdmin({ name, idUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [on, setOn] = useState(false);
  function onClickitems() {
    document.getElementById("items").classList.toggle("hidden");
  }

  const handleLogOut = () => {
    setOn(false);
    const refresh = window.localStorage.getItem("refresh");
    dispatch(clearTokensUser());
    dispatch(deleteToken(refresh));
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sm:w-[13rem] bg-primary-700 dark:bg-slate-800">
      <div>
        <div className="dark:bg-slate-800 bg-primary-500 text-decoration-line: no-underline font-medium text-lg px-25 py-5 text-slate-900 flex justify-center rounded">
          <p className="font-semibold tracking-tight text-center text-gray-900 dark:text-white text-base m-3">
            Welcome, Admin {name}!
          </p>
        </div>
        {on && (
          <div className="flex absolute -mt-40 w-full h-full justify-center items-center font-lora ">
            <div className="p-2  w-80 h-50 bg-white rounded-lg ring-1 ">
              <div className=" mx-3 flex justify-between border-b border-gray-200 p-2">
                <h3>Confirmation</h3>
                <button
                  onClick={() => setOn(false)}
                  className=" text-gray-500  px-1 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#f84d4dd1] hover:text-white shadow-lg shadow-primary-200/80"
                >
                  x
                </button>
              </div>
              <br />
              <span className="m-8"> Logout ? </span>
              <br />
              <br />
              <div className="flex justify-evenly m-3">
                <button
                  onClick={() => handleLogOut()}
                  className="bg-primary-600 px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80"
                >
                  Accept
                </button>
                <button
                  onClick={() => setOn(false)}
                  className="bg-primary-600 px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="text-center bg-white sm:hidden dark:bg-slate-400">
          <button
            className="text-primary-600 dark:text-slate-800"
            onClick={onClickitems}
          >
            <AiOutlineCaretDown className="h-2em w-2em" />
          </button>
        </div>

        <div id="items" className="hidden sm:block ">
          <Link to={`/admin`} className="no-underline">
            <div className="m-0.5 bg-primary-300 no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400 dark:text-white dark:hover:bg-slate-400 dark:hover:shadow-slate-600 dark:bg-slate-800 dark:hover:text-slate-900 dark:shadow-slate-900">
              <p className="font-semibold tracking-tight text-gray-900 dark:text-white text-base">
                Statistics
              </p>
            </div>
          </Link>
          <Link
            to={`/admin/products?limit=8&offset=1`}
            className="no-underline"
          >
            <div className="m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400 dark:text-white dark:hover:bg-slate-400 dark:hover:shadow-slate-600 dark:bg-slate-800 dark:hover:text-slate-900 dark:shadow-slate-900">
              <p className="font-semibold tracking-tight text-gray-900 dark:text-white text-base">
                Manage products
              </p>
            </div>
          </Link>
          <Link to={`/admin/create/Product`} className="no-underline">
            <div className="m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400 dark:text-white dark:hover:bg-slate-400 dark:hover:shadow-slate-600 dark:bg-slate-800 dark:hover:text-slate-900 dark:shadow-slate-900">
              <p className="font-semibold tracking-tight text-gray-900 dark:text-white text-base">
                Create products
              </p>
            </div>
          </Link>
          <Link to={`/admin/orders`} className="no-underline">
            <div className="m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400 dark:text-white dark:hover:bg-slate-400 dark:hover:shadow-slate-600 dark:bg-slate-800 dark:hover:text-slate-900 dark:shadow-slate-900">
              <p className="font-semibold tracking-tight text-gray-900 dark:text-white text-base">
                Manage orders
              </p>
            </div>
          </Link>
          <Link to={`/admin/users`} className="no-underline">
            <div className="m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400 dark:text-white dark:hover:bg-slate-400 dark:hover:shadow-slate-600 dark:bg-slate-800 dark:hover:text-slate-900 dark:shadow-slate-900">
              <p className="font-semibold tracking-tight text-gray-900 dark:text-white text-base">
                Users
              </p>
            </div>
          </Link>
          <Link to={`/admin/discounts`} className="no-underline">
            <div className="m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400 dark:text-white dark:hover:bg-slate-400 dark:hover:shadow-slate-600 dark:bg-slate-800 dark:hover:text-slate-900 dark:shadow-slate-900">
              <p className="font-semibold tracking-tight text-gray-900 dark:text-white text-base">
                Manage sales
              </p>
            </div>
          </Link>
          <Link to={`/admin/newsletter`} className="no-underline">
            <div className="m-0.5 bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400 dark:text-white dark:hover:bg-slate-400 dark:hover:shadow-slate-600 dark:bg-slate-800 dark:hover:text-slate-900 dark:shadow-slate-900">
              <p className="justify-center font-semibold tracking-tight text-gray-900 dark:text-white text-base">
                Networks & Newsletter
              </p>
            </div>
          </Link>
          <div onClick={() => setOn(true)}>
            <div className="m-0.5 cursor-pointer bg-primary-300 text-decoration-line: no-underline font-medium text-lg px-1 py-1 text-slate-900 flex justify-center rounded hover:bg-primary-400 dark:text-white dark:hover:bg-slate-400 dark:hover:shadow-slate-600 dark:bg-slate-800 dark:hover:text-slate-900 dark:shadow-slate-900">
              <button className="font-semibold tracking-tight text-gray-900 dark:text-white text-base">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
