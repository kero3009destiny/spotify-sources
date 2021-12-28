/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes, { any } from 'prop-types';

import get from 'lodash/get';

import getConfig from 'next/config';
import { MODULES } from 'constants/modules';
import { colors } from 'styles/variables';

import { SpotifyPlayer, ErrorBoundary } from 'components/atoms';
import {
  Figure,
  VideoSection,
  Quote,
  RTE,
  AudioPlayer,
  Markdown,
  TopicCarousel,
  FeatureCard,
  LinkList,
  HighlightedStatement,
  DynamicTextIntro,
  Accordion,
  InlineCard,
  AdExperiences,
  ChromeFeatureCard,
} from 'components/molecules';
import {
  Catalog,
  CuratedList,
  Stats,
  Statement,
  InlineForm,
  CuratedListGroup,
  Topic,
  DynamicSection,
} from 'components/organisms';

const { publicRuntimeConfig } = getConfig();
const ENVIRONMENT = publicRuntimeConfig.CONTENTFUL_ENVIRONMENT;

/**
 * Renders a a debug message if try to render unknown component, just for development
 * @param {Object} data The component object data.
 * @param {string} typename Content type ID from contentful
 * @returns {ReactElement}
 */
const DefaultModule = ({ data = {}, typename = '' }) =>
  ENVIRONMENT !== 'development' ? null : (
    <div
      style={{
        padding: '2rem',
        border: '0.1rem solid black',
        overflow: 'auto',
      }}
    >
      {typename ? (
        <>
          <h3 style={{ fontWeight: 'bold' }}>
            Component Missing:
            {typename}
          </h3>
          <code>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </code>
        </>
      ) : (
        <>
          <h2
            style={{
              fontWeight: 'bold',
              fontSize: '1.6em',
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            Component Missing
          </h2>
        </>
      )}
    </div>
  );

/**
 * Renders a specified module from the GraphQl endpoint data.
 * @param {Object} data The component object data.
 * @param {string} pageContext Verified page context (eg. PageDetail).
 * @returns {ReactElement}
 */
const ModuleMatrix = ({ data = {}, pageContext }) => {
  const { __typename: typename } = data;

  switch (typename) {
    case MODULES.RICH_TEXT:
      return <RTE body={data.body} modifier="grid" />;
    case MODULES.IMAGE:
      return <Figure data={data} type="image" pageContext={pageContext} />;
    case MODULES.AUDIO:
      return (
        <AudioPlayer
          title={data.title}
          caption={data.caption}
          data={data.audio}
          pageContext={pageContext}
        />
      );
    case MODULES.VIDEO:
      return (
        <VideoSection
          type={data.type}
          videoName={data.name}
          videoId={data.videoId}
          caption={data.caption}
          pageContext={pageContext}
        />
      );
    case MODULES.QUOTE:
      return (
        <Quote
          quote={data.quote}
          speaker={data.speaker}
          companyOrRole={data.companyOrRole}
          backgroundColor={data.backgroundColor}
          quoteColor={data.quoteColor}
          attributionTextColor={data.attributionTextColor}
          cta={data.cta}
        />
      );
    case MODULES.STATS:
      return (
        <Stats
          stats={data.statsCollection.items}
          title={data.title}
          backgroundColor={data.backgroundColor}
          theme={data.themeValue}
        />
      );
    case MODULES.STATEMENT:
      return (
        <Statement
          title={data.title}
          description={data.description}
          backgroundColor={data.backgroundColor}
          introColor={data.introColor}
          statementColor={data.statementColor}
          statement={data.statement}
          curatedLists={data.curatedListCollection.items}
          keyPoints={data.keyPoints}
        />
      );
    case MODULES.CATALOG:
      return (
        <Catalog
          title={data.title}
          entries={data.catalogEntriesCollection.items}
        />
      );
    case MODULES.CURATED_LIST_GROUP:
      return (
        <CuratedListGroup items={get(data, 'listsCollection.items', [])} />
      );
    case MODULES.CURATED_LIST:
      return <CuratedList data={data} backgroundColor={colors.grey800} />;
    case MODULES.SPOTIFY_PLAYER:
      return <SpotifyPlayer uri={data.uri} pageContext={pageContext} />;
    case MODULES.MARKDOWN_TEXT:
      return <Markdown body={data.markdownBody} modifier="grid" />;
    case MODULES.FEATURE_CARD:
      return (
        <FeatureCard
          backgroundColor={data.backgroundColor}
          description={data.description}
          eyebrow={data.eyebrow}
          image={data.image}
          imagePosition={data.imagePosition}
          theme={data.theme}
          title={data.title}
          titleColor={data.titleColor}
          ctasCollection={data.ctasCollection}
          columnList={data.columnList}
        />
      );
    case MODULES.CHROME_FEATURE_CARD:
      return (
        <ChromeFeatureCard
          backgroundColor={data.backgroundColor}
          description={data.description}
          eyebrow={data.eyebrow}
          image={data.image}
          imagePosition={data.imagePosition}
          theme={data.theme}
          title={data.title}
          titleColor={data.titleColor}
          ctasCollection={data.ctasCollection}
          columnList={data.columnList}
          imageType={data.imageType}
        />
      );
    case MODULES.TOPIC_CAROUSEL:
      return (
        <TopicCarousel
          eyebrow={data.eyebrow}
          entries={data.topicEntriesCollection}
        />
      );
    case MODULES.TOPIC:
      return (
        <Topic
          backgroundColor={data.backgroundColor}
          headlineColor={data.headlineColor}
          theme={data.themeValue}
          title={data.title}
          topicScroll={data.topicScroll}
          audioWithTranscript={data.audioWithTranscript}
        />
      );
    case MODULES.INLINE_FORM:
      return (
        <InlineForm
          name={data.name}
          title={data.title}
          action={data.action}
          ctaText={data.ctaText}
          disclaimer={data.disclaimer}
          failureMessage={data.failureMessage}
          successMessage={data.successMessage}
          fields={get(data, 'fieldsCollection.items', [])}
        />
      );
    case MODULES.LINK_LIST:
      return (
        <LinkList
          eyebrow={data.eyebrow}
          links={get(data, 'linksCollection.items', [])}
        />
      );
    case MODULES.HIGHLIGHTED_STATEMENT:
      return (
        <HighlightedStatement
          text={data.text}
          highlightColor={data.highlightColor}
        />
      );

    case MODULES.DYNAMIC_TEXT_INTRO:
      return (
        <DynamicTextIntro
          heading={data.heading}
          subHeading={data.subHeading}
          jumpText={data.jumpText}
        />
      );
    case MODULES.DYNAMIC_SECTION:
      return (
        <DynamicSection
          title={data.title}
          titleDetailText={data.titleDetailText}
          backgroundColor={data.backgroundColor}
          timeRange={data.timeRange}
        />
      );
    case MODULES.ACCORDION:
      return <Accordion entries={data.listsCollection.items} />;
    case MODULES.INLINE_CARD:
      return (
        <InlineCard
          image={data.image}
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
          ctasCollection={data.ctasCollection}
        />
      );
    case MODULES.AD_EXPERIENCES:
      return (
        <AdExperiences
          introTitle={data.introTitle}
          introImage={data.introImage}
          eyebrow={data.eyebrow}
          title1={data.title1}
          description1={data.description1}
          title2={data.title2}
          description2={data.description2}
          title3={data.title3}
          description3={data.description3}
          ctaHelpText={data.ctaHelpText}
          cta={data.cta}
        />
      );
    default:
      return <DefaultModule data={data} typename={typename} />;
  }
};

ModuleMatrix.propTypes = {
  data: PropTypes.objectOf(any).isRequired,
  pageContext: PropTypes.string,
};

/**
 * Renders component objects returned from the GraphQl endpoint via the
 * `ModuleMatrix` utility.
 * @param {Array} components An array of components, returned from the
 *    GraphQl query.
 */
const ModuleRenderer = ({ components = [], ...rest }) =>
  components.map((component, idx) => {
    const contentType = get(component, '__typename', 'no-type');
    const sysId = get(component, 'sys.id') || 'no-id-';

    return (
      <ErrorBoundary
        key={`${contentType}-${sysId}-${idx.toString()}`}
        sysId={sysId}
        contentType={contentType}
      >
        {component && <ModuleMatrix data={component} {...rest} />}
      </ErrorBoundary>
    );
  });

ModuleRenderer.propTypes = {
  components: PropTypes.arrayOf(any).isRequired,
};

export default ModuleRenderer;
