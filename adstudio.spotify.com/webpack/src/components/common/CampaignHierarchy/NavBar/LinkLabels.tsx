import React from 'react';
import { useSelector } from 'react-redux';
import i18n from 'i18next';

import {
  IconGridView,
  IconInvite,
  IconPlaylistFolder,
  semanticColors,
  Type,
} from '@spotify-internal/encore-web';

import {
  getSelectedCampaignCount,
  getSelectedFlightCount,
} from 'ducks/dashboard/selectors';

import { LabelContainer } from './styles';

interface LabelProps {
  label: string;
  IconComponent: React.ComponentType;
  descriptionText?: string | React.ReactNode;
}

const LinkLabel = ({ IconComponent, label, descriptionText }: LabelProps) => {
  return (
    <LabelContainer>
      <IconComponent />
      <div>
        <Type variant={Type.body1} weight={Type.bold}>
          {label}
        </Type>
        {descriptionText && (
          <Type
            condensed
            as="p"
            variant={Type.body3}
            semanticColor={semanticColors.textSubdued}
          >
            {descriptionText}
          </Type>
        )}
      </div>
    </LabelContainer>
  );
};

export const CampaignLinkLabel = () => {
  return (
    <LinkLabel
      IconComponent={IconPlaylistFolder}
      label={i18n.t('I18N_CAMPAIGNS_SENTENCE_CASE', 'Campaigns')}
    />
  );
};

export const FlightLinkLabel = () => {
  const entityCount = useSelector(getSelectedCampaignCount);
  let descriptionText;

  if (entityCount && entityCount > 1) {
    descriptionText = i18n.t('I18N_FOR_MULTI_CAMPAIGN', {
      entityCount,
      defaultValue: 'for {{entityCount}} campaigns',
    });
  } else if (entityCount) {
    descriptionText = i18n.t('I18N_FOR_ONE_CAMPAIGN', 'for 1 campaign');
  }

  return (
    <LinkLabel
      IconComponent={IconGridView}
      label={i18n.t('I18N_AD_SETS_SENTENCE_CASE', 'Ad sets')}
      descriptionText={descriptionText}
    />
  );
};

export const CreativeLinkLabel = () => {
  const entityCount = useSelector(getSelectedFlightCount);
  let descriptionText;

  if (entityCount && entityCount > 1) {
    descriptionText = i18n.t('I18N_FOR_MULTI_FLIGHT', {
      entityCount,
      defaultValue: 'for {{entityCount}} ad sets',
    });
  } else if (entityCount) {
    descriptionText = i18n.t('I18N_FOR_ONE_FLIGHT', 'for 1 ad set');
  }

  return (
    <LinkLabel
      IconComponent={IconInvite}
      label={i18n.t('I18N_ADS_SENTENCE_CASE', 'Ads')}
      descriptionText={descriptionText}
    />
  );
};
