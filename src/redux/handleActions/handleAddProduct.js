//--Suma los productos y los añade a la lista--

const handleAddProduct = (state, payload) => {

    if (payload.product.productAmount < payload.maxProductAmount) {

        //Encontrara el producto
        let findProductInUserList = state.userList.find((data) => {
            return data.productName === payload.product.productName
        })

        //Sumamos la cantidad del producto
        payload.product.productAmount++;

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
            return {
                ...state,
                productList: updatedProductList,
                userList: [
                    ...state.userList,
                    payload.product
                ]
            }
        } else {

            //Actualizar la lista del usuario
            let updatedUserList = state.userList.map((data) => {
                if (data.productName === payload.product.productName) {
                    data = payload.product;
                }

                return data;
            })

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

export default handleAddProduct;