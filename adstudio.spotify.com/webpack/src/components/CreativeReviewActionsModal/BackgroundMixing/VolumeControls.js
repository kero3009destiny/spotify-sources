import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { gray85 } from '@spotify-internal/encore-foundation';

import { REVISE_DEFAULTS } from 'config/revise';

import PropTypes from 'prop-types';

const DEFAULT_WIDTH = '100%';
const DEFAULT_MIN = REVISE_DEFAULTS.BACKGROUND_VOLUME_MIN;
const DEFAULT_MAX = REVISE_DEFAULTS.BACKGROUND_VOLUME_MAX;
const DEFAULT_INI = REVISE_DEFAULTS.BACKGROUND_VOLUME;
const DEFAULT_STEP = REVISE_DEFAULTS.BACKGROUND_VOLUME_STEP;

const COLOR_INACTIVE = gray85;

const StyledInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: ${props => props.width};
  height: 3px;
  cursor: pointer;

  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.primaryColor} 0% ${props => props.progress}%,
    ${COLOR_INACTIVE} ${props => props.progress}% 100%
  );

  outline: none;

  // for WebKit based browsers: Chrome, Safari, et all
  &::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 6px;
    cursor: pointer;
    background: ${props => props.theme.colors.primaryColor};
  }

  // for FireFox
  &::-moz-range-thumb {
    width: 10px;
    height: 10px;
    border-radius: 6px;
    cursor: pointer;
    background: ${props => props.theme.colors.primaryColor};
  }

  // for IE/Edge
  &::-ms-thumb {
    width: 10px;
    height: 10px;
    border-radius: 6px;
    cursor: pointer;
    background: ${props => props.theme.colors.primaryColor};
  }
`;

export class VolumeControl extends PureComponent {
  state = {
    value: this.props.initialValue || DEFAULT_INI,
    progress: DEFAULT_INI * 100,
  };

  componentDidMount() {
    this.setProgress(this.calculateProgress(this.state.value));
  }

  componentDidUpdate(prevProps) {
    const value = this.props.initialValue || DEFAULT_INI;
    if (value !== prevProps.initialValue) {
      this.setValue(value);
      this.setProgress(this.calculateProgress(value));
    }
  }

  onChange = e => {
    const value = +e.target.value;
    this.setValue(value);
    // change the bg color of the slider track to highlight only selected value (left of thumb)
    this.setProgress(this.calculateProgress(value));
    this.props.onChange(value);
  };

  calculateProgress = value => {
    const { max } = this.props;
    return (value / max) * 100;
  };

  setProgress = progress => {
    this.setState({ progress });
  };

  setValue = value => {
    this.setState({ value });
  };

  render() {
    const { width, min, max, step, dataTestId, onBlur } = this.props;
    const { value, progress } = this.state;
    return (
      <StyledInput
        width={width}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        progress={progress}
        onChange={this.onChange}
        onBlur={onBlur}
        data-test={dataTestId}
      />
    );
  }
}

VolumeControl.propTypes = {
  width: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  initialValue: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  dataTestId: PropTypes.string,
};

VolumeControl.defaultProps = {
  width: DEFAULT_WIDTH,
  min: DEFAULT_MIN,
  max: DEFAULT_MAX,
  step: DEFAULT_STEP,
  initialValue: DEFAULT_INI,
};

export default VolumeControl;
