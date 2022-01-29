import { useState, useEffect } from 'react';
import { getArtistEligibility } from '../lib/api/';
import { ArtistIneligibilityReasons } from '../lib/api/types';
export var useCampaignPage = function useCampaignPage(artistId) {
  var _useState = useState(false),
      showCampaignsPage = _useState[0],
      setShowCampaignsPage = _useState[1];

  var _useState2 = useState(false),
      isLoaded = _useState2[0],
      setIsLoaded = _useState2[1];

  var _useState3 = useState(false),
      error = _useState3[0],
      setError = _useState3[1];

  useEffect(function () {
    var cancelled = false;
    getArtistEligibility(artistId).then(function (response) {
      var reasons = response.reasons;
      var hasIneligibileRollout = reasons.includes(ArtistIneligibilityReasons.INELIGIBLE_ROLLOUT);

      if (!cancelled) {
        setShowCampaignsPage(!hasIneligibileRollout);
        setIsLoaded(true);
      }
    }).catch(function () {
      if (!cancelled) {
        setError(true);
        setIsLoaded(true);
      }
    });
    return function () {
      cancelled = true;
    };
  }, [artistId]);
  return {
    showCampaignsPage: showCampaignsPage,
    isLoaded: isLoaded,
    error: error
  };
};