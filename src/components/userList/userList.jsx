import React from "react";
import "../../styles/userList/userList.css";

//Manejo de animaciones de entrada y salida
import { CSSTransition } from 'react-transition-group';

import { connect } from "react-redux";
import ProductCardInUserList from "./productCardInUserList";

import MenuContainer from "../menuContainer";

class UserList extends React.Component {

    render() {
        return (
            <CSSTransition
                in={this.props.renderMenu === "userList"}
                timeout={500}
                classNames="userList"
                unmountOnExit
                appear>
                <MenuContainer >
                    <div className="userList">
                        {
                            this.props.userList.map((data) => {
                                return <ProductCardInUserList key={data.productName} product={data} {...data} />
                            })
                        }
                    </div>
                </MenuContainer>
            </CSSTransition>

        )
    }
}

const mapStateToProps = (data) => {
    return {
        responseStatus: data.responseStatus,
        userList: data.userList,
        renderMenu: data.renderMenu,
    }
}
export default connect(mapStateToProps)(UserList);