import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import { getProducts, getSearch } from "../../Redux/Actions/actions";

const hidden = "hidden";

export default function SearchBar(props) {
  const [isOpen, setIsOpen] = useState(true); //controla que aparezca y desaparezca el autocomplete
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const prod = useSelector((state) => state.home.search.products);
  const [cat, setCat] = useState(); //manejo las categorias que vayan coincidiendo
  const allCategories = useSelector((state) => state.home.categories);
  const [stt, setStt] = useState();
  let arr = []; //creo un array para modificar las categorias y agregarles info
  let c = []; //array para ir guardando las categorias que ya matchearon en el input
  for (let i = 0; i < allCategories.length; i++) {
    arr.push({
      id: i + 1,
      title: allCategories[i].toLowerCase(),
      images: [
        {
          url: "https://www.warnborough.online/wp-content/uploads/2017/05/technology-785742_1920.jpg",
        },
      ],
      price: "",
      categ: true,
    });
  }

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value !== "") {
      setStt(value);
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].title.includes(value.toLowerCase())) {
          setCat(arr[i]); //me guardo esa categoria
        }
      }
      dispatch(getSearch(value));
      dispatch(getProducts("?search=" + value));
    }
  };

  cat && c.push(cat); //voy agregando las categorias al arreglo
  let category = c.pop(); //me quedo con la ultima que matcheó porque esta es la que realmente coincide con el valor actual del input

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: `/products?search=${stt}`,
    });
  };

  prod && category && prod.unshift(category);
  let product = [...new Set(prod)]; //para que no se repitan los objetos

  return (
    <form
      onClick={() => setIsOpen(!isOpen)}
      onSubmit={handleSubmit}
      className="flex justify-center font-lora"
    >
      <input
        onChange={(e) => handleInputChange(e)}
        className="bg-secondary-100 p-2 h-8 rounded-md w-10/12 md:w-4/12 focus:outline-none"
        placeholder="Type to search..."
      />
      <button
        type="submit"
        className="text-secondary-200 bg-secondary-100 p-1 ml-1 rounded-md active:translate-y-1"
      >
        <AiOutlineSearch />
      </button>
      <div
        className={`absolute mt-24 bg-secondary-100 m-2 overflow-hidden rounded-lg shadow-lg z-10 overflow-y-auto h-1/2 overflow-x-auto  ${
          isOpen && hidden
        }`}
      >
        {product &&
          product.map((i) => {
            if (i.categ) {
              return (
                <div className="text-black">
                  <Link
                    to={`/products?categId=${i.id}`}
                    className="text-decoration-line: no-underline"
                  >
                    <div className="hover:bg-primary-300 flex gap-4 p-4 justify-center">
                      <img
                        src={i.images[0].url}
                        alt={i.title}
                        className="w-12 h-12 object-contain"
                      />
                      <div className="self-center">
                        <h1 className="text-sm flex-center font-bold text-black ">
                          Category: {i.title}
                        </h1>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            } else {
              return (
                <div>
                  <Link
                    to={`/product/${i.id}`}
                    className="text-decoration-line: no-underline"
                  >
                    <div className="hover:bg-primary-300 flex gap-4 p-4">
                      <img
                        src={i.images[0].url}
                        alt={i.title}
                        className="w-12 h-12 object-contain"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-black">
                          {i.title}
                        </h3>
                        <p className="text-xs text-gray-600">
                          Price: US $ {i.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            }
          })}
      </div>
    </form>
  );
}
