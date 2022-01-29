import _slicedToArray from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React, { useMemo } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IconArrowRight, IconArtist, IconChevronDown, IconChevronUp, IconGears, IconHelpAlt, IconMessages } from '@spotify-internal/encore-web';
import { createUbiEventLogger } from '@mrkt/features/ubi';
import { createWebCommonEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-common';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { useCurrentUser, useIsEmployee } from '../../../../features/currentUser';
import { useSidePanel, hideUserControls, showUserControls } from '../../../SidePanel';
import { useCurrentUserDetails } from '../../../UserSettings/lib/useCurrentUserDetails';
import { ButtonUser } from './ButtonUser';
import { ButtonUserWrapper } from './ButtonUserWrapper';
import { UserListWrapper } from './UserListWrapper';
import { UserList } from './UserList';
import { UserItem } from './UserItem';
import { UserLink } from './UserLink';
import { UserLinkTitle } from './UserLinkTitle';
import { useViewport, Viewport } from '../../../../shared/lib/useViewport';
import { logout } from '@mrkt/features/auth';
import { UnstyledButton } from '@mrkt/features/UnstyledButton';
import { useT } from '@mrkt/features/i18n';
import { useCurrentArtistIdOrNull } from '../../../artists';
import { Transition } from 'react-transition-group';
import { IconBadgeWithText } from '../../../Team/components/IconBadge/IconBadgeWithText';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function UserControlsComponent(_ref) {
  var location = _ref.location;

  var _useSidePanel = useSidePanel(),
      _useSidePanel2 = _slicedToArray(_useSidePanel, 2),
      shouldShowUserControls = _useSidePanel2[0].shouldShowUserControls,
      sidePanelDispatch = _useSidePanel2[1];

  var currentUserDetails = useCurrentUserDetails();
  var xs = useViewport() === Viewport.XS;
  var currentUser = useCurrentUser();
  var isEmployee = useIsEmployee();
  var t = useT();
  var homepageUrl = "".concat(window.location.protocol, "//").concat(window.location.host);
  var continueTo = encodeURIComponent("".concat(location.pathname).concat(location.search));
  var artistId = useCurrentArtistIdOrNull();
  var uri = window.location.href;
  var UBIEventLogger = createUbiEventLogger(artistId);
  var spec = useMemo(function () {
    return createWebCommonEventFactory({
      data: {
        identifier: 's4a-side-panel-user-row',
        uri: uri
      }
    });
  }, [uri]);
  var userRowFactory = spec.sideNavPanelFactory().userRowFactory();

  var userRowAction = function userRowAction(target, destination) {
    UBIEventLogger.logInteraction(target.hitUiNavigate({
      destination: destination
    }));
  };

  var sendLogoutUbiEvent = function sendLogoutUbiEvent() {
    UBIEventLogger.logInteraction(userRowFactory.logOutRowFactory().hitLogout());
  };

  if (!currentUser) {
    return null;
  }
  /* TODO - find a better way to grab the height of UserList */


  var userListItems = 5;
  var userListHeight = userListItems * 64;
  var currentUserDetailsFullName = "".concat(currentUserDetails.firstName, " ").concat(currentUserDetails.lastName);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ButtonUser, {
      "aria-controls": "navigation-user-controls",
      "aria-expanded": shouldShowUserControls,
      "data-testid": "navigation-usercontrols",
      onClick: function onClick() {
        if (!shouldShowUserControls) {
          UBIEventLogger.logInteraction(userRowFactory.hitUiReveal());
        }

        sidePanelDispatch(shouldShowUserControls ? hideUserControls() : showUserControls());
      },
      title: t('SIDEPANEL_SHOW_USER_CONTROLS_TITLE', 'Show user controls', 'Title for button that expands user controls drawer in sidepanel'),
      children: /*#__PURE__*/_jsxs(ButtonUserWrapper, {
        children: [/*#__PURE__*/_jsx(IconBadgeWithText, {
          text: currentUserDetailsFullName.length > 1 ? currentUserDetailsFullName : currentUser.name,
          secondaryText: currentUserDetails.businessEmail || currentUser.email
        }), shouldShowUserControls ? /*#__PURE__*/_jsx(IconChevronDown, {
          iconSize: xs ? undefined : 16
        }) : /*#__PURE__*/_jsx(IconChevronUp, {
          iconSize: xs ? undefined : 16
        })]
      })
    }), /*#__PURE__*/_jsx(UserListWrapper, {
      id: "navigation-user-controls",
      children: /*#__PURE__*/_jsx(Transition, {
        in: shouldShowUserControls,
        delay: 100,
        addEndListener: function addEndListener() {},
        children: function children(transitionState) {
          return /*#__PURE__*/_jsx(_Fragment, {
            children: /*#__PURE__*/_jsxs(UserList, {
              transitionState: transitionState,
              listHeight: userListHeight,
              children: [isEmployee && /*#__PURE__*/_jsx(UserItem, {
                children: /*#__PURE__*/_jsxs(UserLink, {
                  onClick: function onClick() {
                    return userRowAction(userRowFactory.employeeFeedbackRowFactory(), 'https://goo.gl/forms/oWZE9ceg0rcQlY6M2');
                  },
                  href: "https://goo.gl/forms/oWZE9ceg0rcQlY6M2",
                  target: "_blank",
                  "data-testid": "product-feedback",
                  children: [/*#__PURE__*/_jsx(IconMessages, {}), /*#__PURE__*/_jsx(UserLinkTitle, {
                    children: t('SIDEPANEL_EMPLOYEE_FEEDBACK', 'Employee feedback', 'Links to an internal form that employees can use to provide feedback')
                  })]
                })
              }), /*#__PURE__*/_jsx(UserItem, {
                children: /*#__PURE__*/_jsxs(UserLink, {
                  onClick: function onClick() {
                    return userRowAction(userRowFactory.userSettingsRowFactory(), "/settings?continue=".concat(continueTo));
                  },
                  component: NavLink,
                  to: "/settings?continue=".concat(continueTo),
                  title: t('SIDEPANEL_USER_SETTINGS_TITLE', 'Settings', 'Title for link to user settings page'),
                  children: [/*#__PURE__*/_jsx(IconGears, {}), /*#__PURE__*/_jsx(UserLinkTitle, {
                    children: t('SIDEPANEL_USER_SETTINGS_LINK', 'User settings', 'Link to user settings page')
                  })]
                })
              }), /*#__PURE__*/_jsx(UserItem, {
                children: /*#__PURE__*/_jsxs(UserLink, {
                  onClick: function onClick() {
                    return userRowAction(userRowFactory.addTeamRowFactory(), "/add-team?continue=".concat(continueTo));
                  },
                  component: NavLink,
                  to: "/add-team?continue=".concat(continueTo),
                  title: t('ADD_A_TEAM_NAV_LINK_TITLE', 'Add team', 'Title for link to page where user can get access to an artist/label team'),
                  "data-testid": "add-artist",
                  children: [/*#__PURE__*/_jsx(IconArtist, {}), /*#__PURE__*/_jsx(UserLinkTitle, {
                    children: t('ADD_A_TEAM_NAV_LINK', 'Add team', 'Link to page where user can get access to an artist/label team')
                  })]
                })
              }), /*#__PURE__*/_jsx(UserItem, {
                children: /*#__PURE__*/_jsxs(UserLink, {
                  component: "a",
                  href: "/help?ref=helpflyout",
                  target: "_blank",
                  title: t('SIDEPANEL_HELP_TITLE', 'Help', 'Title for link to the help/troubleshooting page'),
                  onClick: function onClick() {
                    userRowAction(userRowFactory.helpRowFactory(), '/help?ref=helpflyout');
                    sendEvent({
                      eventCategory: 'Help v2',
                      eventAction: 'FAQ Link - Flyout',
                      eventLabel: '/help'
                    });
                  },
                  children: [/*#__PURE__*/_jsx(IconHelpAlt, {}), /*#__PURE__*/_jsx(UserLinkTitle, {
                    children: t('SIDEPANEL_HELP_LINK', 'Help', 'Link to the help/troubleshooting page')
                  })]
                })
              }), /*#__PURE__*/_jsx(UserItem, {
                children: /*#__PURE__*/_jsxs(UserLink, {
                  component: UnstyledButton,
                  onClick: function onClick() {
                    sendLogoutUbiEvent();
                    logout(homepageUrl);
                  },
                  "data-testid": "navigation-logout",
                  title: t('SIDEPANEL_LOGOUT_TITLE', 'Log out', 'Title for link to log a user out'),
                  children: [/*#__PURE__*/_jsx(IconArrowRight, {}), /*#__PURE__*/_jsx(UserLinkTitle, {
                    children: t('SIDEPANEL_LOGOUT_LINK', 'Log out', 'Link to log a user out')
                  })]
                })
              })]
            })
          });
        }
      })
    })]
  });
}

export var UserControls = compose(withRouter)(UserControlsComponent);