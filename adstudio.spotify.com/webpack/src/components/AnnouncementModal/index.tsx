import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import i18n from 'i18next';
import { compose } from 'recompose';

import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';
import {
  getHasNewFeatureBeenShown as getHasNewFeatureBeenShownAC,
  setNewFeatureShown as setNewFeatureShownAC,
} from 'ducks/newFeatures/actions';
import {
  accountNeedsVAT as getAccountNeedsVAT,
  getAccount,
  getAccountId,
  getVatDisplayName,
  isAdmin,
  isContributor,
  videoCPCLIsEnabledForAccountCountry,
} from 'ducks/account/selectors';
import { isCampaignsCatalogueEmpty as isCampaignsCatalogueEmptySelector } from 'ducks/campaigns/selectors';
import { hasUserSeenNewFeature } from 'ducks/newFeatures/selectors';
import { AppState, shouldShowOnboarding } from 'ducks/onboarding/selectors';

import { AccountAddress } from 'api/account';

import AddressCollectionAnnouncement from './AddressCollectionAnnouncement';
import VideoAnnouncement from './VideoAnnouncement';

import {
  ADDRESS_COLLECTION_MODAL,
  VIDEO_ANNOUNCEMENT_MODAL,
} from 'ducks/newFeatures/constants';
import { routeFragmentLiterals, routes } from 'config/routes';

export interface AnnouncementModalPropTypes {
  setNewFeatureShown: (feature: string) => void;
  getHasNewFeatureBeenShown: (feature: string) => void;
  pushRoute: (route: string) => void;
  logUserAction: (userAction: GoogleAnalyticsEvent) => void;
  account: TSFixMe;
  isCampaignsCatalogueEmpty: boolean;
  hasSeenAddressAnnouncement: boolean;
  isRelevantRole: boolean;
  isOtherOnboardingActive: boolean;
  addressLink: string;
  displayNameVAT: string;
  accountNeedsVAT: boolean;
  videoCPCLRollout: boolean;
  hasSeenVideoAnnouncement: boolean;
}

const businessAddressExists = (addressObject?: AccountAddress) => {
  // Returns false if it's passed an undefined
  if (addressObject === undefined) return false;

  // Returns true if any fields are not empty.
  return Object.values(addressObject).some(value => value !== '');
};

