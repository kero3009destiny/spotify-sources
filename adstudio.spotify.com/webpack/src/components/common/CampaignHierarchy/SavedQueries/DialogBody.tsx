import React, { useEffect } from 'react';

import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';

import { checkMultiIdsMatch, checkQueryStringsMatch } from './utils';

import { CreateSavedQuery } from './CreateSavedQuery';
import { QueryList } from './QueryList';

import { ViewOptions } from './types';
import {
  CampaignParams,
  FlightParams,
  SavedQuery,
} from 'types/common/state/api/savedQueries';

type DailogBodyProps = {
  currentView: ViewOptions;
  CreateFormId: string;
  iamDomain: string;
  createSavedQuery: (savedQuery: SavedQuery, params: string) => void;
  currentSelection: {
    uuid: string;
    params: string;
    campaignIds: string[];
    flightIds: string[];
  };
  currentRouteParams: string;
  currentLocationKey: string;
  queries?: SavedQuery[] | null;
  accountId: string;
  selectSavedQuery: (
    uuid: string,
    params: string,
    campaignIds: string[],
    flightIds: string[],
  ) => void;
  recentlyCreated?: string;
  recentlyDeleted: string[];
  restoring: boolean;
  deleting: boolean;
  permissions: RolePermissions[];
  deleteSavedQuery: (uuid: string, iamDomain: string) => void;
  restoreSavedQuery: (uuid: string, iamDomain: string) => void;
  selectedCampaigns: string[];
  selectedFlights: string[];
  selectFromSavedFilter: (payload: {
    campaignIds: string[];
    flightIds: string[];
  }) => void;
};

export const DialogBody: React.FC<DailogBodyProps> = ({
  currentView,
  CreateFormId,
  iamDomain,
  createSavedQuery,
  currentSelection,
  currentRouteParams,
  currentLocationKey,
  queries,
  accountId,
  selectSavedQuery,
  recentlyCreated,
  recentlyDeleted,
  permissions,
  restoring,
  deleting,
  deleteSavedQuery,
  restoreSavedQuery,
  selectedCampaigns,
  selectedFlights,
  selectFromSavedFilter,
}) => {
  // Watches changes to the url
  useEffect(() => {
    if (
      !checkQueryStringsMatch(currentRouteParams, currentSelection.params) ||
      !checkMultiIdsMatch(
        currentSelection.campaignIds || [],
        selectedCampaigns || [],
        currentSelection.flightIds || [],
        selectedFlights || [],
      )
    ) {
      selectSavedQuery('', '', [], []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocationKey]);

  const loadSavedFilters = (
    uuid: string,
    params: string,
    campaignParams: CampaignParams,
    flightParams: FlightParams,
  ) => {
    selectFromSavedFilter({
      campaignIds: campaignParams?.campaignIds || [],
      flightIds: flightParams?.flightIds || [],
    });
    selectSavedQuery(
      uuid,
      params,
      campaignParams?.campaignIds || [],
      flightParams?.flightIds || [],
    );
  };

  return (
    <>
      {currentView === ViewOptions.CREATE && (
        <CreateSavedQuery
          formId={CreateFormId}
          iamDomain={iamDomain}
          createSavedQuery={createSavedQuery}
          selectedCampaigns={selectedCampaigns}
          selectedFlights={selectedFlights}
        />
      )}
      {currentView === ViewOptions.VIEW && (
        <QueryList
          queries={queries}
          accountId={accountId}
          loadSavedFilters={loadSavedFilters}
          selectedSavedFilter={currentSelection}
          recentlyCreated={recentlyCreated}
          recentlyDeleted={recentlyDeleted}
          permissions={permissions}
          deleteSavedQuery={deleteSavedQuery}
          restoreSavedQuery={restoreSavedQuery}
          restoring={restoring}
          deleting={deleting}
        />
      )}
      {currentView === ViewOptions.EDIT && <></>}
    </>
  );
};
