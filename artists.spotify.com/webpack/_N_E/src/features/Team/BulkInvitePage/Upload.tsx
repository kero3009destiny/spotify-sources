import React, { useState } from 'react';
import { Type, gray95, spacer16, spacer8, white } from '@spotify-internal/encore-web';
import { DropZoneContainer } from './layout/DropZoneContainer';
import { DropZone } from './layout/DropZone';
import { BulkUploadIcon } from './layout/BulkUploadIcon';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var Upload = function Upload(_ref) {
  var onFileSelected = _ref.onFileSelected;

  var _useState = useState(false),
      isHover = _useState[0],
      setIsHover = _useState[1];

  var _useState2 = useState(undefined),
      dragInfo = _useState2[0],
      setDragInfo = _useState2[1];

  var isValidMouseover = isHover || dragInfo && dragInfo.isValid;

  var background = function () {
    if (isValidMouseover) {
      return "linear-gradient(to right, ".concat(white, ", ").concat(gray95, " 100%)");
    }

    return '';
  }();

  var t = useT();
  return /*#__PURE__*/_jsxs(DropZoneContainer, {
    style: {
      background: background
    },
    className: isValidMouseover ? 'hover' : '',
    children: [/*#__PURE__*/_jsx(BulkUploadIcon, {}), /*#__PURE__*/_jsx(Type, {
      as: "p",
      variant: Type.heading4,
      weight: Type.bold,
      style: {
        paddingBottom: spacer8,
        paddingTop: spacer16
      },
      children: dragInfo && !dragInfo.isValid ? t('TEAM_BULK_INVITE_UPLOAD_CSV_ERROR', "Couldn't read the file. Make sure it's a CSV file and try again.", 'Error message for CSV upload') : t('TEAM_BULK_INVITE_UPLOAD_CSV_UPLOAD', 'You can upload or drag and drop your file here', 'Text describing how to upload CSV')
    }), /*#__PURE__*/_jsx(Type, {
      as: "p",
      variant: Type.body2,
      children: dragInfo && !dragInfo.isValid ? /*#__PURE__*/_jsx(_Fragment, {
        children: "\xA0"
      }) : /*#__PURE__*/_jsx("div", {
        dangerouslySetInnerHTML: {
          __html: t('TEAM_BULK_INVITE_UPLOAD_FILE_TYPE_DESCRIPTION', '<b>.CSV</b> files only', 'Upload file type description')
        }
      })
    }), /*#__PURE__*/_jsx(DropZone, {
      "data-testid": "upload",
      type: "file",
      onChange: function onChange(e) {
        return onFileSelected(e.target.files.item(0), dragInfo ? 'drop' : 'select-file');
      },
      onDragEnter: function onDragEnter() {
        setDragInfo(undefined);
      },
      onDragOver: function onDragOver(e) {
        var dataTransfer = e.dataTransfer; // We accespt any text/application mime type here, as windows browsers sometimes
        // reports CSV as other semi-related mimetypes like text/plain or application/vnd.ms-excel
        // instead of text/csv

        var isValid = dataTransfer.items.length === 0 || dataTransfer.items.length === 1 && (dataTransfer.items[0].type.startsWith('text/') || dataTransfer.items[0].type.startsWith('application/'));
        setDragInfo({
          isValid: isValid
        });
      },
      onDragLeave: function onDragLeave() {
        setDragInfo(undefined);
      },
      onMouseEnter: function onMouseEnter() {
        return setIsHover(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setIsHover(false);
      }
    })]
  });
};