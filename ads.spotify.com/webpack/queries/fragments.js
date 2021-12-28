import { gql } from 'apollo-boost';

import { IMG_QUALITY } from 'constants/image-attributes';

// Composable Module GraphQL fragments (eg. RTE, Image, Quote)
// TODO: Field textColor to be deprecated on HERO.
export const MODULE_FRAGMENTS = {
  MARKDOWN_TEXT: gql`
    fragment MarkdownText on ModuleMarkdownText {
      sys {
        id
      }
      markdownBody: body
    }
  `,
  SPOTIFY_PLAYER: gql`
    fragment SpotifyPlayer on ModuleSpotifyPlayer {
      sys {
        id
      }
      uri
    }
  `,
  CATALOG: gql`
    fragment Catalog on ModuleCatalog {
      sys {
        id
      }
      title
      catalogEntriesCollection(limit: 12) {
        items {
          sys {
            id
          }
          title
          description
          eyebrow
          cta {
            ...cta
          }
          image {
            ...image
          }
        }
      }
    }
  `,
  RTE: gql`
    fragment RTE on ModuleRichText {
      sys {
        id
      }
      body {
        json
      }
    }
  `,
  IMAGE: gql`
    fragment Image on ModuleImage {
      sys {
        id
      }
      name
      image {
        ...image
      }
      caption
      aspectRatio
    }
  `,
  ACCORDION: gql`
    fragment Accordion on ModuleAccordion {
      listsCollection {
        items {
          title
          description
        }
      }
    }
  `,
  AUDIO: gql`
    fragment Audio on ModuleAudio {
      sys {
        id
      }
      title
      audio {
        url
        contentType
        fileName
      }
      caption
    }
  `,
  VIDEO: gql`
    fragment Video on ModuleVideo {
      sys {
        id
      }
      type
      videoId
      name
      caption
    }
  `,
  QUOTE: gql`
    fragment Quote on ModuleQuote {
      sys {
        id
      }
      quote
      speaker
      companyOrRole
      backgroundColor
      quoteColor
      attributionTextColor
      cta {
        ...cta
      }
    }
  `,
  STATS: gql`
    fragment Stats on ModuleStats {
      sys {
        id
      }
      title
      backgroundColor
      themeValue: theme
      statsCollection {
        items {
          ... on Stat {
            name
            color
            stat
            title
            descriptionText
          }
        }
      }
    }
  `,
  FEATURE_CARD: gql`
    fragment FeatureCard on ModuleFeatureCard {
      sys {
        id
      }
      image {
        ...image
      }
      eyebrow
      title
      titleColor
      theme
      description
      backgroundColor
      imagePosition
      ctasCollection(limit: 2) {
        items {
          ...cta
        }
      }
      columnList
    }
  `,
  CHROME_FEATURE_CARD: gql`
    fragment ChromeFeatureCard on ModuleChromeFeatureCard {
      sys {
        id
      }
      image {
        ...image
      }
      eyebrow
      title
      titleColor
      theme
      description
      backgroundColor
      imagePosition
      ctasCollection(limit: 2) {
        items {
          ...cta
        }
      }
      imageType
      columnList
    }
  `,
  TOPIC_CAROUSEL: gql`
    fragment TopicCarousel on ModuleTopicCarousel {
      sys {
        id
      }
      eyebrow
      topicEntriesCollection(limit: 5) {
        items {
          sys {
            id
          }
          image {
            ...image
          }
          title
          description
          cta {
            ...cta
          }
          backgroundColor
          theme
        }
      }
    }
  `,
  TOPIC: gql`
    fragment Topic on ModuleTopic {
      sys {
        id
      }
      title
      headlineColor
      backgroundColor
      themeValue: theme
      topicScroll {
        topicScrollEntriesCollection(limit: 5) {
          items {
            sys {
              id
            }
            name
            eyebrow
            title
            description
            cta {
              ...cta
            }
          }
        }
      }
      audioWithTranscript {
        eyebrow
        title
        description
        audio {
          url
          contentType
        }
        transcript {
          url
        }
        cta {
          ...cta
        }
      }
    }
  `,
  INLINE_FORM: gql`
    fragment InlineForm on ModuleInlineForm {
      sys {
        id
      }
      name
      title
      action
      ctaText
      disclaimer
      failureMessage
      successMessage {
        body {
          json
        }
      }
      fieldsCollection {
        items {
          ... on InlineFormFieldInput {
            fieldName
            type
            required
            label
          }
        }
      }
    }
  `,
  LINK_LIST: gql`
    fragment LinkList on ModuleLinkList {
      sys {
        id
      }
      name
      eyebrow
      linksCollection {
        items {
          sys {
            id
          }
          title
          url
        }
      }
    }
  `,
  HIGHLIGHTED_STATEMENT: gql`
    fragment HighlightedStatement on ModuleHighlightedStatement {
      sys {
        id
      }
      name
      text
      highlightColor
    }
  `,
  DYNAMIC_TEXT_INTRO: gql`
    fragment DynamicTextIntro on ModuleDynamicTextIntro {
      heading
      subHeading
      jumpText
    }
  `,
  INLINE_CARD: gql`
    fragment InlineCard on ModuleInlineCard {
      sys {
        id
      }
      image {
        ...image
      }
      eyebrow
      title
      description
      ctasCollection(limit: 2) {
        items {
          ...cta
        }
      }
    }
  `,
  AD_EXPERIENCES: gql`
    fragment AdExperiences on ModuleAdExperiences {
      sys {
        id
      }
      introTitle
      introImage {
        ...image
      }
      eyebrow
      title1
      description1
      title2
      description2
      title3
      description3
      ctaHelpText
      cta {
        ...cta
      }
    }
  `,
};

