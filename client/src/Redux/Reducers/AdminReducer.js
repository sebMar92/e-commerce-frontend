<<<<<<< HEAD
import { GET_SALES, GET_PRODUCTS_SALES, DELETE_SALE } from '../Actions/types.js';
=======
/* import { ACTION } from "../Action types/types" */


//Reducer de prueba, no hace nada
import { GET_SALES, GET_PRODUCTS_SALES, PUT_PRODUCT_BY_ID }from '../Actions/types.js';
>>>>>>> ed278a096768dab0231cd9006420dda40249ec3c

const initialState = {
  sales: [],
  salesAllProducts: [],
  deleted: {},
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
<<<<<<< HEAD
    case DELETE_SALE:
      return {
        ...state,
        deleted: payload,
      };
=======
      case PUT_PRODUCT_BY_ID:
        return{
            ...state
        };
>>>>>>> ed278a096768dab0231cd9006420dda40249ec3c
    default:
      return state;
  }
};
