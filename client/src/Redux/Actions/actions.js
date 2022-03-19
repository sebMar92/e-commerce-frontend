import axios from 'axios';
import { GET_PRODUCTS,GET_CATEGORIES, GET_PRODUCT_BY_ID, GET_PRODUCTS_BY_CATEGORY } from './types';

// action para traer los productos de una categoría y página en específico
export function getProducts(){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/products");
            return dispatch({
                type: GET_PRODUCTS,
                payload: json.data
            });
        } catch(error) {
            console.log(error)
        }
    };
}

//action para traer las categorias
export function getCategories(){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/categories");
            return dispatch({
                type: GET_CATEGORIES,
                payload: json.data
            });
        } catch(error) {
            console.log(error)
        }
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

//action para traer los productos de cada categoría y su paginado
export function getProductsByCategory(){
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/products?limit=100`);
            console.log(json);
            return dispatch({
                type: GET_PRODUCTS_BY_CATEGORY,
                payload: json.products
            })
        } catch (error) {
            console.log(error)
        }
    };

}