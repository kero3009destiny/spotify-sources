import React, { useContext } from 'react';
import { event } from 'react-ga';
import { Link } from 'react-router';
import { matchPath } from 'react-router-dom';
import { window } from 'global';
import i18n from 'i18next';
import styled from 'styled-components';

import { plum } from '@spotify-internal/encore-advertising-web/cjs/styles/colors';
import {
  gray50,
  gray80,
  spacer4,
  Type,
  white,
} from '@spotify-internal/encore-web';

import { AnalyticsContext } from '../AnalyticsContext';

import { GA_DRAFT_TOGGLE_CLICKED } from 'utils/campaignHierarchy/constants';

const Container = styled.div`
  border: 1px solid ${gray80};
  border-radius: ${spacer4};
  display: flex;
  width: 142px;
`;

const StyledLink = styled(Link)<{ active?: boolean }>`
  display: block;
  text-align: center;
  padding: 15px 0 14px;
  width: 100%;
  border-radius: ${spacer4};

  &:first-of-type {
    border-right: 1px solid ${gray80};
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:last-of-type {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  ${props =>
    props.active
      ? `background-color: ${plum}; color: ${white};`
      : `background-color: ${white}; color: ${gray50};`}
`;

export interface EntityDraftToggleProps {
  entityDashboardRoute: string;
  draftDashboardRoute: string;
}

export const EntityDraftToggle = React.forwardRef<
  HTMLDivElement,
  EntityDraftToggleProps
>((props, ref) => {
  const analyticsContext = useContext(AnalyticsContext);
  const matchesEntityRoute = !!matchPath(window.location.pathname, {
    path: props.entityDashboardRoute,
    exact: true,
  });
  const matchesDraftRoute = !!matchPath(window.location.pathname, {
    path: props.draftDashboardRoute,
    exact: true,
  });

  return (
    <Container ref={ref} data-test="entity-draft-toggle">
      <StyledLink
        active={matchesEntityRoute}
        to={`${props.entityDashboardRoute}${window.location.search}`}
        onClick={() => {
          event({
            category: analyticsContext.category,
            action: GA_DRAFT_TOGGLE_CLICKED,
            label: 'All',
          });
        }}
      >
        <Type variant={Type.body2}>{i18n.t('I18N_ENTITIES_ALL', 'All')}</Type>
      </StyledLink>
      <StyledLink
        active={matchesDraftRoute}
        to={`${props.draftDashboardRoute}${window.location.search}`}
        onClick={() => {
          event({
            category: analyticsContext.category,
            action: GA_DRAFT_TOGGLE_CLICKED,
            label: 'Drafts',
          });
        }}
      >
        <Type variant={Type.body2}>{i18n.t('I18N_DRAFTS', 'Drafts')}</Type>
      </StyledLink>
    </Container>
  );
});
