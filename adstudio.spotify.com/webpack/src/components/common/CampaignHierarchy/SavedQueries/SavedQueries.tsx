import React, { useEffect, useRef, useState } from 'react';
import i18n from 'i18next';
import styled from 'styled-components';

import Can from '@spotify-internal/adstudio-shared/lib/components/CanWrapper';
import { RolePermissions } from '@spotify-internal/adstudio-shared/lib/config/permissions';
import {
  black,
  CollapseButton,
  DialogAlert,
  DialogConfirmation,
  IconExclamationAlt,
  LoadingIndicator,
  OverlayTrigger,
  semanticColors,
  Tag,
  Type,
} from '@spotify-internal/encore-web';

import { DunderFetchError } from 'ducks/savedQueries/types';

import { AuthContextConsumer } from 'components/common/AuthorizationContext';

import { DialogBody } from './DialogBody';
import { Footer } from './Footer';

import { ViewOptions } from './types';
import { SavedQuery } from 'types/common/state/api/savedQueries';

export type OwnProps = {
  isDraftsTable: boolean;
};

export type StateProps = {
  iamDomain: string;
  savedQueries: SavedQuery[] | null | undefined;
  nextPageToken?: string | null;
  loading: boolean;
  error?: DunderFetchError;
  currentIamDomain: string;
  isOpen: boolean;
  currentSelection: {
    uuid: string;
    params: string;
    campaignIds: string[];
    flightIds: string[];
  };
  accountId: string;
  currentRouteParams: string;
  currentLocationKey: string;
  creating: boolean;
  createSuccess: boolean;
  createError?: DunderFetchError;
  recentlyCreated?: string;
  recentlyDeleted: string[];
  deleting: boolean;
  deleteError?: DunderFetchError;
  restoring: boolean;
  restoreError?: DunderFetchError;
  showNewTag: boolean;
  selectedCampaigns: string[];
  selectedFlights: string[];
};

export type DispatchProps = {
  getSavedQueries: (iamDomain: string) => void;
  logUserAction: (userAction: TSFixMe) => void;
  toggleSavedQueries: (isOpen: boolean) => void;
  selectSavedQuery: (
    uuid: string,
    params: string,
    campaignIds: string[],
    flightIds: string[],
  ) => void;
  createSavedQuery: (savedQuery: SavedQuery, params: string) => void;
  clearRecentlyCreated: () => void;
  deleteSavedQuery: (uuid: string, iamDomain: string) => void;
  restoreSavedQuery: (uuid: string, iamDomain: string) => void;
  fetchUserHasSeenSavedQueries: () => void;
  selectFromSavedFilter: (payload: {
    campaignIds: string[];
    flightIds: string[];
  }) => void;
};

export type SavedQueriesProps = OwnProps & StateProps & DispatchProps;

// z-index ensures the saved queries are behind the account pop up and onboarding dialogs
const StyledOverlayTrigger = styled(OverlayTrigger)`
  > div {
    right: 25%;
    top: 60%;
    z-index: 1000;
  }
`;

const StyledCollapseButton = styled(CollapseButton)`
  padding: 1rem;
  margin-left: 1rem;
`;

// This is necessary to prevent the table tooltips from showing underneath the overlay
const StyledDialogConfirmation = styled(DialogConfirmation)`
  pointer-events: auto;
  max-width: 32.75rem;
  min-height: 14rem;
  padding: 0.5rem 0.25rem;
`;

// This is necessary to prevent the table tooltips from showing underneath the overlay
const StyledDialogAlert = styled(DialogAlert)`
  pointer-events: auto;
  max-width: 32.75rem;
  width: 32.75rem;
  min-height: 14rem;
  padding: 1.5rem;
`;

const Centered = styled.div`
  margin: auto;
  text-align: center;
`;

const StyledTitle = styled(Type)`
  font-size: 1.5rem;
  font-weight: bold;
  padding-bottom: 1rem;
`;

const StyledTag = styled(Tag)`
  color: ${black};
  height: 24px;
  margin-top: 14px;
  margin-left: 1em;
`;

