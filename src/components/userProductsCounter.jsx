//--Contador del total--

import React from "react";
import numberWithPoints from "../numberWithPoints";

import "../styles/userProductsCounter.css";

import { connect } from "react-redux";

let oldValue = 0;
let countedProducts = 0;
let userProductsCounterAnimationClass = "userProductsCounterEntry";

class userProductsCounter extends React.Component {

    render() {

        //valor anterior
        oldValue = countedProducts;

        countedProducts = 0;

        //Si hay productos en la lista del usuario los va a sumar
        if (this.props.userList.length > 0) {


            for (let index = 0; index < this.props.userList.length; index++) {
                countedProducts += this.props.userList[index].productPriceWithAmount;
            }

            console.log(oldValue);
        }

        //Clase que vamos a usar para las animaciones de cambio de precio
        if (userProductsCounterAnimationClass === "userProductsCounterEntry") {
            userProductsCounterAnimationClass = "userProductsCounterReEntry";
        } else {
            userProductsCounterAnimationClass = "userProductsCounterEntry";
        }

        return (
            <div>
                <h1>Total <br /> <div className={userProductsCounterAnimationClass}>{numberWithPoints(countedProducts)}</div></h1>
            </div>
        )
    }
}

const mapStateToProps = (data) => {
    return {
        userList: data.userList
    }
}

export default connect(mapStateToProps)(userProductsCounter);