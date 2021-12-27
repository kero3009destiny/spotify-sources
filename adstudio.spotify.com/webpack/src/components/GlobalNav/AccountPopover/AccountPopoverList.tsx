import React from 'react';
import styled from 'styled-components';

import {
  black,
  gray20,
  spacer4,
  spacer24,
} from '@spotify-internal/encore-foundation';

import { AdAccountMetadata } from 'ducks/accounts/types';

import AccountListItemPopover from './AccountPopoverListItem';
import { AccountPaneEnum } from './index';

const AccountList = styled.div`
  ${(props: TSFixMe) => (props.selected ? `display: block;` : `display: none;`)}
  max-height: 302px;
  padding: ${spacer4} ${spacer24} 0 ${spacer24};
  padding-bottom: 0;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: ${black};
  }
  ::-webkit-scrollbar-thumb {
    background: ${gray20};
  }
  scrollbar-color: ${gray20} ${black};
`;

interface AccountPopoverListProps {
  accounts: AdAccountMetadata[] | [];
  activeAccount: {
    id: string;
  };
  logUserAction: (userAction: GoogleAnalyticsEvent) => void;
  pane: AccountPaneEnum;
  selected?: boolean;
}

export default ({
  accounts = [],
  activeAccount,
  logUserAction,
  pane,
  selected,
}: AccountPopoverListProps) => (
  // @ts-ignore
  <AccountList selected={selected}>
    {// @ts-ignore
    accounts.map((account: TSFixMe) => (
      // @ts-ignore - the extra props come thru HOC
      <AccountListItemPopover
        account={account}
        isActive={account.adAccountId === activeAccount.id}
        logUserAction={logUserAction}
        pane={pane}
      />
    ))}
  </AccountList>
);
