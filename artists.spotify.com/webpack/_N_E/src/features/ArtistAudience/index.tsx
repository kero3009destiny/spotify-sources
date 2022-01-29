import _slicedToArray from "/var/jenkins_home/workspace/tingle.76eac57e-8374-4b5c-8f0c-04220153cf57/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { createMrktSongStatsInteractionBrowser } from '@spotify-internal/event-definitions/es5/events/createMrktSongStatsInteractionBrowser';
import { createUbiEventLogger } from '@mrkt/features/ubi';
import { useT } from '@mrkt/features/i18n';
import { DocumentTitle } from '@mrkt/features/document-title';
import { eventSender } from '@mrkt/features/gabito';
import { useCountryNames } from '@mrkt/features/country-names';
import { useCurrentArtist } from '../artists';
import { useCurrentOrg } from '../artists/src/useCurrentOrg';
import { useGetString } from '../../shared/messages/strings';
import { StickyHeader } from './StickyHeader';
import { ubiAudienceSpec } from './ubiAudienceSpec';
import { DataDelayAlert } from './DataDelayAlert';
import { useHasDataDelayAlert } from '../../shared/lib/hooks/useHasDataDelayAlert';
import { useShowQualtricsBanner } from '../QualtricsBanner/hooks/useShowQualtricsBanner';
import { QualtricsBanner } from '../QualtricsBanner';
import { PageId } from '../PlatformEvents';
import { useRouter } from 'next/router';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function ArtistAudience(_ref) {
  var children = _ref.children;
  var artist = useCurrentArtist();

  var _useCurrentOrg = useCurrentOrg(),
      orgUri = _useCurrentOrg.uri;

  var hasDataDelayAlert = useHasDataDelayAlert();
  var showQualtricsBanner = useShowQualtricsBanner();
  var strings = useGetString();
  var t = useT();

  var _React$useState = React.useState(strings.worldwide),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      country = _React$useState2[0],
      _setCountry = _React$useState2[1];

  var router = useRouter();
  var UBIEventLogger = createUbiEventLogger(artist.id, orgUri);

  var setCountry = function setCountry(selectedCountry) {
    _setCountry(selectedCountry);

    var countryFilterEvent = ubiAudienceSpec().countryFilterDropdownFactory().countryValueFactory({
      identifier: selectedCountry.code
    }).hitFilter();

    _setCountry(selectedCountry);

    UBIEventLogger.logInteraction(countryFilterEvent);
    eventSender.send(createMrktSongStatsInteractionBrowser({
      creator_uri: "spotify:artist:".concat(artist.id),
      navigational_root_id: PageId.ArtistAudience,
      page_id: PageId.ArtistAudience,
      page_uri: window.location.href,
      interaction_category: 'CountryFilter',
      interaction_action: 'selectCountry',
      interaction_value: selectedCountry.code
    }));
    router.push({
      pathname: router.pathname,
      query: {
        country: selectedCountry.code,
        artistId: artist.id
      }
    });
  };

  var countryNames = useCountryNames();
  React.useEffect(function () {
    var query = router.query;
    var urlCountryCode = query.country; // will only have one country code selected

    if (urlCountryCode && urlCountryCode !== country.code) {
      setCountry({
        code: urlCountryCode,
        name: countryNames[urlCountryCode] || urlCountryCode
      });
    }
  }, [router.query]);
  var title = t('ARTIST_AUDIENCE_ac871c', 'Audience', '');
  return /*#__PURE__*/_jsxs(DocumentTitle, {
    title: t('ARTIST_AUDIENCE_95c63c', 'Audience – {name} – Spotify for Artists', '', {
      name: artist.name
    }),
    children: [hasDataDelayAlert && /*#__PURE__*/_jsx(DataDelayAlert, {}), showQualtricsBanner && /*#__PURE__*/_jsx(QualtricsBanner, {
      pageId: PageId.ArtistAudience
    }), /*#__PURE__*/_jsx(StickyHeader, {
      artistId: artist.id,
      country: country,
      setCountry: setCountry,
      title: title,
      disableScroll: router.pathname === '/artist/[artistId]/audience/engagement'
    }), React.Children.map(children, function (child) {
      return /*#__PURE__*/React.cloneElement(child, {
        country: country
      });
    })]
  });
}