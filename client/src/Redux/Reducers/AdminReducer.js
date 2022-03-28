import { GET_SALES, GET_PRODUCTS_SALES, DELETE_SALE } from '../Actions/types.js';

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
    case DELETE_SALE:
      return {
        ...state,
        deleted: payload,
      };
    default:
      return state;
  }
};
