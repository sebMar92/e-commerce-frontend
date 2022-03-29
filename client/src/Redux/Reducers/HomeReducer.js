import {
  GET_PRODUCTS,
  GET_CATEGORIES,
  GET_SEARCH,
  POST_NEWUSER,
  VALIDATE_MAIL,
  LOGIN_USER,
  POST_ORDERS,
  GET_ORDERS,
  GET_USER_INFO,
  DELETE_ORDERS,
  PUT_USER_INFO,
  PUT_ORDERS,
  PUT_ORDERS_AMOUNT,
  CLEAR_TOKENS_USER,
  CLEAR_PRODUCT_DETAIL,
  POST_NEW_ADRESS_USER
} from '../Actions/types';

const initialState = {
  products: [],
  categories: [],
  currentPage: 0,
  totalPages: 0,
  search: {},
  userInfo: [],
  userTokens: [],
  userMail: [],
  openFiles: '',
  answer: {},
  user: {},
  inWishList: [],
  inCart: [],
  finished: [],
  postOrders: [],
  deleted: [],
  resPutOrder: [],
  resAmountOrder: {},
  resNewAdress:{}
};
export const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        currentPage: action.payload.page,
        totalPages: action.payload.pages,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case POST_NEWUSER:
      return {
        ...state,
        userInfo: action.payload,
      };
    case VALIDATE_MAIL:
      return {
        ...state,
        userMail: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        userTokens: action.payload,
      };
    case DELETE_ORDERS:
      return {
        ...state,
        deleted: action.payload,
      };
    case PUT_ORDERS:
      return {
        ...state,
        [action.payload.status]: action.payload.data,
      };
    case POST_ORDERS:
      return {
        ...state,
        postOrders: action.payload,
      };
    case GET_ORDERS:
      return {
        ...state,
        [action.payload.status]: action.payload.data,
      };
    case GET_USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case PUT_USER_INFO:
      return {
        ...state,
        answer: action.payload,
      };

    case PUT_ORDERS:
      return {
        ...state,
        resPutOrder: action.payload,
      };
    case PUT_ORDERS_AMOUNT:
      return {
        ...state,
        resAmountOrder: action.payload,
      };
    case CLEAR_TOKENS_USER:
      return {
        ...state,
        userTokens: ""
      }
      case POST_NEW_ADRESS_USER:
        return {
          ...state,
          resNewAdress: action.payload
        }

    default:
      return state;
  }
};
