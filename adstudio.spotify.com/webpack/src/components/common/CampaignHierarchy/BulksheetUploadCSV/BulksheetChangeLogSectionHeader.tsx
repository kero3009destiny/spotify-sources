import React from 'react';
import i18n from 'i18next';

import {
  gray30,
  Icon,
  IconGridView,
  IconInvite,
  IconPlaylistFolder,
  semanticColors,
  Type,
} from '@spotify-internal/encore-web';

import {
  ChangeLogSectionEntityLabel,
  ChangeLogSectionTitle,
  ChangeLogSectionTitleName,
} from './styles';

import { Action, EntityType } from 'types/common/state/api/bulksheets';

interface BulksheetChangeLogSectionHeaderProps {
  entityType: EntityType;
  name: string;
  action: Action;
}

const getLabelForEntity = (entityType: EntityType) => {
  switch (entityType) {
    case 'CAMPAIGN':
      return i18n.t('I18N_CAMPAIGN', 'Campaign');
    case 'AD_SET':
      return i18n.t('I18N_AD_SET_SENTENCE_CASE', 'Ad set');
    case 'AD':
    default:
      return i18n.t('I18N_AD', 'Ad');
  }
};

const getIconComponentForEntity = (
  entityType: EntityType,
): React.ComponentType<React.ComponentProps<typeof Icon>> => {
  switch (entityType) {
    case 'CAMPAIGN':
      return IconPlaylistFolder;
    case 'AD_SET':
      return IconGridView;
    case 'AD':
    default:
      return IconInvite;
  }
};

// TODO: Add 'NEW' badge next to name for newly added entities
export const BulksheetChangeLogSectionHeader = ({
  entityType,
  name,
  action,
}: BulksheetChangeLogSectionHeaderProps) => {
  const entityLabel = getLabelForEntity(entityType);
  const EntityIconComponent = getIconComponentForEntity(entityType);

  return (
    <ChangeLogSectionTitle>
      <ChangeLogSectionTitleName>
        <Type
          as="h3"
          condensed
          variant={Type.body1}
          weight={Type.bold}
          semanticColor={semanticColors.textBase}
        >
          {name}
        </Type>
        {action === 'CREATE' && (
          <Type
            as="small"
            condensed
            variant={Type.cta4}
            semanticColor={semanticColors.textPositive}
          >
            {i18n.t('I18N_NEW', 'NEW')}
          </Type>
        )}
      </ChangeLogSectionTitleName>

      <ChangeLogSectionEntityLabel>
        <EntityIconComponent color={gray30} />
        <Type
          as="p"
          condensed
          variant={Type.body3}
          semanticColor={semanticColors.textSubdued}
        >
          {entityLabel}
        </Type>
      </ChangeLogSectionEntityLabel>
    </ChangeLogSectionTitle>
  );
};
