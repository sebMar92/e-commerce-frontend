
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import {AdminReducer} from '../Reducers/AdminReducer'
import {HomeReducer} from '../Reducers/HomeReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Cada vez que querramos añadir un reducer se lo añade aqui abajo 

const reducer = combineReducers({
    home: HomeReducer,
    admin: AdminReducer
})

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
    )

export default store;