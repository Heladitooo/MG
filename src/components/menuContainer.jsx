import React from "react";

import { connect } from "react-redux";
import { renderMenu } from "../redux/actions";

import "../styles/menuContainer.css"

class MenuContainer extends React.Component {
    render() {
        return (
            <div className="menuContainer">
                {this.props.children}
            </div>
        )
    }
}


export default connect(null, {
    renderMenu
})(MenuContainer);

