import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './Certomato.less';

import Navigation from '../components/Navigation';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import TestGroupPage from './TestGroupPage';
import b64DecodeUnicode from '../utils/b64DecodeUnicode';
import Harmony from 'spotify-harmony';
import Certification from './Certification';
import Submit from './Submit';
import Stats from './Stats';
import Auth from '../utils/Auth';
import CertomatoStart from './LandingPage/CertomatoStart';
import StartNew from './StartNew';
import TestStats from './TestStats';
import Dashboard from './Dashboard';
import Builds from './Builds';
import Organization from './Organization';
import OrganizationEdit from './OrganizationEdit';
import User from './User';
import Faq from './Faq';
import Support from './Support';
import NewProductApplicationForm from './NewProductApplicationForm';

import {connect} from 'react-redux';
import {getTests, startNotApplicable, startTest, startClearSection} from '../redux/actions/testsActions';
import {
  getTestResults,
  stopRunningTests,
  updateTestResults,
  closePrompt,
} from '../redux/actions/testResultsActions';
import {
  contextPlayerStateChanged,
  lastActiveDeviceInfoChanged,
  trackProgressChanged,
} from '../redux/actions/playerActions';
import {
  getUserInfo,
} from '../redux/actions/userActions';
import {
  displayApiBanner,
  dismissApiBanner,
} from '../redux/actions/accessManagementActions';
import { getConnectDevices } from '../redux/actions/connectDevicesActions';
import Utils from '../utils/Utils';
import Header from '../components/Header';
import NowPlayingBarContainer from './NowPlayingBarContainer';
import WarningBanner from '../components/WarningBanner';
import ErrorBanner from '../components/ErrorBanner';
import AccessManagement from './AccessManagement';
import ApiBanner from '../components/ApiBanner';