export const saveFiltersTitles = {
  default: i18n.t('I18N_SAVED_FILTERS_TITLE', 'Saved filters'),
  noFiltersTitle: i18n.t(
    'I18N_SAVED_FILTERS_NO_SAVED_FILTERS',
    "You haven't saved any filters yet",
  ),
  saveCurrentTitle: i18n.t(
    'I18N_SAVED_FILTERS_SAVE_CURRENT_FILTERS',
    'Save current filters',
  ),
  editSavedTitle: i18n.t(
    'I18N_SAVED_FILTERS_EDIT_SAVED_FILTERS',
    'Edit saved filter',
  ),
};

export const spinnerTestId = 'loading-saved-filters-spinner';
export const errorTestId = 'error-saved-filters';
export const newTagTestId = 'new-tag';
export const savedFiltersModalBtn = 'saved-filters-modal-btn';
const IconExclamationAltString = 'IconExclamationAlt';
const CreateFormId = 'create-form';

export const SavedQueries: React.FC<SavedQueriesProps> = ({
  isDraftsTable,
  savedQueries,
  iamDomain,
  loading,
  error,
  currentIamDomain,
  isOpen,
  currentSelection,
  accountId,
  currentRouteParams,
  currentLocationKey,
  creating,
  createSuccess,
  createError,
  recentlyCreated,
  recentlyDeleted,
  deleting,
  deleteError,
  restoring,
  restoreError,
  showNewTag,
  getSavedQueries,
  toggleSavedQueries,
  selectSavedQuery,
  createSavedQuery,
  clearRecentlyCreated,
  deleteSavedQuery,
  restoreSavedQuery,
  fetchUserHasSeenSavedQueries,
  selectedCampaigns,
  selectedFlights,
  selectFromSavedFilter,
}: SavedQueriesProps) => {
  const [currentView, setCurrentView] = useState<ViewOptions>(ViewOptions.VIEW);
  const savedFiltersRef = useRef<HTMLElement | null>(null);
  const savedFiltersBtnRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    fetchUserHasSeenSavedQueries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (iamDomain && isOpen) {
      // If the user switches accounts, make a new saved queries call
      if (iamDomain !== currentIamDomain) {
        getSavedQueries(iamDomain);
        // Otherwise only make the call if they do not have any saved queries loaded
      } else if (!savedQueries || savedQueries?.length === 0) {
        getSavedQueries(iamDomain);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iamDomain, isOpen]);

  useEffect(() => {
    const clickOutsideSavedFilters = (e: MouseEvent) => {
      // If the user did not click inside the modal and also did not click on the Saved Filters button, close the modal
      if (
        isOpen &&
        savedFiltersRef.current &&
        !savedFiltersRef.current.contains(e.target as any) &&
        savedFiltersBtnRef.current &&
        !savedFiltersBtnRef.current.contains(e.target as any)
      ) {
        toggleSavedQueries(false);
      }
    };
    document.addEventListener('mousedown', clickOutsideSavedFilters);
    return () =>
      document.removeEventListener('mousedown', clickOutsideSavedFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const setTimerToClearRecentlyCreated = () => {
    setTimeout(() => {
      clearRecentlyCreated();
    }, 5000);
  };

  useEffect(() => {
    if (createSuccess) {
      setCurrentView(ViewOptions.VIEW);
      if (iamDomain) getSavedQueries(iamDomain);
      setTimerToClearRecentlyCreated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createSuccess]);

  const dialogTitle = () => {
    let title = saveFiltersTitles.default;
    switch (currentView) {
      case ViewOptions.VIEW:
        if (savedQueries && savedQueries.length === 0) {
          title = saveFiltersTitles.noFiltersTitle;
        } else {
          const privateQueries = savedQueries?.filter(q => !q.isPublic) || [];
          if (privateQueries.length === 0) {
            title = saveFiltersTitles.noFiltersTitle;
          }
        }
        break;
      case ViewOptions.CREATE:
        title = saveFiltersTitles.saveCurrentTitle;
        break;
      case ViewOptions.EDIT:
        title = saveFiltersTitles.editSavedTitle;
        break;
    }
    return title;
  };

  return (
    <AuthContextConsumer>
      {permissions => (
        <StyledOverlayTrigger
          placement={OverlayTrigger.bottomLeft}
          overlay={
            isOpen && (
              <section ref={savedFiltersRef}>
                {!savedQueries || loading || error ? (
                  <StyledDialogAlert
                    aria-label={dialogTitle()}
                    aria-describedby="savedQueriesPendingDialogBody"
                    dialogTitle={
                      <StyledTitle>{saveFiltersTitles.default}</StyledTitle>
                    }
                    body={
                      <Centered>
                        {(!savedQueries || loading) && !error && (
                          <LoadingIndicator data-test={spinnerTestId} />
                        )}
                        {!loading && error && (
                          <>
                            <IconExclamationAlt
                              aria-label={IconExclamationAltString}
                              iconSize={32}
                              semanticColor={semanticColors.textNegative}
                            />
                            <Type
                              as="p"
                              semanticColor={semanticColors.textNegative}
                              data-test={errorTestId}
                            >
                              {i18n.t(
                                'I18N_SAVED_FILTERS_ERROR',
                                "Something went wrong. Your saved filters couldn't be loaded.",
                              )}
                            </Type>
                          </>
                        )}
                      </Centered>
                    }
                  />
                ) : (
                  <StyledDialogConfirmation
                    aria-label={dialogTitle()}
                    aria-describedby="savedQueriesDialogBody"
                    dialogTitle={<StyledTitle>{dialogTitle()}</StyledTitle>}
                    body={
                      <DialogBody
                        currentView={currentView}
                        CreateFormId={CreateFormId}
                        iamDomain={iamDomain}
                        createSavedQuery={createSavedQuery}
                        queries={savedQueries || []}
                        accountId={accountId}
                        selectSavedQuery={selectSavedQuery}
                        currentRouteParams={currentRouteParams}
                        currentLocationKey={currentLocationKey}
                        currentSelection={currentSelection}
                        recentlyCreated={recentlyCreated}
                        recentlyDeleted={recentlyDeleted}
                        permissions={permissions}
                        deleteSavedQuery={deleteSavedQuery}
                        restoreSavedQuery={restoreSavedQuery}
                        restoring={restoring}
                        deleting={deleting}
                        selectedCampaigns={selectedCampaigns}
                        selectedFlights={selectedFlights}
                        selectFromSavedFilter={selectFromSavedFilter}
                      />
                    }
                    footer={
                      <Footer
                        currentView={currentView}
                        updateView={setCurrentView}
                        permissions={permissions}
                        creating={creating}
                        createError={createError}
                        deleting={deleting}
                        deleteError={deleteError}
                        formId={CreateFormId}
                        isDraftsTable={isDraftsTable}
                        restoring={restoring}
                        restoreError={restoreError}
                      />
                    }
                  />
                )}
              </section>
            )
          }
        >
          <Can
            permissions={permissions}
            perform={[RolePermissions.GET_SAVED_QUERY]}
            yes={() => (
              <section ref={savedFiltersBtnRef}>
                <StyledCollapseButton
                  data-test={savedFiltersModalBtn}
                  expanded={isOpen}
                  onClick={() => toggleSavedQueries(!isOpen)}
                  semanticColor={semanticColors.textSubdued}
                  buttonLegacy
                >
                  {i18n.t('I18N_SAVED_FILTERS_TITLE', 'Saved filters')}
                </StyledCollapseButton>
                {showNewTag && (
                  <StyledTag data-test={newTagTestId} colorSet="positive">
                    {i18n.t('I18N_NEW', 'NEW')}
                  </StyledTag>
                )}
              </section>
            )}
            no={() => <></>}
          />
        </StyledOverlayTrigger>
      )}
    </AuthContextConsumer>
  );
};
