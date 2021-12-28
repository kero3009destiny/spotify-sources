import { gql } from 'apollo-boost';

const COOKIE_BANNER_QUERY = gql`
  query CookieBanner($preview: Boolean = false, $locale: String = "en-US") {
    cookieBannerCollection(preview: $preview, locale: $locale, limit: 1) {
      items {
        copy {
          json
        }
      }
    }
  }
`;

export { COOKIE_BANNER_QUERY };
