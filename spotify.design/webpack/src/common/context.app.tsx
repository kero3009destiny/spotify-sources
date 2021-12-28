import React, { Component, createContext } from 'react';
import { DESKTOP_MEDIA_QUERY, REDUCED_MOTION_MEDIA_QUERY } from './constants';
import { ThemeIdentifiers } from './constants/colour-combinations';
import { HAS_JAVASCRIPT_CLASSNAME } from './constants/a11y';

type AppContextState = {
  isDesktop: boolean;
  prefersReducedMotion: boolean;
  isLoading: boolean;
  setIsLoading: Function;
  theme: ThemeIdentifiers;
  setTheme: Function;
  overlayOpen: boolean;
  setOverlayOpen: Function;
};

interface AppContextProps {
  initialTheme: ThemeIdentifiers;
  isLoading: boolean;
}

export const AppContext = createContext<Partial<AppContextState>>({});

export class AppContextProvider extends Component<AppContextProps> {
  mediaObserver!: MediaQueryList;
  reducedMotionObserver!: MediaQueryList;

  state = {
    theme: this.props.initialTheme,
    setTheme: (theme: string) => {
      if (theme !== this.state.theme) {
        this.setState({ theme });
      }
    },

    isLoading: this.props.isLoading,
    setIsLoading: (isLoading: boolean) => this.setState({ isLoading }),

    overlayOpen: false,
    setOverlayOpen: (overlayOpen: boolean) => {
      if (overlayOpen !== this.state.overlayOpen) {
        this.setState({ overlayOpen });
      }
    },

    isDesktop: undefined,
    prefersReducedMotion: undefined,
  };

  /** Lifecycle. */

  componentDidMount(): void {
    document.body.classList.add(HAS_JAVASCRIPT_CLASSNAME);
    this.mediaObserver = window.matchMedia(DESKTOP_MEDIA_QUERY);
    this.mediaObserver.addListener(this.handleBreakpointChange);
    this.reducedMotionObserver = window.matchMedia(REDUCED_MOTION_MEDIA_QUERY);
    this.reducedMotionObserver.addListener(this.handleReducedMotionChange);

    this.setState(
      {
        prefersReducedMotion: this.reducedMotionObserver.matches,
        isDesktop: this.mediaObserver.matches,
        theme: this.props.initialTheme,
      },
      () => {
        const theme = this.state.theme;
        const isLoading = this.state.isLoading;
        /**
         * https://github.com/gatsbyjs/gatsby/issues/11006
         * There is a bug in gatsby's service-worker plugin that fails to set
         *    initial state (only on cached content).
         * We fix it by enforcing a state-refresh on hydration.
         */
        this.setState({ theme: '', isLoading: false }, () => {
          this.setState({ theme, isLoading });
        });
      }
    );
  }

  componentDidUpdate(
    prevProps: Readonly<AppContextProps>,
    prevState: Readonly<AppContextState>
  ): void {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.setState({ isLoading: this.props.isLoading });
    }

    if (prevState.overlayOpen !== this.state.overlayOpen) {
      this.handleOverlayStateChange();
    }
  }

  componentWillUnmount(): void {
    document.body.removeEventListener('touchmove', this.preventBodyTouchmove);
    this.mediaObserver.removeListener(this.handleBreakpointChange);
  }

  /** Events. */

  handleOverlayStateChange = () => {
    const { body } = document;
    if (this.state.overlayOpen) {
      window.scrollTo(0, 0);
      body.addEventListener('touchmove', this.preventBodyTouchmove, {
        passive: false,
      });
    } else {
      body.removeEventListener('touchmove', this.preventBodyTouchmove);
    }
  };

  preventBodyTouchmove = (event: TouchEvent) => {
    const element = event.target as HTMLElement;
    let shouldPreventDefault = true;
    if (element) {
      const overlayElement = element.closest('[role="dialog"]');

      if (overlayElement) {
        const eventIsInOverlay = !!overlayElement;

        if (eventIsInOverlay) {
          const dialogScroll = overlayElement.scrollTop;
          const dialogHeight = overlayElement.scrollHeight;
          const viewportHeight = document.documentElement.clientHeight;

          shouldPreventDefault = dialogHeight - viewportHeight < dialogScroll;
        }
      }
    }

    if (shouldPreventDefault) event.preventDefault();
  };

  handleBreakpointChange = (event: MediaQueryListEvent) => {
    this.setState({ isDesktop: event.matches });
  };

  handleReducedMotionChange = (event: MediaQueryListEvent) => {
    this.setState({ prefersReducedMotion: event.matches });
  };

  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider value={this.state}>
        <div className={`root ${this.state.theme}`}>{children}</div>
      </AppContext.Provider>
    );
  }
}
