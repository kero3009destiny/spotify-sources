import * as React from 'react';

type Api = {
  activeMediaSource: string | null;
  addAudioSource: (src: string) => void;
  pause: (src: string) => void;
  play: (src: string) => void;
};

export const Context = React.createContext({
  activeMediaSource: null,
  addAudioSource: () => {},
  pause: () => {},
  play: () => {},
} as Api);

export class MediaPlaybackProvider extends React.Component<{ children: React.ReactNode }, Api> {
  mediaBySource: { [src: string]: HTMLMediaElement } = {};

  constructor(props: any) {
    super(props);

    this.state = {
      activeMediaSource: null,
      addAudioSource: this.addAudioSource,
      play: this.play,
      pause: this.pause,
    };
  }

  addAudioSource = (src: string) => {
    if (!this.mediaBySource[src]) {
      this.mediaBySource[src] = document.createElement('audio');
      this.mediaBySource[src].src = src;
    }
  };

  pause = (src: string) => {
    const media = this.mediaBySource[src];

    if (!media) {
      return;
    }

    media.pause();
    this.setState({ activeMediaSource: null });
  };

  play = (src: string) => {
    if (this.state.activeMediaSource) {
      this.mediaBySource[this.state.activeMediaSource].pause();
    }

    const media = this.mediaBySource[src];

    if (!media) {
      throw new Error('Audio source wasn’t added before calling play()');
    }

    const onEnded = () => {
      this.setState({ activeMediaSource: null });
      media.removeEventListener('ended', onEnded);
    };

    media.addEventListener('ended', onEnded);
    media.play();

    this.setState({ activeMediaSource: src });
  };

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

export const withMediaPlayback = (Component: React.ComponentType<any>) => (props: any) => (
  <Context.Consumer>{(media) => <Component {...props} media={media} />}</Context.Consumer>
);

type AudioProps = {
  pauseOnUnmount?: boolean;
  src: string;
  children: (props: { play: () => void; pause: () => void; isPlaying: boolean }) => React.ReactNode;
};

export const Audio: React.ComponentType<AudioProps> = withMediaPlayback(
  class extends React.Component<AudioProps & { media: Api }> {
    componentWillUnmount() {
      if (this.props.pauseOnUnmount) {
        this.props.media.pause(this.props.src);
      }
    }
    render() {
      const { src, media, children } = this.props;

      return children({
        play: () => {
          media.addAudioSource(src);
          media.play(src);
        },
        pause: () => media.pause(src),
        isPlaying: media.activeMediaSource === src,
      });
    }
  },
);
