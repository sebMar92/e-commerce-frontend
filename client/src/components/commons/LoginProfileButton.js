import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearTokensUser,
  deleteToken,
  getUserInfo,
} from "../../Redux/Actions/actions";
import { Link, useNavigate } from "react-router-dom";
import ButtonAdmin from "./ButtonAdmin";

export default function LoginProfileButton() {
  const [logedIn, setLogedIn] = useState(false);
  const [on, setOn] = useState(false);
  const token = window.localStorage.getItem("access");
  const user = useSelector((state) => state.home.user);
  const admin = useSelector((state) => state.home.user);
  const [reRender, setReRender] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      dispatch(getUserInfo(token));
      setLogedIn(true);
    } else {
      setLogedIn(false);
    }
  }, [token]);
  const handleLogOut = () => {
    setOn(false);
    const refresh = window.localStorage.getItem("refresh");
    dispatch(clearTokensUser());
    dispatch(deleteToken(refresh));
    window.localStorage.clear();
    setReRender({});
    navigate("/");
  };
  return (
    <div>
      {logedIn ? (
        <div className="group">
          <button className="rounded-t-full w-10/10 p-2 group">
            <div></div>
            <img
              src={user.profilePicture}
              className="relative object-cover w-11 h-11 border-4 rounded-full border-white"
            ></img>
            <ul className="absolute -ml-2 mt-1 rounded-lg text-sm z-20 font-lora">
              <Link to="/user" className="no-underline text-black">
                <li className="rounded-t-md bg-white shadow-md p-1.5 z-10 translate-y-10  invisible group-hover:translate-x-0 group-hover:translate-y-0 group-hover:visible  duration-100 ease-in hover:bg-primary-300 ">
                  Profile
                </li>
              </Link>
              {admin.rol === admin && (
                <Link to="/admin" className="no-underline text-black ">
                  <li className=" bg-white shadow-md p-1.5 z-10 translate-y-10  invisible group-hover:translate-x-0 group-hover:translate-y-0 group-hover:visible  duration-100 ease-in hover:bg-primary-300 ">
                    Panel
                  </li>
                </Link>
              )}
              <button
                onClick={() => setOn(true)}
                className="no-underline text-black"
              >
                <li className="rounded-b-md bg-white shadow-md p-1.5 z-10 translate-y-16  invisible group-hover:translate-x-0 group-hover:translate-y-0 group-hover:visible duration-150 ease-in hover:bg-primary-300">
                  Logout
                </li>
              </button>
            </ul>
          </button>
          {on && (
            <div className="absolute mt-10 -ml-60 justify-center items-center font-lora ">
              <div className="p-2  w-60 h-50 bg-white rounded-lg ring-1 ">
                <div className=" mx-3 flex justify-between border-b border-gray-200 p-2">
                  <h3>Confirmation</h3>
                  <button
                    onClick={() => setOn(false)}
                    className=" text-gray-500 px-1 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#f84d4dd1] hover:text-white shadow-lg shadow-primary-200/80"
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
                    className="bg-primary-600 px-4 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => setOn(false)}
                    className="bg-primary-600 px-4 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-primary-200/80"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login" className="no-underline text-black font-lora ">
          <button className="bg-white border-[1px] shadow-md border-primary-500 rounded font-semibold text-sm w-12/14 px-2 py-2 hover:translate-y-1 hover:rounded-md">
            Log in / Sign up
          </button>
        </Link>
      )}
    </div>
  );
}
