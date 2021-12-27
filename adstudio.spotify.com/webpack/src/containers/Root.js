import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { Router } from 'react-router';
import { document } from 'global';
import routes from 'routes';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import { advertisingTheme } from '@spotify-internal/encore-advertising-web/cjs/styles/themes';
import {
  advertisingLightTheme,
  App,
  aquamarine180,
  createBasicColorSet,
  cssColorSet,
  EncoreProvider,
  GlobalStyles,
} from '@spotify-internal/encore-web';
import { RemoteConfigProvider } from '@spotify-internal/remote-config-resolver-react';
import {
  asNanoseconds,
  MetricTypes,
  sendMetric,
  Time,
} from '@spotify-internal/semantic-metrics';
import { BrowserMetrics } from '@spotify-internal/semantic-metrics/cjs/browser';

import { saveCurrentRoute as saveCurrentRouteAC } from 'ducks/routes/actions';
import { getPreferences } from 'ducks/userPreferences/actions';
import {
  documentVisibilityUpdate as documentVisibilityUpdateAC,
  scrollTo as scrollToAC,
} from 'ducks/window/actions';
import { getLangLastChanged } from '../ducks/i18n/selectors';
import { getUser } from '../ducks/user/selectors';

import { resolver } from 'utils/remoteconfig/resolver';

import PropTypes from 'prop-types';

const AppStyled = styled(App)`
  > main {
    padding-left: 0;
    padding-right: 0;
    background: rgba(250, 250, 250, 0.7);
  }
`;

/** The following code generates an accessible colorSet for all checked inputs (checkboxes and radio buttons)
 * This prevents checkboxes and radio buttons from using different colorSets. Therefore, this should only be temporary.
 * The ideal solution would be to add a checkbox accent color to our advertising theme and colorSets
 */

const brightAccent = advertisingLightTheme.brightAccent.background.base;

const jsCheckedInputColorSet = createBasicColorSet(aquamarine180, brightAccent);
const cssCheckedInputColorSet = cssColorSet(jsCheckedInputColorSet);

const CheckedInputOverrideStyles = createGlobalStyle`
  /* Updates the color set for all checked inputs to use aquamarine as a foreground color */
  input:checked + label > span:first-of-type {
    ${cssCheckedInputColorSet}
  }
`;

class Root extends Component {
  constructor(props) {
    super(props);
    this.removeHistoryListener = () => {};
    this.onDocumentVisiblityChanged = this.onDocumentVisiblityChanged.bind(
      this,
    );
  }

  componentDidMount() {
    this.removeHistoryListener = this.listenForRouteChange();
    this.listenForWindowFocus();

    const REPORTING_DELAY = 3000;

    // Give child components some time to render, then report on browser metrics
    setTimeout(() => {
      const noop = e => {
        // Either a very old browser or we're running integration tests.
        // Nothing we can do. Not the end of the world.
      };

      BrowserMetrics.getPageLoadTime()
        .then(pageLoadTime => {
          sendMetric({
            metric_type: MetricTypes.TIMER,
            what: 'time-to-page-load-nanoseconds',
            value: asNanoseconds(Time.fromMillis(pageLoadTime).asNanos()),
          });
        })
        .catch(noop);

      BrowserMetrics.getTimeToFirstPaint()
        .then(timeToFirstPaint => {
          sendMetric({
            metric_type: MetricTypes.TIMER,
            what: 'time-to-first-paint-nanoseconds',
            value: asNanoseconds(Time.fromMillis(timeToFirstPaint).asNanos()),
          });
        })
        .catch(noop);

      BrowserMetrics.getTimeToFirstContentfulPaint()
        .then(timeToFirstContentfulPaint => {
          sendMetric({
            metric_type: MetricTypes.TIMER,
            what: 'time-to-first-contentful-paint-nanoseconds',
            value: asNanoseconds(
              Time.fromMillis(timeToFirstContentfulPaint).asNanos(),
            ),
          });
        })
        .catch(noop);
    }, REPORTING_DELAY);
  }

  componentWillUnmount() {
    this.removeHistoryListener();
    this.removeWindowFocusListener();
  }

  onDocumentVisiblityChanged() {
    this.props.documentVisibilityUpdate(!document.hidden);
  }

  listenForRouteChange() {
    const { history, saveCurrentRoute, scrollTo } = this.props;
    // history returns a function that unsubscribes the listener later
    return history.listen(location => {
      saveCurrentRoute(location.pathname);
      scrollTo(0, 0);
    });
  }

  listenForWindowFocus() {
    document.addEventListener(
      'visibilitychange',
      this.onDocumentVisiblityChanged,
    );
  }

  removeWindowFocusListener() {
    document.removeEventListener(
      'visibilitychange',
      this.onDocumentVisiblityChanged,
    );
  }

  render() {
    const { store, history, langLastChanged } = this.props;
    return (
      <AppStyled
        sidebarWidth="0px"
        contentMaxWidth="9999px"
        content={
          <Provider store={store} langLastChanged={langLastChanged}>
            <RemoteConfigProvider resolver={resolver}>
              <GlobalStyles />
              <CheckedInputOverrideStyles />
              {/* Todo: remove this config line when we finish migrating types */}
              <EncoreProvider config={{ deprecated: ['type'] }}>
                <ThemeProvider theme={advertisingTheme}>
                  {/* HOC of React Context */}
                  <Router history={history} routes={routes()} />
                </ThemeProvider>
              </EncoreProvider>
            </RemoteConfigProvider>
          </Provider>
        }
      />
    );
  }
}

Root.propTypes = {
  documentVisibilityUpdate: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  langLastChanged: PropTypes.number,
  saveCurrentRoute: PropTypes.func.isRequired,
  scrollTo: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
  userId: PropTypes.string,
  getUserPreferences: PropTypes.func.isRequired,
};

export const mapStateToProps = state => {
  const user = getUser(state);
  return {
    langLastChanged: getLangLastChanged(state),
    userId: user && user.id,
  };
};

export default connect(mapStateToProps, {
  documentVisibilityUpdate: documentVisibilityUpdateAC,
  saveCurrentRoute: saveCurrentRouteAC,
  scrollTo: scrollToAC,
  getUserPreferences: getPreferences,
})(Root);
