import React from "react";

//Manejo de animaciones de entrada y salida
import { CSSTransition } from 'react-transition-group';

import { connect } from "react-redux";

import "../styles/userDataForm.css"
import MenuContainer from "./menuContainer";

class UserDataForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            verificationText: "",

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

        return (
            < CSSTransition
                in={this.props.renderMenu === "userDataForm"}
                timeout={0}
                classNames="userDataForm"
                mountOnEnter = {true}
            >
                <MenuContainer>
                    <div className="userDataForm-overflowContainer">
                        <div className="userDataForm">
                            <div><p>El pago sera realizado en contra entrega en efectivo o con datafono</p> <p className="userDataForm__Alert">{this.state.verificationText}</p></div>
                            <div ref={this.state.refs.nameRef}
                                onFocus={() => {
                                    
                                    //Cuando se haga hover va a subir el elemento
                                    this.state.refs.nameRef.current.scrollIntoView({ behavior: "smooth"});
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
                                    this.state.refs.numberRef.current.scrollIntoView({ behavior: "smooth"});
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
                                    this.state.refs.directionRef.current.scrollIntoView({ behavior: "smooth"});
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
                            <button className="userDataForm__sendButton" onClick={() => {
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
                                else if (this.props.userList.length < 1) {
                                    this.setState({
                                        verificationText: "Necesitas al menos añadir un producto"
                                    })
                                }
                                else {

                                    this.setState({
                                        verificationText: "Enviando..."
                                    })

                                    fetch("http://191.91.209.27:3010/send", {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ data: this.state.userData, rows: this.props.userList })
                                    })
                                    .then(()=>{
                                        this.setState({
                                            verificationText: "¡Enviado!"
                                        })
                                    })
                                    .catch(()=>{
                                        this.setState({
                                            verificationText: "A ocurrido un problema de nuestra parte, llama 123890213 a para pedir tu pedido"
                                        })
                                    })
                                }
                            }}>Enviar pedido ✓</button>
                        </div>
                    </div>
                </MenuContainer>
            </ CSSTransition>
        )

    }
}


const mapStateToProps = (data) => {
    return {
        renderMenu: data.renderMenu,
        userList: data.userList
    }
}

export default connect(mapStateToProps)(UserDataForm);