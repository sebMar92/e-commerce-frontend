import {
  GET_SALES,
  GET_PRODUCTS_SALES,
  PUT_PRODUCT_BY_ID,
  DELETE_SALE,
  GET_BULK_ADMIN,
  DELETE_PRODUCT,
  POST_EMAIL,
  POST_NETWORKS,
  POST_SALE,
  EDIT_SALE,
  CATEGORY,
  GET_NETWORKS
} from "../Actions/types.js";

const initialState = {
  sales: [],
  salesAllProducts: [],
  deleted: {},
  bulkAdmin: [],
  deletedProduct: {},
  saleChange: {},
  deletedProduct: {},
  networks: {},
  category: "",
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
    case POST_NETWORKS:
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
    case GET_NETWORKS:
      return {
        ...state,
        networks: payload,
      }

    case CATEGORY:
      return {
        ...state,
        category: payload,
      };
    default:
      return state;
  }
};
