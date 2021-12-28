export const DYNAMIC_FRAGMENT_LITERALS = {
  STATEMENT: locale =>
    `
    sys { id }
    title
    description
    backgroundColor
    introColor
    statementColor
    statement
    curatedListCollection(limit: 2) {
      items {
        sys { id }
        title
        pagesCollection(limit: 3) {
          items {
            ... on PageDetail${locale} {
              ...pageDetail
            }
            ... on PageLanding${locale} {
              ...pageLanding
            }
          }
        }
      }
    }
    keyPoints {
      title
      description
      bodyText
      ctasCollection(limit: 2) {
        items {
          ...cta
        }
      }
    }
  `,
  CURATED_LIST: locale =>
    `
    sys { id }
    title
    pagesCollection(limit: 3) {
      items {
        ... on PageDetail${locale} {
          ...pageDetail
        }
        ... on PageLanding${locale} {
          ...pageLanding
        }
      }
    }`,
  CURATED_LIST_GROUP: locale =>
    `
    sys { id }
    listsCollection(limit: 6) {
      items {
        sys { id }
        title
        pagesCollection(limit: 3) {
          items {
            ... on PageDetail${locale} {
              ...pageDetail
            }
            ... on PageLanding${locale} {
              ...pageLanding
            }
          }
        }
      }
    }`,
  DYNAMIC_LANDING_RECIRCULATION_MODULE: locale => `
    ... on PageDynamicLanding${locale} {
      modulesCollection {
        items {
          ... on ModuleDynamicSection {
            title
            titleDetailText
            timeRange
          }
        }
      }
      pagesCollection {
        items {
          ... on PageDetail${locale} {
            ...pageDetail
            timeRange
          }
        }
      }
    }
  `,
};
