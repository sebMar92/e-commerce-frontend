/*  import React from "react";
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getCategories} from "../Redux/Actions/actions";
import { sortOrder } from "../funciones";

export default function CategoriesSelect(props) {
    

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [displayCategories, setDisplayCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const storeCategories = useSelector((state) => state.home.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  useEffect(() => {
    setAllCategories(storeCategories);
  }, [storeCategories]);
 
  useEffect(() => {
    let sendName = selectedCategories.map((t) => t.name);
    props.stateChanger( sendName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);
  const handleSelections = (categoriesName) => {
    setSelectedCategories(
      sortOrder(
        [
          ...selectedCategories,
          {
            name: categoriesName,
        
          },
        ],
        "name"
      )
    );
    setAllCategories(
      allCategories.filter((t) => t.name !== categoriesName)
    );
  };
  const handleCancelation = (categoriesId, categoriesName) => {
    setSelectedCategories(
      selectedCategories.filter((t) => t.name !== categoriesName)
    );
    setAllCategories(
      sortOrder(
        [
          ...allCategories,
          {
            name: categoriesName,
         },
        ],
        "name"
      )
    );
  };
  return (
    <div >
      <h3>Pick some Categories</h3>
      <div >
        <input
          type="text"
          placeholder="Search temperaments..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div >
          {selectedCategories &&
            selectedCategories.map((selected) => (
              <div
                key={selected.id}
                id={selected.id}
                onClick={(e) => handleCancelation(selected.id, selected.name)}
              >
                <div>{selected.name}</div>
                <div>X</div>
              </div>
            ))}
        </div>
        <div >
          {displayCategories &&
            displayCategories.map((categories) => (
              <div
                key={Math.random(1)}
                id={categories.id}
                onClick={(e) =>
                  handleSelections(e.target.id, e.target.innerHTML)
                }
              >
                {categories.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
 



/* 

  return (
    <div>
      <h3>Pick some Categories</h3>
      <div >
        <input
          type="text"
          placeholder="Search Categories..."
          
        /><br/>

        <input type="radio"/>
        <label>category1</label>
        <br/>
        <input type="radio"/>
        <label>category2</label>
        <div>
         
        </div>
        <div>
       
        </div>
      </div>
    </div>
  );
} */