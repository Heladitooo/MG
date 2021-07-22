const handleGetAPI = (state, payload) => {
    
    return {
        ...state,
        responseStatus: payload.response,
        productList: payload.productList,
        filterProductList: payload.productList
    }
}

export default handleGetAPI