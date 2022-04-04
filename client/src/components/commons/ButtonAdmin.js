import React from "react";
import { Link } from "react-router-dom";

//Componente que recibe props , si no recibe ninguna se inicializa con el valor predeterminado seteado en el parametro

export default function ButtonAdmin() {
  return (
    <div>
      <Link
        to="/admin"
        className="text-decoration-line: no-underline text-black"
      >
        <button className="bg-primary-400 px-4 py-2 m-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-primary-500 shadow-lg shadow-black-200/80">
          Panel
        </button>
      </Link>
    </div>
  );
}
