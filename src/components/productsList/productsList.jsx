import React from "react";
import "../../styles/productList/productList.css";
import Loading from "../../img/loading.gif"

import { FixedSizeList as List } from 'react-window';

import { connect } from "react-redux";

import ProductCard from "./productCardInProductList";

let oldFilterProductList = [];

class ProductsList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            productListAnimationClass: "productList"
        }
    }

    componentWillReceiveProps(newProps){
        if(newProps.filterProductList === this.props.filterProductList){
            this.setState({
                productListAnimationClass: "productList"
            })
        } else {
            if(this.state.productListAnimationClass === "productListEntry"){
                this.setState({
                    productListAnimationClass: "productListReEntry"
                })
            } else {
                this.setState({
                    productListAnimationClass: "productListEntry"
                })
            }
            
        }
    }

    render() {

        if (this.props.responseStatus === "fetching") {

            return (
                <div className="productList__wait">
                    <img className="wait__img" src={Loading} alt="" />
                </div>
            )

        } else if (this.props.responseStatus === "error") {

            return (
                <div className="productList__wait">
                    <h1>A ocurrido un problema de nuestra parte, llama a: 92012902</h1>
                </div>
            )
        } else {

            if (this.props.filterProductList.length > 0) {

                const Row = ({ index, style }) => (
                    <div key={this.props.filterProductList[index].productName} className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
                        <ProductCard product={this.props.filterProductList[index]} />
                    </div>
    
                );

                return (
                    <List
                        className={"productList__container " + this.state.productListAnimationClass}
                        height={1000}
                        itemCount={this.props.filterProductList.length}
                        itemSize={200}
                        width={300}
                    >
                        {Row}
                    </List>
                )

            } else {

                return (
                    <h1 className="productList__404">no se encontraron productos con ese nombre :(</h1>
                )
            }


        }

    }
}

const mapStateToProps = (data) => {
    return {
        responseStatus: data.responseStatus,
        productList: data.productList,
        filterProductList: data.filterProductList
    }
}

export default connect(mapStateToProps)(ProductsList);