class Certomato extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionId: '',
      harmonyClient: null,
      running: false,
      dut2: {id: '', name: ''},
    };
    this.clearTests = this.clearTests.bind(this);
    this.setTestsNotApplicable = this.setTestsNotApplicable.bind(this);
    this.runTests = this.runTests.bind(this);
    this.stopTests = this.stopTests.bind(this);
  }

  componentDidMount() {
    if (this.props.certSession?.sessionId) {
      this.props.getTestResults(this.props.certSession.sessionId);
      this.props.getTests(this.props.certSession?.sessionId);
    }
    this.props.getConnectDevices();
    this.connectToPusher();
    this.initHarmony();
    this.props.getUserInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.certSession?.sessionId !== this.props.certSession?.sessionId && !!this.props.certSession?.sessionId) {
      this.props.getTestResults(this.props.certSession.sessionId);
      this.props.getTests(this.props.certSession?.sessionId);
    }
  }

  setTestsNotApplicable(tests, alternative, input) {
    this.setNotApplicable(tests, alternative, input);
  }

  setNotApplicable(id, alternative, input) {
    this.props.startNotApplicable(id, alternative, this.props.certSession.dut1.id, this.state.dut2.id,
      this.state.connectionId, input, this.props.certSession.sessionId);
  }

  clearTests(tests, alternative, input) {
    this.clear(tests, alternative, input);
  }

  clear(id, alternative, input) {
    this.props.startClearSection(id, alternative, this.props.certSession.dut1.id, this.state.dut2.id,
      this.state.connectionId, input, this.props.certSession.sessionId);
  }

  runTests(tests, alternative, input) {
    this.startTest(tests, alternative, input);
  }

  startTest(id, alternative, input) {
    this.props.startTest(id, alternative, this.props.certSession.dut1.id, this.state.dut2.id,
      this.state.connectionId, input, this.props.certSession.sessionId);
  }

  stopTests() {
    this.socket.close();
    this.setState({
      running: false,
      connectionId: '',
    }, () => {
      this.connectToPusher();
      this.props.stopRunningTests();
    });
  }

  handleUnauthorizedRequest(action) {
    const responseText = `Error 403: ${action} unauthorized`;
    this.displayApiBanner(403, responseText);
  }

  connectToPusher() {
    return Auth.fetchAccessToken()
      .then(token => {
        this.socket = new WebSocket(`wss://dealer.spotify.com?access_token=${token}`);
        let pingInterval;
        this.socket.onopen = () => {
          pingInterval = setInterval(() => {
            this.socket.send('{"type": "ping"}');
          }, 10000);
        };
        this.socket.onmessage = function onmessage(m) {
          const m2 = JSON.parse(m.data);
          if (m2.headers && m2.headers['Spotify-Connection-Id']) {
            if (!this.state.connectionId) {
              this.setState({
                connectionId: m2.headers['Spotify-Connection-Id'],
              });
            }
          }
          if (m2.payloads) {
            let json;
            try {
              const decoded = b64DecodeUnicode(m2.payloads[0]);
              json = JSON.parse(decoded);
            } catch (error) {
              // eslint-disable-next-line
              console.warn(error);
              return;
            }

            if (json.event && (json.event === 'ASYNC_START' || json.event === 'ASYNC_END')) {
              this.setState({
                running: json.event === 'ASYNC_START',
              });
            }

            if (json.id) {
              // events can arrive out of order, ignore any test_step after the end of the test
              const lastEvent = this.props.testResults && this.props.testResults[json.id] && this.props.testResults[json.id].event || '';
              if (json.event !== 'TEST_STEP' || lastEvent !== 'TEST_END') {
                this.props.updateTestResults(json);
              }
            }
          }
        }.bind(this);

        this.socket.onclose = function onclose() {
          clearInterval(pingInterval);
        };
      });
  }

  initHarmony() {
    return Auth.fetchAccessToken()
      .then(token => {
        const harmony = Harmony.create({
          client: {
            getToken: (cb) => {
              cb(token);
            },
            descriptor: {
              id: null, // Let Harmony auto-generate the device id.
              type: Harmony.DeviceType.COMPUTER,
              name: 'Certomato',
              brand: 'spotify',
              model: 'SpotifyCustomClient',
            },
          },
          streamer: {
            initialVolume: '0.2',
            disallowRobustnessValues: [
              Harmony.Robustness.EMPTY,
            ],
          },
        });
        this.setState({
          harmonyClient: harmony,
        });
        harmony.on(Harmony.Event.PLAYER_INITIALIZATION_DONE, () => {
          // Harmony has successfully created a local player.
          harmony.connect();
        });
        harmony.on(Harmony.Event.REMOTE_OBSERVER_ENABLED, () => {
          // Harmony can now receive the current playback state of other devices, and
          // can now control other devices over Connect.
          harmony.getDevices().then((devices) => {
            devices.forEach(device => {
              if (device.name === 'Certomato') {
                this.setState({
                  dut2: {id: device.id, name: device.name},
                });
              }
            });
          });
        });
        harmony.on(Harmony.Event.STATE_CHANGED, event => {
          this.props.contextPlayerStateChanged(event.state);
        });
        harmony.on(Harmony.Event.LAST_ACTIVE_DEVICE_INFO_CHANGED, event => {
          this.props.lastActiveDeviceInfoChanged(event.deviceInfo);
        });
        harmony.on(Harmony.Event.PROGRESS, event => {
          this.props.trackProgressChanged(event);
        });
      });
  }

  /**
   * Renders the content (right side),
   * depending on if we are in print mode or not.
   */
  renderContent() {
    const divClass = Utils.printerMode() ? 'certomatoRightPrinter' : 'certomatoRight';
    return (
      <div className={divClass}>
        <Switch>
          <Route exact path="/" render={() => (
            <Redirect to="/certomatostart"/>
          )}/>
          <Route path="/certomatostart" exact render={() => <CertomatoStart isAdmin={this.props.userInfo.admin} certSession={this.props.certSession} /> } />
          <Route path="/new" exact render={() => <StartNew />}/>
          <Route path="/submit" exact render={() => (
            <Submit
              certSession={this.props.certSession}
              finishedCertification={Utils.finishedCertification(this.props.tests)}
            />
          )}/>
          <Route path="/stats" exact render={() => <Stats /> } />
          <Route path="/dashboard" exact render={() => <Dashboard /> } />
          <Route path="/faq" exact render={() => <Faq /> } />
          <Route path="/support" exact render={() => <Support /> } />
          <Route path="/product-application" exact render={() => <NewProductApplicationForm /> } />
          <Route path="/builds" exact render={() => <Builds admin={this.props.userInfo.admin} featureFlags={this.props.userInfo.featureFlags || []}/> } />
          <Route path="/access/management" exact render={() => <AccessManagement admin={this.props.userInfo.admin} featureFlags={this.props.userInfo.featureFlags || []} displayApiBanner={this.props.displayApiBanner} handleUnauth={this.handleUnauthorizedRequest}/> } />
          {this.props.certSession && this.props.tests && Utils.exists(this.props.userInfo) && this.props.tests.map(group => {
            return (
              <Route key={group.route} path={`/${group.route}`} exact render={() => (
                <TestGroupPage
                  group={group}
                  enabled={this.state.dut2.id !== ''}
                  running={this.state.running}
                  runTests={this.runTests}
                  setTestsNotApplicable={this.setTestsNotApplicable}
                  clearTests={this.clearTests}
                  stopTests={this.stopTests}
                  testResults={this.props.testResults}
                  closePrompt={this.props.closePrompt}
                  certSession={this.props.certSession}
                  getTestResults={this.props.getTestResults}
                  admin={this.props.userInfo.admin}
                />)}
              />);
          })}
          <Route path={'/certification/'} render={() => <Certification admin={this.props.userInfo.admin}/>} />;
          <Route path={'/teststats/'} render={() => <TestStats/>} />;
          <Route path={'/organization/:uri/edit/'} render={() => <OrganizationEdit admin={this.props.userInfo.admin} featureFlags={this.props.userInfo.featureFlags || []}/>} />;
          <Route path={'/organization'} render={() => <Organization admin={this.props.userInfo.admin} featureFlags={this.props.userInfo.featureFlags || []} displayApiBanner={this.props.displayApiBanner} handleUnauth={this.handleUnauthorizedRequest}/>} />;
          <Route path={'/user/'} render={() => <User admin={this.props.userInfo.admin} featureFlags={this.props.userInfo.featureFlags || []} displayApiBanner={this.props.displayApiBanner} handleUnauth={this.handleUnauthorizedRequest}/>} />;
        </Switch>
      </div>
    );
  }

  render() {
    return (
      <BrowserRouter>
        {Utils.exists(this.props.userInfo) && (
          <div className="certomatoContainer">
            {!Utils.printerMode() && (
              <>
                <Header isLoggedIn logout={this.props.logout} />
                <div className="certomatoBanner">
                  <WarningBanner logout={this.props.logout}/>
                  <ErrorBanner logout={this.props.logout}/>
                  <ApiBanner dismissApiBanner={this.props.dismissApiBanner} apiCallSuccessful={this.props.apiCallSuccessful} responseText={this.props.responseText}/>
                </div>
                <div className="certomatoLeft">
                  <Navigation
                    tests={this.props.tests}
                    finishedCertification={Utils.finishedCertification(this.props.tests)}
                    admin={this.props.userInfo.admin}
                    featureFlags={this.props.userInfo.featureFlags || []}
                    certSession={this.props.certSession}
                  />
                </div>
              </>
            )}
            {this.renderContent()}
            {!Utils.printerMode() && (
              <NowPlayingBarContainer
                pause={() => this.state.harmonyClient.pause()}
                resume={() => this.state.harmonyClient.resume()}
              />
            )}
          </div>
        )}
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    tests: Utils.updateTestsStatus(state.tests.tests, state.testResults.testResults, false), ...state.testResults, ...state.playerState, ...state.userInfo, ...state.apiCallSuccessful, ...state.responseText,
  };
}

