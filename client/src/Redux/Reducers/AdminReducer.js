import { GET_SALES, GET_PRODUCTS_SALES, PUT_SALE } from '../Actions/types.js';

const initialState = {
  sales: [],
  salesAllProducts: [],
  salesUpdate: {},
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
    case PUT_SALE:
      return {
        ...state,
        salesUpdate: {},
      };
    default:
      return state;
  }
};
