import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  ButtonIcon,
  ButtonSecondary,
  IconLink,
  Tooltip,
  OverlayTrigger,
  gray90,
} from '@spotify-internal/encore-web-v3';
import { useT } from '@mrkt/features/i18n';
import { copy } from '@mrkt/features/copy-to-clipboard';

const StyledButtonIcon = styled(ButtonIcon)`
  align-items: center;
  height: 40px;
  justify-content: center;
  width: 40px;

  &:hover {
    content: '';
    background: ${gray90};
    border-radius: 50%;
  }
`;

export class ClipboardButtonClassComponent extends Component<$TSFixMe> {
  static propTypes = {
    btnText: PropTypes.shape({
      active: PropTypes.string,
      default: PropTypes.string,
    }).isRequired,
    isAlgotorial: PropTypes.bool,
    isMobileView: PropTypes.bool,
    isTooltipClicked: PropTypes.bool.isRequired,
    loggingCallback: PropTypes.func,
    rowIndex: PropTypes.number,
    size: PropTypes.string,
    textToCopy: PropTypes.string.isRequired,
    trackRowIndexCallback: PropTypes.func,
    t: PropTypes.func,
  };
  tooltipTimeout: $TSFixMe;

  static defaultProps = {
    loggingCallback() {},
  };

  state = {
    linkIsCopied: false,
    showTooltip: false,
  };

  shouldComponentUpdate(nextProps: $TSFixMe, nextState: $TSFixMe) {
    return (
      nextProps.isTooltipClicked !== this.props.isTooltipClicked ||
      nextState.linkIsCopied !== this.state.linkIsCopied ||
      nextProps.isMobileView !== this.props.isMobileView
    );
  }

  handleClick = (event: $TSFixMe) => {
    event.stopPropagation();
    event.preventDefault();

    const target = event.currentTarget;
    this.props.trackRowIndexCallback(this.props.rowIndex);
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }

    copy(target)
      .then(() => {
        this.setState({ linkIsCopied: true, showTooltip: true });
        this.props.loggingCallback({
          eventCategory: 'Playlists',
          eventAction: this.props.isAlgotorial
            ? 'copyPersonalizedLink'
            : 'copyLink',
          eventLabel: target.dataset.copyText,
        });
      })
      .then(() => {
        this.tooltipTimeout = setTimeout(
          () => this.setState({ linkIsCopied: false, showTooltip: false }),
          5000,
        );
      });
  };

  renderBtnWithTooltip = () => {
    const { btnText, isTooltipClicked, size, textToCopy, t } = this.props;
    const { showTooltip } = this.state;

    return (
      <OverlayTrigger
        data-testid="copy-playlist-url"
        // @ts-ignore
        isTouch
        overlay={
          isTooltipClicked &&
          showTooltip && (
            <Tooltip>
              {t(
                'RECENTLY_ADDED_TABLE_CLIPBOARD_BTN_8dd367',
                'Personalized editorial playlists are tailored to a listener’s taste. Sharing this specific link will guarantee that your song is at the top of their playlist.',
                '',
              )}
            </Tooltip>
          )
        }
        placement={OverlayTrigger.left}
      >
        <ButtonSecondary
          data-copy-text={textToCopy}
          onClick={this.handleClick}
          buttonSize={size}
        >
          {this.state.linkIsCopied && isTooltipClicked
            ? btnText.active
            : btnText.default}
        </ButtonSecondary>
      </OverlayTrigger>
    );
  };

  renderBtn = () => {
    const { btnText, isTooltipClicked, size, textToCopy } = this.props;

    return (
      <ButtonSecondary
        buttonSize={size}
        data-copy-text={textToCopy}
        onClick={this.handleClick}
        data-testid="copy-playlist-url"
      >
        {this.state.linkIsCopied && isTooltipClicked
          ? btnText.active
          : btnText.default}
      </ButtonSecondary>
    );
  };

  renderMobileIcon = () => {
    const { isAlgotorial, isTooltipClicked, textToCopy, t } = this.props;
    const { showTooltip } = this.state;

    return (
      <OverlayTrigger
        // @ts-ignore
        isTouch
        data-testid="copy-playlist-url"
        overlay={
          isTooltipClicked &&
          showTooltip && (
            <Tooltip>
              {isAlgotorial ? (
                <React.Fragment>
                  <strong>
                    {t(
                      'RECENTLY_ADDED_TABLE_CLIPBOARD_BTN_5fbc73',
                      'Unique link copied.',
                      '',
                    )}
                  </strong>
                  <br />{' '}
                  {t(
                    'RECENTLY_ADDED_TABLE_CLIPBOARD_BTN_8dd367',
                    'Personalized editorial playlists are tailored to a listener’s taste. Sharing this specific link will guarantee that your song is at the top of their playlist.',
                    '',
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {t(
                    'RECENTLY_ADDED_TABLE_CLIPBOARD_BTN_e5c299',
                    'Link copied',
                    '',
                  )}
                </React.Fragment>
              )}
            </Tooltip>
          )
        }
        placement={OverlayTrigger.left}
      >
        <StyledButtonIcon
          data-copy-text={textToCopy}
          onClick={this.handleClick}
        >
          <IconLink aria-label="IconLink" iconSize={24} />
        </StyledButtonIcon>
      </OverlayTrigger>
    );
  };

  render() {
    if (this.props.isMobileView) {
      return this.renderMobileIcon();
    }

    return this.props.isAlgotorial
      ? this.renderBtnWithTooltip()
      : this.renderBtn();
  }
}

export const ClipboardButton = (props: $TSFixMe) => {
  const t = useT();
  return <ClipboardButtonClassComponent {...props} t={t} />;
};
