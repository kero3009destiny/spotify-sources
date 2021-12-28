import React from 'react';
import style from './style.module.css';

export interface Props {
  text?: string | null;
  attribution?: string | null;
}

export const ArticleQuote = ({ text, attribution }: Props) => (
  <blockquote className={`sd-article-quote ${style.quote}`}>
    {text && <p className={`t-display-3 ${style.body}`}>“{text}”</p>}
    {attribution && (
      <footer className={style.footer}>
        <cite className={`t-display-5 ${style.cite}`}>{attribution}</cite>
      </footer>
    )}
  </blockquote>
);
