import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routerActions } from 'react-router-redux';
import i18n from 'i18next';

import Can from '@spotify-internal/adstudio-shared/lib/components/CanWrapper';
import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';
import { ButtonPrimary } from '@spotify-internal/encore-web';
import { useBool } from '@spotify-internal/remote-config-resolver-react';

import { advertiserHasDraftImpersonation } from 'ducks/account/selectors';
import { getSelectedCampaigns } from 'ducks/dashboard/selectors';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';
import { AuthContextConsumer } from 'components/common/AuthorizationContext';

import { getRouteAccountId } from 'utils/routeHelpers';

import { routeFragmentLiterals, routes } from 'config/routes';

export const MaybeCreateFlight = () => {
  const hasImpersonationFlag = useBool('impersonation');
  const dispatch = useDispatch();
  const canImpersonate = useSelector(advertiserHasDraftImpersonation);
  const adAccountId = getRouteAccountId();
  const selectedCampaigns = useSelector(getSelectedCampaigns);
  let campaignId: string | undefined;

  if (selectedCampaigns.length === 1) {
    campaignId = selectedCampaigns[0];
  }

  return (
    <AnalyticsContextConsumer>
      {({ category, logUserAction }) => (
        <AuthContextConsumer>
          {permissions => (
            <Can
              permissions={permissions}
              perform={
                hasImpersonationFlag && canImpersonate
                  ? [RolePermissions.DRAFT_CREATE]
                  : [RolePermissions.FLIGHT_CREATE]
              }
              yes={() =>
                campaignId && (
                  <ButtonPrimary
                    buttonSize={ButtonPrimary.md}
                    onClick={() => {
                      logUserAction({
                        category,
                        label: 'create_new_ad_set_button',
                      });
                      dispatch(
                        routerActions.push(
                          routes.BUILD_FLIGHT.replace(
                            routeFragmentLiterals.ACCOUNT_ID,
                            adAccountId,
                          ).replace(
                            routeFragmentLiterals.CAMPAIGN_ID,
                            campaignId!,
                          ),
                        ),
                      );
                    }}
                    buttonLegacy
                  >
                    {i18n.t('I18N_CREATE_NEW_AD_SET', 'Create new ad set')}
                  </ButtonPrimary>
                )
              }
            />
          )}
        </AuthContextConsumer>
      )}
    </AnalyticsContextConsumer>
  );
};
