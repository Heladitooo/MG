import React from "react";
import UserProductsCounter from "../userProductsCounter";
import "../../styles/header.css";
import Logo from "../../img/miniLogo.png";

import { connect } from "react-redux";
import { renderMenu, filterProductList } from "../../redux/actions";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: ""
        }
    }
    render() {
        return (
            <div className="header-container">
                <div className="header">
                    <div className="header-panel">
                        <img src={Logo} alt="logo" className="header__img" />
                        <UserProductsCounter />
                        <div className="header-inputContainer">
                            <input className="header__input" type="text" value={this.state.inputText} placeholder="buscar..." onChange={(e) => {
                                this.setState({
                                    inputText: e.target.value
                                })

                                this.props.filterProductList({
                                    searchText: e.target.value
                                })

                                
                            }} />

                            {
                                this.state.inputText.length > 0 &&
                                <button className="header__buttonInput" onClick={() => {
                                    this.setState({
                                        inputText: ""
                                    })

                                    this.props.filterProductList({
                                        searchText: ""
                                    })
                                  
                                }}>x</button>
                            }
                        </div>
                    </div>

                    <div className="header-buttons">
                        <button className="header-buttons__button" onClick={() => {
                            if(this.props.renderMenuD === "userList"){
                                this.props.renderMenu("productsList");
                            } else {
                                this.props.renderMenu("userList");
                            }
                        }}><a className="header-buttons__a"> <span class="icon-cart"></span> mostrar pedido</a></button>

                        <button className="sendList-button" onClick={() => {
                            
                        }}><a className="-button__a">enviar pedido <span class="icon-checkbox-checked"></span></a></button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (data) => {
    return {
        renderMenuD: data.renderMenu
    }
   
}

export default connect(mapStateToProps, {
    renderMenu,
    filterProductList
})(Header);