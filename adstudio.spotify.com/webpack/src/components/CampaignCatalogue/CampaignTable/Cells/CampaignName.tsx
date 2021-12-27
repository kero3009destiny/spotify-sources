import React from 'react';
import { event } from 'react-ga';
import { useDispatch } from 'react-redux';
import { window } from 'global';
import i18n from 'i18next';
import qs from 'query-string';

import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';

import { replaceAllSelectionsWithCampaign } from 'ducks/dashboard/actions';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';
import { AuthContextConsumer } from 'components/common/AuthorizationContext';
import { Activity, NameCell } from 'components/common/Table/NameCell';

import { stripOnlyFlightAndCreativeFilteringParams } from 'utils/campaignHierarchy/catalogueFilters';

import { TEST_IDS } from '../constants';
import { GA_ENTITY_NAME_CLICKED } from 'utils/campaignHierarchy/constants';
import { routeFragmentLiterals, routes } from 'config/routes';

import {
  CampaignsCatalogueEntity,
  CampaignState,
} from 'types/common/state/api/campaigns';

export interface CampaignNameProps {
  campaignRow: CampaignsCatalogueEntity;
  isSuperviewer: boolean;
  currentUserAdAccountId: string;
}

export const CampaignName = ({
  campaignRow,
  isSuperviewer,
  currentUserAdAccountId,
}: CampaignNameProps) => {
  const dispatch = useDispatch();
  const campaignIsEditable = campaignRow.campaignState === CampaignState.ACTIVE;
  // Special case for superviewers using their own admin account – they have
  // CAMPAIGN_UPDATE but should not have access to other accounts' campaigns
  const isSuperviewerReadonlyCampaign =
    isSuperviewer && campaignRow.adAccountId !== currentUserAdAccountId;
  const secondaryActions: Activity[] = [];
  const queryParams = { ...qs.parse(window.location.search) };

  return (
    <AuthContextConsumer>
      {permissions => (
        <AnalyticsContextConsumer>
          {({ category }) => {
            const canEditCampaign =
              permissions.includes(RolePermissions.CAMPAIGN_UPDATE) &&
              !isSuperviewerReadonlyCampaign;

            if (campaignIsEditable) {
              secondaryActions.unshift({
                name: i18n.t('I18N_EDIT', 'Edit'),
                href: routes.EDIT_CAMPAIGN.replace(
                  routeFragmentLiterals.ACCOUNT_ID,
                  campaignRow.adAccountId,
                ).replace(
                  routeFragmentLiterals.CAMPAIGN_ID,
                  campaignRow.campaignId,
                ),
                onClick: () => {
                  event({
                    category,
                    action: 'secondary_action_edit',
                    label: JSON.stringify({
                      campaignId: campaignRow.campaignId,
                    }),
                  });
                },
                readOnly: !canEditCampaign,
                'data-test': TEST_IDS.SECONDARY_ACTION_EDIT,
              });
            }

            return (
              <NameCell
                keyId={campaignRow.campaignId}
                name={campaignRow.name}
                data-test={TEST_IDS.NAME_CELL}
                href={`${routes.FLIGHT_CATALOGUE.replace(
                  routeFragmentLiterals.ACCOUNT_ID,
                  campaignRow.adAccountId,
                )}${stripOnlyFlightAndCreativeFilteringParams(
                  new URLSearchParams(queryParams as Record<string, string>),
                )}`}
                secondaryActions={secondaryActions}
                forceHoverState={false}
                onClick={() => {
                  event({
                    category,
                    action: GA_ENTITY_NAME_CLICKED,
                    label: JSON.stringify({
                      name: campaignRow.name,
                      id: campaignRow.campaignId,
                    }),
                  });

                  dispatch(
                    replaceAllSelectionsWithCampaign(campaignRow.campaignId),
                  );
                }}
              />
            );
          }}
        </AnalyticsContextConsumer>
      )}
    </AuthContextConsumer>
  );
};
