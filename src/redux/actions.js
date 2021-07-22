export const getAPI = payload => ({
    type: "GET_API",
    payload
})

export const renderMenu = payload => ({
    type: "RENDER_MENU",
    payload
})

export const addProduct = payload => ({
    type: "ADD_PRODUCT",
    payload
})

export const subtractProduct = payload => ({
    type: "SUBTRACT_PRODUCT",
    payload
})

export const deleteProduct = payload => ({
    type: "DELETE_PRODUCT",
    payload
})

export const filterProductList = payload => ({
    type: "FILTER_PRODUCT_LIST",
    payload
})
