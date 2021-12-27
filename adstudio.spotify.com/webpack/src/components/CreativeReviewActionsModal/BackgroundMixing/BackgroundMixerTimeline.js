import React, { PureComponent } from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const DEFAULT_STEP = 5;
const DEFAULT_WIDTH = '100%';

const Container = styled.div`
  left: -1px;
  width: ${props => props.width};
  display: flex;
  position: relative;
  padding: 10px 0;
  background: #f5f5f5;
  box-sizing: border-box;
`;

const Seconds = styled.div`
  width: 100%;
  position: relative;
  font-family: Circular Sp UI;
  font-size: 9px;
  line-height: 5px;
  letter-spacing: -0.25px;
  color: #d2d2d2;

  &:before {
    content: '|';
    display: block;
    width: calc(100%);
    position: absolute;
    height: 2px;
    bottom: -7px;
  }
`;

export class BackgroundMixerTimeline extends PureComponent {
  renderSeconds = () => {
    const ret = [];
    const { maxSeconds, step } = this.props;
    for (let i = 0; i < maxSeconds; i += step) {
      ret.push(<Seconds key={i}>{`${i}s`}</Seconds>);
    }
    return ret;
  };

  render() {
    const { width } = this.props;
    return <Container width={width}>{this.renderSeconds()}</Container>;
  }
}

BackgroundMixerTimeline.propTypes = {
  maxSeconds: PropTypes.number.isRequired,
  step: PropTypes.number,
  width: PropTypes.string,
};

BackgroundMixerTimeline.defaultProps = {
  step: DEFAULT_STEP,
  width: DEFAULT_WIDTH,
};

export default BackgroundMixerTimeline;
