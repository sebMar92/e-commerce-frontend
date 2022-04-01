import React, { useEffect, useState } from "react";

export default function Pick({ title, array, picked, callback }) {
  const [selectedElements, setSelectedElements] = useState(picked);
  const [initialElements, setInitialElements] = useState([]);
  const [filteredInitial, setFilteredInitial] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    setInitialElements(array);
  }, [array]);
  useEffect(() => {
    initialElements &&
      setFilteredInitial(
        initialElements.filter(
          (element) =>
            (element.title &&
              element.title
                .toLowerCase()
                .includes(searchValue.toLowerCase())) ||
            (element.name &&
              element.name.toLowerCase().includes(searchValue.toLowerCase()))
        )
      );
  }, [searchValue, initialElements]);
  useEffect(() => {
    if (picked && picked.length > 0) {
      if (selectedElements.length === 0) {
        setSelectedElements(picked);
      } else {
        for (const pick of picked) {
          const found = selectedElements.find((select) => select.id == pick.id);
          if (!found) {
            setSelectedElements(picked);
            break;
          }
        }
      }
    } else if (picked && picked.length === 0) {
      if (selectedElements.length !== 0) {
        setSelectedElements(picked);
      }
    }
  }, [picked]);
  useEffect(() => {
    callback(selectedElements);
  }, [selectedElements]);
  function handleCancelation(newId, newName) {
    const newInitial = [...initialElements, { id: newId, name: newName }];
    const orderedInitial = newInitial.sort((a, b) => a.id - b.id);
    setInitialElements(orderedInitial);
    const newSelected = selectedElements.filter(
      (element) => element.id !== newId
    );
    setSelectedElements(newSelected);
  }
  function handleSelections(newId, newName) {
    const newSelected = [...selectedElements, { id: newId, name: newName }];
    const orderedSelected = newSelected.sort((a, b) => a.id - b.id);
    setSelectedElements(orderedSelected);
    const newInitial = initialElements.filter(
      (element) => element.id !== newId
    );
    setInitialElements(newInitial);
  }
  return (
    <div className="w-full h-full">
      <h3 className="ml-1.5">{title}</h3>
      <input
        type="text"
        placeholder="Search..."
        className="border border-primary-500 w-11/12 ml-1 p-1 dark:bg-slate-200"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="h-full overflow-y-scroll">
        <div>
          {selectedElements &&
            selectedElements.length > 0 &&
            selectedElements.map((selected) => (
              <div
                className="flex justify-between select-none px-2 bg-primary-500 border-2 border-white hover:bg-primary-700 dark:border-slate-800"
                key={selected.id}
                id={selected.id}
                onClick={(e) =>
                  handleCancelation(
                    Number(selected.id),
                    selected.title || selected.name
                  )
                }
              >
                <div>{selected.title || selected.name}</div>
                <div className="">X</div>
              </div>
            ))}
        </div>
        <div>
          {filteredInitial &&
            filteredInitial.length > 0 &&
            filteredInitial.map((element) => (
              <div
                key={Math.random(1)}
                id={element.id}
                className="px-2 select-none bg-primary-300 border-2 border-white hover:bg-primary-400 dark:bg-slate-700 dark:border-slate-900 dark:hover:bg-slate-900"
                onClick={(e) =>
                  handleSelections(Number(element.id), e.target.innerHTML)
                }
              >
                {element.title || element.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
