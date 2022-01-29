import React from 'react';
import classNames from 'classnames';
import { ButtonPrimary, ButtonTertiary } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import styles from './index.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function EditControls(_ref) {
  var onCancel = _ref.onCancel,
      onSave = _ref.onSave,
      saveable = _ref.saveable,
      cancelable = _ref.cancelable,
      category = _ref.category,
      customClassName = _ref.customClassName,
      testIdPrefix = _ref.testIdPrefix;
  var t = useT();

  var handleCancel = function handleCancel() {
    if (category) {
      sendEvent({
        eventCategory: category,
        eventAction: 'click',
        eventLabel: 'Cancel'
      });
    }

    onCancel.apply(void 0, arguments);
  };

  var handleSave = function handleSave() {
    if (category) {
      sendEvent({
        eventCategory: category,
        eventAction: 'click',
        eventLabel: 'Save'
      });
    }

    onSave.apply(void 0, arguments);
  };

  return /*#__PURE__*/_jsxs("div", {
    className: classNames(styles.ap_controls, customClassName),
    children: [/*#__PURE__*/_jsx(ButtonTertiary, {
      buttonSize: ButtonTertiary.sm,
      className: styles['ap_controls-button-cancel'],
      onClick: handleCancel,
      disabled: !cancelable,
      "data-testid": "".concat(testIdPrefix || '', "cancel-button"),
      children: /*#__PURE__*/_jsx("span", {
        children: t('artistprofile_editcontrols_1', 'Cancel', '')
      })
    }), /*#__PURE__*/_jsx(ButtonPrimary, {
      buttonSize: ButtonPrimary.sm,
      className: styles['ap_controls-button-save'],
      onClick: handleSave,
      disabled: !saveable,
      "data-testid": "".concat(testIdPrefix || '', "save-button"),
      children: /*#__PURE__*/_jsx("span", {
        children: t('artistprofile_editcontrols_2', 'Save', '')
      })
    })]
  });
}
EditControls.defaultProps = {
  onCancel: function onCancel() {},
  onSave: function onSave() {},
  saveable: true,
  cancelable: true,
  customClassName: '',
  testIdPrefix: ''
};