import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getSearch } from "../../Redux/Actions/actions";

const hidden = "hidden";
const AutocompleteItem = ({ id, title, images, price }) => {
  return (
    <div>
      <Link to={`/product/${id}`}>
        <div className="hover:bg-primary-300 flex gap-4 p-4">
          <img
            src={images[0].url}
            alt={title}
            className="w-12 h-12 object-contain"
          />
          <div>
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-xs text-gray-600">{price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default function SearchBar(props) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /* const allCategories = useSelector((state) => state.home.categories); */
  /* const [search, setSearch] = useState(""); */
  const prod = useSelector((state) => state.home.search.products);
  /* setSearch(prod); */

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/products/search",
    });
    setIsOpen(!isOpen);
  };
  const handleInputChange = (e) => {
    const { value } = e.target;
    dispatch(getSearch(value));

    console.log(prod);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center font-lora"
      on
      onClick={() => setIsOpen(!isOpen)}
    >
      <input
        onChange={(e) => handleInputChange(e)}
        className="bg-secondary-100 p-2 h-8 rounded-md w-10/12 md:w-4/12 focus:outline-none"
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
        {prod &&
          prod.map((i) => {
            return AutocompleteItem(i);
          })}
      </div>
    </form>
  );
}
