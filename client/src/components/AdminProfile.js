import React, { useEffect } from "react";
import Footer from "./Footer/Footer";
import NavbarAdmin from "./NavbarAdmin";
import NavBarEmpty from "./NavBarEmpty";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../Redux/Actions/actions";


export default function AdminProfile() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.home.finished);
  const user = useSelector((state) => state.home.userInfo);
  console.log(user);

  useEffect(() => {
    dispatch(getOrder({ status: "finished" }));
  });

  return (
    <>
      <NavBarEmpty />
      <div className="flex flex-col sm:flex-row">
        <NavbarAdmin />
        
          <h1 className="mx-auto text-center"> Admin's profile </h1>
          <div>

          </div>
        </div>
      
    </>
  );
}
