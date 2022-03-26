import { GET_SALES } from '../Actions/types.js';

const initialState = {
  sales: [],
};

<<<<<<< HEAD
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
=======
//Reducer de prueba, no hace nada
const initialState = {
    
}

export const AdminReducer = (state = initialState, action) => {
    /* console.log(ACTION,action) */
    switch(action.type){
       
        default:
      return state; 
    }
    
}
>>>>>>> f53ea2199f874300667f2d6709604b87426faf86
