import React from "react";
import "../styles/sendList.css";

class SendList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changePanel: true,
            verificationText: "",
            correctForm: false,
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
            if (this.state.correctForm === true) {
                return (
                    <div className="alert-container">
                        <div className="alert">
                            <h1>¡Tu pedido a sido realizado! :D</h1>
                            <p>Aproximadamente en 30 minutos nos podremos en contacto contigo</p>
                            <button onClick={(e) => {
                                window.onbeforeunload = () => { return null; }
                                window.location.reload(true);
                            }}>Realizar un nuevo pedido</button>
                        </div>
                    </div>
                )
            } else {
                
                    window.onbeforeunload = () => { return "¿Seguro que quieres salir?"; }
                
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
                                <div>{this.state.verificationText}</div>
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
                                {/* reserva */}
                                <div>
                                    <h4>Direccíon de recidencia</h4>
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
                                    if (this.state.userData.name.length === 0) {
                                        this.setState({
                                            verificationText: "Porfavor escribe un nombre"
                                        })
                                    } else if (this.state.userData.name.length < 2) {
                                        this.setState({
                                            verificationText: "Porfavor escribe un nombre mas largo"
                                        })
                                    }
                                    else if (this.state.userData.number.length === 0) {
                                        this.setState({
                                            verificationText: "Porfavor escribe un número telefonico"
                                        })
                                    }
                                    else if (this.state.userData.number.length > 10) {
                                        this.setState({
                                            verificationText: "Porfavor escribe un número telefonico valido"
                                        })
                                    }
                                    else if (this.state.userData.direction.length === 0) {
                                        this.setState({
                                            verificationText: "Porfavor escribe una direccíon valida"
                                        })
                                    }
                                    else if (this.props.count < 1) {
                                        this.setState({
                                            verificationText: "Necesitas al menos añadir un producto"
                                        })
                                    }
                                    else {
                                        fetch("http://192.168.1.88:3010/send", {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ data: this.state.userData, rows: userList })
                                        })
                                        this.setState(
                                            {
                                                correctForm: true
                                            }
                                        )
                                    }
                                }}>Enviar pedido ✓</button>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}

export default SendList;