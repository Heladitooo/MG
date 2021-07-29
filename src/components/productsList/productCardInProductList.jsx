//--Carta del producto en la lista principal--

import React from "react";

import "../../styles/productList/productCardInProductList.css";
import numberWithPoints from "../../numberWithPoints";

import MiniLogoBG from "../../img/miniLogoBG.png";


import { connect } from "react-redux";
import { addProduct, subtractProduct } from "../../redux/actions";

class ProductCardInProductList extends React.Component {

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
            <div className="productCardInProductList-card">
                {
                    this.state.product.productAvailable ?
                        <div className="card-panel ">
                            <button
                                className={"card-panel__buttonUp " + buttonUpClass}  
                                onClick={e => this.handleAddProduct(e)}
                            >+</button>
                            <button
                                className={"card-panel__buttonDown " + buttonDownClass }
                                onClick={e => this.handleSubstractProduct(e)}
                            >-</button>
                        </div>
                        :
                        <>
                            <div className="card-panel">
                                <button Style="display: none;"></button>
                                <button Style="display: none;"></button>
                            </div>
                            <div className="card-panel__text-container">
                                <h1 className="card-panel__text">Agotado</h1>
                            </div>
                        </>

                }
                <div className="card-img">
                    {
                        this.state.product.productImage ?
                            <img className="productCardInProductList-card__img" alt="productImage" src={this.state.product.productImage} width="200px" onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = MiniLogoBG;
                            }} />
                            :
                            <img className="productCardInProductList-card__img" alt="productImage" src={MiniLogoBG} width="200px" />
                    }

                    <h1 className="productCardInProductList-card__name">{this.state.product.productName}</h1>
                </div>

                <div className="productCardInProductList-card__price-container">

                    <h1 className="productCardInProductList-card__price">{numberWithPoints(this.state.product.productPrice)}</h1>

                    <h1 className="productCardInProductList-card__amount">Cantidad
                        <div Style="color: black;" className="card-div">
                            {this.state.product.productAmount}
                        </div>
                    </h1>
                    <h1 className="productCardInProductList-card__priceWithAmount">Valor compra <br />
                        <div Style="color: black;" className="card-div">
                            {numberWithPoints(this.state.product.productPriceWithAmount)}
                        </div></h1>

                </div>

            </div>

        )
    }
}


export default connect(null,
    {
        addProduct,
        subtractProduct
    }
)(ProductCardInProductList);