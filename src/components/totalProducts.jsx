import React from "react";
import numberWithPoints from "../numberWithPoints";

class TotalProducts extends React.Component{
    render(){
        return(
            <div>
                <h1>Total {numberWithPoints(this.props.count)}</h1>
            </div>
        )
    }
}

export default TotalProducts;