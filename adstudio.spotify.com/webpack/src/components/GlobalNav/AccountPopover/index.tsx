import React, { MouseEvent, useState } from 'react';
import { Link } from 'react-router';
import i18n from 'i18next';
import styled from 'styled-components';

import {
  gray20,
  gray50,
  gray80,
  spacer12,
  spacer16,
  spacer24,
  spacer64,
  white,
} from '@spotify-internal/encore-foundation';
import {
  NavBar,
  NavBarList,
  NavBarListItem,
} from '@spotify-internal/encore-web';

import { AdAccountMetadata } from 'ducks/accounts/types';

import { GLOBAL_NAV_GA_CATEGORY } from '../GlobalNav';
import AccountPopoverList from './AccountPopoverList';

export enum AccountPaneEnum {
  ALL = 'all ad accounts',
  FREQUENT = 'most frequent',
}

const Container = styled.div`
  // Global styles get lost inside the react portal and so we need to
  // override the browser default of an a underline
  a {
    text-decoration: none !important;
  }
`;

// open issue with styled-components https://github.com/microsoft/TypeScript/issues/37597
const StyledNavBarList = styled(NavBarList as TSFixMe)`
  :first-child {
    margin-left: ${spacer24};
  }
`;

const StyledNavBarListItem = styled(NavBarListItem)`
  ${props => {
    return props.active ? `color: ${white};` : `color: ${gray50};`;
  }}
  cursor: pointer;
  font-size: ${spacer12};
  font-weight: 700;
  margin-left: ${spacer24};
  min-height: ${spacer64};
  line-height: ${spacer16};
  padding: ${spacer24} 0;
  &:hover {
    color: ${white};
  }
`;

const AccountPopoverFooter = styled.div`
  border-top: 1px solid ${gray20};
  padding: ${spacer24} 0;
  margin: 0 auto;
  text-align: center;
  color: ${gray80};
  font-size: 12px;
  &:hover {
    color: ${white};
  }
`;

export interface AdAccount {
  adAccountId: string;
  adAccountName: string;
  role: string;
  isOwner?: boolean;
  nickname?: string;
}

interface AccountPopoverProps {
  accounts: AdAccountMetadata[] | [];
  activeAccount: {
    id: string;
  };
  frequentAccounts: AdAccountMetadata[] | [];
  logUserAction: (userAction: GoogleAnalyticsEvent) => void;
  onClick: (e: MouseEvent) => void;
}

export default ({
  accounts,
  activeAccount,
  frequentAccounts,
  logUserAction,
  onClick,
}: AccountPopoverProps) => {
  const [selectedPane, changeSelectedPane] = useState(AccountPaneEnum.FREQUENT);
  const changePane = (e: MouseEvent, pane: AccountPaneEnum) => {
    logUserAction({
      category: GLOBAL_NAV_GA_CATEGORY,
      label: 'Acct_switcher_toggle_menu',
      params: {
        tab: pane,
      },
    });
    e.stopPropagation();
    changeSelectedPane(pane);
  };
  const showBothPanes = accounts.length > frequentAccounts.length;

  return (
    <Container data-test="account-switcher-navigation" id="account-switcher">
      {showBothPanes && (
        <NavBar>
          <StyledNavBarList>
            <StyledNavBarListItem
              active={selectedPane === AccountPaneEnum.FREQUENT}
              onClick={e => {
                changePane(e, AccountPaneEnum.FREQUENT);
              }}
              label={i18n.t(
                'I18N_ACC_HIERARCHY_LABEL_MOST_FREQUENT',
                'MOST FREQUENT',
              )}
            />
            <StyledNavBarListItem
              active={selectedPane === AccountPaneEnum.ALL}
              label={i18n.t(
                'I18N_ACC_HIERARCHY_LABEL_ALL_AD_ACCOUNTS',
                'ALL AD ACCOUNTS',
              )}
              onClick={e => {
                changePane(e, AccountPaneEnum.ALL);
              }}
            />
          </StyledNavBarList>
        </NavBar>
      )}
      {showBothPanes && (
        <AccountPopoverList
          data-test="account-switcher-navigation"
          accounts={frequentAccounts}
          activeAccount={activeAccount}
          logUserAction={logUserAction}
          pane={AccountPaneEnum.FREQUENT}
          selected={showBothPanes && selectedPane === AccountPaneEnum.FREQUENT}
        />
      )}
      <AccountPopoverList
        accounts={accounts}
        activeAccount={activeAccount}
        logUserAction={logUserAction}
        pane={AccountPaneEnum.ALL}
        selected={!showBothPanes || selectedPane === AccountPaneEnum.ALL}
      />
      <Link
        to="/account-management"
        onClick={e => {
          logUserAction({
            category: GLOBAL_NAV_GA_CATEGORY,
            label: 'Acct_switcher_hub_link',
          });
          onClick(e);
        }}
      >
        <AccountPopoverFooter>
          {i18n.t('I18N_MANAGE_AD_ACCOUNTS', 'Manage Ad Accounts')}
        </AccountPopoverFooter>
      </Link>
    </Container>
  );
};
