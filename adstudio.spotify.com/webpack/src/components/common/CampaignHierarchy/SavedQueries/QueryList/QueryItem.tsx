import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';
import { FormRadio, gray90, gray95, white } from '@spotify-internal/encore-web';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';

import { ActionBar, ActionButtonContainer } from './ActionBar';

import { SavedQueryWithUrl } from '../types';
import {
  CampaignParams,
  FlightParams,
} from 'types/common/state/api/savedQueries';

const SavedFilterContainer = styled.div<{
  recentlySaved: boolean;
  recentlyDeleted: boolean;
}>`
  background-color: ${props =>
    props.recentlySaved || props.recentlyDeleted ? gray90 : white};
  padding: 0 1rem;
  border-radius: 0.5rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: ${gray95};
  }

  ${ActionButtonContainer} {
    display: ${props => (props.recentlyDeleted ? 'flex' : 'none')};
    justify-content: space-between;
  }

  &:hover ${ActionButtonContainer} {
    display: flex;
    justify-content: space-between;
  }
`;

const WrappedRadio = styled.section`
  &:hover > div > label {
    cursor: pointer;
  }

  div > label {
    height: 20px;
    margin-top: 12px;
  }
`;

const UnstyledAnchor = styled(Link)`
  color: inherit;
`;

const QueryName = styled.div`
  display: inline-block;
  width: 16rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PUBLIC = 'public';
const PRIVATE = 'private';

type QueryItemProps = {
  savedQuery: SavedQueryWithUrl;
  loadSavedFilters: (
    uuid: string,
    params: string,
    campaignParams: CampaignParams,
    flightParams: FlightParams,
  ) => void;
  selectedSavedFilter: { uuid: string; params: string };
  recentlyCreated?: string;
  recentlyDeleted: string[];
  permissions: RolePermissions[];
  deleting: boolean;
  restoring: boolean;
  deleteSavedQuery: (uuid: string, iamDomain: string) => void;
  restoreSavedQuery: (uuid: string, iamDomain: string) => void;
};

export const QueryItem: React.FC<QueryItemProps> = ({
  savedQuery,
  loadSavedFilters,
  selectedSavedFilter,
  recentlyCreated,
  recentlyDeleted,
  permissions,
  deleting,
  restoring,
  deleteSavedQuery,
  restoreSavedQuery,
}) => {
  return (
    <AnalyticsContextConsumer>
      {({ logUserAction, category }) => (
        <SavedFilterContainer
          recentlySaved={recentlyCreated === savedQuery.uuid}
          recentlyDeleted={recentlyDeleted.includes(savedQuery.uuid || '')}
        >
          <UnstyledAnchor
            to={savedQuery.url}
            onClick={() => {
              loadSavedFilters(
                savedQuery.uuid || '',
                savedQuery.params,
                savedQuery.campaignParams,
                savedQuery.flightParams,
              );
              logUserAction({
                category,
                label: 'saved_filter_selection',
              });
            }}
            data-test={`${savedQuery.uuid}-${savedQuery.name}-link`}
          >
            <WrappedRadio>
              <FormRadio
                id={
                  savedQuery.uuid ||
                  `${savedQuery.isPublic ? PUBLIC : PRIVATE}_query_${
                    savedQuery.uuid
                  }`
                }
                name={`${savedQuery.isPublic ? PUBLIC : PRIVATE}-group`}
                defaultChecked={selectedSavedFilter.uuid === savedQuery.uuid}
              >
                <QueryName>{savedQuery.name}</QueryName>
              </FormRadio>
            </WrappedRadio>
          </UnstyledAnchor>
          <ActionBar
            recentlyCreated={recentlyCreated}
            savedQuery={savedQuery}
            recentlyDeleted={recentlyDeleted}
            deleting={deleting}
            permissions={permissions}
            restoring={restoring}
            deleteSavedQuery={(...args) => {
              deleteSavedQuery(...args);
              logUserAction({
                category,
                label: 'saved_filter_delete',
              });
            }}
            restoreSavedQuery={(...args) => {
              restoreSavedQuery(...args);
              logUserAction({
                category,
                label: 'saved_filter_restore',
              });
            }}
          />
        </SavedFilterContainer>
      )}
    </AnalyticsContextConsumer>
  );
};
