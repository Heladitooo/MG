//--Resta los productos y los añade a la lista--

const handleSubtractProduct = (state, payload) => {

    if (payload.product.productAmount > 0) {

        //Encontrara el producto
        let findProductInUserList = state.userList.find((data) => {
            return data.productName === payload.product.productName
        })

        //Resta la cantidad del producto
        payload.product.productAmount--;

        //Multiplicamos el precio por la cantidad
        payload.product.productPriceWithAmount = payload.product.productPrice * payload.product.productAmount;

        //Actualizar la lista de productos
        let updatedProductList = state.productList.map((data) => {
            if (data.productName === payload.product.productName) {
                data = payload.product;
            }

            return data;
        })

        //Si no encuentra el producto lo va a agregar a la lista
        if (findProductInUserList === undefined) {
            return state;
        } else {

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
    } else {
        return state;
    }
}

export default handleSubtractProduct;