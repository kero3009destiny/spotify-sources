import React from 'react';
import i18n from 'i18next';
import styled from 'styled-components';

import { ButtonPrimary } from '@spotify-internal/adstudio-shared/lib/components/CustomEncore';
import { Backdrop, IconX, Type } from '@spotify-internal/encore-web';

// Todo: Move this somewhere shared
import { CloseButton } from '../OnboardingModal/Main';
import AddressImg from './AddressImg';

const ModalBody = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 800px;
  height: 655px;
  background: white;

  padding: 110px 80px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

export interface AddressCollectionAnnouncementProps {
  onClickEdit: () => void;
  onClickExit: () => void;
  hasCampaigns: boolean;
  hasVat: boolean;
  hasBusinessAddress: boolean;
  displayNameVAT: string;
}

const AddressCollectionAnnouncement = ({
  onClickEdit,
  onClickExit,
  hasCampaigns,
  hasVat,
  hasBusinessAddress,
  displayNameVAT,
}: AddressCollectionAnnouncementProps) => {
  let copy;
  if (!hasCampaigns)
    copy = i18n.t(
      'I18N_ADS_COMPLIANCE_MODAL_MESSAGE_NEW_USER_TAX',
      'To create your first ad, please complete your account registration by entering a business address and {{displayNameVAT}} to your ad account.',
      { displayNameVAT },
    );
  else if (!hasVat && !hasBusinessAddress) {
    copy = i18n.t(
      'I18N_ADS_COMPLIANCE_MODAL_MESSAGE_TAX',
      'To create your next campaign, please enter a business address and {{displayNameVAT}} to your ad account.',
      { displayNameVAT },
    );
  } else if (!hasVat) {
    copy = i18n.t(
      'I18N_ADS_COMPLIANCE_MODAL_MESSAGE_TAX_ONLY',
      'To create your next campaign, please enter a {{displayNameVAT}} to your ad account.',
      { displayNameVAT },
    );
  } else if (!hasBusinessAddress) {
    copy = i18n.t(
      'I18N_ADS_COMPLIANCE_MODAL_MESSAGE',
      'To create your next campaign, please complete your account registration by entering a business address to your ad account. ',
    );
  }

  return (
    <Backdrop center data-test="address-collection-announcement-modal">
      <ModalBody>
        <CloseButton onClick={onClickExit} data-test="address-collection-x">
          <IconX />
        </CloseButton>
        <AddressImg />
        <Type.h1 variant={Type.heading1} condensed>
          {i18n.t(
            'I18N_ADS_COMPLIANCE_MODAL_TITLE',
            'Complete your account registration',
          )}
        </Type.h1>
        <Type as="p" variant={Type.body1} condensed>
          {copy}
        </Type>
        <ButtonPrimary
          onClick={onClickEdit}
          buttonSize="lg"
          data-test="address-collection-edit"
          buttonLegacy
        >
          {i18n.t('I18N_EDIT_AD_ACCOUNT', 'Edit Ad Account')}
        </ButtonPrimary>
      </ModalBody>
    </Backdrop>
  );
};

export default AddressCollectionAnnouncement;
