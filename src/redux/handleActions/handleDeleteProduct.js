const handleDeleteProduct = (state, payload) => {

    //Actualizamos cantidad del producto a 0
    payload.product.productAmount = 0;

    //Multiplicamos el precio por la cantidad
    payload.product.productPriceWithAmount = payload.product.productPrice * payload.product.productAmount;

    //Actualizar la lista de productos
    let updatedProductList = state.productList.map((data) => {
        if (data.productName === payload.product.productName) {
            data = payload.product;
        }

        return data;
    })

  
    let updatedUserList = [];

    //Actualizar la lista del usuario
    for (let index = 0; index < state.userList.length; index++) {
        
        //Si la cantidad es 0 lo quita de la lista del usuario
        if (payload.product.productAmount === 0 && 
            state.userList[index].productName === payload.product.productName) {
            continue;
        } else {
            updatedUserList.push(state.userList[index]);
        }
    }

    return {
        ...state,
        productList: updatedProductList,
        userList: updatedUserList
    }

}

export default handleDeleteProduct;