import axios from "axios";
import {
  GET_PRODUCTS,
  GET_CATEGORIES,
  GET_PRODUCT_BY_ID,
  SEARCH_PRODUCT,
} from "./types";

// action para traer los productos
export function getProducts(search) {
  return async function (dispatch) {
      var json = await axios.get(`http://localhost:3001/products${search}`);
      return dispatch({
          type: GET_PRODUCTS,
          payload: json.data
      });
  };
}


//action para traer las categorias
export function getCategories() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/categories");
    return dispatch({
      type: GET_CATEGORIES,
      payload: json.data,
    });
  };
}

//action para traer el producto por id
export function getProductByID(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/products/" + id);
      return dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//action para buscar producto
export function searchProduct(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `http://localhost:3001/products?search=${name}`
      );
      const data = json.data.products;
      if (data.length === 0) {
        return alert("Not found. Try again");
      } else {
        const results = data.filter((product) => {
          const { title } = product;
          return title.toLowerCase().includes(name.toLowerCase());
        });
        return dispatch({
          type: SEARCH_PRODUCT,
          payload: results,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
