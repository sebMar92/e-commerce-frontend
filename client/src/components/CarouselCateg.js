import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getCategories } from "../Redux/Actions/actions";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import CardHome from "./CardHome";

export default function CarouselCateg() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.home.products); //Accedemos a la parte del estado del reducer en particular
  const allCategories = useSelector((state) => state.home.categories);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  

  const [cp, setCp] = useState();


  
  let arr = [];
  for (let i = 0; i < allCategories.length; i++) {
    arr.push({ id: i + 1, name: allCategories[i] });
  }

  useEffect(() => {
    dispatch(getProducts("?limit=100"));
    dispatch(getCategories());
  }, []);

  function randomCategories(array) {
    var categories = [];
    categories = [...array]
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
      .slice(0, 3);
    return categories;
  }

  function prod(allProducts, categ) {
    if (allProducts) {
      var b = [];
      for (let i = 0; i < allProducts.length; i++) {
        for (let j = 0; j < allProducts[i].categories.length; j++) {
          if (allProducts[i].categories[j].id === categ.id) {
            b.push(allProducts[i]);
          }
        }
      }
      return b; //arreglo con todos los productos correspondientes a una categoría
    }
  }

  let result = prod(allProducts,cp)
  const currentProducts = result.slice(indexOfFirstProduct, indexOfLastProduct)
  console.log( "esto es", currentProducts)


  return (
    <div className="max-w-screen-lg m-auto mt-3 sm:mt-5">
      {randomCategories(arr).map((categ) => {
        setCp(categ);
        return (
          <div className="font-lora text-center text-xs sm:text-lg md:text-xl lg:text-2xl font-bold ">
            <h1 className="my-16">{categ.name}</h1>
            <div className="flex">
              <div className="flex items-center" >
            <button
            className="bg-orange-500 text-white p-1.5 rounded-full bg-opacity-30 cursor-pointer hover:bg-opacity-60 transition sm:p-5 text-lg md:p-7 md:text-xl lg:p-7 lg:text-3xl lg:font-bold"
            /* onClick={handlePreviousClick} */
          >
            <AiOutlineLeft />
          </button>
              </div>
              
            <div className="flex">
              

              {prod(currentProducts, cp).map((product) => {
                return (
                  <div>
                    <CardHome
                      key={product.id}
                      id={product.id}
                      image={product.images[0].url}
                      title={product.title}
                      price={product.price}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex items-center" >
            <button
            className="bg-orange-500 text-white p-1.5 rounded-full bg-opacity-30 cursor-pointer hover:bg-opacity-60 transition sm:p-5 text-lg md:p-7 md:text-xl lg:p-7 lg:text-3xl lg:font-bold"
            /* onClick={handlePreviousClick} */
          >
            <AiOutlineRight />
          </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
<br />;
