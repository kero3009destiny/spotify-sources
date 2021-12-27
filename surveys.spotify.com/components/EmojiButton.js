import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import defer from 'lodash/defer';
import emojiFrownyFaceUrl from '../images/emoji-frowny-face.svg';
import emojiGriningFaceUrl from '../images/emoji-grining-face.svg';
import emojiHeartEyesUrl from '../images/emoji-heart-eyes.svg';
import emojiPoutingFaceUrl from '../images/emoji-pouting-face.svg';
import emojiStraightFaceUrl from '../images/emoji-straight-face.svg';

const EXPRESSIONS = {
  'nope': emojiPoutingFaceUrl,
  'dont-like': emojiFrownyFaceUrl,
  'meh': emojiStraightFaceUrl,
  'like': emojiGriningFaceUrl,
  'love': emojiHeartEyesUrl,
};

class EmojiButton extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      goingIdle: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.buttonState === 'loading' &&
      prevProps.buttonState !== this.props.buttonState
    ) {
      this.setStateTimeout = defer(() => {
        this.setState(
          {
            // eslint-disable-line
            goingIdle: true,
          },
          () => {
            this.goingIdleTimeout = setTimeout(() => {
              this.setState({
                goingIdle: false,
              });
            }, 1000);
          }
        );
      });
    }
  }

  componentWillUnmount() {
    if (this.setStateTimeout) {
      clearTimeout(this.goingIdleTimeout);
    }

    if (this.goingIdleTimeout) {
      clearTimeout(this.goingIdleTimeout);
    }
  }

  handleClick(event) {
    event.preventDefault();

    const { onClick, buttonState } = this.props;

    if (buttonState === 'loading' || !onClick) {
      return;
    }
    onClick(event);
  }

  render() {
    const { expression, buttonState } = this.props;

    const buttonClassNames = classNames(
      'emoji-button',
      `emoji-button--${expression}`,
      `emoji-button--${buttonState}`,
      {
        'emoji-button--stopping': this.state.goingIdle,
      }
    );

    return (
      <button className={buttonClassNames} onClick={this.handleClick}>
        <img
          className="emoji-button__image"
          alt={`emoji expression - ${expression}`}
          src={EXPRESSIONS[expression]}
        />
      </button>
    );
  }
}

EmojiButton.propTypes = {
  expression: PropTypes.oneOf(['nope', 'dont-like', 'meh', 'like', 'love'])
    .isRequired,
  buttonState: PropTypes.oneOf(['idle', 'loading', 'selected']),
  onClick: PropTypes.func,
};

EmojiButton.defaultProps = {
  buttonState: 'idle',
};

export default EmojiButton;



// WEBPACK FOOTER //
// ./src/components/EmojiButton.js