import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import { getProducts, getSearch } from "../../Redux/Actions/actions";
import CardAdmin from "../CardAdmin";

export default function SearchBar(props) {
  const [isOpen, setIsOpen] = useState(true); //controla que aparezca y desaparezca el autocomplete
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.home.search.products);
  const categories = useSelector((state) => state.home.search.categories);
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    if (value.length > 3) {
      if (value !== "") {
        dispatch(getSearch(value));
      }
    }
  };

  useEffect(() => {
    dispatch(getProducts(searchValue));
  }, [searchValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue !== "") {
      navigate({
        pathname: `/admin/products?search=${searchValue}&offset=1`,
      });
      setSearchValue("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center font-lora w-full md:w-[50%]"
    >
      <div className="relative w-full ">
        <input
          onChange={(e) => handleInputChange(e)}
          onFocus={() => setIsOpen(false)}
          value={searchValue}
          className="outline-none  bg-white rounded-lg  p-2 border-[1px] border-primary-200 w-full"
          placeholder="Type to search..."
        />
        <div className="absolute top-0 md:p-0 md:text-2xl right-0">
          <button type="submit" className="mt-2 mr-2 rounded bg-white">
            <AiOutlineSearch color="#FFA438" />
          </button>
        </div>
      </div>
      <div
        className={`absolute mt-10 bg-secondary-100 m-2 overflow-hidden rounded-lg shadow-lg z-20 w-10/12 md:w-4/12 overflow-y-auto max-h-96 overflow-x-auto  ${
          (isOpen || searchValue === "") && "hidden"
        }`}
      >
        {searchValue &&
          searchValue.length > 2 &&
          categories &&
          categories.map((category) => {
            return (
              <div className="text-black" key={category.id}>
                <Link
                  to={`/products?categoryId=${category.id}&offset=1`}
                  className="text-decoration-line: no-underline"
                >
                  <div className="hover:bg-primary-300 flex gap-4 p-4">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-12 h-12 object-contain"
                    />
                    <div className="self-center">
                      <h1 className="text-sm font-bold text-black ">
                        Category: {category.name}
                      </h1>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        {searchValue &&
          searchValue.length > 2 &&
          products &&
          products.products &&
          products.products.map((product) => {
            return (
              <div key={product.id}>
                <Link
                  to={`/product/${product.id}`}
                  className="text-decoration-line: no-underline"
                >
                  <div className="hover:bg-primary-300 flex gap-4 p-4">
                    <img
                      src={product.images && product.images[0].url}
                      alt={product.title}
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-black">
                        {product.title}
                      </h3>
                      <p className="text-xs text-gray-600">
                        Price: US $ {product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </form>
  );
}
