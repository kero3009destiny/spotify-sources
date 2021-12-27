import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import styled from 'styled-components';

import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';
import { FormGroup, Type } from '@spotify-internal/encore-web';

import { generateUrl } from '../utils';

import { QueryItem } from './QueryItem';

import { SavedQueryWithUrl } from '../types';
import {
  CampaignParams,
  FlightParams,
  SavedQuery,
} from 'types/common/state/api/savedQueries';

const StyledContainer = styled.div`
  max-height: 23.8rem;
  min-height: 5rem;
`;

const StyledSharedWithMe = styled(Type)`
  font-size: 1rem;
  font-weight: bold;
  padding: 0.8rem 0;
`;

const StyledFormGroup = styled(FormGroup)`
  padding: 0;
`;

export const FiltersListTitles = {
  sharedWithMe: i18n.t('I18N_SAVED_FILTERS_SHARED_WITH_ME', 'Shared with you'),
};

export const noPrivateQueriesId = 'no-private-queries-test-id';

type QueryListProps = {
  queries?: SavedQuery[] | null;
  accountId: string;
  loadSavedFilters: (
    uuid: string,
    params: string,
    campaignParams: CampaignParams,
    flightParams: FlightParams,
  ) => void;
  selectedSavedFilter: { uuid: string; params: string };
  recentlyCreated?: string;
  recentlyDeleted: string[];
  restoring: boolean;
  permissions: RolePermissions[];
  deleting: boolean;
  deleteSavedQuery: (uuid: string, iamDomain: string) => void;
  restoreSavedQuery: (uuid: string, iamDomain: string) => void;
};

const filterQueries = (
  queries: SavedQuery[],
  accountId: string,
  isPublic: boolean,
): SavedQueryWithUrl[] => {
  const filters: SavedQueryWithUrl[] = [];
  if (queries.length > 0) {
    queries.forEach(q => {
      if (q.isPublic === isPublic) {
        filters.push({
          ...q,
          ...generateUrl(q, accountId),
        });
      }
    });
  }
  return filters;
};

export const QueryList: React.FC<QueryListProps> = ({
  queries,
  accountId,
  loadSavedFilters,
  selectedSavedFilter,
  recentlyCreated,
  recentlyDeleted,
  permissions,
  deleting,
  restoring,
  deleteSavedQuery,
  restoreSavedQuery,
}: QueryListProps) => {
  const [publicQueries, setPublicQueries] = useState<SavedQueryWithUrl[]>(
    filterQueries(queries || [], accountId, true),
  );
  const [privateQueries, setPrivateQueries] = useState<SavedQueryWithUrl[]>(
    filterQueries(queries || [], accountId, false),
  );

  useEffect(() => {
    setPublicQueries(filterQueries(queries || [], accountId, true));
    setPrivateQueries(filterQueries(queries || [], accountId, false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return (
    <StyledContainer id="savedQueriesDialogBody">
      {queries && queries.length > 0 ? (
        <>
          {privateQueries.length > 0 ? (
            <StyledFormGroup>
              {privateQueries.map((q, index) => (
                <QueryItem
                  key={`${q.isPublic ? 'public' : 'private'}-filters-link-${
                    q.uuid
                  }-${index}-${selectedSavedFilter.uuid === q.uuid}`}
                  savedQuery={q}
                  loadSavedFilters={loadSavedFilters}
                  selectedSavedFilter={selectedSavedFilter}
                  recentlyCreated={recentlyCreated}
                  recentlyDeleted={recentlyDeleted}
                  permissions={permissions}
                  deleting={deleting}
                  restoring={restoring}
                  deleteSavedQuery={deleteSavedQuery}
                  restoreSavedQuery={restoreSavedQuery}
                />
              ))}
            </StyledFormGroup>
          ) : (
            <Type as="p" data-test={noPrivateQueriesId}>
              {i18n.t(
                'I18N_SAVED_FILTERS_NO_SAVED_FILTERS_DESCRIPTION',
                'Save your search, date range, and status filters so others can use the saved filter, too.',
              )}
            </Type>
          )}

          {publicQueries.length > 0 && (
            <StyledFormGroup>
              <StyledSharedWithMe as="p">
                {FiltersListTitles.sharedWithMe}
              </StyledSharedWithMe>
              {publicQueries.map((q, index) => (
                <QueryItem
                  key={`${q.isPublic ? 'public' : 'private'}-filters-link-${
                    q.uuid
                  }-${index}-${selectedSavedFilter.uuid === q.uuid}`}
                  savedQuery={q}
                  loadSavedFilters={loadSavedFilters}
                  selectedSavedFilter={selectedSavedFilter}
                  recentlyCreated={recentlyCreated}
                  recentlyDeleted={recentlyDeleted}
                  permissions={permissions}
                  deleting={deleting}
                  restoring={restoring}
                  deleteSavedQuery={deleteSavedQuery}
                  restoreSavedQuery={restoreSavedQuery}
                />
              ))}
            </StyledFormGroup>
          )}
        </>
      ) : (
        <Type id="savedQueriesDialogBody" as="p" condensed>
          {i18n.t(
            'I18N_SAVED_FILTERS_NO_SAVED_FILTERS_DESCRIPTION',
            'Save your search, date range, and status filters so others can use the saved filter, too.',
          )}
        </Type>
      )}
    </StyledContainer>
  );
};
