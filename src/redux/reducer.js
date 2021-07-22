//--Aqui estan los reducers con sus acciones--


//Importamos funciones de control
import handleAddProduct from "./handleActions/handleAddProduct";
import handleSubtractProduct from "./handleActions/handleSubtractProduct";
import handleDeleteProduct from "./handleActions/handleDeleteProduct";
import handleGetAPI from "./handleActions/handleGetAPI";
import handleRenderMenu from "./handleActions/handleRenderMenu";
import handleFilterProductList from "./handleActions/handleFilterProductList";

const reducer = (state, action) => {
    switch (action.type) {

        case "GET_API":
            //Retorna funcion de control(Retorna una función para que lea el return de esa función)
            return handleGetAPI(state,action.payload);

        case "RENDER_MENU":
            //El menu en el que esta el usuario para renderizar el menú
            return handleRenderMenu(state,action.payload);

        case "ADD_PRODUCT":
            return handleAddProduct(state,action.payload);

        case "SUBTRACT_PRODUCT":
            return handleSubtractProduct(state,action.payload);

        case "DELETE_PRODUCT":
            return handleDeleteProduct(state,action.payload);

        case "FILTER_PRODUCT_LIST":
            return handleFilterProductList(state,action.payload);

        default:
            return state;
    }
}

export default reducer;