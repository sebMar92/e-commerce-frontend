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
        <button className="font-semibold border-[1px] border-primary-700 bg-white rounded p-2 font-lora">
          Panel
        </button>
      </Link>
    </div>
  );
}
