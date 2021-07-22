//--Carta del producto en la lista principal--

import React from "react";

import "../../styles/productList/productCardInProductList.css";
import numberWithPoints from "../../numberWithPoints";
import Logo from "../../img/logo.png";

import { connect } from "react-redux";
import { addProduct, subtractProduct } from "../../redux/actions";

class ProductCardInProductList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            maxProductAmount: 10,
            product: this.props.product
        }
    }

    render() {

        return (
            <div className="productCardInProductList-card">
                {
                    this.state.product.productAvailable ?
                        <div className="card-panel ">
                            <button className="card-panel__buttonUp" onClick={(e) => {
                                //Sumar producto actualizado la lista
                                this.props.addProduct(this.state);
                                e.target.style.color= "yellow"

                            }}>+</button>
                            <button className="card-panel__buttonDown" onClick={() => {
                                //Restar producto actualizando la lista
                                this.props.subtractProduct(this.state);
                            }}>-</button>
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
                                e.target.src = Logo;
                            }} />
                            :
                            <img className="productCardInProductList-card__img" alt="productImage" src={Logo} width="200px" />
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