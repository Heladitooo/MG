//--Crea un store y tiene el primero estado--

import { createStore, compose } from "redux";
import reducer from "./reducer.js";


//Activamos las herrmanientas de desarrollo para redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const defaultState = {
    responseStatus: "fetching",
    renderMenu: "none",
    productList: [],
    filterProductList: [],
    userList: [],
}

//Creamos nuestro store
let store = createStore(reducer, defaultState, composeEnhancers());

export default store;
