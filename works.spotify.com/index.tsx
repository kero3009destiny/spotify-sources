import 'react-app-polyfill/stable';
import { render } from 'react-dom';
import Raven from 'raven-js';
import '@spotify-internal/encore-web/css/encore-creator-light-theme.css';
import GlobalStyles from 'app/GlobalStyles';
import { BrowserRouter } from 'react-router-dom';
import App from 'app/App';
import { queryCache } from 'init';
import { ReactQueryCacheProvider } from 'react-query';

if (process.env.NODE_ENV === 'production') {
  Raven.config('https://5a8ddf686a674ae5bf6785e93915f70b@sentry.io/1259625', {
    release: document.body.dataset.version,
    captureUnhandledRejections: true,
  }).install();
}

render(
  <div className="encore-creator-light-theme">
    <GlobalStyles />
    <ReactQueryCacheProvider queryCache={queryCache}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactQueryCacheProvider>
  </div>,
  document.getElementById('root'),
);
