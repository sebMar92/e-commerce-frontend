import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useMemo, useRef, useState } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";
/* import { useDispatch, useSelector } from "react-redux"; */
import { Link } from "react-router-dom";

const AutocompleteItem = ({ id, title, images, price }) => {
  return (
    <li>
      <Link to={`/products/${id}`}>
        <a className="hover:bg-primary-300 flex gap-4 p-4">
          <img
            src={images[0].url}
            alt={title}
            className="w-12 h-12 object-contain"
          />
          <div>
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-xs text-gray-600">{price}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default function SearchBar(props) {
  /* const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.home.categories); */
  const [search, setSearch] = useState("");
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        props,
        placeholder: "Type to search...",
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: "products",
            getItems: async ({ query }) => {
              if (!!query) {
                const res = await fetch(
                  `http://localhost:3001/products?limit=100&search=${query}`
                );

                /* for (let i = 0; i < allCategories.length; i++) {
                  if (i.toLowerCase().includes(query.toLowerCase())) {
                    console.log(i);
                  }
                } */

                const info = await res.json();

                const data = info.products;

                if (data.length === 0) {
                  console.log("element not found");
                } else {
                  const results = data.filter((product) => {
                    const { title } = product;
                    return title.toLowerCase().includes(query.toLowerCase());
                  });

                  setSearch(results);

                  return results;
                }
              }
            },
          },
        ],
      }),
    [props]
  );
  console.log(search);

  const formRef = useRef("");
  const inputRef = useRef("");
  const panelRef = useRef("");

  /* console.log(inputRef.current.value); */

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="flex justify-center font-lora"
      {...formProps}
    >
      <input
        ref={inputRef}
        className="bg-secondary-100 p-2 h-8 rounded-md w-10/12 md:w-4/12 focus:outline-none"
        {...inputProps}
      />
      {autocompleteState.isOpen && (
        <div
          className="absolute mt-16 border border-secondary-100 bg-white overflow-hidden rounded-lg shadow-lg z-10"
          ref={panelRef}
          {...autocomplete.getPanelProps()}
        >
          {autocompleteState.collections.map((collection, index) => {
            const { items } = collection;

            return (
              <section key={`section-${index}`}>
                {items.length > 0 && (
                  <ul {...autocomplete.getListProps()}>
                    {items.map((item) => (
                      <AutocompleteItem key={item.id} {...item} />
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      )}
      <button
        type="submit"
        className="text-secondary-200 bg-secondary-100 p-1 ml-1 rounded-md active:translate-y-1"
      >
        <AiOutlineSearch />
      </button>
    </form>
  );
}
