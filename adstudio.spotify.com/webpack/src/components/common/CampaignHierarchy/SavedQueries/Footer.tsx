import React from 'react';
import i18n from 'i18next';
import styled from 'styled-components';

import Can from '@spotify-internal/adstudio-shared/lib/components/CanWrapper';
import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';
import {
  ButtonPrimary,
  ButtonTertiary,
  cssColorValue,
  IconExclamationAlt,
  IconWithText,
  LoadingIndicator,
  semanticColors,
  spacer4,
  Tooltip,
  Type,
} from '@spotify-internal/encore-web';

import {
  DunderErrorResponse,
  DunderFetchError,
} from 'ducks/savedQueries/types';

import { ViewOptions } from './types';

const FooterContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.section`
  flex: 0 0 15.5rem;
  display: flex;
  justify-content: flex-end;
  > button {
    margin-left: 0;
  }
`;

const StatusContainer = styled.section`
  line-height: 3rem;
`;

const StyledFailureIconWithText = styled(IconWithText)`
  color: ${cssColorValue(semanticColors.essentialNegative)};
  height: 3rem;
  vertical-align: middle;
`;

// Necessary to render disabled tooltip for primary button
const ButtonTooltip = styled(Tooltip)`
  display: none;
  position: absolute;
  right: 3.5rem;
  bottom: -1.25rem;
`;

const PrimaryButtonWithTooltip = styled.section`
  flex: 0 0 19rem;
  &:hover ${ButtonTooltip} {
    display: block;
  }
`;

const PaddedPrimaryButton = styled(ButtonPrimary)`
  padding: 1rem 2rem;
  &:hover {
    cursor: pointer;
  }
`;

const PaddedTertiaryButton = styled(ButtonTertiary)`
  padding: 1rem 2rem;
  &:hover {
    cursor: pointer;
  }
`;

export const loadingIndicatorTestId = 'loading-saved-filters-request-indicator';
export const saveCurrentFiltersTestId = 'save-current-filters';
export const saveBtnTestId = 'save-button';
export const cancelBtnTestId = 'cancel-save-button';
export const createSavedFiltersErrorTxtTestId = 'create-error-text';
export const deleteSavedFiltersErrorTxtTestId = 'delete-error-text';
export const restoreSavedFiltersErrorTxtTestId = 'restore-error-text';
export const EXCEEDED_QUERY_LIMIT = 'SAVED_QUERY_LIMIT_EXCEEDED';
export const DEFAULT_MAX_SAVED_QUERIES = 200;

type FooterProps = {
  currentView: ViewOptions;
  updateView: (view: ViewOptions) => void;
  permissions: RolePermissions[];
  creating: boolean;
  createError?: DunderFetchError;
  deleting: boolean;
  deleteError?: DunderFetchError;
  formId: string;
  isDraftsTable: boolean;
  restoring: boolean;
  restoreError?: DunderFetchError;
};

