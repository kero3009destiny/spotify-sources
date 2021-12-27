import { Component } from 'react';
import { connect } from 'react-redux';
import { navigator, window } from 'global';

import { updateNetworkStatus } from 'ducks/network/actions';

import PropTypes from 'prop-types';

export class OnlineEventDetector extends Component {
  constructor(props) {
    super(props);
    this.updateOnlineStatus = this.updateOnlineStatus.bind(this);
  }

  componentDidMount() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }

  updateOnlineStatus() {
    const { dispatchUpdateNetworkStatus } = this.props;
    dispatchUpdateNetworkStatus(navigator.onLine);
  }

  render() {
    return null;
  }
}

OnlineEventDetector.propTypes = {
  dispatchUpdateNetworkStatus: PropTypes.func.isRequired,
};

export default connect(null, {
  dispatchUpdateNetworkStatus: updateNetworkStatus,
})(OnlineEventDetector);
