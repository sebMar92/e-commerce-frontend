import { GET_SALES, GET_PRODUCTS_SALES } from '../Actions/types.js';

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
    default:
      return state;
  }
};
