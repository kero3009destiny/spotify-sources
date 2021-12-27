import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import i18n from 'i18next';
import { get } from 'lodash';
import styled from 'styled-components';

import {
  gray15,
  gray50,
  gray80,
  spacer8,
  spacer16,
  white,
} from '@spotify-internal/encore-foundation';

import { changeAccount as changeAccountAC } from 'ducks/account/actions';

import AccountBadge from 'components/common/AccountBadge';

import { mapI18N } from 'utils/i18nHelpers';

import { GLOBAL_NAV_GA_CATEGORY } from '../GlobalNav';
import { AccountPaneEnum, AdAccount } from './index';

import { routeFragmentRegEx, routes } from 'config/routes';

const AccountNameDiv = styled.div`
  display: flex;
  width: 200px;
`;

const AccountName = styled.p`
  flex: 0 1 auto;
  font-size: 14px;
  margin: 0;
  padding-bottom: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre;
`;

const AccountNickname = styled.p`
  flex: 0 0 auto;
  font-size: 10px;
  margin: 0 0 0 4px;
  padding-bottom: 0;
`;

const AccountRole = styled.p`
  margin: 0;
  padding-bottom: 0;
  text-transform: capitalize;
  font-size: 10px;
`;

const AccountContainer = styled.li<{ active: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 48px auto;
  grid-template-rows: auto auto;
  align-items: center;
  height: 72px;
  border-radius: ${spacer8};
  padding: ${spacer16};
  margin: 2px 0;

  ${AccountName} {
    color: ${gray80};
  }
  ${AccountNickname} {
    color: ${gray80};
  }
  ${AccountRole} {
    color: ${gray50};
  }

  &:hover {
    background-color: #535353;
    ${/* sc-selector */ AccountName},
    ${/* sc-selector */ AccountNickname},
    ${/* sc-selector */ AccountRole} {
      color: ${gray80};
    }
  }
  &:active {
    background-color: ${gray15};
  }

  ${props =>
    props.active &&
    `
    ${AccountName},
    ${AccountNickname},
    ${AccountRole} {
      color: ${white};
    }
    &:hover {
      ${AccountName},
      ${AccountNickname},
      ${AccountRole} {
        color: ${white};
      }
    }
  `}
`;

const StyledAccountBadge = styled(AccountBadge)`
  grid-row: 1 / span 2;
  grid-column: 1 /1;
`;

interface ListItemProps {
  account: AdAccount;
  isActive: boolean;
  changeAccount: (adAccountId: string) => void;
  logUserAction: (userAction: GoogleAnalyticsEvent) => void;
  pane: AccountPaneEnum;
  redirect: (target: string) => void;
}

export const AccountPopoverListItem = ({
  account,
  changeAccount,
  isActive,
  logUserAction,
  pane,
  redirect,
}: ListItemProps) => {
  const target = routes.CAMPAIGN_CATALOGUE.replace(
    routeFragmentRegEx.ACCOUNT_ID,
    account.adAccountId,
  );

  const doAccountChange = () => {
    logUserAction({
      category: GLOBAL_NAV_GA_CATEGORY,
      label: 'Acct_switcher_select_acct',
      params: {
        tab: pane,
        ad_account_id: account.adAccountId,
      },
    });

    changeAccount(account.adAccountId);
    redirect(target);
  };

  const accountRole = mapI18N(
    account.role.toUpperCase(),
    '',
    'I18N_ACCOUNT_ROLE',
  );

  const accountName = account.nickname
    ? account.nickname
    : account.adAccountName;
  const nickname = account.nickname ? `(${account.adAccountName})` : '';

  return (
    <Link onClick={doAccountChange} to={target}>
      <AccountContainer
        active={isActive}
        data-test={`account-list-item-${account.adAccountId}`}
      >
        <StyledAccountBadge
          account={account.adAccountId}
          width="40px"
          height="40px"
        >
          {get(account, 'adAccountName[0]', '').toUpperCase()}
        </StyledAccountBadge>
        <AccountNameDiv>
          <AccountName>{accountName}</AccountName>
          <AccountNickname>{nickname}</AccountNickname>
        </AccountNameDiv>
        <AccountRole>
          {account.isOwner
            ? i18n.t('I18N_ROLE_ADMIN_OWNER', 'Admin (owner)')
            : accountRole}
        </AccountRole>
      </AccountContainer>
    </Link>
  );
};

const mapDispatchToProps = (dispatch: TSFixMe) => ({
  redirect: (target: string) => dispatch(push(target)),
  changeAccount: (adAccountId: string) =>
    dispatch(changeAccountAC(adAccountId)),
});

export default connect(null, mapDispatchToProps)(AccountPopoverListItem);
