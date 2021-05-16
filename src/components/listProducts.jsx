import React from "react";
import "../styles/listProducts.css";
import Loading from "../img/loading.gif"
import numberWithPoints from "../numberWithPoints";

class ListProducts extends React.Component {
    render() {
        if (this.props.father.fetched === false && this.props.father.fetchError === false) {
            return (
                <div className="listProducts__wait">
                    <img className="wait__img" src={Loading} alt="" />
                </div>
            )
        } else if(this.props.father.fetched === true && this.props.father.fetchError === true){
            return (
                <div className="listProducts__wait">
                    <h1>A ocurrido un problema de nuestra parte, llama a: 92012902</h1>
                </div>
            )
        } else {

            return (
                <div className="listProducts__container">
                    {
                        this.props.father.list.rows.map((data) => {
                            return (
                                <div key={data.productName} className="listProducts-card">
                                    {
                                        data.productAvailable ?
                                            <div className="card-panel">
                                                <button className="card-panel__buttonUp" onClick={() => {
                                                    this.props.updateList(data.productName, "add")
                                                }}>+</button>
                                                <button className="card-panel__buttonDown" onClick={() => {
                                                    this.props.updateList(data.productName, "subtract")
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
                                        <img className="listProducts-card__img" src={data.productImage} width="200px" />
                                        <h1 className="listProducts-card__name">{data.productName}</h1>
                                    </div>

                                    <div>

                                        <h1 className="listProducts-card__price">{numberWithPoints(data.productPrice)}</h1>

                                        <h1 className="listProducts-card__amount">Cantidad
                                        <div Style="color: black;" className="card-div">
                                                {data.productAmount}
                                            </div>
                                        </h1>
                                        <h1 className="listProducts-card__priceWithAmount">Valor compra <br />
                                            <div Style="color: black;" className="card-div">
                                                {numberWithPoints(data.productPriceWithAmount)}
                                            </div></h1>

                                    </div>






                                </div>

                            )
                        })
                    }

                </div>
            )
        }

    }
}

export default ListProducts;