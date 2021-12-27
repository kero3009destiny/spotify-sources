import React from 'react';
import { useDispatch } from 'react-redux';
import i18n from 'i18next';
import styled from 'styled-components';

import { ButtonTertiary, Popover, Type } from '@spotify-internal/encore-web';

import { setUserHasSeenHierarchyDraftsOnboarding } from 'ducks/onboarding/actions';

import { Coachmark } from 'components/common/Coachmark/Coachmark';
import { CoachmarkPortal } from 'components/common/Coachmark/CoachmarkPortal';

import { EntityType } from './StatusIndicator/constants';

const ButtonContainer = styled.div`
  display: grid;
  justify-content: right;
`;

const StyledPopover = styled(Popover)`
  width: 400px;
  left: 160px;
`;

interface HierarchyDraftCoachmarkProps {
  entityType: EntityType;
  coachmarkRef: React.RefObject<any>;
}

export const HierarchyDraftCoachmark = ({
  entityType,
  coachmarkRef,
}: HierarchyDraftCoachmarkProps) => {
  const dispatch = useDispatch();

  return (
    <CoachmarkPortal>
      <Coachmark target={coachmarkRef} borderRadius="5px">
        <StyledPopover arrow={Popover.leftTop}>
          <Type as="p" variant={Type.body2} weight={Type.bold}>
            {entityType === EntityType.Campaign &&
              i18n.t(
                'I18N_DRAFTS_CAMPAIGNS_COACHMARK_TITLE',
                'Your drafts are now in your campaigns view',
              )}
            {entityType === EntityType.Flight &&
              i18n.t(
                'I18N_DRAFTS_AD_SET_COACHMARK_TITLE',
                'Your drafts are now in your ad sets view',
              )}
            {entityType === EntityType.Creative &&
              i18n.t(
                'I18N_DRAFTS_AD_COACHMARK_TITLE',
                'Your drafts are now in your ads view',
              )}
          </Type>
          <Type as="p" variant={Type.body2}>
            {i18n.t(
              'I18N_DRAFTS_COACHMARK_BODY',
              'We’ve organized drafts into campaigns, ad sets and ads so you can quickly find and publish them.',
            )}
          </Type>
          <ButtonContainer>
            <ButtonTertiary
              condensed
              buttonSize={ButtonTertiary.sm}
              onClick={() =>
                dispatch(setUserHasSeenHierarchyDraftsOnboarding())
              }
              buttonLegacy
            >
              {i18n.t('I18N_GOT_IT', 'Got It')}
            </ButtonTertiary>
          </ButtonContainer>
        </StyledPopover>
      </Coachmark>
    </CoachmarkPortal>
  );
};
