import React from "react";
import "../../styles/userList/userList.css";

import { connect } from "react-redux";
import ProductCardInUserList from "./productCardInUserList";

import MenuContainer from "../menuContainer";

class UserList extends React.Component {
    
    render() {

        //Clase que vamos a usar para las animaciones de entrada y salida
        let userListContainerStyle = this.props.renderMenu === "userList" ? "userListEntry" : "userListExit";

        if (this.props.renderMenu !== "none") {
            return (
                <MenuContainer animationClass={userListContainerStyle} >
                    <div className="userList">
                        {
                            this.props.userList.map((data) => {
                                return <ProductCardInUserList key={data.productName} product={data} {...data} />
                            })
                        }
                    </div>
                </MenuContainer>
            )
        } else {
            return null;
        }


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