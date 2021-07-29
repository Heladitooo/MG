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
                            

                        </div>
                    </div>
                )
            }
        }
    }
}

export default SendUserList;