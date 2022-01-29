import * as React from 'react';
import { useT } from '@mrkt/features/i18n';
import * as S from './styles';
import { SourcesOfStreams } from '../SourcesOfStreams';
import { WhereTheyListen } from '../WhereTheyListen';
import { TopCities } from '../TopCities';
import { useGetString } from '../../../shared/messages/strings';
import { ErrorHandler } from '../../../shared/components/ErrorHandler/index';
import { LoadingIndicator } from '../../../shared/components/LoadingIndicator';
import { useViewport, Viewport } from '../../../shared/lib/useViewport';
import { ScrollTo } from '../../../shared/components/ScrollTo';
import { useSongPermissionResource } from '../useSongPermissionResource';
import { CountryTimeline } from '../../CountryTimeline';
import { useHasSongRightsAccessToRecording } from '../hooks/useHasSongRightsAccessToRecording';
import { useSongRightsData } from '../hooks/useSongRightsData';
import { useSongPermissionAlert } from '../hooks/useSongPermissionAlert';
import { useCurrentArtistId } from '../../../features/artists/src/useCurrentArtistId';
import { SplitRightsBanner } from '../../../features/SplitRightsBanner/';
import { useCurrentSongId } from '../hooks/useCurrentSongId';
import { Timeline } from '../Timeline';
import { Section } from '../../Section';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function Stats() {
  var artistId = useCurrentArtistId();
  var songId = useCurrentSongId();
  var response = useSongPermissionResource(artistId, songId);
  var userHasSongRightsAccess = useHasSongRightsAccessToRecording();
  var songRightsResponse = useSongRightsData(artistId, songId); // @todo: remove this logic when endpoint is updated
  // https://trello.com/c/YLc4nXaZ/1218-update-split-rights-endpoint

  var countryRights = songRightsResponse !== null && songRightsResponse !== void 0 && songRightsResponse.countryRights ? songRightsResponse.countryRights.map(function (_ref) {
    var countryCode = _ref.countryCode,
        hasRights = _ref.hasRights;
    return {
      country_code: countryCode,
      has_access: hasRights
    };
  }) : [];
  var viewport = useViewport();
  var isMobile = viewport === Viewport.XS;
  var t = useT();
  var strings = useGetString();

  var errorComponent = /*#__PURE__*/_jsx(Section, {
    children: strings.insightsError
  });

  var loadingComponent = /*#__PURE__*/_jsx(Section, {
    title: t('SONG_STATS_section_title', 'Streams this period', ''),
    children: /*#__PURE__*/_jsx(S.LoadingContainer, {
      children: /*#__PURE__*/_jsx(LoadingIndicator, {})
    })
  });

  useSongPermissionAlert(artistId, response.status);
  /**
   * We return status codes when there's no response data
   */

  if (response.status && response.status !== 200) {
    switch (response.status) {
      /**
       * User scenario: Forbidden (403)
       */
      case 403:
        return null;

      /**
       * User scenario: Catches any other bad response
       */

      default:
        return errorComponent;
    }
  }

  return /*#__PURE__*/_jsx(ScrollTo, {
    children: function children() {
      return /*#__PURE__*/_jsxs(S.Wrapper, {
        children: [userHasSongRightsAccess && /*#__PURE__*/_jsx(SplitRightsBanner, {
          bannerText: t('split-rights-banner-text-2b1b5c', "You're only seeing stats for this song on the\n                releases you own rights for:", ''),
          countries: countryRights
        }), /*#__PURE__*/_jsx(React.Suspense, {
          fallback: loadingComponent,
          children: /*#__PURE__*/_jsx(ErrorHandler, {
            errorMessage: errorComponent,
            children: /*#__PURE__*/_jsx(Timeline, {
              "data-testid": "timeline"
            })
          })
        }), /*#__PURE__*/_jsx(ErrorHandler, {
          errorMessage: errorComponent,
          children: /*#__PURE__*/_jsx(SourcesOfStreams, {
            "data-testid": "sources-of-streams"
          })
        }), !isMobile && /*#__PURE__*/_jsx(ErrorHandler, {
          errorMessage: errorComponent,
          children: /*#__PURE__*/_jsx(CountryTimeline, {
            "data-testid": "country-timeline-wrapper",
            songId: songId,
            artistId: artistId
          })
        }), /*#__PURE__*/_jsx(ErrorHandler, {
          errorMessage: errorComponent,
          children: /*#__PURE__*/_jsx(WhereTheyListen, {
            "data-testid": "where-they-listen",
            songId: songId
          })
        }), /*#__PURE__*/_jsx(ErrorHandler, {
          errorMessage: errorComponent,
          children: /*#__PURE__*/_jsx(TopCities, {
            "data-testid": "top-cities",
            songId: songId
          })
        })]
      });
    }
  });
}