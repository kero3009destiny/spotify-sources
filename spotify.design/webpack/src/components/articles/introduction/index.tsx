import React from 'react';
import style from './style.module.css';

interface Props {
  body: string;
}

export const Introduction = ({ body }: Props) => (
  <p className={`t-body-2 sd-article-introduction ${style.introduction}`}>
    {body}
  </p>
);
