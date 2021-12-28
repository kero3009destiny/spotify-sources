import React from 'react';
import getConfig from 'next/config';

import dayjs from 'dayjs';
import get from 'lodash/get';
import last from 'lodash/last';
import mapValues from 'lodash/mapValues';

import { getCookieObject } from 'utils/get-cookie-object';
import { PAGE_VIEW, TYPES } from './analytics-events';
import { getDataLayer, getClientId } from './getAnalyticsData';

const { publicRuntimeConfig } = getConfig() || {};
const GTM_ID = 'GTM-WZ64GJN';
const OPT_CONTAINER_ID = 'GTM-MZJGND9';

const GTM_CONTAINER_SNIPPET = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push(
{'gtm.start': new Date().getTime(),event:'gtm.js'}
);var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`;

const SSR_PAGE_VIEW_SNIPPET = `
(function(w,d,l,s){
w[s]=(function(){return +new Date()+'.'+Math.random().toString(36).substring(5)})();
w[l]=w[l]||[];w[l].push({
  event: "${TYPES.pageView}",
  pagePath: d && d.location && d.location.pathname && d.location.pathname.replace(/\\/$/, ''),
  pageTitle: d.title,
  sessionId: w[s]
});
})(window,document,'dataLayer', 'sessionId');
`;

const HEAD = `
${GTM_CONTAINER_SNIPPET}
${SSR_PAGE_VIEW_SNIPPET}
`;

const BODY = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`;

export const HeadSnippet = () => (
  <>
    {/* eslint-disable-next-line react/no-danger */}
    <script dangerouslySetInnerHTML={{ __html: HEAD }} />
    {/* dataLayer initialization goes first */}
    <script
      src={`https://www.googleoptimize.com/optimize.js?id=${OPT_CONTAINER_ID}`}
    />
  </>
);

export const BodySnippet = () => (
  // eslint-disable-next-line react/no-danger
  <noscript dangerouslySetInnerHTML={{ __html: BODY }} />
);

let isReadyCallback;

export class Analytics {
  /**
   * If dataLayer is not overwritten by the init() call
   * the push placeholder is going to show an error
   * we can implement a queue if needed
   */
  static dataLayer = {
    push: event => {
      console.warn('This event:', event, 'was not fired');
    },
  };

  /**
   * A promise that resolves when the init call has completed
   */
  static isReady = new Promise(resolve => {
    isReadyCallback = () => {
      resolve();
    };
  });

  /**
   * Inits the data needed to start tracking events
   */
  static async init() {
    const { dataLayer, error: dataLayerError } = await getDataLayer()
      .then(data => ({
        dataLayer: data,
      }))
      .catch(error => {
        console.warn(error);
        return { error };
      });

    this.dataLayer = dataLayerError ? [] : dataLayer;
    this.sessionId = window.sessionId || this.getRandomSessionId(); // This is a random session and it is ok if it changes in every page refresh

    const { clientId, error: clientIdError } = await getClientId()
      .then(id => ({
        clientId: id,
      }))
      .catch(error => {
        console.warn(error);
        return { error };
      });

    this.clientId = clientIdError ? null : clientId; // This id comes from a GTM cookie

    isReadyCallback();

    return {
      clientId: this.clientId,
      dataLayer: this.dataLayer,
    };
  }

  /**
   * Gets a random session id
   */
  static getRandomSessionId = () => {
    return `${+new Date()}.${Math.random()
      .toString(36)
      .substring(5)}`;
  };

  /**
   * Gets a timestamp needed for each event track
   */
  static getTimestamp() {
    return dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  }

  /**
   * Returns previous object dataLayer with values undefined
   */
  static flushPreviousDataLayer() {
    const lastDataLayer = last(this.dataLayer);

    return mapValues(lastDataLayer, () => undefined);
  }

  /**
   * Pushes a new event to the dataLayer
   * @param {object} data - the data of the track event
   */
  static track(data) {
    const previousEventFlushed = this.flushPreviousDataLayer();

    this.dataLayer.push({
      ...previousEventFlushed,
      hitTimestamp: this.getTimestamp(),
      clientId: this.clientId,
      sessionId: this.sessionId,
      ...data,
    });
  }

  /**
   * Resets the current dataLayer to prevent event object pollution across pages.
   */
  static reset() {
    try {
      const gtm = get(window, `google_tag_manager['${GTM_ID}']`);

      gtm.dataLayer.reset();
    } catch (error) {
      console.warn(error);
    }
  }
}

/**
 * Applies the event map function over the data
 * to match the actual event structure and tracks the event
 * @param {Function} event - A map function for the data
 * @param {object} data - The event data
 */
export const eventTrack = (event, data) => {
  Analytics.track(event(data));
};

/**
 * Tracks the pageView event
 * @param {object} data - The page event data
 * @param {object} data.pagePath - The path of the page
 * @param {object} data.pageTitle - The title of the page
 */
export const pageTrack = data => {
  Analytics.track(PAGE_VIEW(data));
};

/**
 * @returns {Object} A cookie data object from __gtm_campaign_url
 */
export const getUtmInfo = () => {
  // eslint-disable-next-line no-underscore-dangle
  const cookieUtm = getCookieObject(document.cookie).__gtm_campaign_url;

  if (cookieUtm) {
    const utmParams = decodeURIComponent(cookieUtm).split('?')[1];
    const utmInfo = new URLSearchParams(utmParams);

    return {
      UTM_Source: utmInfo.get('utm_source'),
      UTM_Medium: utmInfo.get('utm_medium'),
      UTM_Campaign: utmInfo.get('utm_campaign'),
      UTM_Term: utmInfo.get('utm_term'),
      UTM_Content: utmInfo.get('utm_content'),
    };
  }

  return {};
};

/**
 * @returns {Object} A cookie data object from GA info
 */
export const getGaInfo = () => {
  const tracker = window.ga.getAll()[0];
  const gaInfo = {
    GACLIENTID: tracker.get('clientId'),
    GAUSERID: tracker.get('userId'),
    GATRACKID: publicRuntimeConfig.GA_TRACK_ID,
  };

  return gaInfo;
};