Certomato.propTypes = {
  certSession: PropTypes.object,
  logout: PropTypes.func.isRequired,
  startCertSession: PropTypes.func.isRequired,
  getTests: PropTypes.func.isRequired,
  tests: PropTypes.array,
  getTestResults: PropTypes.func.isRequired,
  getConnectDevices: PropTypes.func.isRequired,
  testResults: PropTypes.object.isRequired,
  updateTestResults: PropTypes.func.isRequired,
  stopRunningTests: PropTypes.func.isRequired,
  startTest: PropTypes.func.isRequired,
  startNotApplicable: PropTypes.func.isRequired,
  contextPlayerStateChanged: PropTypes.func.isRequired,
  lastActiveDeviceInfoChanged: PropTypes.func.isRequired,
  trackProgressChanged: PropTypes.func.isRequired,
  startClearSection: PropTypes.func.isRequired,
  closePrompt: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
  displayApiBanner: PropTypes.func.isRequired,
  dismissApiBanner: PropTypes.func.isRequired,
  apiCallSuccessful: PropTypes.bool,
  responseText: PropTypes.string,
};

export default connect(mapStateToProps, {
  getTests,
  startTest,
  getTestResults,
  getConnectDevices,
  updateTestResults,
  stopRunningTests,
  startNotApplicable,
  startClearSection,
  contextPlayerStateChanged,
  lastActiveDeviceInfoChanged,
  trackProgressChanged,
  closePrompt,
  getUserInfo,
  displayApiBanner,
  dismissApiBanner,
} )(Certomato);
