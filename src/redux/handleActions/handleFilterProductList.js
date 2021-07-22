const handleFilterProductList = (state,payload) => {

    let updatedFilterProductList = [];

    for (let index = 0; index < state.productList.length; index++) {
        if(state.productList[index].productName.toUpperCase().includes(payload.searchText.toUpperCase())){
            updatedFilterProductList.push(state.productList[index]);
        }
        
    }
    
    return {
        ...state,
        filterProductList: updatedFilterProductList
    }
}

export default handleFilterProductList;