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
  GET_USERS_INFO,
  DELETE_ORDERS,
  PUT_USER_INFO,
  PUT_ORDERS,
  PUT_ORDERS_AMOUNT,
  CLEAR_TOKENS_USER,
  CLEAR_PRODUCT_DETAIL,
  POST_NEW_ADRESS_USER,
  CLEAR_PRODUCT_AND_CATEGORY,
  DELETE_ADRESS_USER,
  CLEAR_USER_EMAIL,
  DELETE_USER_INFO,
  DELETE_USER_ADMIN,
  PUT_USER_ADMIN,  
  CLEAR_CARRUSEL,
  POST_BULK_ORDER,
  GET_BULK_ORDERS,
  GET_BULK_ADMIN,
  PUT_BULK_ORDERS
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
  users: [],
  inWishList: [],
  inCart: [],
  pending: [],
  finished: [],
  postOrders: [],
  deleted: [],
  resPutOrder: [],
  resAmountOrder: {},
  resNewAdress: {},
  userDelete: {},
  resPostBulk: [],
  bulkOrders: [],
  putBulkOrders: [],
  bulkAdmin: [],
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
    case GET_USERS_INFO:
      return {
        ...state,
        users: action.payload,
      };

    case PUT_USER_INFO:
      return {
        ...state,
        answer: action.payload,
      };
      case PUT_USER_ADMIN:
        return {
          ...state,
          answer: action.payload,
        };
      case DELETE_USER_INFO:
        return {
          ...state,
          userDelete: action.payload
        }
        case DELETE_USER_ADMIN:
          return {
            ...state,
            userDelete: action.payload
          }
  

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
        userTokens: "",
        user: {}
      }
    case POST_NEW_ADRESS_USER:
      return {
        ...state,
        resNewAdress: action.payload
      }
    case CLEAR_PRODUCT_AND_CATEGORY:
      return {
        ...state,
        products: ""
      }
    case DELETE_ADRESS_USER:
      return {
        ...state,
        resNewAdress: action.payload
      }
    case CLEAR_USER_EMAIL:
      return {
        ...state,
        userMail: []
      }
    case CLEAR_CARRUSEL:
      return {
        ...state,
        products: []
      }
    case POST_BULK_ORDER:
      return {
        ...state,
        resPostBulk: action.payload
      }
    case GET_BULK_ORDERS:
      return {
        ...state,
        bulkOrders: action.payload
      }
    case PUT_BULK_ORDERS:
      return{
        ...state,
        putBulkOrders: action.payload
      }
      case GET_BULK_ADMIN:
        return {
          ...state,
          bulkAdmin: action.payload
        }

    default:
      return state;
  }
};
