import React from "react"

import "../../styles/userList/productCardInUserList.css";

import { connect } from "react-redux";
import { addProduct, subtractProduct, deleteProduct } from "../../redux/actions";
import numberWithPoints from "../../numberWithPoints";
import Logo from "../../img/logo.png";

class ProductCardInUserList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            maxProductAmount: 10,
            product: this.props.product
        }
    }

    render() {
        return (
            <div className="productCardInUserList">
                <div>
                    <h1>({this.state.product.productAmount}){this.state.product.productName} {numberWithPoints(this.state.product.productPriceWithAmount)}</h1>
                    {
                        this.state.product.productImage ?
                            <img className="productCardInUserList__img" src={this.state.product.productImage} width="200px" alt="productImage" onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = Logo;
                            }} />
                            :
                            <img className="productCardInUserList__img" src={Logo} alt="productImage" width="200px" />
                    }
                </div>

                <div>
                    <div className="productCardInUserList-panel">
                        <button className="productCardInUserList-panel__buttonDelete" onClick={() => {
                            this.props.deleteProduct(this.state);
                        }}>x</button>
                        <button className="productCardInUserList-panel__buttonUp" onClick={() => {
                            this.props.addProduct(this.state);
                        }}>+</button>
                        <button className="productCardInUserList-panel__buttonDown" onClick={() => {
                            this.props.subtractProduct(this.state);
                        }}>-</button>
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