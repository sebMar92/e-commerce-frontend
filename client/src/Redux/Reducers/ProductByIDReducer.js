import { GET_PRODUCT_BY_ID, GET_COMMENT_BY_ID } from '../Actions/types'

const initialState = {
    product: [],
    comment: undefined
}

export const getProductByID = (state = initialState, action) => {
    switch(action.type) {
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                product: action.payload
            }
        case GET_COMMENT_BY_ID:
            return {
                ...state,
                comment: action.payload
            }
        default:
            return state;
    }
}