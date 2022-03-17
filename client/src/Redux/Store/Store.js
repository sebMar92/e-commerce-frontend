
import { createStore, applyMiddleware, combineReducers } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";
import {AdminReducer} from '../Reducers/AdminReducer'
import {HomeReducer} from '../Reducers/HomeReducer'
import {CategoriesReducer} from '../Reducers/CategoriesReducer'
import { getProductByID } from "../Reducers/ProductByIDReducer";

const rootReducer = combineReducers({
    home: HomeReducer,
    admin: AdminReducer,
    cat: CategoriesReducer,
    productID: getProductByID
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;