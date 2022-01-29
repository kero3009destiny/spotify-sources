import _classCallCheck from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.1ac12606-e1dc-439c-acb0-9d99bcd9c5b0/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Suspense } from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as Sentry from '@sentry/browser';
import { selectAlert, setAlert, clearAlert, unloadCurrentArtist } from '../../shared/store';
import { withCurrentUser, useIsEmployee } from '../../features/currentUser';
import { withHooks } from '@mrkt/features/withHooks';
import { setLastVisitedArtist } from '../../shared/lib/lastVisitedArtist';
import App from '../../features/App';
import Alert from './Alert';
import ConnectedAnnouncements from './Announcements';
import { QualarooSurvey } from '@mrkt/features/QualarooSurvey';
import { GetFeedbackSurvey } from '@mrkt/features/getfeedback-survey';
import { useT } from '@mrkt/features/i18n';
import ArtistContentLoading from './ContentLoading';
import { useCurrentArtistIdOrNull } from '../../features/artists';
import { QualarooSurveyBool, useRemoteProperty } from '@mrkt/features/RemoteConfig';
import { useGetMirroringSession } from '../../features/currentUser/useGetMirroringSession';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export var Artist = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Artist, _React$PureComponent);

  var _super = _createSuper(Artist);

  function Artist() {
    var _this;

    _classCallCheck(this, Artist);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "alertTimeout", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", {
      error: undefined
    });

    return _this;
  }

  _createClass(Artist, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.alert) {
        this.startAlertTimeout();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.match.params.artistId !== prevProps.match.params.artistId) {
        this.props.unloadCurrentArtist(); // @dkellerman: set last visited artist for use with Google Analytics

        setLastVisitedArtist(this.props.currentUser.username, this.props.match.params.artistId);
      }

      if (this.props.alert && this.props.alert !== prevProps.alert) {
        this.startAlertTimeout();
      }

      if (this.props.location !== prevProps.location) {
        /* eslint-disable */
        this.setState(function (state) {
          /* eslint-enable */
          if (state.error) return {
            error: undefined
          };
          return null;
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.unloadCurrentArtist();
      this.stopAlertTimeout();
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error) {
      Sentry.withScope(function (scope) {
        scope.setLevel(Sentry.Severity.Fatal);
        Sentry.captureException(error);
      });
    }
  }, {
    key: "startAlertTimeout",
    value: function startAlertTimeout() {
      this.stopAlertTimeout();
      this.alertTimeout = setTimeout(this.props.clearAlert, 30000);
    }
  }, {
    key: "stopAlertTimeout",
    value: function stopAlertTimeout() {
      clearTimeout(this.alertTimeout);
    }
  }, {
    key: "renderAlert",
    value: function renderAlert() {
      var t = this.props.t;

      if (this.state.error) {
        return /*#__PURE__*/_jsx(Alert, {
          colorSet: "negative",
          children: /*#__PURE__*/_jsx("span", {
            "data-testid": "alert-message",
            children: /*#__PURE__*/_jsx("strong", {
              children: t('PAGE_BODY_ERROR', 'Something went wrong', 'Displayed in a banner in the page body when there is an error')
            })
          })
        });
      }

      if (!this.props.alert && this.props.decoratedSession && this.props.decoratedSession.isMirroringSession) {
        var DESCRIPTION = formatDescription(this.props.decoratedSession.userNameToMirror);
        return /*#__PURE__*/_jsx(Alert, {
          colorSet: "warning",
          children: /*#__PURE__*/_jsx("span", {
            "data-testid": "alert-message",
            children: /*#__PURE__*/_jsx("strong", {
              children: t('MIRRORING_SESSION_MESSAGE', '{description}', 'Descriptive message telling the user to be careful making changes since they are mirroring another user.', {
                description: DESCRIPTION
              })
            })
          })
        });
      }

      if (!this.props.alert && this.props.isEmployee && true) {
        return /*#__PURE__*/_jsx(Alert, {
          colorSet: "warning",
          children: /*#__PURE__*/_jsxs("span", {
            "data-testid": "alert-message",
            children: [/*#__PURE__*/_jsx("strong", {
              children: t('EMPLOYEE_ACCESS_MESSAGE', "\n                You have employee access and are looking at confidential\n                information - please do not share anything you see here\n                externally.\n              ", 'Descriptive message telling employees not to share anything externally since its confidential.')
            }), ' ', /*#__PURE__*/_jsx("a", {
              href: "https://docs.google.com/document/d/1ypNe6wBf0J8ByOPAMAv-oNZFe0JkZZj9yPlzjOz5zjY/edit#heading=h.507e60mop4v6",
              target: "_blank",
              rel: "noreferrer noopener",
              children: t('LEARN_MORE_EMPLOYEE_ACCESS', 'Learn more here.', 'Label where employees can learn about confidential information at Spotify.')
            })]
          })
        });
      }

      if (this.props.location.search === '?aaf=info') {
        return /*#__PURE__*/_jsx(Alert, {
          children: /*#__PURE__*/_jsx("span", {
            "data-testid": "alert-message",
            children: /*#__PURE__*/_jsx("strong", {
              children: t('ARIST_ACCESS_INFO_TEXT', "\n                If you need access to a particular team, reach out to that team's admin.\n              ", 'Descriptive text to explain who to reach out to for access to a team.')
            })
          })
        });
      }

      if (!this.props.alert) return null;
      var colorSet = 'positive';

      if (this.props.alert.error) {
        colorSet = 'negative';
      }

      return /*#__PURE__*/_jsx(Alert, {
        colorSet: colorSet,
        onClose: this.props.clearAlert,
        children: /*#__PURE__*/_jsxs("span", {
          "data-testid": "alert-message",
          children: [/*#__PURE__*/_jsx("strong", {
            children: this.props.alert.title
          }), this.props.alert.subtitle && ' ', this.props.alert.subtitle]
        })
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$currentUs, _this$props$currentUs2, _this$props$currentUs3, _this$props$currentUs4;

      var userId = this.props.currentUser ? (_this$props$currentUs = this.props.currentUser.partnerIds) === null || _this$props$currentUs === void 0 ? void 0 : _this$props$currentUs.qualaroo : undefined;
      var getfeedbackPartnerId = (_this$props$currentUs2 = (_this$props$currentUs3 = this.props.currentUser) === null || _this$props$currentUs3 === void 0 ? void 0 : (_this$props$currentUs4 = _this$props$currentUs3.partnerIds) === null || _this$props$currentUs4 === void 0 ? void 0 : _this$props$currentUs4.getfeedback) !== null && _this$props$currentUs2 !== void 0 ? _this$props$currentUs2 : null;
      var artistId = this.props.artistId;
      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(App, {
          banner: this.renderAlert(),
          content: this.state.error ? null : /*#__PURE__*/_jsx(Suspense, {
            fallback: /*#__PURE__*/_jsx(ArtistContentLoading, {}),
            children: this.props.children
          })
        }), /*#__PURE__*/_jsxs(Suspense, {
          fallback: null,
          children: [/*#__PURE__*/_jsx(ConnectedAnnouncements, {}), this.props.hasQualaroo && /*#__PURE__*/_jsx(QualarooSurvey, {
            identity: userId,
            additionalProperties: {
              artistId: artistId
            }
          }), /*#__PURE__*/_jsx(GetFeedbackSurvey, {
            identity: getfeedbackPartnerId
          })]
        })]
      });
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        error: error
      };
    }
  }]);

  return Artist;
}(React.PureComponent);
var mapStateToProps = createStructuredSelector({
  alert: selectAlert
});

function useHasQualaroo() {
  return useRemoteProperty(QualarooSurveyBool);
}

function formatDescription(userNameToMirror) {
  return "".concat(userNameToMirror ? "Heads up, you're logged in as ".concat(userNameToMirror, ". Anything you change will be reflected on their side.") : "Heads up, you're logged in as another user. Anything you change will be reflected on their side.");
}

var withIsEmployee = withHooks(function () {
  return {
    isEmployee: useIsEmployee(),
    hasQualaroo: useHasQualaroo()
  };
});
var withMirroringSession = withHooks(function () {
  return {
    decoratedSession: useGetMirroringSession().decoratedSession
  };
});
var withArtistId = withHooks(function () {
  return {
    artistId: useCurrentArtistIdOrNull()
  };
});
var withT = withHooks(function () {
  return {
    t: useT()
  };
});
/* eslint-disable-next-line import/no-default-export */

export default compose(withCurrentUser, withIsEmployee, withArtistId, withT, withMirroringSession, connect(mapStateToProps, {
  unloadCurrentArtist: unloadCurrentArtist,
  setAlert: setAlert,
  clearAlert: clearAlert
}))(Artist);