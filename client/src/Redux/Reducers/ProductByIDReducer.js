import { GET_PRODUCT_BY_ID } from '../Actions/types'

const initialState = {
    product: []
}

export const getProductByID = (state = initialState, action) => {
    switch(action.type) {
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                product: action.payload
            }
        default:
            return state;
    }
}