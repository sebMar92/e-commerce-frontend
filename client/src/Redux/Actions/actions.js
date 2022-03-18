import axios from 'axios';
import { GET_PRODUCTS,GET_CATEGORIES, GET_PRODUCT_BY_ID } from './types';

// action para traer los productos de una categoría y página en específico
export function getProducts(id, page){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/products?category=" + id + "&offset=" + page);
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