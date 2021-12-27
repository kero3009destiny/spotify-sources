import { useContext } from 'react';
import * as React from 'react';
import { Banner, breakpoint, ColorSet, spacer } from '@spotify-internal/encore-web';
import styled from 'styled-components';
import { StickyTriggerContext } from 'components/StickyTrigger';

export type BannerMessage = {
  message: string;
  colorSet?: ColorSet;
  link?: Node;
  close?: boolean;
  expires?: number;
};

export type SetBanner = (msg: BannerMessage | null) => void;

type Props = {
  children: (banner: React.ReactNode) => React.ReactNode;
};

type State = {
  value: BannerMessage | null;
};

export const BannerContext = React.createContext<SetBanner>(() => null);

export function useBanner() {
  return useContext(BannerContext);
}

export default class AppBanner extends React.Component<Props, State> {
  static Consumer = BannerContext.Consumer;

  static defaultProps = {
    children: () => null,
  };

  closeTimeout?: number;

  state: State = {
    value: null,
  };

  componentDidUpdate(_: Props, prevState: State) {
    if (prevState.value !== this.state.value) {
      clearTimeout(this.closeTimeout);

      if (this.state.value && typeof this.state.value.expires !== 'undefined') {
        this.closeTimeout = window.setTimeout(this.close, this.state.value.expires);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.closeTimeout);
  }

  setBanner: SetBanner = (value) => {
    this.setState({ value });
  };

  close = () => {
    this.setState({
      value: null,
    });
  };

  renderBanner() {
    const { value } = this.state;
    return (
      value && (
        <StickyTriggerContext.Consumer>
          {(stickyHeader: boolean) => (
            <BannerWrapper stickyHeader={stickyHeader}>
              <Banner
                aria-label={value.message}
                colorSet={value.colorSet || 'base'}
                onClose={value.close ? this.close : undefined}
              >
                {value.message}
                {value.link}
              </Banner>
            </BannerWrapper>
          )}
        </StickyTriggerContext.Consumer>
      )
    );
  }

  render() {
    return (
      <BannerContext.Provider value={this.setBanner}>
        {this.props.children(this.renderBanner())}
      </BannerContext.Provider>
    );
  }
}

const BannerWrapper = styled.div<{ stickyHeader: boolean }>`
  position: fixed;
  width: 100%;
  // z-index should be less than top nav z-index
  z-index: 1034;

  @media (min-width: ${breakpoint.screenSmMin}) {
    // offset top nav bottom margin
    margin-top: ${(props) => (props.stickyHeader ? spacer.spacer48 : `-${spacer.spacer24}`)};
  }
`;
