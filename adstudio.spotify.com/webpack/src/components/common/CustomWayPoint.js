import React, { Component } from 'react';
import { Waypoint } from 'react-waypoint';

import PropTypes from 'prop-types';

export default class CustomWayPoint extends Component {
  static propTypes = {
    children: PropTypes.node,
    triggerOnView: PropTypes.func,
    params: PropTypes.object,
    bottomOffset: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  state = {
    componentIsVisible: false,
    onViewTriggered: false,
  };

  defaultProptypes = {
    bottomOffset: '0',
  };

  setStateAsync(state) {
    return new Promise(resolve => this.setState(state, resolve));
  }

  render() {
    return (
      <>
        <Waypoint
          bottomOffset={
            !!this.props.children ? '-100px' : this.props.bottomOffset
          }
          onEnter={() => {
            if (this.props.params) {
              return (
                !this.state.onViewTriggered &&
                this.setStateAsync(() => ({ onViewTriggered: true })) &&
                this.props.triggerOnView(this.props.params)
              );
            }
            return (
              !!this.props.children &&
              this.setStateAsync(() => ({ componentIsVisible: true }))
            );
          }}
        >
          {this.state.componentIsVisible &&
            !!this.props.children &&
            this.props.children}
        </Waypoint>
      </>
    );
  }
}
