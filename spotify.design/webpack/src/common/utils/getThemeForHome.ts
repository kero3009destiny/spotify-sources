import { graphql, useStaticQuery } from 'gatsby';
import { formatHeroCardData, sortArticlesByDate } from './stories';
import {
  THEME_CLASSES,
  ThemeIdentifiers,
} from '../constants/colour-combinations';

export function getThemeForHome() {
  const data = useStaticQuery(graphql`
    query Root {
      heroLongForm: allContentfulArticleLongForm(
        limit: 1
        sort: { order: DESC, fields: publishDate }
        filter: {
          slug: { ne: "long-form-test" }
          featureHomepageHero: { eq: true }
        }
      ) {
        edges {
          ...FragmentArticleLongFormEdge
        }
      }
      heroThreeDesigners: allContentfulArticleThreeDesigners(
        limit: 1
        sort: { order: DESC, fields: publishDate }
        filter: {
          slug: { ne: "3-designers-3-sentences-test" }
          featureHomepageHero: { eq: true }
        }
      ) {
        edges {
          ...FragmentArticleThreeDesignersEdge
        }
      }
      heroTool: allContentfulArticleTool(
        limit: 1
        sort: { order: DESC, fields: publishDate }
        filter: { slug: { ne: "tool-test" }, featureHomepage: { eq: true } }
      ) {
        edges {
          ...FragmentArticleToolEdge
        }
      }
    }
  `);

  const heroArticles = sortArticlesByDate([
    ...data.heroLongForm.edges,
    ...data.heroThreeDesigners.edges,
    ...data.heroTool.edges,
  ]);
  const heroArticlesCards = formatHeroCardData(heroArticles);
  const initialCategory = heroArticlesCards[0].tags?.[0].parentCategory;

  return (
    THEME_CLASSES[initialCategory as ThemeIdentifiers] ||
    THEME_CLASSES.undetermined
  );
}
