import React from 'react';

import get from 'lodash/get';

import {
  Hero,
  HeroDynamic,
  HeroCarousel,
  WrapperIntro,
} from 'components/organisms';
import { Intro, LocaleNudgeBanner } from 'components/molecules';
import { Subhead } from 'components/atoms';
import { ModuleRenderer } from 'utils/module-renderer';
import { PageDataLoader } from 'utils/page-data-loader';
import { VerifyPageContext } from 'utils/verify-page-context';
import { IntroContext } from 'contexts/intro-context';
import { QUERY_TYPES } from 'constants/query';
import { FULL_BLEED_COMPONENTS } from 'constants/modules';
import { Portal } from 'components/atoms/portal';

/**
 * Renders the Home Page template.
 * @param {Object} pageData The Contentful data object.
 */
const HomePage = ({ pageData }) => {
  const {
    modulesCollection: { items: components },
    __typename: pageContext,
    hero,
    heroCarousel,
    heroDynamic,
    subhead,
    introText,
  } = pageData;
  const verifiedContext = VerifyPageContext(pageContext);
  const [{ __typename: moduleType }] = components;
  const isFullBleedComponent = FULL_BLEED_COMPONENTS.includes(moduleType);

  return (
    <article>
      {/* Hero */}
      {heroCarousel && (
        <HeroCarousel data={pageData} pageContext={verifiedContext} />
      )}

      {/* Hero */}
      {hero && !heroCarousel && (
        <Hero
          key={get(hero, 'sys.id')}
          data={pageData}
          pageContext={verifiedContext}
        />
      )}

      {/* Hero */}
      {heroDynamic && !heroCarousel && !hero && (
        <HeroDynamic data={pageData} pageContext={verifiedContext} />
      )}
      {(introText || subhead) && (
        <IntroContext.Provider
          value={{
            withHeight: isFullBleedComponent,
            withIntro: !!introText,
          }}
        >
          <WrapperIntro>
            {/* Subhead */}
            {subhead && <Subhead>{subhead}</Subhead>}

            {/* Intro Text */}
            {introText && <Intro bodyText={introText} />}
          </WrapperIntro>
        </IntroContext.Provider>
      )}
      {/* Modules */}
      <section>
        <ModuleRenderer components={components} pageContext={verifiedContext} />
      </section>
      <Portal>
        <LocaleNudgeBanner />
      </Portal>
    </article>
  );
};

export default PageDataLoader(HomePage, {
  pageSlug: false,
  queryType: QUERY_TYPES.PAGE_HOME_QUERY,
});
