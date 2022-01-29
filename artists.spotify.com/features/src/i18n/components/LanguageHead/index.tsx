import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';

type Props = {
  base: string;
};

/**
 * Implements the correct html tags needed to tell search engines like Google about language variants of the page.
 * @see https://developers.google.com/search/docs/advanced/crawling/localized-versions#html
 */
export function LanguageHead({ base }: Props) {
  const { asPath, basePath, locales } = useRouter();

  return (
    <Head>
      {locales?.map(locale => (
        <link
          rel="alternate"
          hrefLang={locale}
          href={new URL(`${basePath}/${locale}${asPath}`, base).href}
          key={locale}
        />
      ))}
      {!!locales?.length && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={new URL(`${basePath}${asPath}`, base).href}
        />
      )}
    </Head>
  );
}
