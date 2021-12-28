/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import Helmet, { HelmetProps } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { ORIGIN, KEYWORDS } from '../../common/constants/seo';
import { APP_ICONS, SPLASH_SCREENS } from '../../common/constants/pwa';

interface Props {
  description?: string;
  lang?: string;
  meta?: Pick<HelmetProps, 'meta'>;
  socialImage?: string;
  title: string;
}

function Head({ description, lang, title, socialImage }: Props): JSX.Element {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            social
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const metaSocial = `${ORIGIN}${site.siteMetadata.social}`;

  let socialImg = metaSocial;

  if (socialImage && socialImage.startsWith('//')) {
    // Append protocol.
    socialImg = `https:${socialImage}`;
    // Remove querystring.
    socialImg = socialImg.substring(0, socialImg.indexOf('?'));
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      {APP_ICONS.map(({ src, type, sizes, rel }) => (
        <link key={src} rel={rel} type={type} sizes={sizes} href={src} />
      ))}
      {SPLASH_SCREENS.map(({ src, media, rel }) => (
        <link key={src} rel={rel} href={src} media={media} />
      ))}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={KEYWORDS} />

      <meta name="applicable-device" content="pc,mobile" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta
        name="apple-mobile-web-app-title"
        content={site.siteMetadata.title}
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={socialImg} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={socialImg} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:creator" content="@spotifydesign" />
      <meta name="twitter:site" content="@spotifydesign" />
    </Helmet>
  );
}

Head.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

export default Head;
