import React from 'react';
import { MAIN_CONTENT_ID } from '../../../common/constants/a11y';
import style from './style.module.css';

export const SkipToMainContent = () => (
  <a href={`#${MAIN_CONTENT_ID}`} className={style.skipToMainContent}>
    Skip to main content
  </a>
);
