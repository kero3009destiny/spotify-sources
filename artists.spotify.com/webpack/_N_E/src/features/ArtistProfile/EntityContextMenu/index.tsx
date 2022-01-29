import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { IconMore, ButtonIcon, PopoverNavigation, PopoverNavigationItem, PopoverNavigationLink, OverlayTrigger, PopoverTrigger, ButtonTertiary, Backdrop } from '@spotify-internal/encore-web';
import { DialogAlert } from '@mrkt/features/Dialog';
import { withT } from '@mrkt/features/i18n';
import { spotifyOpenLink } from '../../../shared/lib/urlHelpers';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var EntityContextMenuClassComponent = /*#__PURE__*/function (_React$Component) {
  _inherits(EntityContextMenuClassComponent, _React$Component);

  var _super = _createSuper(EntityContextMenuClassComponent);

  function EntityContextMenuClassComponent() {
    var _this;

    _classCallCheck(this, EntityContextMenuClassComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      showReportConfirmation: false,
      showMenu: false
    });

    _defineProperty(_assertThisInitialized(_this), "stopEventAndSetState", function (e, newState) {
      if (e) {
        e.stopPropagation();
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "closeTrigger", function (e) {
      _this.stopEventAndSetState(e, {
        showMenu: false
      });
    });

    return _this;
  }

  _createClass(EntityContextMenuClassComponent, [{
    key: "renderReportConfirmation",
    value: function renderReportConfirmation() {
      var _this2 = this;

      var t = this.props.t;
      return /*#__PURE__*/_jsx(Backdrop, {
        center: true,
        onClose: function onClose(e) {
          _this2.stopEventAndSetState(e, {
            showReportConfirmation: false
          });
        },
        children: /*#__PURE__*/_jsx(DialogAlert, {
          dialogId: "profile-entity-context-report-content-mismatch-dialog",
          dialogTitle: t('artistprofile_entitycontextmenu_1', 'Thanks! We’ll take a look.', ''),
          body: t('artistprofile_entitycontextmenu_2', 'It takes us 10-15 business days to fix mismatches. We know how important this is to you—so we’ll go as quick as we can.', ''),
          footer: /*#__PURE__*/_jsx("div", {
            children: /*#__PURE__*/_jsx(ButtonTertiary, {
              buttonSize: ButtonTertiary.sm,
              color: "green",
              condensed: true,
              onClick: function onClick() {
                return _this2.setState({
                  showReportConfirmation: false
                });
              },
              children: t('artistprofile_entitycontextmenu_3', 'Ok', '')
            })
          })
        })
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          artist = _this$props.artist,
          authorizedUser = _this$props.authorizedUser,
          className = _this$props.className,
          controlsId = _this$props.controlsId,
          entity = _this$props.entity,
          isPlaceholder = _this$props.isPlaceholder,
          t = _this$props.t;
      var showReportConfirmation = this.state.showReportConfirmation;
      var albumUrl = spotifyOpenLink(entity.uri);
      var shouldAllowSetAsArtistPick = !!authorizedUser;
      return /*#__PURE__*/_jsxs("div", {
        className: cn(styles.entity_context_menu, className, isPlaceholder && styles.is_placeholder),
        children: [/*#__PURE__*/_jsx(PopoverTrigger, {
          placement: OverlayTrigger.rightBottom,
          onShow: function onShow(e) {
            _this3.stopEventAndSetState(e, {
              showMenu: true
            });
          },
          onHide: function onHide(e) {
            _this3.stopEventAndSetState(e, {
              showMenu: false
            });
          },
          overlay: this.state.showMenu && /*#__PURE__*/_jsxs(PopoverNavigation, {
            id: entity.uri,
            className: "encore-muted-accent-set",
            children: [shouldAllowSetAsArtistPick && /*#__PURE__*/_jsx(PopoverNavigationItem, {
              children: /*#__PURE__*/_jsx(PopoverNavigationLink, {
                component: Link // @ts-ignore
                ,
                to: {
                  pathname: "/artist/".concat(artist.id, "/profile"),
                  search: "defaultArtistPick=".concat(entity.uri)
                },
                onClick: this.closeTrigger,
                children: t('artistprofile_entitycontextmenu_4', 'Set as Artist Pick', '')
              })
            }), /*#__PURE__*/_jsx(PopoverNavigationItem, {
              children: /*#__PURE__*/_jsx(PopoverNavigationLink, {
                href: albumUrl,
                rel: "noopener noreferrer",
                target: "_blank",
                onClick: this.closeTrigger,
                children: t('artistprofile_entitycontextmenu_5', 'View on Spotify', '')
              })
            })]
          }),
          children: /*#__PURE__*/_jsx(ButtonIcon, {
            "aria-expanded": this.state.showMenu,
            "aria-controls": controlsId,
            className: styles.entity_context_menu__popover_link,
            children: /*#__PURE__*/_jsx(IconMore, {
              color: "white",
              "aria-label": "More options"
            })
          })
        }), showReportConfirmation ? this.renderReportConfirmation() : null]
      });
    }
  }]);

  return EntityContextMenuClassComponent;
}(React.Component);

_defineProperty(EntityContextMenuClassComponent, "defaultProps", {
  authorizedUser: false,
  isPlaceholder: false
});

export var EntityContextMenu = withT(EntityContextMenuClassComponent);