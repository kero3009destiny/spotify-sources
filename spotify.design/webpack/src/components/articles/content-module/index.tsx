import React from 'react';
import { Document } from '@contentful/rich-text-types';
import { FragmentContentModulesFragment } from '../../../../typings/graphql-types';
import { ArticleQuote } from '../quote';
import { Gallery } from '../gallery';
import { SpotifyEmbed } from '../spotify-embed';
import { formatRichText } from '../body';
import { AsideText } from '../aside-text';
import { ArticleVideo } from '../video';
import { ArticleVideoEmbed } from '../video-embed';

interface Props {
  data: FragmentContentModulesFragment | null;
}

export const ContentModule = ({ data }: Props) => {
  if (!data) return null;

  switch (data.__typename) {
    case 'ContentfulArticleBody':
      const richText = data?.copy?.json as Document;
      const asideContent = data.asideText;
      const asidePosition = asideContent ? asideContent.position : null;

      return (
        <>
          {asideContent?.text?.text && asidePosition === 'Left' && (
            <AsideText position={asideContent?.position}>
              <span>{asideContent.text.text}</span>
            </AsideText>
          )}

          <div className="sd-article-body-rich-text">
            {formatRichText(richText)}
          </div>

          {asideContent?.text?.text && asidePosition === 'Right' && (
            <AsideText position={asideContent?.position}>
              <span>{asideContent.text.text}</span>
            </AsideText>
          )}
        </>
      );

    case 'ContentfulArticleImageGallery':
      return <Gallery images={data.images} caption={data.caption} />;
    case 'ContentfulArticlePlayButtonWidget':
      const { spotifyLink, podcast } = data;
      return <SpotifyEmbed src={spotifyLink as string} podcast={podcast} />;
    case 'ContentfulArticleQuote':
      return (
        <ArticleQuote text={data.text?.text} attribution={data?.attribution} />
      );
    case 'ContentfulArticleVideo':
      if (data.video?.file?.url) {
        return (
          <ArticleVideo
            src={data.video?.file?.url}
            caption={data.caption || undefined}
          />
        );
      }
      break;
    case 'ContentfulArticleVideoEmbed':
      if (data.url) return <ArticleVideoEmbed src={data.url} />;
      break;
    default:
      return null;
  }
};
