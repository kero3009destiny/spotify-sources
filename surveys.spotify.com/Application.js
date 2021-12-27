import App from './containers/App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './lib/configureStore';

export default class Application {
  renderApp(store) {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
  }

  start() {
    const store = configureStore();
    this.renderApp(store);
  }
}



// WEBPACK FOOTER //
// ./src/Application.js