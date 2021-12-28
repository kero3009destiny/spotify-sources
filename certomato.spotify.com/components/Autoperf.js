import React, {Component} from 'react';
import axios from 'axios';
import { DialogAlert, Backdrop } from '@spotify-internal/creator-tape';
import closeBtn from '../images/cross-btn.png';
import PropTypes from 'prop-types';
import * as api from '../api/api';

class Autoperf extends Component {
  constructor(props) {
    super(props);
    this.tracks = [
      'spotify:track:7cqvvroHYl4d5IxzBi7PrI', // 1050
      'spotify:track:3SD8ArVD5njkjdYIOsKjFJ', // 1750
      'spotify:track:3G9vEXB3lE3bIJdUy7yXpg', // 2450
    ];
    this.handleClose = this.handleClose.bind(this);
    this.milliseconds = 0;
    this.conditions = [];
  }

  componentDidMount() {
    this.startMilliseconds = new Date().getTime();
    if (this.props.testName === 'Load') {
      this.conditions.push({tone: null, op: 'load'});
      this.conditions.push({tone: 1050, op: 'pause'});
    }
    if (this.props.testName === 'Next') {
      this.conditions.push({tone: null, op: 'next'});
      this.conditions.push({tone: 1750, op: 'pause'});
    }
    if (this.props.testName === 'Pause') {
      this.conditions.push({tone: 1050, op: 'pause'});
      this.conditions.push({tone: null});
    }
    if (this.props.testName === 'Previous') {
      this.conditions.push({tone: null, op: 'previous'});
      this.conditions.push({tone: 1050, op: 'pause'});
    }
    if (this.props.testName === 'Resume') {
      this.conditions.push({tone: null, op: 'play'});
      this.conditions.push({tone: 1050, op: 'pause'});
    }
    if (this.props.testName === 'Seek') {
      this.conditions.push({tone: 8050, op: 'next'}); // previous track, to reset position of next track to 0
      this.conditions.push({tone: 1050, op: 'seek'});
      this.conditions.push({tone: 8050, op: 'pause'});
    }
    if (this.props.testName === 'Volume') {
      this.conditions.push({tone: 1050, op: 'mute'});
      this.conditions.push({tone: null, op: 'pause'});
    }
  }

  handleData(data) {
    if (this.milliseconds) {
      return;
    }
    const sortable = [];
    for (const key in data) {
      if (data.hasOwnProperty(key) && !isNaN(key)) {
        sortable.push({frequency: parseInt(key, 10), magnitude: data[key]});
      }
    }
    sortable.sort((a, b) => {
      return b.magnitude - a.magnitude;
    });

    if (sortable[0].magnitude > 1000 * sortable[1].magnitude) {
      this.detectedFrequency = sortable[0].frequency;
    } else {
      this.detectedFrequency = null;
    }
    if (this.detectedFrequency !== this.frequency) {
      this.frequency = this.detectedFrequency;
      this.detectedMilliseconds = data.time;
      this.detectedTimes = 0;
    } else {
      this.detectedTimes++;
    }
    if (this.detectedTimes === 10) {
      if (this.frequency === this.conditions[0].tone) {
        const condition = this.conditions.shift();
        if (this.conditions.length === 1) {
          this.startMilliseconds = new Date().getTime();
        }
        if (condition.op) {
          this[condition.op]();
        }
      }
      if (!this.conditions.length) {
        this.milliseconds = this.detectedMilliseconds - this.startMilliseconds;
        this.props.testResult.alternatives[0].value = this.milliseconds;
        this.props.onClick(this.props.testResult.id, this.props.testResult.alternatives[0], null);
      }
    }
  }

  load() {
    this.play(this.tracks[0]);
  }

  next() {
    return this.send(axios.post, 'next');
  }

  previous() {
    return this.send(axios.post, 'previous');
  }

  play(uri) {
    let body;
    if (uri) {
      body = {'uris': [uri]};
    }
    return this.send(axios.put, 'play', body);
  }

  pause() {
    return this.send(axios.put, 'pause');
  }

  mute() {
    return this.send(axios.put, 'volume?volume_percent=0');
  }

  seek() {
    return this.send(axios.put, 'seek?position_ms=210000');
  }

  send(method, command, body) {
    return api.apiHeaders().then(headers => {
      return method(`https://api.spotify.com/v1/me/player/${command}`, body,
        {
          headers: headers,
        });
    });
  }

  handleClose() {
    this.props.closePrompt();
    this.props.getTestResults(this.props.certSession.sessionId);
  }

  render() {
    return (
      <div className="prompt">
        {<Backdrop center>
          <DialogAlert
            style={{fontSize: '4em'}}
            body={
              <div className={'promptContainer'}>
                <button className={'closeButton'} onClick={this.handleClose}>
                  <img title="Close" src={closeBtn} />
                </button>

                {this.milliseconds} ms

              </div>
            }
          />);
        </Backdrop>
        }
      </div>);
  }
}

Autoperf.propTypes = {
  testName: PropTypes.string.isRequired,
  testResult: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired,
  closePrompt: PropTypes.func.isRequired,
  certSession: PropTypes.object.isRequired,
  getTestResults: PropTypes.func.isRequired,
};

export default Autoperf;
