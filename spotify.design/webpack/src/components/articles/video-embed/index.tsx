import React from 'react';
import {
  isVimeoPattern,
  isYoutubePattern,
  vimeoURLToVimeoEmbed,
  youtubeURLToYoutubeEmbed,
} from './utils';
import style from './style.module.css';

interface Props {
  src: string;
}

export const ArticleVideoEmbed = ({ src }: Props) => {
  let iframeSrc = src;
  const isYoutube = isYoutubePattern.test(src);
  if (isYoutube) {
    iframeSrc = youtubeURLToYoutubeEmbed(src);
  } else if (isVimeoPattern.test(src)) {
    iframeSrc = vimeoURLToVimeoEmbed(src);
  }

  return (
    <div className={`sd-article-video-embed ${style.videoEmbed}`}>
      <iframe src={iframeSrc} allowFullScreen frameBorder={0} />
    </div>
  );
};
