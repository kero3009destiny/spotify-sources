import React, { useEffect, useState } from 'react';
import { event } from 'react-ga';
import { batch, useDispatch, useSelector } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { window } from 'global';
import i18n from 'i18next';
import qs from 'query-string';
import styled from 'styled-components';

import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';
import { ButtonTertiary, Popover, Type } from '@spotify-internal/encore-web';

import { replaceAllSelectionsWithFlight } from 'ducks/dashboard/actions';
import {
  fetchUserHasSeenAdSetDupeOnboarding,
  fetchUserHasSeenHierarchyDraftsOnboarding,
  setUserHasSeenAdSetDupeOnboarding,
} from 'ducks/onboarding/actions';
import { shouldShowAdSetDupeOnboarding as selectShouldShowAdSetDupeOnboarding } from 'ducks/onboarding/selectors';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';
import { AuthContextConsumer } from 'components/common/AuthorizationContext';
import { FlightDuplicationModal } from 'components/common/CampaignHierarchy/FlightDuplicationModal';
import { Coachmark } from 'components/common/Coachmark/Coachmark';
import { CoachmarkPortal } from 'components/common/Coachmark/CoachmarkPortal';
import { Activity, NameCell } from 'components/common/Table/NameCell';

import { stripOnlyCreativeFilteringParams } from 'utils/campaignHierarchy/catalogueFilters';

import {
  PAUSABLE_STATES,
  UNEDITABLE_FLIGHT_STATES,
} from 'ducks/flights/constants';
import { GA_ENTITY_NAME_CLICKED } from 'utils/campaignHierarchy/constants';
import { routeFragmentLiterals, routes } from 'config/routes';

import { PauseResumeFlightActionType } from 'types/common/state/api/flight';
import { FlightsCatalogueEntity } from 'types/common/state/api/flights';

const StyledNameCellContainer = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  display: grid;
  justify-content: right;
`;

const StyledPopover = styled(Popover)`
  position: absolute;
  bottom: 60px;
