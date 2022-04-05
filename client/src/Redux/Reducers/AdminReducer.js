import {
  GET_SALES,
  GET_PRODUCTS_SALES,
  PUT_PRODUCT_BY_ID,
  DELETE_SALE,
  DELETE_PRODUCT,
  POST_EMAIL
} from '../Actions/types.js';

const initialState = {
  sales: [],
  salesAllProducts: [],
  deleted: {},
  deletedProduct: {},
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
    case PUT_PRODUCT_BY_ID:
      return {
        ...state,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        deletedProduct: payload,
      };
      case POST_EMAIL:
        return {
          ...state,
        }
    default:
      return state;
  }
};
