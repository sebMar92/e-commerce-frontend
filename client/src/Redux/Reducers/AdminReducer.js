import { GET_SALES } from '../Actions/types.js';

const initialState = {
  sales: [],
};

export const AdminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_SALES:
      return {
        ...state,
        sales: payload,
      };
    default:
      return state;
  }
};
