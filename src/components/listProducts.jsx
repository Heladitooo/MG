import React from "react";
import "../styles/listProducts.css";
import Loading from "../img/loading.gif"
import numberWithPoints from "../numberWithPoints";
import { FixedSizeList as List } from 'react-window';
import Logo from "../img/logo.png";

class ListProducts extends React.Component {
    render() {
        if (this.props.father.fetched === false && this.props.father.fetchError === false) {
            return (
                <div className="listProducts__wait">
                    <img className="wait__img" src={Loading} alt="" />
                </div>
            )
        } else if (this.props.father.fetched === true && this.props.father.fetchError === true) {
            return (
                <div className="listProducts__wait">
                    <h1>A ocurrido un problema de nuestra parte, llama a: 92012902</h1>
                </div>
            )
        } else {
            const Row = ({ index, style }) => (
                <div key={this.props.father.list.rows[index].productName} className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
                    <div className="listProducts-card">
                        {
                            this.props.father.list.rows[index].productAvailable ?
                                <div className="card-panel ">
                                    <button className="card-panel__buttonUp" onClick={() => {
                                        this.props.updateList(this.props.father.list.rows[index].productName, "add")
                                    }}>+</button>
                                    <button className="card-panel__buttonDown" onClick={() => {
                                        this.props.updateList(this.props.father.list.rows[index].productName, "subtract")
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
                            <img className="listProducts-card__img" src={this.props.father.list.rows[index].productImage} width="200px" onError={
                                () => this.img.src = Logo
                            } />
                            <h1 className="listProducts-card__name">{this.props.father.list.rows[index].productName}</h1>
                        </div>

                        <div className="listProducts-card__price-container">

                            <h1 className="listProducts-card__price">{numberWithPoints(this.props.father.list.rows[index].productPrice)}</h1>

                            <h1 className="listProducts-card__amount">Cantidad
                                        <div Style="color: black;" className="card-div">
                                    {this.props.father.list.rows[index].productAmount}
                                </div>
                            </h1>
                            <h1 className="listProducts-card__priceWithAmount">Valor compra <br />
                                <div Style="color: black;" className="card-div">
                                    {numberWithPoints(this.props.father.list.rows[index].productPriceWithAmount)}
                                </div></h1>

                        </div>

                    </div>
                </div>
            );

            if (this.props.father.list.rows.length > 0) {
                return (
                    <List
                        className="listProducts__container"
                        height={1000}
                        itemCount={this.props.father.list.rows.length}
                        itemSize={200}
                        width={300}
                    >
                        {Row}
                    </List>
                )
            } else {
                return (
                    <h1 className="listProducts__404">no se encontraron productos con ese nombre :(</h1>
                )
            }

        }

    }
}

export default ListProducts;