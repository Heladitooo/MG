import React from "react";
import "../styles/sendList.css";

class SendList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changePanel: true,
            userData: {
                name: "",
                number: "",
                direction: ""
            }
        }
    }
    render() {
        if (this.props.father.fetched === false && this.props.father.fetchError === false) {
            return (
                <img className="wait__img" src="" alt="" />
            )
        } else if (this.props.father.fetched === true && this.props.father.fetchError === true) {
            return (
                <h1></h1>
            )
        }
        else {
            let userList = [];

            let stylePanel = this.state.changePanel ? "SdownPanel" : "SupPanel";

            this.props.father.originalList.rows.map((data) => {
                if (data.productAmount > 0) {
                    userList.push(data);
                }
            })
            return (

                <div className="sendList__container">
                    <button className="sendList-button" onClick={() => {
                        this.setState({
                            changePanel: false
                        })
                    }}><a href={"/#list"} className="-button__a">enviar pedido ✓</a></button>
                    <div className={stylePanel}>
                        <div className="sendList">
                            <button className="sendList__button" onClick={() => {
                                this.setState({
                                    changePanel: true,
                                })
                            }}>x</button>
                            <div>
                                <h4>Nombre</h4>
                                <input type="text" name="Nombre" placeholder="Nombre" onChange={(e) => {
                                    this.setState({
                                        userData: {
                                            ...this.state.userData,
                                            name: e.target.value
                                        }
                                    })
                                }} />
                            </div>
                            <div>
                                <h4>Número telefonico</h4>
                                <input type="number" placeholder="Número telefonico" onChange={(e) => {
                                    this.setState({
                                        userData: {
                                            ...this.state.userData,
                                            number: e.target.value
                                        }
                                    })
                                }} />
                            </div>
                            {/* usar google maps */}

                            <div>
                                <h4>Direccíon</h4>
                                <input type="text" placeholder="Direccíon" onChange={(e) => {
                                    this.setState({
                                        userData: {
                                            ...this.state.userData,
                                            direction: e.target.value
                                        }
                                    })
                                }} />
                            </div>
                            <button className="sendList__sendButton" onClick={() => {
                                fetch("http://192.168.1.88:3010/send", {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ data: this.state.userData, rows: userList })
                                })
                            }}>Enviar pedido ✓</button>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default SendList;