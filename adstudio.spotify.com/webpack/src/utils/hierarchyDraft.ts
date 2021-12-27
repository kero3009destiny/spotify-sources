import { matchPath } from 'react-router-dom';
import i18n from 'i18next';
import { get } from 'lodash';
import qs from 'query-string';

import { routeFragmentLiterals, routes, routeTokens } from 'config/routes';

import {
  CampaignDraft,
  CatalogueDraft,
  CreateFlowType,
  CreativeDraft,
  EnrichedCampaignDraft,
  EnrichedCreativeDraft,
  EnrichedFlightDraft,
  FlightDraft,
  HierarchyDraft,
} from 'types/common/state/api/drafts';

export interface DraftIntersection {
  bffHierarchyDraft: HierarchyDraft;
  campaignDraft?: CampaignDraft | EnrichedCampaignDraft;
  flightDraft?: FlightDraft | EnrichedFlightDraft;
  creativeDraft?: CreativeDraft | EnrichedCreativeDraft;
}

export const getCreateFlowRoute = (draft: DraftIntersection): string => {
  const queryString = `?${qs.stringify({
    hierarchyDraftId: draft.bffHierarchyDraft.id,
  })}`;
  const isEnriched = draft.flightDraft?.hasOwnProperty('enrichedFormValues');
  let duplicatedFromFlightId;

  if (draft.flightDraft && isEnriched) {
    duplicatedFromFlightId = (draft.flightDraft as EnrichedFlightDraft)
      .enrichedFormValues.duplicatedFromFlightId;
  } else if (draft.flightDraft) {
    duplicatedFromFlightId = (draft.flightDraft as FlightDraft).formValues
      .duplicatedFromFlightId;
  }

  switch (draft.bffHierarchyDraft.createFlowType) {
    case CreateFlowType.ADD_TO_FLIGHT:
      return `${routes.BUILD_CREATIVE.replace(
        routeFragmentLiterals.ACCOUNT_ID,
        draft.bffHierarchyDraft.adAccountId,
      ).replace(
        routeFragmentLiterals.FLIGHT_ID,
        draft.creativeDraft!.csFlightId!,
      )}${queryString}`;
    case CreateFlowType.ADD_TO_CAMPAIGN:
      return !!duplicatedFromFlightId
        ? `${routes.DUPLICATE_FLIGHT.replace(
            routeFragmentLiterals.ACCOUNT_ID,
            draft.bffHierarchyDraft.adAccountId,
          )
            .replace(routeFragmentLiterals.FLIGHT_ID, duplicatedFromFlightId)
            .replace(
              routeFragmentLiterals.CAMPAIGN_ID,
              draft.flightDraft!.csCampaignId!,
            )}${queryString}`
        : `${routes.BUILD_FLIGHT.replace(
            routeFragmentLiterals.ACCOUNT_ID,
            draft.bffHierarchyDraft.adAccountId,
          ).replace(
            routeFragmentLiterals.CAMPAIGN_ID,
            draft.flightDraft!.csCampaignId!,
          )}${queryString}`;
    case CreateFlowType.COLD_START:
    default:
      return `${routes.BUILD_CAMPAIGN_ADACCOUNT.replace(
        routeFragmentLiterals.ACCOUNT_ID,
        draft.bffHierarchyDraft.adAccountId,
      )}${queryString}`;
  }
};

export const getDraftRedirectUrl = (hierarchyDraft: HierarchyDraft): string => {
  return routes.DRAFT_REDIRECT.replace(
    routeFragmentLiterals.ACCOUNT_ID,
    hierarchyDraft.adAccountId,
  ).replace(routeFragmentLiterals.HIERARCHY_DRAFT_ID, hierarchyDraft.id);
};

export const getDraftName = (reviewableDraft: CatalogueDraft) => {
  switch (reviewableDraft.bffHierarchyDraft.createFlowType) {
    case CreateFlowType.ADD_TO_FLIGHT:
      return (
        reviewableDraft.creativeDraft!.formValues.creativeName ||
        i18n.t('I18N_UNTITLED_AD', 'Untitled ad')
      );

    case CreateFlowType.ADD_TO_CAMPAIGN:
      return (
        reviewableDraft.flightDraft!.formValues.flightName ||
        i18n.t('I18N_UNTITLED_AD_SET', 'Untitled ad set')
      );

    case CreateFlowType.COLD_START:
      return (
        reviewableDraft.campaignDraft!.formValues.campaignName ||
        i18n.t('I18N_UNTITLED_CAMPAIGN', 'Untitled campaign')
      );

    default:
      return i18n.t('I18N_UNTITLED_CAMPAIGN', 'Untitled campaign');
  }
};

export function parseDuplicatedFlightIdFromRoute() {
  const duplicateFlightRouteMatch = matchPath(window.location.pathname, {
    path: routes.DUPLICATE_FLIGHT,
    exact: true,
  });
  return duplicateFlightRouteMatch
    ? get(duplicateFlightRouteMatch, `params[${routeTokens.FLIGHT_ID}]`)
    : undefined;
}

export function draftToggleIsActive() {
  const campaignDraftRouteMatch = matchPath(window.location.pathname, {
    path: routes.CAMPAIGN_DRAFT_CATALOGUE,
    exact: true,
  });
  const flightDraftRouteMatch = matchPath(window.location.pathname, {
    path: routes.FLIGHT_DRAFT_CATALOGUE,
    exact: true,
  });
  const creativeDraftRouteMatch = matchPath(window.location.pathname, {
    path: routes.CREATIVE_DRAFT_CATALOGUE,
    exact: true,
  });

  return (
    !!campaignDraftRouteMatch ||
    !!flightDraftRouteMatch ||
    !!creativeDraftRouteMatch
  );
}
