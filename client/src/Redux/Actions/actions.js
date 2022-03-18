import axios from 'axios';
import { GET_PRODUCTS,GET_CATEGORIES, RES_STATE } from './types';

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

//action para crear productos
export function postProduct(product){
    return async function(){
        const create= await axios.post("http://localhost:3001/admin/products", product);
        return create;
    }
}
