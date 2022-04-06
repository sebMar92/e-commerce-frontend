import {
  GET_SALES,
  GET_PRODUCTS_SALES,
  PUT_PRODUCT_BY_ID,
  DELETE_SALE,
  GET_BULK_ADMIN,
  DELETE_PRODUCT,
  POST_EMAIL,
  POST_SALE,
  EDIT_SALE,
  DELETE_PRODUCT,
  POST_EMAIL,
} from '../Actions/types.js';

const initialState = {
  sales: [],
  salesAllProducts: [],
  deleted: {},
  bulkAdmin: [],
  deletedProduct: {},
  saleChange: {},
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
    case GET_BULK_ADMIN:
      return {
        ...state,
        bulkAdmin: payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        deletedProduct: payload,
      };
    case POST_EMAIL:
      return {
        ...state,
      };
    case EDIT_SALE:
      return {
        ...state,
        saleChange: { change: payload },
      };
    case POST_SALE:
      return {
        ...state,
        saleChange: { change: payload },
      };
    default:
      return state;
  }
};
