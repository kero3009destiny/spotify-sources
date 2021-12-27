import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routerActions } from 'react-router-redux';
import i18n from 'i18next';

import Can from '@spotify-internal/adstudio-shared/lib/components/CanWrapper';
import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';
import { ButtonPrimary } from '@spotify-internal/encore-web';
import { useBool } from '@spotify-internal/remote-config-resolver-react';

import { getFlight } from 'ducks/flights/actions';
import { advertiserHasDraftImpersonation } from 'ducks/account/selectors';
import { getSelectedFlights } from 'ducks/dashboard/selectors';
import {
  getFetchFlightSuccess,
  getFlightFormat,
  getFlightIsInTerminalState,
} from 'ducks/flights/selectors';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';
import { AuthContextConsumer } from 'components/common/AuthorizationContext';

import { isMusicFormatType } from 'utils/creativeHelpers';
import { getRouteAccountId } from 'utils/routeHelpers';

import { routeFragmentLiterals, routes } from 'config/routes';

export const MaybeCreateCreative = () => {
  const hasImpersonationFlag = useBool('impersonation');
  const dispatch = useDispatch();
  const canImpersonate = useSelector(advertiserHasDraftImpersonation);
  const adAccountId = getRouteAccountId();
  const selectedFlights = useSelector(getSelectedFlights);
  let flightId: string | undefined;

  if (selectedFlights.length === 1) {
    flightId = selectedFlights[0];
  }

  useEffect(() => {
    if (flightId) {
      dispatch(getFlight({ adAccountId, flightId }));
    }
  }, [dispatch, adAccountId, flightId]);

  const showCreateCreative = useSelector((state: TSFixMe) => {
    return (
      !getFlightIsInTerminalState(state) &&
      !!flightId &&
      getFetchFlightSuccess(state) &&
      isMusicFormatType(getFlightFormat(state))
    );
  });

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
                  : [RolePermissions.CREATIVE_CREATE]
              }
              yes={() =>
                showCreateCreative && (
                  <ButtonPrimary
                    buttonSize={ButtonPrimary.md}
                    onClick={() => {
                      logUserAction({
                        category,
                        label: 'create_new_ad_button',
                      });
                      dispatch(
                        routerActions.push(
                          routes.BUILD_CREATIVE.replace(
                            routeFragmentLiterals.ACCOUNT_ID,
                            adAccountId,
                          ).replace(routeFragmentLiterals.FLIGHT_ID, flightId!),
                        ),
                      );
                    }}
                    buttonLegacy
                  >
                    {i18n.t('I18N_CREATE_NEW_AD', 'Create new ad')}
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
