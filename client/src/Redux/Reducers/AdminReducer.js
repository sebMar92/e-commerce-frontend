/* import { ACTION } from "../Action types/types" */


//Reducer de prueba, no hace nada
import { GET_SALES, GET_PRODUCTS_SALES, PUT_PRODUCT_BY_ID }from '../Actions/types.js';

const initialState = {
  sales: [],
  salesAllProducts: [],
};

export const AdminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SALES:
      return {
        ...state,
        sales: payload,
      };
    case GET_PRODUCTS_SALES:
      return {
        ...state,
        salesAllProducts: payload.products,
      };
      case PUT_PRODUCT_BY_ID:
        return{
            ...state
        };
    default:
      return state;
  }
};
