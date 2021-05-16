import React from "react";
import "../styles/listText.css";
import Loading from "../img/loading.gif"
import numberWithPoints from "../numberWithPoints";

class ListText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changePanel: true,
            toExit: 3,
        }
    }
    render() {
        if (this.props.father.fetched === false && this.props.father.fetchError === false) {
            return (
                <img className="wait__img" src={Loading} alt="" />
            )
        } else if (this.props.father.fetched === true && this.props.father.fetchError === true) {
            return (
                <h1></h1>
            )
        }
        else {
            let stylePanel = this.state.changePanel ? "downPanel" : "upPanel";
            
            window.onhashchange = ()=>{
                if(!window.location.href.includes("list")){
                    if(this.state.toExit > 0){
                        window.location.href = "#all";
                        console.log(this.state.toExit)
                        this.setState({
                            toExit: this.state.toExit-1
                        })
                    }
                    
                    this.setState({
                        changePanel: true
                    })
                }
            }
            
            return (
                <div className="listText__container">
                    <button className="listText__button" onClick={() => {
                        this.setState({
                            changePanel: false
                        })
                    }}><a href={"/#list"}>mostrar lista</a></button>
                    <div className={stylePanel}>
                        <button className="listText__button" onClick={() => {
                            this.setState({
                                changePanel: true,
                                toExit: 3
                            })
                        }}>x</button>
                        {
                            this.props.father.originalList.rows.map((data) => {
                                if (data.productAmount > 0) {
                                    return (
                                        <div key={data.productName} className="listText-target">
                                            <div>
                                                <h1>({data.productAmount}){data.productName} {numberWithPoints(data.productPriceWithAmount)}</h1>
                                                <img src={data.productImage} />
                                            </div>

                                            <div>
                                                <div className="target-panel">
                                                    <button className="target-panel__buttonDelete" onClick={() => {
                                                        this.props.updateList(data.productName, "remove")
                                                    }}>x</button>
                                                    <button className="target-panel__buttonUp" onClick={() => {
                                                        this.props.updateList(data.productName, "add")
                                                    }}>+</button>
                                                    <button className="target-panel__buttonDown" onClick={() => {
                                                        this.props.updateList(data.productName, "subtract")
                                                    }}>-</button>
                                                </div>
                                            </div>

                                        </div>

                                    )
                                }
                            })
                        }
                    </div>
                </div>
            )
        }
    }
}

export default ListText;