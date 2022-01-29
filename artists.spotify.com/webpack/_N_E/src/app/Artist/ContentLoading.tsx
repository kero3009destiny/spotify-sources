// ignore-string-externalization
import React from 'react';
import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import styles from './index.module.scss';
/* eslint-disable-next-line import/no-default-export */

import { jsx as _jsx } from "react/jsx-runtime";
export default function ArtistContentLoading() {
  return /*#__PURE__*/_jsx("div", {
    className: styles.bundle_loader,
    children: /*#__PURE__*/_jsx(LoadingIndicator, {})
  });
}