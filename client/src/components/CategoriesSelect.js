import React from "react";
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getCategories} from "../Redux/Actions/actions";


export default function CategoriesSelect(props) {
    const dispatch = useDispatch();


    const storeCategories = useSelector((state) => state.home.categories);


    useEffect(() => {
        dispatch(getCategories());
      }, [dispatch]);
      
      useEffect(() => {
       console.log(storeCategories)
      }, [storeCategories]);

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
}