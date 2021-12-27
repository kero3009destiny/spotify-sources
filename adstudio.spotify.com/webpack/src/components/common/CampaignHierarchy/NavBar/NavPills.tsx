import React, { useContext } from 'react';
import { event } from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import { window } from 'global';
// TODO: when bulksheets is released 100%, refactor pills to use a common NavPill abstraction
import i18n from 'i18next';
import qs from 'query-string';

import {
  addColorSet,
  IconX,
  semanticColors,
  Type,
} from '@spotify-internal/encore-web';

import {
  deselectCampaigns,
  deselectCreatives,
  deselectFlights,
} from 'ducks/dashboard/actions';
import {
  getSelectedCampaigns,
  getSelectedCreatives,
  getSelectedFlights,
} from 'ducks/dashboard/selectors';

import { AnalyticsContext } from 'components/common/AnalyticsContext';

import {
  CAMPAIGN_ID_KEY,
  CREATIVE_ID_KEY,
  FLIGHT_ID_KEY,
  generateFlightNavPillQueryParams,
  getCurrentPagePrefix,
} from 'utils/campaignHierarchy/catalogueFilters';

import {
  StyledButtonIcon,
  StyledNavPillLink,
  StyledNavPillListItem,
} from './styles';

import { GA_ENTITY_FILTER_CLEARED } from 'utils/campaignHierarchy/constants';

export interface NavPillProps {
  search: string;
}

export const CampaignNavPill = () => {
  const analyticsContext = useContext(AnalyticsContext);
  const currentPagePrefix = getCurrentPagePrefix();
  const newQueryString = new URLSearchParams({
    [`${currentPagePrefix}offset`]: '0',
    [`${currentPagePrefix}limit`]: '20',
  }).toString();
  const dispatch = useDispatch();
  const selectedCampaigns = useSelector(getSelectedCampaigns);
  const entityCount = selectedCampaigns.length;
  const text = i18n.t('I18N_SELECTED', {
    entityCount,
    defaultValue: '{{entityCount}} selected',
  });

  if (entityCount === 0) {
    return <></>;
  }

  return (
    <StyledNavPillListItem
      label={
        <StyledNavPillLink
          title={i18n.t('I18N_CLEAR_FILTER', 'Clear filter')}
          to={`${window.location.pathname}?${newQueryString}`}
          data-test={`CatalogueNav-${CAMPAIGN_ID_KEY}`}
          className={addColorSet('invertedDark')}
          onClick={() => {
            dispatch(deselectCampaigns(selectedCampaigns));
            event({
              category: analyticsContext.category,
              action: GA_ENTITY_FILTER_CLEARED,
              label: 'campaigns',
            });
          }}
        >
          <Type
            variant={Type.body3}
            weight={Type.bold}
            semanticColor={semanticColors.textBase}
          >
            {text}
          </Type>
          <IconX iconSize={16} semanticColor={semanticColors.textBase} />
        </StyledNavPillLink>
      }
    />
  );
};

export const FlightNavPill = ({ search }: NavPillProps) => {
  const analyticsContext = useContext(AnalyticsContext);
  const queryParams = qs.parse(search);
  const currentPagePrefix = getCurrentPagePrefix();
  const defaultParams = new URLSearchParams({
    [`${currentPagePrefix}offset`]: '0',
    [`${currentPagePrefix}limit`]: '20',
  }).toString();
  const filteredParams = generateFlightNavPillQueryParams(queryParams);
  const dispatch = useDispatch();
  const selectedFlights = useSelector(getSelectedFlights);
  const entityCount = selectedFlights.length;
  const text = i18n.t('I18N_SELECTED', {
    entityCount,
    defaultValue: '{{entityCount}} selected',
  });

  if (entityCount === 0) {
    return <></>;
  }

  return (
    <StyledNavPillListItem
      label={
        <StyledNavPillLink
          title={i18n.t('I18N_CLEAR_FILTER', 'Clear filter')}
          to={{
            pathname: window.location.pathname,
            search: `?${filteredParams ? filteredParams : defaultParams}`,
          }}
          onClick={() => {
            dispatch(deselectFlights(selectedFlights));
            event({
              category: analyticsContext.category,
              action: GA_ENTITY_FILTER_CLEARED,
              label: 'ad sets',
            });
          }}
          data-test={`CatalogueNav-${FLIGHT_ID_KEY}`}
          className={addColorSet('invertedDark')}
        >
          <Type
            variant={Type.body3}
            semanticColor={semanticColors.textBase}
            weight={Type.bold}
          >
            {text}
          </Type>
          <IconX iconSize={16} semanticColor={semanticColors.textBase} />
        </StyledNavPillLink>
      }
    />
  );
};

export const CreativeNavPill = () => {
  const dispatch = useDispatch();
  const analyticsContext = useContext(AnalyticsContext);
  const selectedCreatives = useSelector(getSelectedCreatives);
  const entityCount = selectedCreatives.length;

  if (entityCount === 0) {
    return <></>;
  }

  return (
    <StyledNavPillListItem
      label={
        <StyledButtonIcon
          title={i18n.t('I18N_CLEAR_FILTER', 'Clear filter')}
          data-test={`CatalogueNav-${CREATIVE_ID_KEY}`}
          onClick={() => {
            dispatch(deselectCreatives(selectedCreatives));
            event({
              category: analyticsContext.category,
              action: GA_ENTITY_FILTER_CLEARED,
              label: 'ads',
            });
          }}
          className={addColorSet('invertedDark')}
        >
          <Type
            variant={Type.body3}
            semanticColor={semanticColors.textBase}
            weight={Type.bold}
          >
            {i18n.t('I18N_SELECTED', {
              entityCount,
              defaultValue: '{{entityCount}} selected',
            })}
          </Type>
          <IconX iconSize={16} semanticColor={semanticColors.textBase} />
        </StyledButtonIcon>
      }
    />
  );
};
