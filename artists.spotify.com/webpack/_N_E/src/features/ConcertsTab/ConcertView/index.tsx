import _classCallCheck from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d4c0891b-baad-43b1-9201-c3c82bfeef33/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonTertiary, IconArtist, Type, ButtonIcon, spacer32, cssColorValue } from '@spotify-internal/encore-web';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { DocumentTitle } from '@mrkt/features/document-title';
import { post } from '../../../shared/lib/api'; // global state stuffs

import { withCurrentUser } from '../../currentUser';
import { LoadingIndicator } from '../../../shared/components/LoadingIndicator'; // local state stuffs

import { selectConcerts, selectConnectedPartners, selectConcertViewLoadStatus } from '../state/selectors';
import { fetchConcertView } from '../state/actions';
import ConnectedPartners from '../ConnectedPartners'; // eslint-disable-next-line import/no-named-as-default

import PartnerSettings from '../PartnerSettings';
import { withDeprecatedCurrentArtist } from '../../artists';
import { ConcertsListing } from './ConcertsListing';
import styles from './index.module.scss';
import { Screen } from '../../../shared/lib/useViewport';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var AccentedButtonTertiary = styled(ButtonTertiary).withConfig({
  displayName: "ConcertView__AccentedButtonTertiary",
  componentId: "sc-1g3xn8h-0"
})(["color:", ";"], cssColorValue('textBrightAccent'));
var ConcertViewLayout = styled.div.withConfig({
  displayName: "ConcertView__ConcertViewLayout",
  componentId: "sc-1g3xn8h-1"
})(["padding-top:", ";"], spacer32);
var MobileIconsWrapper = styled.div.withConfig({
  displayName: "ConcertView__MobileIconsWrapper",
  componentId: "sc-1g3xn8h-2"
})(["position:absolute;right:0px;text-align:center;& > *:first-child{margin-right:12px;}"]);
var ArtistPickWrapper = styled.div.withConfig({
  displayName: "ConcertView__ArtistPickWrapper",
  componentId: "sc-1g3xn8h-3"
})(["max-width:215px;"]);
var ConnectedPartnersLayout = styled.div.withConfig({
  displayName: "ConcertView__ConnectedPartnersLayout",
  componentId: "sc-1g3xn8h-4"
})(["display:flex;align-items:center;justify-content:space-between;"]);
export var ConcertView = /*#__PURE__*/function (_Component) {
  _inherits(ConcertView, _Component);

  var _super = _createSuper(ConcertView);

  function ConcertView(props) {
    var _this;

    _classCallCheck(this, ConcertView);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", {
      showPartnerSettings: false,
      highlightId: null,
      showHighlightId: false,
      defaultReportMode: false,
      defaultIdsSelected: []
    });

    _defineProperty(_assertThisInitialized(_this), "scrollTimeoutId", undefined);

    _defineProperty(_assertThisInitialized(_this), "handleDetailsReportAProblem", function (partner) {
      sendEvent({
        eventCategory: 'concerts',
        eventAction: 'click',
        eventLabel: 'GOTO Report a Problem from Details'
      });

      _this.setState({
        showPartnerSettings: true,
        defaultReportMode: true,
        defaultIdsSelected: [{
          partnerId: partner.partnerId,
          partnerName: partner.partnerName
        }]
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleReportSubmit", function (incorrectIdsToSend, incompleteIdsToSend, infoMessage) {
      var _this$props = _this.props,
          artist = _this$props.artist,
          currentUser = _this$props.currentUser;
      var name = currentUser.name.split(' ');
      var msg = ["# ConcertPartnerMismatch for artist:", artist.name, "spotify:artist:".concat(artist.id), "\n# Wrong Partner Matches:", incorrectIdsToSend, "\n#Incomplete  Partner Matches:", incompleteIdsToSend, "\n# Additional Info from artist:", infoMessage, "\n# Please use ConMan to review the partner matches for this artist:", "https://conman.spotify.net/search/".concat(artist.id)].join('\n');
      var payload = {
        firstName: name[0] || '',
        lastName: name[1] || '',
        email: currentUser.email,
        artists: [artist.id],
        role: artist.role || '*',
        sourceUrl: window.location.href,
        topic: 'Concert_Mismatch',
        // needs to be exactly this too show in salesforce
        description: msg
      };
      sendEvent({
        eventCategory: 'concerts',
        eventAction: 'click',
        eventLabel: 'Report a Problem'
      });
      return post("https://generic.wg.spotify.com/s4a-contact/v0/salesforce/support/nocaptcha", {
        body: payload
      });
    });

    _defineProperty(_assertThisInitialized(_this), "togglePartnerSettings",
    /* istanbul ignore next */
    function () {
      return _this.setState(function (state) {
        return {
          showPartnerSettings: !state.showPartnerSettings,
          defaultReportMode: false,
          defaultIdsSelected: []
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "loadView", function () {
      return _this.props.fetchConcertView({
        artistId: _this.props.artist.id
      });
    });

    _defineProperty(_assertThisInitialized(_this), "trackGetTips", function () {
      return sendEvent({
        eventCategory: 'concerts',
        eventAction: 'click',
        eventLabel: 'Concerts Empty Get Tips'
      });
    });

    _defineProperty(_assertThisInitialized(_this), "routeToPick", function () {
      var _this$props2 = _this.props,
          artist = _this$props2.artist,
          history = _this$props2.history;
      var url = "/artist/".concat(artist.id, "/profile?concertPick=true");
      history.push(url);
      window.location.reload();
    });

    _defineProperty(_assertThisInitialized(_this), "renderEmptyState",
    /* istanbul ignore next */
    function () {
      var t = _this.props.t;
      var messages = {
        title: {
          id: 'app.Concerts.title',
          defaultMessage: t('e20d87', 'Concerts', '')
        },
        getTips: {
          id: 'app.Concerts.getTips',
          defaultMessage: t('b78e4a', 'Learn more', '')
        },
        desc: {
          id: 'app.Concerts.desc',
          defaultMessage: t('5ce19d', 'Concerts ticketed through our partners automatically appear on Spotify and in emails we send to your followers.', '')
        },
        fullEmptyBeg: {
          id: 'app.Concerts.fullEmptyBeg',
          defaultMessage: t('a193fe', 'No concert stats yet.', '')
        },
        fullEmptyEnd: {
          id: 'app.Concerts.fullEmptyEnd',
          defaultMessage: t('f3b5d8', "You'll see stats when you have a concert listed with ", '')
        }
      };
      return /*#__PURE__*/_jsxs("div", {
        className: styles.empty_state_container,
        children: [/*#__PURE__*/_jsx(Type, {
          as: "h2",
          variant: "heading4",
          semanticColor: "textBase",
          children: t('6748bf', 'Share your upcoming concerts on Spotify.', '')
        }), /*#__PURE__*/_jsx("div", {
          children: t('b83570', 'We’ll share Ticketmaster, Eventbrite, Songkick, and AXS listings on Spotify and in emails we send to your followers. You’ll also see stats on listeners and followers in cities you’ll be visiting.', '')
        }), /*#__PURE__*/_jsx(AccentedButtonTertiary, {
          className: styles.desc_learn_more,
          semanticColor: "textBrightAccent",
          buttonSize: ButtonTertiary.lg,
          rel: "noopener noreferrer",
          target: "_blank",
          onClick: function onClick() {
            return _this.trackGetTips();
          },
          href: "/guide/spotify-for-artists#concerts",
          "data-link": "get-tips",
          children: messages.getTips.defaultMessage
        })]
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderContent", function () {
      var _this$props3 = _this.props,
          artist = _this$props3.artist,
          loadStatus = _this$props3.loadStatus,
          connectedPartners = _this$props3.connectedPartners,
          concerts = _this$props3.concerts,
          viewport = _this$props3.viewport,
          t = _this$props3.t;
      var hasError = loadStatus.hasError,
          isLoading = loadStatus.isLoading;
      var isMobile = viewport <= Screen.XS;
      var isTablet = viewport <= Screen.SM;
      var hasConcerts = !isLoading && !hasError && concerts.length > 0;
      var hasPartners = !isLoading && !hasError && connectedPartners.length > 0;
      var hasNothing = !hasConcerts && !hasPartners;
      var showPartnerSettings = _this.state.showPartnerSettings;
      return /*#__PURE__*/_jsxs(ConcertViewLayout, {
        "data-testid": "concerts",
        className: "encore-muted-accent-set",
        children: [/*#__PURE__*/_jsx("div", {
          className: styles.desc_layout,
          children: hasNothing && _this.renderEmptyState()
        }), hasPartners && !isTablet && /*#__PURE__*/_jsxs(ConnectedPartnersLayout, {
          children: [/*#__PURE__*/_jsx(ConnectedPartners, {
            partners: connectedPartners,
            onClick: _this.togglePartnerSettings
          }), /*#__PURE__*/_jsxs(ArtistPickWrapper, {
            children: [/*#__PURE__*/_jsx(Type, {
              as: "p",
              condensed: true,
              children: t('825bf4', 'Want to spread the word about your concerts?', '')
            }), /*#__PURE__*/_jsx(AccentedButtonTertiary, {
              onClick: _this.routeToPick,
              condensed: true,
              children: t('9fb0e4', 'Try Artist Pick', '')
            })]
          })]
        }), (isMobile || isTablet) && !hasNothing && /*#__PURE__*/_jsxs("div", {
          className: styles.mobile_header__profile,
          children: [/*#__PURE__*/_jsx(MobileIconsWrapper, {
            className: "encore-muted-accent-set",
            children: /*#__PURE__*/_jsx(ButtonIcon, {
              onClick: _this.togglePartnerSettings,
              children: /*#__PURE__*/_jsx(IconArtist, {})
            })
          }), hasConcerts && /*#__PURE__*/_jsx("div", {
            className: styles.mobile_ap__profile,
            children: /*#__PURE__*/_jsxs(Type, {
              children: ['Want to spread the word about your concerts? ', /*#__PURE__*/_jsx(Link, {
                to: "/artist/".concat(artist.id, "/profile?concertPick=true"),
                children: t('9fb0e4', 'Try Artist Pick', '')
              })]
            })
          })]
        }), showPartnerSettings && /*#__PURE__*/_jsx(PartnerSettings, {
          onReportSubmit: _this.handleReportSubmit,
          partners: connectedPartners,
          onClose: _this.togglePartnerSettings,
          defaultReportMode: _this.state.defaultReportMode,
          defaultIdsSelected: _this.state.defaultIdsSelected
        }), !hasNothing && /*#__PURE__*/_jsx(ConcertsListing, {
          viewport: viewport,
          concerts: concerts,
          partners: connectedPartners,
          onReportAProblem: _this.handleDetailsReportAProblem,
          onOpenPartnerSettings: _this.togglePartnerSettings
        })]
      });
    });

    _this.loadView();

    return _this;
  }

  _createClass(ConcertView, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.clearTimeout(this.scrollTimeoutId);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          artist = _this$props4.artist,
          loadStatus = _this$props4.loadStatus;
      var isLoading = loadStatus.isLoading;
      return /*#__PURE__*/_jsxs(DocumentTitle, {
        title: "Concerts \u2013 ".concat(artist.name, " - Spotify for Artists"),
        children: [isLoading && /*#__PURE__*/_jsx(LoadingIndicator, {}), !isLoading && this.renderContent()]
      });
    }
  }]);

  return ConcertView;
}(Component);

_defineProperty(ConcertView, "defaultProps", {
  artist: {
    id: '',
    name: ''
  },
  currentUser: {
    name: '',
    email: ''
  },
  concerts: [],
  connectedPartners: [],
  history: {
    push: function push() {}
  }
});

var mapStateToProps = createStructuredSelector({
  loadStatus: selectConcertViewLoadStatus,
  concerts: selectConcerts,
  connectedPartners: selectConnectedPartners
});
var mapDispatchToProps = {
  fetchConcertView: fetchConcertView
};
export var ConnectedConcertView = compose(withCurrentUser, withDeprecatedCurrentArtist, withRouter, connect(mapStateToProps, mapDispatchToProps))(ConcertView);