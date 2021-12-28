import React from 'react';

import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as Sentry from '@sentry/browser';

const sentryProductionDSN = 'https://f9188a49a1284eaab35637f562ac768a@sentry.io/1445579';
const sentryDevelopmentDSN = 'https://4d1efba2c3f846d8bbbdd7a83ffe8bf2@sentry.io/1308211';

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

// Imports all styles
import './index.css';
Sentry.init({
  dsn: isProduction() ? sentryProductionDSN : sentryDevelopmentDSN,
});
ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
),
document.getElementById('root'),
);
