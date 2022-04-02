import React,{useEffect} from "react";
import Preview from "./Preview";


export default function Checkout({ products, data }) {
    useEffect(() => {
      const script = document.createElement("script"); //Crea un elemento html script
      console.log(products)
  
      const attr_data_preference = document.createAttribute("data-preference-id"); //Crea un nodo atribute
      attr_data_preference.value = data.id; //Le asigna como valor el id que devuelve MP
      console.log(data)
   
      //Agrega atributos al elemento script
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttributeNode(attr_data_preference);
      script.class =
        "px-4 py-2 rounded-md shadow-lg shadow-gray-500 hover:shadow-black text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500";
      script.setAttributeNode(attr_data_preference);
  
      //Agrega el script como nodo hijo del elemento form
      document.getElementById("form1").appendChild(script);
      return () => {
        //Este return cumple funcion de componentWillUnmount
        //Elimina el script como nodo hijo del elemento form
        document.getElementById("form1").removeChild(script);
      };
    }, [data]);
  
    return (
      <div className="flex flex-col items-center relative">
        <form id="form1" className="w-fit">
          {products.length && 
            products.map((e) =>{
              console.log(e)
              return <Preview title={e.title}/>
            })}
        </form>
      </div>
    );
  }