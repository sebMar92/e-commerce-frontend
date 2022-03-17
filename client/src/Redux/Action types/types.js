// Definir los tipos de actions como constantes para evitar errores de tipeo
import axios from 'axios';
/* export const ACTION = "ACTION"; */
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";

// action para traer los productos
export function getProducts(){
    return async function(dispacth){
        var json = await axios.get("http://localhost:3001/products");
        console.log(json);
        return dispacth({
            type: GET_PRODUCTS,
            payload: json.data
        })
    }
}

//action para traer las categorias
export function getCategories(){
    return async function(dispacth){
        var json = await axios.get("http://localhost:3001/categories");
        return dispacth({
            type: GET_CATEGORIES,
            payload: json.data
        })
    }
}