`;

export interface FlightNameProps {
  flightRow: FlightsCatalogueEntity;
  isSuperviewer: boolean;
  currentUserAdAccountId: string;
  pauseOrResumeFlight: (
    flightId: string,
    action: PauseResumeFlightActionType,
  ) => void;
  couldShowDuplicationCoachmark: boolean;
  isSpanEnabled?: boolean;
}

export const FlightName = ({
  flightRow,
  isSuperviewer,
  currentUserAdAccountId,
  couldShowDuplicationCoachmark,
  pauseOrResumeFlight,
  isSpanEnabled,
}: FlightNameProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (couldShowDuplicationCoachmark) {
      batch(() => {
        // check for both 1XY GA onboarding flags to prioritize coachmark rendering in the dashboard
        dispatch(fetchUserHasSeenHierarchyDraftsOnboarding());
        dispatch(fetchUserHasSeenAdSetDupeOnboarding());
      });
    }
  }, [dispatch, couldShowDuplicationCoachmark]);

  const nameCellRef = React.createRef<HTMLDivElement>();
  const [showDuplicationModal, setShowDuplicationModal] = useState(false);
  const showSecondaryActions = !matchPath(window.location.pathname, {
    path: routes.CREATIVE_ENTITY_AD_SETS,
    exact: true,
  });
  const flightIsEditable = !UNEDITABLE_FLIGHT_STATES.includes(
    flightRow.flightState,
  );
  const secondaryActions: Activity[] = [];
  const flightIsPausable = PAUSABLE_STATES.includes(flightRow.flightState);
  // Special case for superviewers using their own admin account – they have
  // FLIGHT_UPDATE but should not have access to other accounts' flights
  const isSuperviewerReadonlyFlight =
    isSuperviewer && flightRow.adAccountId !== currentUserAdAccountId;
  const shouldShowAdSetDupeOnboarding = useSelector(
    selectShouldShowAdSetDupeOnboarding,
  );
  const showAdSetCoachmark =
    couldShowDuplicationCoachmark && shouldShowAdSetDupeOnboarding;
  const queryParams = { ...qs.parse(window.location.search) };

  return (
    <AuthContextConsumer>
      {permissions => (
        <AnalyticsContextConsumer>
          {({ category }) => {
            const canUpdateFlight =
              permissions.includes(RolePermissions.FLIGHT_UPDATE) &&
              !isSuperviewerReadonlyFlight;

            const canDuplicateFlight =
              permissions.includes(RolePermissions.FLIGHT_CREATE) &&
              !isSuperviewerReadonlyFlight;

            if (showSecondaryActions) {
              secondaryActions.push({
                name: i18n.t('I18N_DUPLICATE', 'Duplicate'),
                'data-test': 'duplicate-action',
                onClick: () => {
                  setShowDuplicationModal(true);
                  event({
                    category,
                    action: 'secondary_action_duplicate',
                    label: JSON.stringify({ flightId: flightRow.flightId }),
                  });
                },
                readOnly: !canDuplicateFlight,
              });

              if (flightIsEditable) {
                secondaryActions.push({
                  name: i18n.t('I18N_EDIT', 'Edit'),
                  'data-test': 'edit-action',
                  href: routes.EDIT_FLIGHT.replace(
                    routeFragmentLiterals.ACCOUNT_ID,
                    flightRow.adAccountId,
                  ).replace(
                    routeFragmentLiterals.FLIGHT_ID,
                    flightRow.flightId,
                  ),
                  onClick: () =>
                    event({
                      category,
                      action: 'secondary_action_edit',
                      label: JSON.stringify({ flightId: flightRow.flightId }),
                    }),
                  readOnly: !canUpdateFlight,
                });
              }
              if (flightIsPausable) {
                secondaryActions.push({
                  name: flightRow.isActive
                    ? i18n.t('I18N_PAUSE', 'Pause')
                    : i18n.t('I18N_RESUME', 'Resume'),
                  'data-test': 'pause-resume-action',
                  onClick: () => {
                    event({
                      category,
                      action: flightRow.isActive
                        ? 'secondary_action_pause'
                        : 'secondary_action_resume',
                      label: JSON.stringify({ flightId: flightRow.flightId }),
                    });
                    pauseOrResumeFlight(
                      flightRow.flightId,
                      flightRow.isActive
                        ? PauseResumeFlightActionType.PAUSE
                        : PauseResumeFlightActionType.RESUME,
                    );
                  },
                  readOnly: !canUpdateFlight,
                });
              }
              secondaryActions.push({
                name: isSpanEnabled
                  ? i18n.t('I18N_VIEW_REPORT', 'View report')
                  : i18n.t('I18N_SEE_OVERVIEW', 'See overview'),
                href: routes.FLIGHT_ENTITY_REPORT.replace(
                  routeFragmentLiterals.ACCOUNT_ID,
                  flightRow.adAccountId,
                ).replace(routeFragmentLiterals.FLIGHT_ID, flightRow.flightId),
                onClick: () =>
                  event({
                    category,
                    action: 'secondary_action_see_insights',
                    label: JSON.stringify({ flightId: flightRow.flightId }),
                  }),
              });
            }

            return (
              <StyledNameCellContainer>
                {showAdSetCoachmark && (
                  <CoachmarkPortal>
                    <Coachmark target={nameCellRef} borderRadius="5px">
                      <StyledPopover arrow={Popover.bottom}>
                        <Type as="p" variant={Type.body2} weight={Type.bold}>
                          {i18n.t(
                            'I18N_DUPLICATE_AD_SET_WITH_ADS_DIALOG_TITLE',
                            'Duplicate ad set with ads',
                          )}
                        </Type>
                        <Type as="p" variant={Type.body2}>
                          {i18n.t(
                            'I18N_DUPLICATE_AD_SET_ADS_COACHMARK_BODY',
                            'Quickly create an ad set, including ads, within an existing campaign.',
                          )}
                        </Type>
                        <ButtonContainer>
                          <ButtonTertiary
                            condensed
                            buttonSize={ButtonTertiary.sm}
                            onClick={() =>
                              dispatch(setUserHasSeenAdSetDupeOnboarding())
                            }
                            buttonLegacy
                          >
                            {i18n.t('I18N_GOT_IT', 'Got It')}
                          </ButtonTertiary>
                        </ButtonContainer>
                      </StyledPopover>
                    </Coachmark>
                  </CoachmarkPortal>
                )}
                <NameCell
                  ref={nameCellRef}
                  keyId={flightRow.flightId}
                  name={flightRow.name}
                  data-test="flight-table-row-name-cell"
                  href={`${routes.CREATIVE_CATALOGUE.replace(
                    routeFragmentLiterals.ACCOUNT_ID,
                    flightRow.adAccountId,
                  )}${stripOnlyCreativeFilteringParams(
                    new URLSearchParams(queryParams as Record<string, string>),
                  )}`}
                  secondaryActions={secondaryActions}
                  forceHoverState={showAdSetCoachmark}
                  onClick={() => {
                    event({
                      category,
                      action: GA_ENTITY_NAME_CLICKED,
                      label: JSON.stringify({
                        name: flightRow.name,
                        id: flightRow.flightId,
                      }),
                    });

                    dispatch(
                      replaceAllSelectionsWithFlight(flightRow.flightId),
                    );
                  }}
                />
                {showDuplicationModal && (
                  <FlightDuplicationModal
                    onClose={() => setShowDuplicationModal(false)}
                    flightId={flightRow.flightId}
                    campaignId={flightRow.campaignId}
                    adAccountId={flightRow.adAccountId}
                    format={flightRow.format}
                  />
                )}
              </StyledNameCellContainer>
            );
          }}
        </AnalyticsContextConsumer>
      )}
    </AuthContextConsumer>
  );
};
