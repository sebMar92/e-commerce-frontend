import React, { useEffect, useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import NavBarEmpty from "./NavBarEmpty";
import { useDispatch, useSelector } from "react-redux";
import { getUsersInfo, deleteUserInfo } from "../Redux/Actions/actions";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

export default function AdminAllUsers() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.home.users);

  useEffect(() => {
    dispatch(getUsersInfo());
  }, [dispatch]);

  function deleteUser(e) {
     var answer = window.confirm("Delete the User?");
    if (answer == true) {
      dispatch(deleteUserInfo(e));
    } else {
      alert("no se elimino");
    }
  }


  return (
    <>
      <NavBarEmpty />
      <div className="flex flex-col sm:flex-row ">
        <NavbarAdmin />

        <div className="justify-center w-11/12 font-lora ">
          <h1 className="text-center  font-lora  m-5">User </h1>
          <div className="flex justify-center rounded-lg overflow-auto shadow ">
            <table className="xl:table border-separate content-center font-lora text-sm  w-11/12 border-separated mx-2 hidden md:block">
              <thead>
                <tr>
                  <th className="p-3  rounded-lg border-2 bg-primary-300 border-primary-500  ">ID</th>
                  <th className="p-3  rounded-lg border-2 bg-primary-300 border-primary-500 ">First Name</th>
                  <th className="p-3  rounded-lg border-2 bg-primary-300 border-primary-500 ">Last Name</th>
                  <th className="p-3  rounded-lg border-2 bg-primary-300 border-primary-500 ">Email</th>
                  <th className="p-3  rounded-lg border-2 bg-primary-300 border-primary-500 ">directions</th>
                  <th className="p-3  rounded-lg border-2 bg-primary-300 border-primary-500 ">Rol</th>
                  <th className=" p-3 rounded-lg border-2 bg-primary-300 border-primary-500 ">Options</th>
                </tr>
              </thead>
              <tbody>
                {user &&
                  user.length > 0 &&
                  user.map((u) => {
                    return (
                      <tr>
                        <th
                          className="p-3  border bg-secondary-100 rounded-lg border-gray-400 "
                          scope="row"
                        >
                          {u.id}
                        </th>
                        <td className="p-3  border bg-secondary-100 rounded-lg border-gray-400 ">
                          {u.firstName}
                        </td>
                        <td className="p-3  border bg-secondary-100 rounded-lg border-gray-400 ">
                          {u.lastName}
                        </td>
                        <td className="p-3  border bg-secondary-100 rounded-lg border-gray-400 ">
                          {u.email}
                        </td>
                        <td className="p-3  border bg-secondary-100 rounded-lg border-gray-400 ">
                          {u.directions[0].city}
                        </td>
                        <td className="p-3  border bg-secondary-100 rounded-lg border-gray-400 ">
                          {u.rol}
                        </td>
                        <td className="p-3  border bg-secondary-100 rounded-lg border-gray-400 flex justify-evenly ">
                          <AiFillDelete key={u.id}
                          id={u.id}
                            onClick={(e) => deleteUser(e)}
                            className="m-1 cursor-pointer h-6 w-6 md:h-5 md:w-5"
                            color="#FEBD70"
                          />
                         
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/*  <table className="table">
         < thead >
            <tr className="  bg-primary-100 ">
              <th scope="col ">ID</th>
              <th scope="col ">First Name</th>
              <th scope="col ">Last Name</th>
              <th scope="col ">Email</th>
              <th scope="col ">directions</th>
              <th scope="col ">Rol</th>
              <th scope="col ">Delete</th>
            </tr>
            </thead>
            <tbody>
            {user &&
              user.length > 0 &&
              user.map((u) => {
                return (
                  <tr className="mx-6 py-1 flex flex-wrap  bg-primary-100 ">
                    <th >{u.id}</th>
                    <td >{u.firstName}</td>
                    <td >{u.lastName}</td>
                    <td >{u.email}</td>
                    <td >{u.directions[0].city}</td>
                    <td >{u.rol}</td>
                    <td>
                      {" "}
                      <button className="bg-[#fd1e1e] text-white px-1 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#fd1e1ed7] shadow-lg shadow-primary-200/80">
                        x
                      </button>
                    </td>
                  </tr>
                );
              })}
              </tbody>
          </table> */}
        </div>
        {user &&
          user.length > 0 &&
          user.map((u) => {
            return (
              <div className="p-4 m-2 border font-lora  border-secondary-400 bg-secondary-100 md:hidden rounded-lg w-11/12">
                <p>
                  {" "}
                  <span className="mx-2 w-1/2">{u.id}. </span>
                  <span className=" ">{u.firstName} </span>
                  <span className=" ">{u.lastName} </span>{" "}
                </p>
                <p>
                  <span className=" ">Email: {u.email} </span>{" "}
                </p>
                <p>
                  <span className=" ">Direction: {u.directions[0].city} </span>
                </p>
                <p>
                  {" "}
                  <span className="mx-3 bg-primary-100 rounded-lg px-2 ">
                    {u.rol}{" "}
                  </span>{" "}
                </p>
                <p className="flex  ">
                  <AiFillDelete
                   key={u.id}
                   id={u.id}
                    onClick={(e) => deleteUser(e)}
                    className="m-1  h-6 w-6 md:h-5 md:w-5"
                    color="#FEBD70"
                  />
                  
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
}
