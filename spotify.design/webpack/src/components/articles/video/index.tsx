import React from 'react';
import style from './style.module.css';

interface Props {
  src: string;
  caption?: string;
}

export const ArticleVideo = ({ src, caption }: Props) => (
  <figure className="sd-article-video">
    <video src={src} controls />
    {caption && (
      <figcaption className={`t-body-4 ${style.caption}`}>{caption}</figcaption>
    )}
  </figure>
);
