import { GET_PRODUCT_BY_ID, GET_COMMENT_BY_ID, PUT_PRODUCT_BY_ID,CLEAR_PRODUCT_DETAIL} from '../Actions/types'

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
            case PUT_PRODUCT_BY_ID:
                return{
                    ...state,
                    product: action.payload
                };
            case CLEAR_PRODUCT_DETAIL:
                return {
                    ...state,
                    product: []
                    }
        default:
            return state;
    }
}