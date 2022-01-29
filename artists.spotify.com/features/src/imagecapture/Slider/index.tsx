// ignore-string-externalization
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { IconMinus, IconPlus } from '@spotify-internal/encore-web';
import React from 'react';
import { withRtl, InjectedRtlProps } from '@mrkt/features/i18n/hooks/useRtl';
import {
  SliderBall,
  SliderContainer,
  SliderCustom,
  SliderGutterContainer,
  SliderInput,
} from './styles';

type Props = {
  min: number;
  max: number;
  name?: string;
  onChange: (value: number) => void;
  value: number;
} & InjectedRtlProps;

type State = {
  dragging: boolean;
};

class SliderClassComponent extends React.Component<Props, State> {
  static defaultProps = {
    min: 0,
    max: 100,
    value: 0,
    rtl: false,
  };

  state: State = {
    dragging: false,
  };

  trackRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    document.addEventListener('mouseup', this.onEndDrag);
    document.addEventListener('mouseleave', this.onEndDrag);
    document.addEventListener('mousemove', this.onDrag);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onEndDrag);
    document.removeEventListener('mouseleave', this.onEndDrag);
    document.removeEventListener('mousemove', this.onDrag);
  }

  onDrag = (event: MouseEvent) => {
    const { dragging } = this.state;
    if (dragging) {
      this.getSliderValue(event);
    }
  };

  onStartDrag = () => {
    this.setState({ dragging: true });
  };

  onEndDrag = () => {
    this.setState({ dragging: false });
  };

  getSliderValue = (event: MouseEvent | React.MouseEvent) => {
    const { min, max } = this.props;

    const track = this.trackRef.current;

    if (track) {
      const clientX = event.clientX;

      const thumbX = this.thumbXRelativeToTrackStart(clientX);

      let sliderValue = (thumbX / this.trackWidth) * 100;

      if (sliderValue < min) {
        sliderValue = min;
      }

      if (sliderValue > max) {
        sliderValue = max;
      }

      this.props.onChange(sliderValue);

      return sliderValue;
    }
    return 0;
  };

  /**
   * The thumb is a position indicator that can be moved along the track.
   * See: https://material.io/components/sliders#anatomy
   */
  thumbXRelativeToTrackStart = (clientX: number) => {
    return this.props.rtl
      ? this.thumbXRelativeToTrackStartRTL(clientX)
      : this.thumbXRelativeToTrackStartLTR(clientX);
  };

  thumbXRelativeToTrackStartLTR = (clientX: number) => {
    return clientX - this.trackStartX;
  };

  thumbXRelativeToTrackStartRTL = (clientX: number) => {
    return this.trackStartX - clientX;
  };

  private get trackWidth() {
    return this.trackRef.current?.offsetWidth ?? 0;
  }

  private get trackStartX() {
    return this.props.rtl ? this.trackStartXRTL : this.trackStartXLTR;
  }

  private get trackStartXLTR() {
    return this.trackRef.current?.getBoundingClientRect().left ?? 0;
  }

  private get trackStartXRTL() {
    return this.trackRef.current?.getBoundingClientRect().right ?? 0;
  }

  render() {
    const { min, max, value } = this.props;
    const iconSize = 32;

    return (
      <SliderContainer>
        <IconMinus iconSize={iconSize} />
        <SliderGutterContainer
          data-testid="slider-gutter-container"
          ref={this.trackRef}
          onClick={(event: React.MouseEvent) => {
            if (!this.state.dragging) {
              this.getSliderValue(event);
            }
          }}
        >
          <SliderCustom>
            <SliderBall
              style={{ insetInlineStart: `calc(${value}% - 4px)` }}
              onMouseDown={this.onStartDrag}
            />
          </SliderCustom>
        </SliderGutterContainer>
        <SliderInput readOnly type="range" min={min} max={max} value={value} />
        <IconPlus iconSize={iconSize} />
      </SliderContainer>
    );
  }
}

export const Slider = withRtl(SliderClassComponent);
