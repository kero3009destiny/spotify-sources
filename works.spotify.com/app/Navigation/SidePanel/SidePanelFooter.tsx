import { NavLink } from 'react-router-dom';
import { TransitionValue, useTransition } from 'react-use-transition';
import styled, { css } from 'styled-components';
import {
  IconArrowRight,
  IconChevronDown,
  IconChevronUp,
  IconHeartAlt,
  IconGears,
  IconHelpAlt,
  IconMessages,
} from '@spotify-internal/encore-web';
import { BadgeWithText } from 'components/Badge';
import { useViewport, Viewport } from 'libs/utils/useViewport';
import { useCurrentUser } from 'libs/services/s4p';
import { generalFeedbackLink } from 'libs/utils/externalUrls';
import {
  UserControlsToggle,
  UserItem,
  UserLink,
  UserLinkTitle,
  UserControlsList,
} from 'components/SidePanel';
import { useSidePanel, hideUserControls, showUserControls } from './SidePanelState';
import gTagManager from 'libs/services/logging';

type UserControlsListWrapperProps = {
  listHeight: number;
  transitionState: TransitionValue;
};

const transition = {
  entering: css`
    margin-bottom: 0;
    visibility: visible;
    transition: margin-bottom 0.1s ease-in;
  `,

  entered: css`
    margin-bottom: 0;
    visibility: visible;
  `,

  exiting: css`
    margin-bottom: -${(props: UserControlsListWrapperProps) => props.listHeight}px;
    visibility: hidden;
    transition: margin-bottom 0.1s ease-in;
  `,

  exited: css`
    margin-bottom: -${(props: UserControlsListWrapperProps) => props.listHeight}px;
    visibility: hidden;
  `,
};

const UserControlsListWrapper = styled.div<UserControlsListWrapperProps>`
  overflow: auto;
  ${({ transitionState }) => transition[transitionState]}
`;

const UserControlsBadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  width: 100%;
  height: 100%;
`;

const StyledUserLink = styled(UserLink)`
  text-decoration: none;
`;

export function SidePanelFooter() {
  const [{ shouldShowUserControls }, sidePanelDispatch] = useSidePanel();
  const xs = useViewport() === Viewport.XS;
  const user = useCurrentUser();

  const [transitionState, handleTransitionEnd] = useTransition(shouldShowUserControls);

  if (!user) {
    return null;
  }

  /* TODO - find a better way to grab the height of UserList */
  const userListItems = 6;
  const userListHeight = userListItems * 64;

  return (
    <>
      <UserControlsToggle
        aria-controls="navigation-user-controls"
        aria-expanded={shouldShowUserControls}
        onClick={() => {
          sidePanelDispatch(shouldShowUserControls ? hideUserControls() : showUserControls());
          gTagManager({
            event: 'openUserControls',
          });
        }}
        title="Show user controls"
      >
        <UserControlsBadgeWrapper>
          <BadgeWithText variant="user" text={user.fullName} secondaryText={user.email} />
          {shouldShowUserControls ? (
            <IconChevronDown iconSize={xs ? undefined : 16} />
          ) : (
            <IconChevronUp iconSize={xs ? undefined : 16} />
          )}
        </UserControlsBadgeWrapper>
      </UserControlsToggle>
      <UserControlsListWrapper
        id="navigation-user-controls"
        transitionState={transitionState}
        onTransitionEnd={handleTransitionEnd}
        listHeight={userListHeight}
      >
        <UserControlsList style={{ margin: 0, padding: 0 }}>
          <UserItem>
            <StyledUserLink
              href="https://www.spotify.com/us/account/overview/"
              title="Profile Settings"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                gTagManager({
                  event: 'selectUserControlsLink',
                  userControlsLink: 'Profile Settings',
                });
              }}
            >
              <IconGears />
              <UserLinkTitle>Settings</UserLinkTitle>
            </StyledUserLink>
          </UserItem>
          <UserItem>
            <StyledUserLink
              href={generalFeedbackLink}
              title="Product feedback"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                gTagManager({
                  event: 'selectUserControlsLink',
                  userControlsLink: 'Product feedback',
                });
              }}
            >
              <IconMessages />
              <UserLinkTitle>Product feedback</UserLinkTitle>
            </StyledUserLink>
          </UserItem>
          <UserItem>
            <StyledUserLink
              as={NavLink}
              to="/welcome-guide"
              title="Welcome guide"
              onClick={() => {
                gTagManager({
                  event: 'selectUserControlsLink',
                  userControlsLink: 'Welcome guide',
                });
              }}
            >
              <IconHeartAlt />
              <UserLinkTitle>Welcome guide</UserLinkTitle>
            </StyledUserLink>
          </UserItem>
          <UserItem>
            <StyledUserLink
              as={NavLink}
              to="/faq"
              title="FAQ"
              onClick={() => {
                gTagManager({
                  event: 'selectUserControlsLink',
                  userControlsLink: 'FAQ',
                });
              }}
            >
              <IconHelpAlt />
              <UserLinkTitle>FAQ</UserLinkTitle>
            </StyledUserLink>
          </UserItem>
          <UserItem>
            <StyledUserLink href="/logout" title="Log out">
              <IconArrowRight />
              <UserLinkTitle>Log out</UserLinkTitle>
            </StyledUserLink>
          </UserItem>
        </UserControlsList>
      </UserControlsListWrapper>
    </>
  );
}
