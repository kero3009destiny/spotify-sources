import React from 'react';
import { Type } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
type Props = {
  desiredHeight: number;
  desiredWidth: number;
};

export function Instructions({ desiredHeight, desiredWidth }: Props) {
  const t = useT();
  return (
    <>
      <Type.p variant={Type.body3}>
        {t('c54a09', 'File format: jpeg, gif or png.', '')}
        <br />
        {t(
          '3834e3',
          'Images must be at least {desiredWidth} px x {desiredHeight} px.',
          '',
          { desiredWidth, desiredHeight },
        )}
        <br />
        {t('ec696f', 'Avoid text, logos, and busy backgrounds.', '')}
      </Type.p>

      <Type.p variant={Type.body3}>
        <span
          dangerouslySetInnerHTML={{
            __html: t(
              'c58e1f',
              `By uploading an image, you agree that you have all of the legal rights to do so as described in our
            <a
              href="https://www.spotify.com/us/legal/spotify-for-artists-terms-and-conditions/"
              target="_blank"
              rel="noopener noreferrer"
            >terms</a>. For guidelines, see our
            <a
              href="/faq/profile#what-guidelines-should-i-follow-when-choosing-a-profile-image"
              target="_blank"
              rel="noopener noreferrer"
            >FAQs</a>.`,
              '',
            ),
          }}
        />
      </Type.p>
    </>
  );
}
