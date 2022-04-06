import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ButtonBuy from "../components/commons/ButtonComplete";
import { useSelector, useDispatch } from "react-redux";
import {
  loginUser,
  postNewUser,
  validateMail,
  postOrder,
} from "../Redux/Actions/actions";
import EmailVerification from "./EmailVerification";
import { border } from "@cloudinary/url-gen/qualifiers/background";

export default function LoginComponent(boolean) {
  const message = useSelector((state) => state.home.userTokens);
  const mailRes = useSelector((state) => state.home.userMail);
  const [password,setPassword] = useState(true)
  const dispatch = useDispatch();
  let navigate = useNavigate();
  console.log(message)

  //Accedo al valor de la respuesta
  const value = Object.entries(boolean)[0][1];
  const [hasAccount, setHasAccount] = useState(value);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //Renderizo un form u otro en base al booleano que recibo por props

  const onSubmit = (data) => {
    if (!hasAccount) {
      dispatch(postNewUser(data));
      setHasAccount(!hasAccount);
    } else {
      dispatch(loginUser(data));
    }
  };

  useEffect(() => {
      if(message.hasOwnProperty("error") && message.error.includes("incorrect") && hasAccount){
        setPassword(true)
      }else{
        setPassword(false)
      }
  }, [message])
  

  useMemo(() => {
    if (message.hasOwnProperty("error")) {
    } else if (message.hasOwnProperty("msg") && hasAccount) {
      navigate("/");
      window.localStorage.setItem("access", message.accessToken);
      window.localStorage.setItem("refresh", message.refreshToken);

      const wishList = window.localStorage.getItem("inWishList");
      const cart = window.localStorage.getItem("inCart");

      if (cart) {
        var parsedCart = JSON.parse(cart);
        parsedCart.map((el) =>
          dispatch(postOrder({ ...el, amount: el.orders[0].amount }))
        );
        window.localStorage.removeItem("inCart");
      }

      if (wishList) {
        var parsedWishList = JSON.parse(wishList);
        parsedWishList.map((el) => dispatch(postOrder(el)));
        window.localStorage.removeItem("inWishList");
      }
    }
  }, [message]);

  return (
    <>
      <div>
        <h1 className="text-5xl flex justify-center mt-12">
          {hasAccount ? "Login" : "Register"}
        </h1>
        <div className="bg-secondary-100 my-20 pt-8 w-10/12 md:max-w-md m-auto md:my-20 md:text-xl flex-col font-lora text-3xl rounded-xl">
          <form
            className="grid grid-cols-1 p-4 sm:p-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            {hasAccount ? null : (
              <input
                className={`h-12 my-2 md:w-5/6 md:m-auto md:mb-2 ${errors.firstName && "border-2 border-red-500"}`}
                placeholder={errors.firstName ? `${errors.firstName.type}` : "Firsname"}
                {...register("firstName", { required: true,pattern: /^[a-zA-Z]+$/})}
              />
            )}
            {hasAccount ? null : (
              <input
                className={`h-12 my-2 md:w-5/6 md:m-auto md:mb-2 ${errors.lastName && "border-2 border-red-500"}`}
                type="text"
                placeholder={errors.lastName ? `${errors.lastName.type}` : "Lastname"}
                {...register("lastName", { required: true })}
              />
            )}
            <input
              className={`h-12 my-2 md:w-5/6 md:m-auto md:mb-2 ${errors.email && "border-2 border-red-500"}`}
              type="email"
              placeholder={errors.email ? `${errors.email.type}` : "Email"}
              {...register("email", { required: true})}
            />
            <input
              className={`h-12 my-2 md:w-5/6 md:m-auto md:mb-2 ${errors.password && "border-2 border-red-500"}`}
              type="password"
              placeholder={errors.password ? `${errors.password.type}` : "Password"}
              {...register("password", { required: true })}
            />
            {password ? <span className="m-auto text-red-500 font-bold py-2">The password is incorrect</span> : null}
            <button
              type="submit"
              className="bg-[#3b82f6] w-6/6 m-auto text-white px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#3491fc] shadow-lg shadow-primary-200/80"
            >
              {hasAccount ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
