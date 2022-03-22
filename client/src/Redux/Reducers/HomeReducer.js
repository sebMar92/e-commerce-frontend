import { GET_PRODUCTS, GET_CATEGORIES, GET_SEARCH, POST_NEWUSER, VALIDATE_MAIL,LOGIN_USER } from "../Actions/types";

//Reducer de prueba, no hace nada

const initialState = {
  products: [], //estado con los productos como objetos
  categories: [], //estado con las categorias como strings
  currentPage: 0,
  totalPages: 0,
  search: [],
  userInfo: [],
  userTokens: [],
  userMail: []
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

    default:
      return state;
  }
};
