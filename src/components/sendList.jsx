import React from "react";
import numberWithPoints from "../numberWithPoints";

class SendList extends React.Component {
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
            this.props.father.originalList.rows.map((data) => {
                if (data.productAmount > 0) {
                    userList.push(data);
                }
            })
            
            return (
                <div>
                    <button onClick={() => {
                        fetch("http://192.168.1.88:3010/send", {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(userList)
                        })
                    }}>enviar</button>
                </div>
            )
        }

    }
}

export default SendList;