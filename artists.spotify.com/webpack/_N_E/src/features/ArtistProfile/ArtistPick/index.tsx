import _classCallCheck from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "/var/jenkins_home/workspace/tingle.d5c10900-be3d-462c-9b89-e8c98c5367b1/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import { Type } from '@spotify-internal/encore-web';
import { withT } from '@mrkt/features/i18n';
import { formatConcertMonthDay } from '../../ConcertsTab/state/dateUtils';
import { AddToProfile } from '../Elements';
import { ArtistPickCompact } from './ArtistPickCompact';
import { Card } from './Card';
import { Comment } from './Comment';
import { Entity } from './Entity';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var ArtistPickClassComponent = /*#__PURE__*/function (_Component) {
  _inherits(ArtistPickClassComponent, _Component);

  var _super = _createSuper(ArtistPickClassComponent);

  function ArtistPickClassComponent() {
    var _this;

    _classCallCheck(this, ArtistPickClassComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "expirationMessageForArtistPick", function () {
      var _this$props = _this.props,
          artistPick = _this$props.artistPick,
          concertsMetadata = _this$props.concertsMetadata;

      var _ref = artistPick || {},
          _ref$secondsToExpirat = _ref.secondsToExpiration,
          secondsToExpiration = _ref$secondsToExpirat === void 0 ? 0 : _ref$secondsToExpirat,
          artistPickType = _ref.type;

      var _ref2 = concertsMetadata || {},
          _ref2$concertsCount = _ref2.concertsCount,
          concertsCount = _ref2$concertsCount === void 0 ? 0 : _ref2$concertsCount,
          lastConcertDate = _ref2.lastConcertDate;

      var artistPickIsLocalConcert = artistPickType === 'concert_local';

      if (artistPickIsLocalConcert && concertsCount > 0 && lastConcertDate) {
        return _this.formatConcertsExpirationMessage(lastConcertDate);
      }

      if (secondsToExpiration) {
        return _this.formatExpirationDaysMessage(secondsToExpiration);
      }

      return '';
    });

    _defineProperty(_assertThisInitialized(_this), "renderCompactCard", function () {
      var _this$props2 = _this.props,
          artist = _this$props2.artist,
          artistPick = _this$props2.artistPick;

      if (artistPick) {
        var expirationText = _this.expirationMessageForArtistPick();

        return /*#__PURE__*/_jsx(ArtistPickCompact, {
          artistImageUrl: artist.imageUrl,
          artistName: artist.name,
          comment: artistPick.comment,
          editing: _this.props.editing,
          expirationText: expirationText,
          image: artistPick.image,
          onCommentChange: _this.props.onCommentChange,
          subtitle: artistPick.subtitle,
          title: artistPick.title,
          type: artistPick.type,
          uri: artistPick.uri
        });
      }

      return null;
    });

    return _this;
  }

  _createClass(ArtistPickClassComponent, [{
    key: "formatConcertsExpirationMessage",
    value: function formatConcertsExpirationMessage(lastConcertDate) {
      var t = this.props.t;
      var dateText = formatConcertMonthDay(new Date(lastConcertDate));
      return t('artistprofile_artistpick_1', 'Expires after your last show ({data})', 'Refers to the expiration date of the Artist Pick', {
        data: dateText
      });
    }
  }, {
    key: "formatExpirationDaysMessage",
    value: function formatExpirationDaysMessage(secondsToExpiration) {
      var t = this.props.t;
      if (!secondsToExpiration) return t('artistprofile_artistpick_2', 'Expires in 14 days', 'Refers to the expiration date of the Artist Pick');
      var expirationDays = Math.ceil(secondsToExpiration / (60 * 60 * 24));
      return expirationDays <= 1 ? t('artistprofile_artistpick_3', 'Expires today', 'Refers to the expiration date of the Artist Pick') : t('artistprofile_artistpick_4', 'Expires in {data} days', 'Refers to the expiration date of the Artist Pick. Variable is the number of days until expiration.', {
        data: expirationDays
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          artistPick = _this$props3.artistPick,
          artist = _this$props3.artist,
          onClick = _this$props3.onClick,
          authorizedUser = _this$props3.authorizedUser,
          t = _this$props3.t;
      var artistName = artist.name;

      if (!(artistPick && artistPick.uri)) {
        return /*#__PURE__*/_jsx(AddToProfile, {
          dataTestId: "artist-pick-empty",
          disabled: !authorizedUser,
          onClick: onClick,
          text: t('artistprofile_artistpick_5', 'Promote your concerts or feature music at the top of your profile', 'Refers to some of the benefits of using the Artist Pick feature')
        });
      }

      if (artistPick.type.match(/^concert/)) {
        artistPick.subtitle = t('artistprofile_artistpick_6', 'Day, Time • Location', 'Refers to date, time and location of an Artist Pick that is a concert');
      }

      if (!artistPick.backgroundImage) {
        return this.renderCompactCard();
      }

      return /*#__PURE__*/_jsxs("div", {
        "data-testid": "artist-pick",
        children: [/*#__PURE__*/_jsx(Card, _objectSpread(_objectSpread(_objectSpread({}, artistPick.backgroundImage && {
          image: artistPick.backgroundImage
        }), !artistPick.backgroundImage && {
          outline: true
        }), {}, {
          top: /*#__PURE__*/_jsx(Comment, {
            editing: false,
            className: styles.announcement__comment,
            image: artist.imageUrl,
            transparent: !artistPick.comment,
            comment: artistPick.comment || t('artistprofile_artistpick_7', 'Posted by {data}', 'Refers to the artist on whose behalf the Artist Pick was created', {
              data: artistName
            })
          }),
          bottom: /*#__PURE__*/_jsx(Entity, {
            link: artistPick.uri,
            image: artistPick.image,
            title: artistPick.title,
            subtitle: artistPick.subtitle,
            type: artistPick.type
          })
        })), /*#__PURE__*/_jsx(Type.p, {
          className: styles.announcement__expiration,
          variant: Type.cta3,
          children: this.expirationMessageForArtistPick()
        })]
      });
    }
  }]);

  return ArtistPickClassComponent;
}(Component);
export var ArtistPick = withT(ArtistPickClassComponent);