// Component GraphQL fragments (eg. Hero)
export const COMPONENT_FRAGMENTS = {
  HERO: gql`
    fragment HeroFields on Hero {
      sys {
        id
      }
      title
      description
      ctasCollection(limit: 2) {
        items {
          ...cta
        }
      }
      foregroundImage {
        ...image
      }
      backgroundColor
      textColor
      titleColor
      theme
    }
  `,
  HERO_CAROUSEL: gql`
    fragment HeroCarousel on HeroCarousel {
      backgroundColor
      titleColor
      theme
      cta {
        ...cta
      }
      heroCarouselEntriesCollection(limit: 3) {
        items {
          ... on HeroCarouselEntry {
            listItemText
            title
            description
            image {
              ...responsiveImage
            }
          }
        }
      }
    }
  `,
  HERO_DYNAMIC: gql`
    fragment HeroDynamic on HeroDynamic {
      titleIntro
      titleOutros
      description
      backgroundColorBurst
      ctasCollection(limit: 2) {
        items {
          ...cta
        }
      }
      mediaAsset {
        url
        webpUrl: url(transform: { quality: ${IMG_QUALITY}, format: WEBP })
        optimizedUrl: url(transform: { quality: ${IMG_QUALITY} })
        contentType
      }
    }
  `,
  AUTHOR: gql`
    fragment AuthorFields on Author {
      authorName
      authorRole
    }
  `,
  META: gql`
    fragment MetaFields on Meta {
      name
      metaTitle
      metaDescription
      keywords
      canonicalUrl
      image {
        ...image
      }
      hreflangsCollection {
        items {
          url
          localeId
        }
      }
    }
  `,
  CTA: gql`
    fragment cta on Cta {
      title
      url
      type
      overrideFunctionality
    }
  `,
  IMAGE: gql`
    fragment image on Asset {
      url
      webpUrl: url(transform: { quality: ${IMG_QUALITY}, format: WEBP })
      optimizedUrl: url(transform: { quality: ${IMG_QUALITY} })
      description
    }
  `,
  RESPONSIVE_IMAGE: gql`
    fragment responsiveImage on ResponsiveImage {
      sm {
        ...image
      }
      lg {
        ...image
      }
      xl {
        ...image
      }
    }
  `,
};

export const DYNAMIC_FRAGMENTS = {
  CURATED_LIST_PAGE_DETAIL: locale => gql`
    fragment pageDetail on PageDetail${locale} {
      slug
      eyebrowOverride
      categoryTag {
        title
      }
      navigationTag {
        title
        slug
      }
      hero {
        title
        foregroundImage {
          ...image
        }
      }
    }
  `,
  CURATED_LIST_PAGE_LANDING: locale => gql`
    fragment pageLanding on PageLanding${locale} {
      navigationTag {
        title
        slug
      }
      hero {
        title
        foregroundImage {
          ...image
        }
      }
    }
  `,
};