export const AnnouncementModalStateless = ({
  setNewFeatureShown,
  getHasNewFeatureBeenShown,
  pushRoute,
  logUserAction,
  isCampaignsCatalogueEmpty,
  account,
  isOtherOnboardingActive,
  hasSeenAddressAnnouncement,
  isRelevantRole,
  addressLink,
  displayNameVAT,
  accountNeedsVAT,
  videoCPCLRollout,
  hasSeenVideoAnnouncement,
}: AnnouncementModalPropTypes): JSX.Element | null => {
  /* Modify localstorage props accordingly to hide/show the modal  */
  useEffect(() => {
    // Check if address modal has been shown yet, and propagate it to the state.
    getHasNewFeatureBeenShown(ADDRESS_COLLECTION_MODAL);

    // If there is another onboarding (either the classic experience or the acct hierarchy), mark announcement modal "shown" so it never shows up.
    if (isOtherOnboardingActive) setNewFeatureShown(ADDRESS_COLLECTION_MODAL);

    if (videoCPCLRollout) {
      // Check if video modal has been shown yet, and propagate it to the state.
      getHasNewFeatureBeenShown(VIDEO_ANNOUNCEMENT_MODAL);

      // If there is another onboarding (either the classic experience or the acct hierarchy), mark video modal as "shown" so it never shows up.
      if (isOtherOnboardingActive) setNewFeatureShown(VIDEO_ANNOUNCEMENT_MODAL);
    }
  }, [
    isOtherOnboardingActive,
    getHasNewFeatureBeenShown,
    setNewFeatureShown,
    videoCPCLRollout,
  ]);

  const onVideoModalClickLearnMore = useCallback(() => {
    logUserAction({
      label: 'learn_more',
      category: 'Video announcement modal',
    });
    window.open(
      'https://go.pardot.com/l/52662/2021-03-17/ky4gff/52662/1615994140KZ4EiKzo/SAS_Video_GTM_SpecSheet_11232020.pdf',
      '_blank',
    );
  }, [logUserAction]);

  const onVideoModalClickCreateAd = useCallback(() => {
    logUserAction({
      label: 'create_ad',
      category: 'Video announcement modal',
    });
    setNewFeatureShown(VIDEO_ANNOUNCEMENT_MODAL);
    pushRoute(routes.BUILD_CAMPAIGN);
  }, [logUserAction, setNewFeatureShown, pushRoute]);

  const onVideoModalClickExit = useCallback(() => {
    logUserAction({
      label: 'exit_button',
      category: 'Video announcement modal',
    });
    setNewFeatureShown(VIDEO_ANNOUNCEMENT_MODAL);
  }, [logUserAction, setNewFeatureShown]);

  const onAddressModalClickExit = useCallback(() => {
    logUserAction({
      label: 'exit_button',
      category: 'Address collection announcement modal',
    });
    setNewFeatureShown(ADDRESS_COLLECTION_MODAL);
  }, [logUserAction, setNewFeatureShown]);

  const onAddressModalClickEdit = useCallback(() => {
    logUserAction({
      label: 'edit_button',
      category: 'Address collection announcement modal',
    });
    setNewFeatureShown(ADDRESS_COLLECTION_MODAL);
    pushRoute(addressLink);
  }, [pushRoute, logUserAction, addressLink, setNewFeatureShown]);

  const hasVat = !accountNeedsVAT || account.vat !== '';
  const hasBusinessAddress = businessAddressExists(account.businessAddress);
  const accountIsComplete = hasVat && hasBusinessAddress;

  const showVideoModal =
    (videoCPCLRollout && isRelevantRole && !hasSeenVideoAnnouncement) ||
    (window.location.search.includes('video_modal_test=true') &&
      !window.location.search.includes('address_modal_test=true'));

  const showAddressModal =
    (isRelevantRole && !hasSeenAddressAnnouncement && !accountIsComplete) ||
    window.location.search.includes('address_modal_test=true');

  // If the user can see both modals, display the address announcement first
  if (showAddressModal)
    return (
      <AddressCollectionAnnouncement
        onClickExit={onAddressModalClickExit}
        onClickEdit={onAddressModalClickEdit}
        hasVat={hasVat}
        hasBusinessAddress={hasBusinessAddress}
        hasCampaigns={!isCampaignsCatalogueEmpty}
        displayNameVAT={displayNameVAT}
      />
    );

  if (showVideoModal)
    return (
      <VideoAnnouncement
        onClickLearnMore={onVideoModalClickLearnMore}
        onClickCreateAd={onVideoModalClickCreateAd}
        onClickExit={onVideoModalClickExit}
      />
    );

  return null;
};

function mapStateToProps(state: AppState) {
  const { key, defaultValue } = getVatDisplayName(state);
  const displayNameVAT = i18n.t(key, defaultValue);

  return {
    account: getAccount(state),
    isOtherOnboardingActive: shouldShowOnboarding(state as AppState),
    isCampaignsCatalogueEmpty: isCampaignsCatalogueEmptySelector(
      state as AppState,
    ),
    hasSeenVideoAnnouncement: hasUserSeenNewFeature(
      state,
      VIDEO_ANNOUNCEMENT_MODAL,
    ),
    hasSeenAddressAnnouncement: hasUserSeenNewFeature(
      state,
      ADDRESS_COLLECTION_MODAL,
    ),
    isRelevantRole: isAdmin(state) || isContributor(state),
    addressLink: routes.ACCOUNT_ADDRESS.replace(
      routeFragmentLiterals.ACCOUNT_ID,
      getAccountId(state),
    ),
    displayNameVAT,
    accountNeedsVAT: getAccountNeedsVAT(state),
    // only show video announcement modal to active audio countries when video adstudio_video_cpcl_enabled flag is true
    videoCPCLRollout: videoCPCLIsEnabledForAccountCountry(state),
  };
}

const dispatchers = {
  setNewFeatureShown: setNewFeatureShownAC,
  getHasNewFeatureBeenShown: getHasNewFeatureBeenShownAC,
  pushRoute: routerActions.push,
  logUserAction: logUserActionAC,
};

export default compose<AnnouncementModalPropTypes, {}>(
  connect(mapStateToProps, dispatchers),
)(AnnouncementModalStateless);
