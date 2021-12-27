import React from 'react';
import { render } from 'react-dom';
import debug from 'debug';

import '@spotify-internal/encore-web/css/encore-advertising-light-theme.css';

import createHistory from 'store/createHistory';
import createStore from 'store/createStore';

import { getUserInfo } from 'api/user';
import Root from 'containers/Root';

import { resolver } from 'utils/remoteconfig/resolver';

import { initTracing } from './tracing';

import { getEnvironmentConfig } from 'config/environment';

const log = debug('startup:app');

async function startupApp() {
  log('Starting up app');

  const env = await getEnvironmentConfig('env');

  initTracing(env);

  try {
    const userData = await getUserInfo();
    await resolver.resolve({ userKey: userData.id });
  } catch (e) {
    log('Attempted to fetch user data and bootstrap remote config.');
    log('Falling back to redux saga.');
  }

  const debugMode = await getEnvironmentConfig('debug');
  const store = await createStore();
  const history = createHistory(store);
  const root = document.getElementById('root');
  document.body.classList.add('encore-advertising-light-theme');

  if (!debugMode) {
    log('Rendering main app');
    return render(<Root store={store} history={history} />, root);
  }

  // dev rendering
  log('Rendering hot-reloading app');
  const { AppContainer } = require('react-hot-loader');

  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    root,
  );

  if (module.hot) {
    module.hot.accept('containers/Root', () => {
      const NextRoot = require('containers/Root');
      render(
        <AppContainer>
          <NextRoot store={store} history={history} />
        </AppContainer>,
        root,
      );
    });
  }
}

startupApp();

export default startupApp;
