const handleFilterProductList = (state, payload) => {

    let updatedFilterProductList = [];

    if (state.responseStatus === "fetched") {
        //Hacemos un for para mostrar los productos que tengan las palabras de payload
        for (let index = 0; index < state.productList.length; index++) {
            if (state.productList[index].productName.toUpperCase().includes(payload.searchText.toUpperCase())) {
                updatedFilterProductList.push(state.productList[index]);
            }

        }

        return {
            ...state,
            filterProductList: updatedFilterProductList
        }
    } else {
        return state;
    }

}

export default handleFilterProductList;