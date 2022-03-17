import axios from 'axios';
import { GET_PRODUCTS,GET_CATEGORIES, GET_PRODUCT_BY_ID } from './types';

// action para traer los productos
export function getProducts(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/products");
        return dispatch({
            type: GET_PRODUCTS,
            payload: json.data
        });
    };
}

//action para traer las categorias
export function getCategories(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/categories");
        return dispatch({
            type: GET_CATEGORIES,
            payload: json.data
        });
    };
}

//action para traer el producto por id
export function getProductByID (id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/products/" + id);
            return dispatch({
                type: GET_PRODUCT_BY_ID,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}