export const Footer: React.FC<FooterProps> = ({
  currentView,
  updateView,
  permissions,
  creating,
  createError,
  deleting,
  deleteError,
  formId,
  isDraftsTable,
  restoring,
  restoreError,
}) => {
  const checkErrorMessage = (
    err: DunderErrorResponse | Error,
    messageCode: string,
  ): boolean => {
    if ((err as DunderErrorResponse)?.errorDetails) {
      const errorDetails = (err as DunderErrorResponse).errorDetails!;
      const errorMessageCode = errorDetails.details
        ? errorDetails.details[0].errorMessageCode
        : '';
      return errorMessageCode === messageCode;
    }
    return false;
  };

  const getMaximumFromErrorObject = (
    err: DunderErrorResponse | Error,
  ): string => {
    let max = DEFAULT_MAX_SAVED_QUERIES.toString();
    if ((err as DunderErrorResponse)?.errorDetails) {
      const errorDetails = (err as DunderErrorResponse).errorDetails!;
      max = errorDetails.details ? errorDetails.details[0].errorValues[0] : max;
    }
    return max;
  };

  return (
    <>
      {currentView === ViewOptions.VIEW && (
        <FooterContainer>
          <StatusContainer>
            {deleteError && !deleting && (
              <StyledFailureIconWithText
                data-test={deleteSavedFiltersErrorTxtTestId}
                spacer={spacer4}
                iconSize={16}
                icon={IconExclamationAlt}
              >
                <Type semanticColor={semanticColors.textNegative}>
                  {i18n.t(
                    'I18N_SAVED_FILTERS_DELETE_ERROR',
                    'Saved filter couldn’t be deleted.',
                  )}
                </Type>
              </StyledFailureIconWithText>
            )}
            {restoreError && !restoring && (
              <StyledFailureIconWithText
                data-test={restoreSavedFiltersErrorTxtTestId}
                spacer={spacer4}
                iconSize={16}
                icon={IconExclamationAlt}
              >
                <Type semanticColor={semanticColors.textNegative}>
                  {i18n.t(
                    'I18N_SAVED_FILTERS_RESTORE_ERROR',
                    "Filters couldn't be restored",
                  )}
                </Type>
              </StyledFailureIconWithText>
            )}
            {(restoring || deleting) && (
              <LoadingIndicator data-test={loadingIndicatorTestId} />
            )}
          </StatusContainer>
          <Can
            permissions={permissions}
            perform={[RolePermissions.CREATE_SAVED_QUERY]}
            yes={() => (
              <PrimaryButtonWithTooltip>
                <PaddedPrimaryButton
                  data-test={saveCurrentFiltersTestId}
                  buttonSize="md"
                  onClick={() => updateView(ViewOptions.CREATE)}
                  disabled={isDraftsTable}
                  buttonLegacy
                >
                  {i18n.t(
                    'I18N_SAVED_FILTERS_SAVE_CURRENT_FILTERS',
                    'Save current filters',
                  )}
                </PaddedPrimaryButton>
                {isDraftsTable && (
                  <ButtonTooltip>
                    {i18n.t(
                      'I18N_SAVED_FILTERS_UNAVAILABLE_DRAFTS',
                      'Unavailable for drafts table',
                    )}
                  </ButtonTooltip>
                )}
              </PrimaryButtonWithTooltip>
            )}
            no={() => <></>}
          />
        </FooterContainer>
      )}
      {currentView === ViewOptions.CREATE && (
        <Can
          permissions={permissions}
          perform={[RolePermissions.CREATE_SAVED_QUERY]}
          yes={() => (
            <FooterContainer>
              <StatusContainer>
                {createError && !creating && (
                  <StyledFailureIconWithText
                    data-test={createSavedFiltersErrorTxtTestId}
                    spacer={spacer4}
                    iconSize={16}
                    icon={IconExclamationAlt}
                  >
                    {checkErrorMessage(createError, EXCEEDED_QUERY_LIMIT) ? (
                      <Type semanticColor={semanticColors.textNegative}>
                        {i18n.t('I18N_SAVED_FILTERS_MAX_ERROR', {
                          max: getMaximumFromErrorObject(createError),
                          defaultValue: 'Maximum 200 saved filters created.',
                        })}
                      </Type>
                    ) : (
                      <Type semanticColor={semanticColors.textNegative}>
                        {i18n.t(
                          'I18N_SAVED_FILTERS_CREATE_ERROR',
                          "Filters couldn't be saved",
                        )}
                      </Type>
                    )}
                  </StyledFailureIconWithText>
                )}
                {creating && (
                  <LoadingIndicator data-test={loadingIndicatorTestId} />
                )}
              </StatusContainer>
              <ButtonContainer>
                <PaddedTertiaryButton
                  buttonSize="md"
                  onClick={() => updateView(ViewOptions.VIEW)}
                  disabled={creating}
                  data-test={cancelBtnTestId}
                  buttonLegacy
                >
                  {i18n.t('I18N_SAVED_FILTERS_CANCEL', 'Cancel')}
                </PaddedTertiaryButton>
                <PaddedPrimaryButton
                  buttonSize="md"
                  form={formId}
                  type="submit"
                  disabled={creating || isDraftsTable}
                  data-test={saveBtnTestId}
                  buttonLegacy
                >
                  {i18n.t('I18N_SAVED_FILTERS_SAVE', 'Save')}
                </PaddedPrimaryButton>
              </ButtonContainer>
            </FooterContainer>
          )}
          no={() => <></>}
        />
      )}
      {currentView === ViewOptions.EDIT && (
        <Can
          permissions={permissions}
          perform={[RolePermissions.EDIT_SAVED_QUERY]}
          yes={() => (
            <FooterContainer>
              <ButtonContainer>
                <PaddedTertiaryButton
                  buttonSize="md"
                  onClick={() => updateView(ViewOptions.VIEW)}
                  buttonLegacy
                >
                  {i18n.t('I18N_SAVED_FILTERS_CANCEL', 'Cancel')}
                </PaddedTertiaryButton>
                <PaddedPrimaryButton
                  buttonSize="md"
                  onClick={() => updateView(ViewOptions.VIEW)}
                  disabled={isDraftsTable}
                  buttonLegacy
                >
                  {i18n.t('I18N_SAVED_FILTERS_SAVE', 'Save')}
                </PaddedPrimaryButton>
              </ButtonContainer>
            </FooterContainer>
          )}
          no={() => <></>}
        />
      )}
    </>
  );
};
