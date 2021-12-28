import React from "react";
import ReactDOM from "react-dom";

// redux init
import { Provider } from 'react-redux'
import store from "./store";

import App from './app';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));