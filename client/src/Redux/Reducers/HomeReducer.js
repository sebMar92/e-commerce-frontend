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
  PUT_USER_INFO,
  GET_ORDERS_FAVS,
  PUT_USER_INFO
} from "../Actions/types";

const initialState = {
  products: [],
  categories: [],
  currentPage: 0,
  totalPages: 0,
  search: {},
  userInfo: [],
  userTokens: [],
  userMail: [],
  openFiles: "",
  answer: {},
  orders:[],
  user: {},
  favs: [],
  answer: {},
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
     
      case POST_ORDERS:
        return{
            ...state,
           
        }

    case GET_ORDERS:
        return{
            ...state,
            orders: action.payload,
        }
    case GET_USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case PUT_USER_INFO:
      return {
        ...state,
        answer: action.payload,
      }

      case GET_ORDERS_FAVS:
      return {
        ...state,
        favs: action.payload
      };
      case PUT_USER_INFO:
      return {
        ...state,
        answer: action.payload
      };

    default:
      return state;
  }
};
