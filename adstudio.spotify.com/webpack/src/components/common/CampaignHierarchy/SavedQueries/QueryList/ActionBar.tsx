import React from 'react';
import i18n from 'i18next';
import styled from 'styled-components';

import Can from '@spotify-internal/adstudio-shared/lib/components/CanWrapper';
import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';
import { plum } from '@spotify-internal/adstudio-tape/lib/styles/tokens';
import {
  ButtonTertiary,
  cssColorValue,
  IconCheckAlt,
  IconDelete,
  IconRefresh,
  IconWithText,
  semanticColors,
  spacer4,
  Type,
} from '@spotify-internal/encore-web';

import { SavedQueryWithUrl } from '../types';

const StyledSuccessIconWithText = styled(IconWithText)`
  color: ${cssColorValue(semanticColors.textPositive)};
  height: 3rem;
  vertical-align: middle;
`;

const StyledButtonWithIcon = styled(ButtonTertiary)`
  height: 3rem;
  vertical-align: middle;

  &:hover {
    color: ${plum};
    cursor: pointer;
  }
`;

export const ActionButtonContainer = styled.div`
  display: none;
`;

export const FlippedIcon = styled(IconWithText)`
  > svg {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }
`;

export const savedBadgeId = 'saved-badge-id';
export const deleteButtonId = 'delete-saved-query-btn';
export const restoreButtonId = 'restore-saved-query-btn';

const SavedBadge = () => {
  return (
    <StyledSuccessIconWithText
      data-test={savedBadgeId}
      spacer={spacer4}
      icon={IconCheckAlt}
      iconSize={16}
    >
      <Type semanticColor={semanticColors.textPositive}>
        {i18n.t('I18N_SAVED', 'Saved')}
      </Type>
    </StyledSuccessIconWithText>
  );
};

type ActionBarProps = {
  recentlyCreated?: string;
  savedQuery: SavedQueryWithUrl;
  recentlyDeleted: string[];
  permissions: RolePermissions[];
  deleteSavedQuery: (uuid: string, iamDomain: string) => void;
  restoreSavedQuery: (uuid: string, iamDomain: string) => void;
  deleting: boolean;
  restoring: boolean;
};

export const ActionBar: React.FC<ActionBarProps> = ({
  recentlyCreated,
  savedQuery,
  recentlyDeleted,
  permissions,
  deleteSavedQuery,
  restoreSavedQuery,
  deleting,
  restoring,
}) => {
  return (
    <div>
      {recentlyCreated === savedQuery.uuid ? (
        <SavedBadge />
      ) : (
        <ActionButtonContainer>
          {recentlyDeleted.includes(savedQuery.uuid || '') ? (
            <Can
              permissions={permissions}
              perform={[RolePermissions.CREATE_SAVED_QUERY]}
              yes={() => (
                <StyledButtonWithIcon
                  buttonSize="sm"
                  condensed
                  onClick={() =>
                    savedQuery.uuid &&
                    savedQuery.iamDomain &&
                    restoreSavedQuery(savedQuery.uuid, savedQuery.iamDomain)
                  }
                  disabled={restoring}
                  buttonLegacy
                >
                  <FlippedIcon
                    spacer={spacer4}
                    icon={IconRefresh}
                    iconSize={16}
                  >
                    <Type>{i18n.t('I18N_RESTORE', 'Restore')}</Type>
                  </FlippedIcon>
                </StyledButtonWithIcon>
              )}
              no={() => <></>}
            />
          ) : (
            <Can
              permissions={permissions}
              perform={[RolePermissions.DELETE_SAVED_QUERY]}
              yes={() => (
                <StyledButtonWithIcon
                  data-test={deleteButtonId}
                  buttonSize="sm"
                  condensed
                  onClick={() =>
                    savedQuery.uuid &&
                    savedQuery.iamDomain &&
                    deleteSavedQuery(savedQuery.uuid, savedQuery.iamDomain)
                  }
                  disabled={deleting}
                  buttonLegacy
                >
                  <IconWithText
                    spacer={spacer4}
                    icon={IconDelete}
                    iconSize={16}
                  >
                    <Type>{i18n.t('I18N_DELETE', 'Delete')}</Type>
                  </IconWithText>
                </StyledButtonWithIcon>
              )}
              no={() => <></>}
            />
          )}
        </ActionButtonContainer>
      )}
    </div>
  );
};
