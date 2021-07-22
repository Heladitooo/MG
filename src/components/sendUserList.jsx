import React from "react";
import "../styles/sendUserList.css";
import numberWithPoints from "../numberWithPoints";
import Logo from "../img/logo.png";

class SendUserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changePanel: true,
            verificationText: "",
            correctForm: false,

            refs: {
                nameRef: React.createRef(),
                numberRef: React.createRef(),
                directionRef: React.createRef(),
            },

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
                <h1>Error</h1>
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
                    <div className="sentAlert-container">
                        <div className="sentAlert">
                            <img className="sentAlert__img" src={Logo} alt="logo" />
                            <div>
                                <h2>¡Tu pedido a sido realizado!</h2>
                                <p>Te llamaremos en pocos minutos para confirmar tu pedido</p>
                            </div>


                            <div className="sentAlert-userData">

                                <h4>Total: <span className="userData__total">{numberWithPoints(this.props.count)}</span></h4>
                                <h4>Nombre: {this.state.userData.name}</h4>
                                <h4>Número: {this.state.userData.number}</h4>
                                <h4>Dirección: {this.state.userData.direction}</h4>
                            </div>

                            <p>El pedido que acabas de hacer es:</p>
                            <div className="sentAlert-list">
                                {
                                    this.props.father.originalList.rows.map((data) => {
                                        if (data.productAmount > 0) {
                                            return (
                                                <div key={data.productName} className="listText-target">
                                                    <div>
                                                        <h1>({data.productAmount}){data.productName} {numberWithPoints(data.productPriceWithAmount)}</h1>
                                                        <img src={data.productImage} alt={data.productImage} />
                                                    </div>
                                                </div>

                                            )
                                        }
                                    })
                                }
                            </div>
                            <button onClick={(e) => {
                                window.onbeforeunload = () => { return null; }
                                window.location.reload(true);
                            }}>Realizar un nuevo pedido</button>
                        </div>
                    </div>
                )
            } else {

                //Pregunta si quieres salir de la pagína
                window.onbeforeunload = () => { return "¿Seguro que quieres salir?"; }


                return (
                    <div className="sendList__container">
                        
                        <div className={stylePanel}>
                            <div className="sendList-overflowContainer">
                                <div className="sendList">
                                    <button className="sendList__button" onClick={() => {
                                        this.setState({
                                            changePanel: true,
                                        })
                                    }}>x</button>
                                    <div><p>El pago sera realizado en contra entrega en efectivo o con datafono</p> <p className="sendList__Alert">{this.state.verificationText}</p></div>
                                    <div ref={this.state.refs.nameRef}
                                        onFocus={() => {
                                            //Cuando se haga hover va a subir el elemento
                                            this.state.refs.nameRef.current.scrollIntoView();
                                        }}>
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
                                    <div ref={this.state.refs.numberRef}
                                        onFocus={() => {
                                            //Cuando se haga hover va a subir el elemento
                                            this.state.refs.numberRef.current.scrollIntoView();
                                        }} >
                                        <h4>Número telefonico</h4>
                                        <input type="number" placeholder="Número telefonico" onChange={(e) => {
                                            this.setState({
                                                userData: {
                                                    ...this.state.userData,
                                                    number: e.target.value
                                                }
                                            })
                                        }}
                                        />
                                    </div>
                                    <div ref={this.state.refs.directionRef}
                                        onFocus={() => {
                                            //Cuando se haga hover va a subir el elemento
                                            this.state.refs.directionRef.current.scrollIntoView();
                                        }}  >
                                        <h4>Direccíon de recidencia</h4>
                                        <input type="text" placeholder="Direccíon" onChange={(e) => {
                                            this.setState({
                                                userData: {
                                                    ...this.state.userData,
                                                    direction: e.target.value
                                                }
                                            })
                                        }}
                                        />
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
                    </div>
                )
            }
        }
    }
}

export default SendUserList;