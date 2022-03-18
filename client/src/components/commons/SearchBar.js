import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useMemo, useRef, useState } from "react";
import { createAutocomplete } from "@algolia/autocomplete-core";
import { searchProduct } from "../../Redux/Actions/actions";
import { Link } from "react-router-dom";

const AutocompleteItem = ({ id, title, images, price }) => {
  return (
    <li>
      <Link to={`/products/${id}`}>
        <a className="hover:bg-blue-300 flex gap-4 p-4">
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
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: "Type to search...",
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: "offers-next-api",
            getItems: async ({ query }) => {
              if (!!query) {
                const res = await fetch(
                  `http://localhost:3001/products?limit=100&search=${query}`
                );
                return await res.json();
              }
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });
  return (
    <form
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
          className="absolute mt-16 top-0 left-0 border border-gray-100 bg-white overflow-hidden rounded-lg shadow-lg z-10"
          ref={panelRef}
          {...autocomplete.getPanelProps()}
        >
          {autocompleteState.collections.map((collection, index) => {
            const { items } = collection;
            console.log({ items });
            return (
              <section key={`section-${index}`}>
                {items.length > 0 && (
                  <ul {...autocomplete.getListProps()}>
                    {items[0].products.map((item) => (
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
