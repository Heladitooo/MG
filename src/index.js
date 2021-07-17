import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';


//Importamos nuestra store
import store from "./redux/store";

//El provider proveera del store a toda la app
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

