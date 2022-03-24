import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../Redux/Actions/actions';

export default function LoginProfileButton() {
  const [logedIn, setLogedIn] = useState(false);
  const token = window.localStorage.getItem('access');
  const user = useSelector((state) => state.home.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo(token));
    if (token) {
      setLogedIn(true);
      console.log(user);
    } else {
      setLogedIn(false);
    }
  }, [token]);
  return (
    <div>
      {logedIn ? (
        //bg-primary-300
        <div className="group">
          <button className=" rounded-t-full w-10/10 px-2 py-2 group ">
            <img
              src={user.profilePicture}
              className="relative object-cover w-8 h-8 rounded-full z-20"
            ></img>
            <ul className="absolute -ml-5 mt-1 rounded-lg  z-10 text-sm">
              <li className="rounded-t-md bg-secondary-100 p-1.5 z-10 translate-y-10  invisible group-hover:translate-x-0 group-hover:translate-y-0 group-hover:visible duration-100 ease-in">
                Profile
              </li>
              <li className="rounded-b-md bg-secondary-100 p-1.5 z-10 translate-y-16  invisible group-hover:translate-x-0 group-hover:translate-y-0 group-hover:visible duration-150 ease-in">
                Logout
              </li>
            </ul>
          </button>
        </div>
      ) : (
        <button className="bg-primary-700 font-small rounded-lg text-sm w-12/14 px-2 py-2 ">
          Log in / Sign up
        </button>
      )}
    </div>
  );
}
