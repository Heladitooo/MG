import React from "react"

import "../../styles/userList/productCardInUserList.css";

import { connect } from "react-redux";
import { addProduct, subtractProduct, deleteProduct } from "../../redux/actions";
import numberWithPoints from "../../numberWithPoints";

import MiniLogoBG from "../../img/miniLogoBG.png";

class ProductCardInUserList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            maxProductAmount: 10,
            product: this.props.product,
            buttonUpClass: "active-button",
            buttonDownClass: "desabled-button",
        }
    }


    handleAddProduct(e) {

        //Sumar producto actualizado la lista
        this.props.addProduct(this.state);
    }

    handleSubstractProduct(e) {

        //Restar producto actualizando la lista
        this.props.subtractProduct(this.state);
    }

    render() {

        let buttonUpClass = "active-button";
        let buttonDownClass = "desabled-button";

        //Manejar opacidad de botones
        if (this.state.product.productAmount < 1) {
            buttonDownClass = "disabled-button";
        } else if(this.state.product.productAmount > 9){
            buttonUpClass = "disabled-button";
        } else {
            buttonDownClass = "active-button";
            buttonUpClass = "active-button";
        }

        return (
            <div className="productCardInUserList">
                <div>
                    <h1>({this.state.product.productAmount}){this.state.product.productName} {numberWithPoints(this.state.product.productPriceWithAmount)}</h1>
                    {
                        this.state.product.productImage ?
                            <img className="productCardInUserList__img" src={this.state.product.productImage} width="200px" alt="productImage" onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = MiniLogoBG;
                            }} />
                            :
                            <img className="productCardInUserList__img" src={MiniLogoBG} alt="productImage" width="200px" />
                    }
                </div>

                <div>
                    <div className="productCardInUserList-panel">
                        <button className="productCardInUserList-panel__buttonDelete" onClick={() => {
                            this.props.deleteProduct(this.state);
                        }}>x</button>
                        <button
                            className={"productCardInUserList-panel__buttonUp " + buttonUpClass}
                            onClick={e => this.handleAddProduct(e)}
                        >+</button>
                        <button
                            className={"productCardInUserList-panel__buttonDown " + buttonDownClass} 
                            onClick={e => this.handleSubstractProduct(e)}
                        >-</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default connect(null, {
    addProduct,
    subtractProduct,
    deleteProduct
})(ProductCardInUserList);