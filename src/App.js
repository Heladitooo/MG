import React from 'react';
import ProductsList from "./components/productsList/productsList";
import Header from "./components/header/header";
import UserList from "./components/userList/userList";
import SendUserList from "./components/sendUserList";

import { connect } from "react-redux";
import { getAPI } from './redux/actions';

class App extends React.Component {

  componentDidMount() {

    //Hacemos una llamada a la API
    fetch("http://192.168.1.88:3010/info")
      .then(
        (res) => {
          return res.json();
        }
      ).then((data) => {

        //Si obtiene una respuesta va a actualizar response a fetched para que traiga los datos a los otros componentes
        this.props.getAPI({
          response: "fetched",
          productList: data.rows
        });
      }).catch((error) => {
        this.props.getAPI({
          response: "error",
        });
      })
      
  }

  render() {
    return (
      <div>
        <Header>
          {/* <SendUserList father={this.state} count={this.state.count} count={this.state.count} /> */}
        </Header>
        <UserList />
        <ProductsList />
      </div>
    );
  }
}

export default connect(null, {
  getAPI
})(App);
