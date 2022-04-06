import React, { useEffect, useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import NavBarEmpty from "./NavBarEmpty";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersInfo,
  deleteUserAdmin,
  putUserAdmin,
} from "../Redux/Actions/actions";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { FaUsersCog } from "react-icons/fa";
import ModalConfirm from "./commons/ModalConfirm";

export default function AdminAllUsers() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.home.users);
  const res = useSelector((state) => state.home.userDelete);
  const [estadoModal, setEstadoModal] = useState(false);
  const [userEliminar, setUserEliminar] = useState("");
  useEffect(() => {
    dispatch(getUsersInfo());
  }, [res, user]);

  function editRol(e, idUser) {
    if (e === "user") {
      dispatch(putUserAdmin({ rol: "admin", id: idUser }));
    }
    if (e === "admin") {
      if(idUser !== 1 ){
      dispatch(putUserAdmin({ rol: "user", id: idUser }));
    }
    }
  } 

  return (
    <>
      <NavBarEmpty />
      <div className="flex relative flex-col sm:flex-row font-lora">
        <NavbarAdmin />
        <ModalConfirm
          className="absolute"
          estado={estadoModal}
          cambiarEstado={setEstadoModal}
          id={userEliminar}
        />
        <div className="justify-center w-11/12 font-lora h-screen">
          <h1 className="text-center font-lora m-5">Users </h1>
          <div className="flex justify-center rounded-lg overflow-auto shadow ">
            <table className="md:table border-separate content-center font-lora text-sm  w-11/12 border-separated mx-2 hidden ">
              <thead>
                <tr>
                  <th className="p-3  rounded-lg border-2 bg-primary-300 border-white  ">
                    ID
                  </th>
                  <th className="p-3  rounded-lg border-2 bg-primary-300 border-white ">
                    First Name
                  </th>
                  <th className="p-3  rounded-lg border-2 bg-primary-300 border-white ">
                    Last Name
                  </th>
                  <th className="p-3  rounded-lg border-2 bg-primary-300 border-white ">
                    Email
                  </th>
                  <th className="p-3  rounded-lg border-2 bg-primary-300 border-white ">
                    Rol (admin/User)
                  </th>
                  <th className=" p-3 rounded-lg border-2 bg-primary-300 border-white ">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {user &&
                  user.length > 0 &&
                  user.map((u) => {
                    var name = u.firstName.split(" ")[0].toLowerCase();
                    var apellido= u.lastName.split(" ")[0].toLowerCase();
                    return (
                      
                      <tr>
                        <th
                          className="p-3  border-2 bg-secondary-100 rounded-lg border-white "scope="row" >
                          {u.id}
                        </th>
                        <td className="p-3  border-2 bg-secondary-100 rounded-lg border-white ">
                        
                          {name.charAt(0).toUpperCase()+ name.slice(1)}
                        </td>
                        <td className="p-3  border-2 bg-secondary-100 rounded-lg border-white ">
                          { apellido.charAt(0).toUpperCase()+ apellido.slice(1)}
                        </td>
                        <td className="p-3  border-2 bg-secondary-100 rounded-lg border-white ">
                          {u.email}
                        </td>

                        <td className="p-3  border-2 bg-secondary-100 rounded-lg hover:bg-primary-200 border-white ">
                          <button value={u.rol} className="flex">
                            {u.rol}
                            {u.rol === "admin" ? (
                              <FaUsersCog
                                className="ml-2 cursor-pointer h-5 w-5 "
                                color="#FEBD70"
                                onClick={() => editRol(u.rol, u.id)}
                              />
                            ) : (
                              <AiOutlineUser
                                className="ml-2 cursor-pointer h-5 w-5 "
                                color="#FEBD70"
                                onClick={() => editRol(u.rol, u.id)}
                              />
                            )}
                          </button>
                        </td>
                        <td className="p-3 border-2 bg-secondary-100 rounded-lg border-white flex justify-evenly hover:bg-primary-200 ">
                          <button
                            key={u.id}
                            id={u.id}
                            value={u.id}
                            onClick={() =>
                              setEstadoModal(
                                !estadoModal,
                                setUserEliminar(u.id)
                              )
                            }
                          >
                            <AiFillDelete
                              className="m-1 cursor-pointer h-6 w-6 md:h-5 md:w-5"
                              color="#FEBD70"
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
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
                  {" "}
                  <button value={u.rol} className="flex ">
                    {u.rol}
                    {u.rol === "admin" ? (
                              <FaUsersCog
                                className="ml-2 cursor-pointer h-5 w-5 "
                                color="#FEBD70"
                                onClick={() => editRol(u.rol, u.id)}
                              />
                            ) : (
                              <AiOutlineUser
                                className="ml-2 cursor-pointer h-5 w-5 "
                                color="#FEBD70"
                                onClick={() => editRol(u.rol, u.id)}
                              />
                            )}
                  </button>
                </p>
                <p className="flex  ">
                  <button
                    key={u.id}
                    id={u.id}
                    value={u.id}
                    onClick={() =>
                      setEstadoModal(!estadoModal, setUserEliminar(u.id))
                    }
                  >
                    <AiFillDelete
                      className="m-1 cursor-pointer h-6 w-6 md:h-5 md:w-5"
                      color="#FEBD70"
                    />
                  </button>
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
}
