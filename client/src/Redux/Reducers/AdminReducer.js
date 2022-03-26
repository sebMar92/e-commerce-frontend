/* import { ACTION } from "../Action types/types" */
import {PUT_PRODUCT_BY_ID} from "../Actions/types";

//Reducer de prueba, no hace nada
const initialState = {
    
}

export const AdminReducer = (state = initialState, action) => {
    /* console.log(ACTION,action) */
    switch(action.type){
      case PUT_PRODUCT_BY_ID:
       return{
           ...state
       };
        default:
      return state; 
    }
    
}