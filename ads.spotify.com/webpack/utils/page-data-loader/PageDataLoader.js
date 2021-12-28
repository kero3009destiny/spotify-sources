import React from 'react';

import get from 'lodash/get';
import startCase from 'lodash/startCase';

import Custom404 from 'pages/404';
import ErrorPage from 'pages/_error';
import { CODE_500, CODE_404 } from 'constants/errors';
import { QUERY_TYPES } from 'constants/query';
import { QUERIES, DYNAMIC_COLLECTIONS } from 'queries/page';
import { getCollectionName } from 'utils/get-collection-name';
import * as cache from 'utils/cache-handler';
import { supportedLocaleCodes } from 'i18n/config';
import { getCookieObject } from 'utils/get-cookie-object';

const DEFAULT_ARGS = {
  pageSlug: true,
  queryType: QUERY_TYPES.PAGE_DETAIL_QUERY,
};
const HOME_SLUG = 'home';
const [defaultLocale] = supportedLocaleCodes;

async function DataQuery(data, fallback) {
  const { locale, variables, queryType, apolloClient, pathname } = data;
  const verifiedLocale = supportedLocaleCodes.includes(locale)
    ? locale
    : defaultLocale;
  const queryLocale = startCase(verifiedLocale.toLowerCase()).replace(' ', '');
  const query =
    fallback && queryType === QUERY_TYPES.PAGE_LANDING_QUERY
      ? QUERY_TYPES.PAGE_DYNAMIC_LANDING
      : queryType;
  const collectionName = getCollectionName(
    supportedLocaleCodes,
    verifiedLocale,
    DYNAMIC_COLLECTIONS[query],
  );

  return Promise.all([
    apolloClient.query({
      query: QUERIES[query].body({
        collection: collectionName,
        locale: queryLocale,
      }),
      variables,
    }),
    apolloClient.query({
      query: QUERIES[query].modules({
        collection: collectionName,
        locale: queryLocale,
      }),
      variables,
    }),
  ])
    .then(([bodyData, modulesData]) => {
      const [pageBody] = get(bodyData, `data.${collectionName}.items`, [null]);
      const [pageModules] = get(modulesData, `data.${collectionName}.items`, [
        null,
      ]);

      if (!pageBody && !pageModules) {
        if (!fallback) {
          return DataQuery(data, true);
        }
        return { data: null };
      }

      const response = {
        data: {
          ...(pageBody || {}),
          ...(pageModules || {}),
        },
      };

      if (pageBody && pageModules) {
        cache.set(pathname, response);
      }

      return response;
    })
    .catch(err => {
      console.error(err);
      return { error: err };
    });
}

/**
 * A HOC to wrap individual page components. Populates `getInitialProps` and
 * provides hook for handling Loading/Errors.
 * @param {ReactElement} WrappedComponent The component to be wrapped.
 * @param {Object} args An optional object of arguments.
 * @param {Boolean} args.pageSlug Whether or not the page has a slug
 *    (aka non top-level pages).
 * @param {string} args.queryType The type of GraphQL query to use.
 * @returns {ReactElement}
 */
function PageDataLoader(WrappedComponent, args = DEFAULT_ARGS) {
  const { pageSlug, queryType } = {
    ...DEFAULT_ARGS,
    ...args,
  };

  return class extends React.Component {
    static async getInitialProps(ctx) {
      const {
        apolloClient,
        req,
        res,
        query: { locale, tag, slug },
      } = ctx;
      const modifiedVariables = {
        ...(!pageSlug && { pageSlug: tag }), // A landing page has the same value for slug and navigation tag
      };
      const variables = {
        pageSlug: slug,
        tagSlug: tag,
        homeSlug: HOME_SLUG, // There can only be a single instance of the homepage
        ...modifiedVariables,
      };
      const [localeRedirect] = get(req, 'localeNudge') || [];
      const cookie = get(req, 'headers.cookie');
      const cookieObj = cookie ? getCookieObject(cookie) : {};

      if (!cookieObj.localeSelector && res && localeRedirect) {
        const pathname = [localeRedirect, tag, slug]
          .filter(value => value)
          .join('/');
        const { data: pageData } =
          cache.get(pathname) ||
          (await DataQuery({
            locale: localeRedirect,
            variables,
            queryType,
            apolloClient,
            pathname,
          }));

        // if localeRedirect has data then redirects
        if (pageData) {
          const [, ...path] = req.url.replace(/^\/+/g, '').split('/');
          const url = path.join('/');

          res.writeHead(302, {
            Location: `/${localeRedirect}/${url}`,
          });
          res.end();
        }
      }

      const pathname = [locale, tag, slug].filter(value => value).join('/');
      const { data: pageData, error, loading } =
        cache.get(pathname) ||
        (await DataQuery({
          variables,
          locale,
          queryType,
          apolloClient,
          pathname,
        }));

      // Error assignments
      if (!pageData && res) res.statusCode = CODE_404; // Changing status code to 404 if there is no pageData
      if (error && res) res.statusCode = CODE_500; // Changing status code to 500 if there is a Graphql error

      return {
        pageData,
        loading,
        error,
        namespacesRequired: ['common'],
        id: `${locale}-${tag}-${slug}`,
      };
    }

    render() {
      const { pageData, loading, error, id } = this.props;

      if (loading) return <section>Loading... (Spinner component?)</section>;

      if (error) {
        // Handling nextjs pages/_error.js manually in case of Graphql errors
        const initialProps = ErrorPage.getInitialProps({
          err: { statusCode: CODE_500 },
        });

        return <ErrorPage {...initialProps} />;
      }

      if (!pageData) return <Custom404 />;

      return <WrappedComponent key={id} pageData={pageData} />;
    }
  };
}

export default PageDataLoader;
