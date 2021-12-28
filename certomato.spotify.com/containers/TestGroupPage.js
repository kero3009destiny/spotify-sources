import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Group from '../components/Group';
import Prompt from '../components/Prompt';
import Markdown from '../components/Markdown';
import Utils from '../utils/Utils.js';
import Autoperf from '../components/Autoperf';

class TestGroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };

    this._isMounted = false;

    this.initAudioContext = this.initAudioContext.bind(this);
  }

  componentWillMount() {
    try {
      const content = require(`../content/${this.props.group.route}/summary.md`);
      return fetch(content).then((response) => response.text()).then((text) => {
        if (this._isMounted) {
          this.setState({ content: text });
        }
      });
    } catch (err) {
      return null;
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.initAudioContext();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  initAudioContext() {
    if (window.location.pathname !== '/autoperf') {
      return;
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
      return;
    }
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.audioContext.audioWorklet.addModule('/static/js/goertzel-processor.js').then(() => {
      const goertzelNode = new window.AudioWorkletNode(this.audioContext, 'goertzel-processor', {
        processorOptions: {
          frequencies: [1050, 1750, 8050],
          blockSize: 512,
        },
      });
      goertzelNode.port.onmessage = e => this.handleData(e.data);
      goertzelNode.connect(this.audioContext.destination);

      navigator.getUserMedia({audio: true}, (stream) => {
        const microphone = this.audioContext.createMediaStreamSource(stream);
        microphone.connect(goertzelNode);
      }, () => {
        // console.error('Error getting microphone', e);
      });
    });
  }

  handleData(data) {
    if (this.autoperf) {
      this.autoperf.handleData(data);
    }
  }

  renderPrompt() {
    if (!Utils.exists(this.props.testResults)) {
      return null;
    }
    const promptStatus = Object.values(this.props.testResults)
      .filter(testStatus => testStatus.testResult && testStatus.testResult.status === 'PROMPT')[0];

    if (promptStatus === undefined) {
      return null;
    }

    if (this.props.group.route === 'autoperf') { // (promptStatus.testResult.value) {
      return (<Autoperf
        ref={autoperf => { this.autoperf = autoperf; }}
        testName={promptStatus.testResult.alternatives[0].label}
        testResult={promptStatus.testResult}
        onClick={this.props.runTests}
        route={this.props.group.route}
        closePrompt={this.props.closePrompt}
        certSession={this.props.certSession}
        getTestResults={this.props.getTestResults}
      />);
    }

    return (<Prompt
      groupTitle={this.props.group.title}
      testResult={promptStatus.testResult}
      onClick={this.props.runTests}
      route={this.props.group.route}
      closePrompt={this.props.closePrompt}
      certSession={this.props.certSession}
      getTestResults={this.props.getTestResults}
    />);
  }

  render() {
    const userAllowed = this.props.group.route !== 'autoperf' || this.props.admin;
    return ( userAllowed ?
      <div style={{overflow: 'auto', height: 'inherit'}} onClick={this.initAudioContext}>
        <h1>{ this.props.group.title }</h1>
        <Markdown source={this.state.content}/>
        {this.props.group !== undefined ?
          (<Group
            group={this.props.group}
            testResults={this.props.testResults}
            enabled={this.props.enabled}
            running={this.props.running}
            runTests={this.props.runTests}
            setTestsNotApplicable={this.props.setTestsNotApplicable}
            clearTests={this.props.clearTests}
            stopTests={this.props.stopTests}
            testResults={this.props.testResults}
          />)
          : null}
        {this.renderPrompt()}
      </div> : <h2> You do not have permission to view this content </h2>);
  }
}

TestGroupPage.propTypes = {
  group: PropTypes.object.isRequired,
  enabled: PropTypes.bool.isRequired,
  runTests: PropTypes.func.isRequired,
  stopTests: PropTypes.func.isRequired,
  testResults: PropTypes.object.isRequired,
  running: PropTypes.bool.isRequired,
  setTestsNotApplicable: PropTypes.func.isRequired,
  clearTests: PropTypes.func.isRequired,
  closePrompt: PropTypes.func.isRequired,
  certSession: PropTypes.object.isRequired,
  getTestResults: PropTypes.func.isRequired,
  admin: PropTypes.bool,
};

export default TestGroupPage;
