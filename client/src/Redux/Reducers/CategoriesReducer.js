import { GET_CATEGORIES } from "../Actions/types"

//Reducer de prueba, no hace nada
const initialState = null

export const CategoriesReducer = (state = initialState,action) => {
    console.log(GET_CATEGORIES,action)
    return state
}