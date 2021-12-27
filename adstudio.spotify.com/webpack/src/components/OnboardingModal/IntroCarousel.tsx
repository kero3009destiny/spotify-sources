import React from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { get } from 'lodash';
import styled from 'styled-components';

import { Type } from '@spotify-internal/encore-web';

import { LocaleEntry, LocaleLinks } from 'ducks/config/types';
import { getById } from 'ducks/config/selectors';
import { getSelectedLocale } from 'ducks/i18n/selectors';

import { SlideType } from './constants';
import { DEFAULT_LOCALE } from 'config/i18n';

const CarouselContainer = styled.div`
  max-width: 523px; // magic design number
  margin: 0 auto;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

export interface IntroCarouselProps {
  currentSlide: number;
  logUserAction: (userAction: GoogleAnalyticsEvent) => void;
  children: React.ReactNode;
  href: string;
  localeLinks: LocaleLinks;
  slides: Array<SlideType>;
}

export function IntroCarousel({
  currentSlide,
  localeLinks,
  logUserAction,
  slides,
}: IntroCarouselProps) {
  const { title, caption, Icon } = slides[currentSlide];

  const interpolatedCaption = caption.replace(
    /__AD_GUIDELINES_LINK__/,
    localeLinks.adGuidelines as string,
  );

  return (
    <CarouselContainer>
      <div>
        <Icon width={425} height={225} viewBox="60 60 180 180" />
      </div>
      <div>
        <Type.h2 variant={Type.heading2}>{title}</Type.h2>
        <ReactMarkdown
          source={interpolatedCaption}
          renderers={{
            Link: ({ href, children }) => (
              <a
                href={href}
                onClick={() =>
                  logUserAction({
                    category: 'Welcome Screen',
                    label: 'click_link',
                    params: { href },
                  })
                }
                target="_blank"
                rel="nooopener"
              >
                {children}
              </a>
            ),
          }}
        />
      </div>
    </CarouselContainer>
  );
}

const mapStateToProps = (state: TSFixMe) => {
  const selectedLang = getSelectedLocale(state);
  let locale: LocaleEntry = getById(state, selectedLang);
  if (!locale || !locale.links) {
    locale = getById(state, DEFAULT_LOCALE);
  }
  return {
    localeLinks: get(locale, 'links', {}),
  };
};

export default connect(mapStateToProps)(IntroCarousel);
