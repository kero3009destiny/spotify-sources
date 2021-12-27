import { TableState } from '@spotify-internal/adstudio-shared/lib/components/TSTableBrowser';

import {
  DraftTableState,
  HierarchyDraftEntity,
  HierarchyDraftState,
} from './types';
import {
  CatalogueDraft,
  EnrichedCampaignDraft,
  EnrichedCreativeDraft,
  EnrichedDraftApiResponse,
  EnrichedFlightDraft,
  HierarchyDraft,
} from 'types/common/state/api/drafts';

export const getHierarchyDraftState = (state: TSFixMe): HierarchyDraftState => {
  return state.hierarchyDrafts;
};

const getDraftTableState = (state: TSFixMe, keyPath: HierarchyDraftEntity) => {
  const draftTableState: DraftTableState = getHierarchyDraftState(state)[
    keyPath
  ] as DraftTableState;

  return {
    rows: draftTableState.items,
    paging: draftTableState.paging,
    loading: draftTableState.loading,
    empty: draftTableState.items.length === 0,
  };
};

export const getCampaignDraftTableState = (state: TSFixMe): TableState => {
  return getDraftTableState(state, 'campaignDrafts');
};

export const getFlightDraftTableState = (state: TSFixMe): TableState => {
  return getDraftTableState(state, 'flightDrafts');
};

export const getCreativeDraftTableState = (state: TSFixMe): TableState => {
  return getDraftTableState(state, 'creativeDrafts');
};

export const selectEnrichedHierarchyDraftState = (state: TSFixMe) => {
  return getHierarchyDraftState(state).enrichedHierarchyDraft;
};

export const selectIsDeletingDrafts = (state: TSFixMe): boolean => {
  return getHierarchyDraftState(state).deleteHierarchyDrafts.started;
};

export const selectDeleteDraftsSucceeded = (state: TSFixMe): boolean => {
  return getHierarchyDraftState(state).deleteHierarchyDrafts.succeeded;
};

export const selectDeleteDraftsFailed = (state: TSFixMe): boolean => {
  return getHierarchyDraftState(state).deleteHierarchyDrafts.failed;
};

export const selectReviewableDrafts = (
  state: TSFixMe,
  maxCount: number,
): CatalogueDraft[] => {
  return getHierarchyDraftState(state).reviewableDrafts.items.slice(
    0,
    maxCount,
  );
};

export const selectReviewableDraftCount = (state: TSFixMe) => {
  return getHierarchyDraftState(state).reviewableDrafts.items.length;
};

export const selectHasReviewableDrafts = (state: TSFixMe) => {
  return selectReviewableDraftCount(state) > 0;
};

export const selectReviwableDraftsAreLoading = (state: TSFixMe) => {
  return getHierarchyDraftState(state).reviewableDrafts.loading;
};

export const selectCurrentHierarchyDraftId = (
  state: TSFixMe,
): string | undefined => {
  return (
    getHierarchyDraftState(state).currentHierarchyDraft.hierarchyDraftId ||
    undefined
  );
};

export const selectCurrentCampaignDraftId = (state: TSFixMe): string | null => {
  return getHierarchyDraftState(state).currentHierarchyDraft.campaignDraftId;
};

export const selectCurrentFlightDraftId = (state: TSFixMe): string | null => {
  return getHierarchyDraftState(state).currentHierarchyDraft.flightDraftId;
};

export const selectCurrentCreativeDraftId = (state: TSFixMe): string | null => {
  return getHierarchyDraftState(state).currentHierarchyDraft.creativeDraftId;
};

export const selectDraftIsSaving = (state: TSFixMe): boolean => {
  const hierarchyDraftState = getHierarchyDraftState(state);

  return (
    hierarchyDraftState.createHierarchyDraft.started ||
    hierarchyDraftState.updateCampaignDraft.started ||
    hierarchyDraftState.updateFlightDraft.started ||
    hierarchyDraftState.updateCreativeDraft.started
  );
};

export const selectDraftFailedToSave = (state: TSFixMe): boolean => {
  const hierarchyDraftState = getHierarchyDraftState(state);

  return (
    hierarchyDraftState.createHierarchyDraft.failed ||
    hierarchyDraftState.updateCampaignDraft.failed ||
    hierarchyDraftState.updateFlightDraft.failed ||
    hierarchyDraftState.updateCreativeDraft.failed
  );
};

export const selectShouldCreateHierarchyDraft = (state: TSFixMe): boolean => {
  const currentHierarchyDraft = getHierarchyDraftState(state)
    .currentHierarchyDraft;
  const createHierarchyDraftState = getHierarchyDraftState(state)
    .createHierarchyDraft;

  if (
    !currentHierarchyDraft.hierarchyDraftId &&
    !createHierarchyDraftState.started
  ) {
    return true;
  }

  return false;
};

export const selectFetchingEnrichedDraft = (state: TSFixMe): boolean => {
  return getHierarchyDraftState(state).enrichedHierarchyDraft.started;
};

export const selectFetchedEnrichedDraft = (state: TSFixMe): boolean => {
  return getHierarchyDraftState(state).enrichedHierarchyDraft.succeeded;
};

export const selectEnrichDraftFetchError = (state: TSFixMe): boolean => {
  return getHierarchyDraftState(state).enrichedHierarchyDraft.failed;
};

export const selectCurrentHierarchyDraft = (
  state: TSFixMe,
): HierarchyDraft | null | undefined => {
  const draft: EnrichedDraftApiResponse | undefined = getHierarchyDraftState(
    state,
  ).currentHierarchyDraft.draft;
  return draft?.bffHierarchyDraft;
};

export const selectCurrentEnrichedCampaignDraft = (
  state: TSFixMe,
): EnrichedCampaignDraft | null | undefined => {
  const draft: EnrichedDraftApiResponse | undefined = getHierarchyDraftState(
    state,
  ).currentHierarchyDraft.draft;
  return draft?.enrichedCampaignDraft;
};

export const selectCurrentEnrichedFlightDraft = (
  state: TSFixMe,
): EnrichedFlightDraft | null | undefined => {
  const draft: EnrichedDraftApiResponse | undefined = getHierarchyDraftState(
    state,
  ).currentHierarchyDraft.draft;
  return draft?.enrichedFlightDraft;
};

export const selectCurrentEnrichedCreativeDraft = (
  state: TSFixMe,
): EnrichedCreativeDraft | null | undefined => {
  const draft: EnrichedDraftApiResponse | undefined = getHierarchyDraftState(
    state,
  ).currentHierarchyDraft.draft;
  return draft?.enrichedCreativeDraft;
};
