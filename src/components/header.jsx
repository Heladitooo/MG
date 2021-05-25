import React, { useImperativeHandle } from "react";
import TotalProducts from "./totalProducts";
import "../styles/header.css";
import Logo from "../img/miniLogo.png";

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
                        <TotalProducts count={this.props.count} />
                        <div className="header-inputContainer">
                            <input className="header__input" type="text" value={this.state.inputText} placeholder="buscar..." onChange={(e) => {
                                this.setState({
                                    inputText: e.target.value
                                })
                                this.props.updateList(e, "search");
                            }} />
                            {
                                this.state.inputText.length > 0 &&
                                <button className="header__buttonInput" onClick={() => {
                                    this.setState({
                                        inputText: ""
                                    })
                                    this.props.updateList("none", "cleanSearch");
                                }}>x</button>
                            }
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Header;