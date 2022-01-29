import React from 'react';
import { useT } from '@mrkt/features/i18n';
import { FormGroup, FormRadio, spacer32, spacer48, Type, TextLink } from '@spotify-internal/encore-web';
import { TeamType } from '../../lib';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { LoadingIndicator } from '../../../../shared/components/LoadingIndicator';
import { LoggedInAsFormLayout } from '../../../UserSettings/components/LoggedInAsForm';
import { getAccountsDomain } from '@mrkt/features/auth';
import styled from 'styled-components';
import { RoleInput } from '../../components/TeamMemberDetailsForm/RoleInput';
import { Input } from '../../components/TeamMemberDetailsForm/Input';
import { AddTeamType } from '../store/AddTeamsState';
import { useHistory, useLocation } from 'react-router';
import { AccessLevelPopover, RolePopover } from '../../components/FormPopovers';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var LoggedInAsFormContainer = styled.div.withConfig({
  displayName: "CreateLabelPage__LoggedInAsFormContainer",
  componentId: "sc-1wkens6-0"
})(["margin-top:30px;margin-right:8px;"]);
var InputGroup = styled.div.withConfig({
  displayName: "CreateLabelPage__InputGroup",
  componentId: "sc-1wkens6-1"
})(["display:block;> *{width:98%;padding-bottom:0;padding-left:0;}"]);
var TeamNameContainer = styled(InputGroup).withConfig({
  displayName: "CreateLabelPage__TeamNameContainer",
  componentId: "sc-1wkens6-2"
})(["margin-top:18px;margin-bottom:", ";"], spacer32);
var LabelOrDistributorFormGroup = styled(FormGroup).withConfig({
  displayName: "CreateLabelPage__LabelOrDistributorFormGroup",
  componentId: "sc-1wkens6-3"
})(["padding-bottom:0;"]);
var AdditionalLinksHeaderSection = styled.div.withConfig({
  displayName: "CreateLabelPage__AdditionalLinksHeaderSection",
  componentId: "sc-1wkens6-4"
})(["padding-top:", ";"], spacer48);
var CreateTeamPageContainer = styled.div.withConfig({
  displayName: "CreateLabelPage__CreateTeamPageContainer",
  componentId: "sc-1wkens6-5"
})(["max-width:550px;"]);
export var CreateLabelPage = function CreateLabelPage() {
  var _useTeamStore = useTeamStore(),
      _useTeamStore$addTeam = _useTeamStore.addTeams,
      details = _useTeamStore$addTeam.details,
      formErrors = _useTeamStore$addTeam.formErrors,
      showError = _useTeamStore$addTeam.showError,
      selectedTeamType = _useTeamStore$addTeam.selectedTeamType,
      currentUser = _useTeamStore.currentUser,
      setAddTeamsFlowDetails = _useTeamStore.setAddTeamsFlowDetails,
      setSelectedTeamType = _useTeamStore.setSelectedTeamType,
      platform = _useTeamStore.platform;

  var t = useT();
  var newLabelTeamName = details.newLabelTeamName;
  var hasErrors = formErrors.get('role') || formErrors.get('company');
  var visibleErrors = showError && hasErrors;
  var homepageUrl = "".concat(window.location.protocol, "//").concat(window.location.host, "/c/add-team");
  var logoutUrl = "".concat(getAccountsDomain(), "/logout?continue=").concat(encodeURIComponent(homepageUrl));
  var history = useHistory();
  var location = useLocation();

  if (!newLabelTeamName) {
    history.push('/add-team');
    return /*#__PURE__*/_jsx(LoadingIndicator, {});
  }

  return /*#__PURE__*/_jsxs(CreateTeamPageContainer, {
    "data-testid": "create-label-page",
    "data-slo-id": "create-label-page",
    children: [/*#__PURE__*/_jsx(Type, {
      as: "h1",
      variant: Type.heading2,
      children: t('ADD_TEAMS_CREATE_LABEL_PAGE_TITLE', 'Create a team', 'submit a request to create a new label team')
    }), /*#__PURE__*/_jsx(Type, {
      as: "h2",
      variant: Type.heading3,
      children: t('ADD_TEAMS_CREATE_LABEL_SUBTITLE_DETAILS', 'Team details', 'Team details form section title')
    }), /*#__PURE__*/_jsx(Type, {
      as: "h2",
      variant: Type.body2,
      weight: Type.bold,
      condensed: true,
      children: t('LABEL_TEAM_FAQ_TITLE', 'Not a label or distributor?', 'are you on a label team?')
    }), /*#__PURE__*/_jsx(Type, {
      as: "h2",
      variant: Type.body2,
      children: /*#__PURE__*/_jsx(TextLink, {
        href: "/c/add-artist/artist-search".concat(location.search),
        children: t('ADD_ARTIST_REDIRECT_LINK', "If you're an artist team member, go here instead.", 'Are you an artist team member, not a label? Click the following link to select an artist instead')
      })
    }), /*#__PURE__*/_jsx(TeamNameContainer, {
      children: /*#__PURE__*/_jsx(Input, {
        disabled: true,
        id: "teamName",
        "data-testid": "team-name",
        label: t('ADD_TEAMS_CREATE_LABEL_INPUT_TEAM_NAME', 'Team name', 'Team name input label'),
        onChange: function onChange() {},
        value: newLabelTeamName
      })
    }), /*#__PURE__*/_jsx(Type, {
      as: "h2",
      variant: Type.heading3,
      children: t('ADD_TEAMS_CREATE_LABEL_SUBTITLE_TELL_US', 'Tell us about yourself', 'User details form section title')
    }), /*#__PURE__*/_jsxs(LabelOrDistributorFormGroup, {
      label: t('CREATE_LABEL_SELECT_TEAM_TYPE', 'What team are you a part of?', 'select label team type'),
      labelFor: "teamType",
      id: "teamType",
      "data-testid": "teamType",
      inline: true,
      value: selectedTeamType,
      onChange: function onChange(e) {
        setSelectedTeamType(e.target.value);
      },
      children: [/*#__PURE__*/_jsx(FormRadio, {
        name: "teamType",
        "data-testid": "label",
        id: "label",
        value: AddTeamType.label,
        defaultChecked: true,
        children: t('CREATE_LABEL_TEAM_OPTION', 'Label', 'label radio button for team type selection')
      }), /*#__PURE__*/_jsx(FormRadio, {
        name: "teamType",
        "data-testid": "distributor",
        id: "distributor",
        value: AddTeamType.distributor,
        children: t('CREATE_DISTRIBUTOR_TEAM_OPTION', 'Distributor', 'distributor radio button for team type selection')
      })]
    }), /*#__PURE__*/_jsx(LoggedInAsFormContainer, {
      children: /*#__PURE__*/_jsx(LoggedInAsFormLayout, {
        addTeams: true,
        currentUser: currentUser,
        actionText: t('LOG_OUT', 'Log out', 'log out'),
        actionUrl: logoutUrl,
        platform: platform
      })
    }), /*#__PURE__*/_jsxs(InputGroup, {
      children: [/*#__PURE__*/_jsx(RoleInput, {
        id: "role",
        "data-testid": "role",
        label: t('ADD_TEAMS_CREATE_LABEL_ROLE_INPUT', 'Role', 'the user selects their role on the team'),
        onChange: function onChange(role) {
          setAddTeamsFlowDetails({
            role: role
          });
          formErrors.delete('role');
        },
        value: details.role,
        teamType: TeamType.label,
        required: true,
        error: formErrors.get('role'),
        forceShowErrors: !!visibleErrors,
        popover: /*#__PURE__*/_jsx(RolePopover, {}),
        popoverPlacement: "bottomLeft"
      }), /*#__PURE__*/_jsx(Input, {
        id: "company",
        "data-testid": "company",
        label: t('ADD_TEAMS_CREATE_LABEL_COMPANY_INPUT', 'Company', 'the user enters their company'),
        onChange: function onChange(company) {
          setAddTeamsFlowDetails({
            company: company
          });
          formErrors.delete('company');
        },
        value: details.company,
        required: true,
        error: formErrors.get('company'),
        forceShowErrors: !!visibleErrors
      }), /*#__PURE__*/_jsx(Input, {
        disabled: true,
        id: "accessLevel",
        "data-testid": "access-level",
        label: t('ADD_TEAMS_CREATE_LABEL_ACCESS_LEVEL_INPUT_LABEL', 'Access level', 'Access level input label'),
        onChange: function onChange() {},
        value: t('ADD_TEAMS_CREATE_LABEL_ACCESS_LEVEL_INPUT_VALUE', 'Admin', 'Access level input value- Admin access'),
        popover: /*#__PURE__*/_jsx(AccessLevelPopover, {}),
        popoverPlacement: "bottomLeft"
      })]
    }), /*#__PURE__*/_jsxs(AdditionalLinksHeaderSection, {
      children: [/*#__PURE__*/_jsxs(Type, {
        as: "h2",
        variant: "heading3",
        weight: "bold",
        children: [t('ADD_TEAMS_ADDITIONAL_LINKS_FORM_SECTION', 'Additional links ', 'Additional links form section'), /*#__PURE__*/_jsx(Type, {
          as: "span",
          variant: "heading3",
          weight: "book",
          children: t('ADD_TEAMS_ADDITIONAL_LINKS_OPTIONAL', '(optional)', 'this section of the form is optional')
        })]
      }), /*#__PURE__*/_jsx(Type, {
        as: "p",
        variant: "body1",
        children: t('ADD_TEAMS_ADDITIONAL_LINKS_BODY', 'Include links to sites that show your name and email (e.g., LinkedIn, company about page, etc.). This will help us confirm who you are and where you work.', 'include additional links so that we can confirm who you are and where you work')
      })]
    }), /*#__PURE__*/_jsxs(InputGroup, {
      children: [/*#__PURE__*/_jsx(Input, {
        id: "companyWebsiteUrl",
        label: t('ADD_TEAMS_CREATE_LABEL_WEBSITE_INPUT', 'Company website', 'company website input label'),
        onChange: function onChange(websiteLink) {
          setAddTeamsFlowDetails({
            websiteLink: websiteLink
          });
          formErrors.delete('websiteLink');
        },
        value: details.websiteLink,
        forceShowErrors: !!visibleErrors,
        error: formErrors.get('websiteLink')
      }), /*#__PURE__*/_jsx(Input, {
        id: "socialUrl",
        label: t('ADD_TEAMS_CREATE_LABEL_SOCIAL_INPUT', 'LinkedIn or other social profile', 'social URL input label'),
        onChange: function onChange(socialLink) {
          setAddTeamsFlowDetails({
            socialLink: socialLink
          });
          formErrors.delete('socialLink');
        },
        value: details.socialLink,
        forceShowErrors: !!visibleErrors,
        error: formErrors.get('socialLink')
      })]
    })]
  });
};