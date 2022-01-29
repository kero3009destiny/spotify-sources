// ignore-string-externalization
import { useQuery } from 'react-query';
import { getCampaigns } from '../lib';
export var getCampaignsQueryKey = function getCampaignsQueryKey(artistId) {
  return ['marquee-campaigns', artistId];
};
export var useCampaigns = function useCampaigns(artistId) {
  var _useQuery = useQuery(getCampaignsQueryKey(artistId), function () {
    return getCampaigns(artistId);
  }, {
    refetchOnWindowFocus: false
  }),
      data = _useQuery.data,
      isError = _useQuery.isError,
      isLoading = _useQuery.isLoading;

  return {
    campaigns: (data === null || data === void 0 ? void 0 : data.campaigns) || [],
    status: (data === null || data === void 0 ? void 0 : data.status) || 200,
    isError: isError,
    isLoading: isLoading
  };
};