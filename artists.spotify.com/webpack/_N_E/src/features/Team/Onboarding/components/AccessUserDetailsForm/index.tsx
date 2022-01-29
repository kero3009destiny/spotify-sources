import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonPrimary, ButtonSecondary, Type, screenSmMin, screenXsMax, spacer12, spacer24, spacer4, spacer40, spacer64, spacer72, spacer8, spacer80 } from '@spotify-internal/encore-web';
import { Input } from '../../../components/TeamMemberDetailsForm/Input';
import { RoleInput } from '../../../components/TeamMemberDetailsForm/RoleInput';
import { TeamType } from '../../../lib';
import { useTeamStore } from '../../../lib/store/useTeamStore';
import { LabelArtistOrDistributor, LabelOrDistributorFormRadio } from './utils';
import { ArtistAccessFlowStep, isLabelAccessFlowDetails, LabelAccessFlowStep, toLabelTeamType } from '../../store';
import { useValidationErrors } from '../../../lib/selectors/useValidationErrors';
import { LoggedInAsFormLayout } from '../../../../UserSettings/components/LoggedInAsForm';
import { useLayoutType } from '../../store/selectors/useLayoutType';
import { getAccountsDomain } from '@mrkt/features/auth';
import { TermsAndConditionsCheckbox } from '../../../../Terms/components/TermsAndConditionsCheckbox';
import { useT } from '@mrkt/features/i18n';
import { useBusinessEmailTextboxLogger, useCompanyTextboxLogger, useCompanyWebsiteTextboxLogger, useFirstNameTextboxLogger, useGoBackButtonLogger, useLastNameTextboxLogger, useLogoutButtonLogger, useNextButtonLogger, useRoleDropdownLogger, useSelectRoleOptionLogger, useSocialLinkTextboxLogger, useSubmitButtonLogger, useTermsAndConditionsCheckboxLogger } from '../../store/hooks/useAccessUserDetailsFormUbi';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var ActionContainer = styled.div.withConfig({
  displayName: "AccessUserDetailsForm__ActionContainer",
  componentId: "sc-1jhg163-0"
})(["display:flex;justify-content:space-between;padding-top:", ";padding-bottom:", ";"], spacer72, spacer72);
var Container = styled.div.withConfig({
  displayName: "AccessUserDetailsForm__Container",
  componentId: "sc-1jhg163-1"
})(["align-items:center;display:flex;flex-direction:column;text-align:center;margin:auto;padding-left:", ";padding-right:", ";@media (min-width:", "){padding-left:0;padding-right:0;}"], spacer24, spacer24, screenSmMin);
var InputGroup = styled.div.withConfig({
  displayName: "AccessUserDetailsForm__InputGroup",
  componentId: "sc-1jhg163-2"
})(["", ";@media (min-width:", "){", ";}display:flex;justify-content:space-between;> *{width:50%;padding-bottom:", ";}@media (min-width:", "){display:flex;flex-wrap:wrap;margin-right:-", ";}@media (max-width:", "){display:block;> *{width:100%;padding-bottom:", ";}}"], function (props) {
  return props.teamDetails && "margin-top: ".concat(spacer24, "; margin-bottom ").concat(spacer64, ";");
}, screenSmMin, function (props) {
  return props.teamDetails && "margin-top: ".concat(spacer24, ";  margin-bottom ").concat(spacer80, ";");
}, spacer4, screenSmMin, spacer8, screenXsMax, spacer4);
var AdditionalLinksInputGroup = styled.div.withConfig({
  displayName: "AccessUserDetailsForm__AdditionalLinksInputGroup",
  componentId: "sc-1jhg163-3"
})(["display:flex;justify-content:space-between;> *{width:100%;padding-bottom:", ";}@media (min-width:", "){display:flex;flex-wrap:wrap;margin-right:-", ";}@media (max-width:", "){display:block;> *{width:100%;}}"], spacer4, screenSmMin, spacer8, screenXsMax);
var AdditionalLinksHeaderSection = styled.div.withConfig({
  displayName: "AccessUserDetailsForm__AdditionalLinksHeaderSection",
  componentId: "sc-1jhg163-4"
})(["padding-top:", ";padding-bottom:", ";@media (min-width:", "){padding-left:", ";padding-top:", ";width:70%;}"], spacer64, spacer40, screenSmMin, spacer8, spacer72);
var Header = styled.div.withConfig({
  displayName: "AccessUserDetailsForm__Header",
  componentId: "sc-1jhg163-5"
})(["padding-bottom:", ";@media (min-width:", "){padding-left:", ";}"], function (props) {
  return props.teamDetails ? "".concat(spacer12) : "".concat(spacer40);
}, screenSmMin, spacer8);
var LoggedInAsContainer = styled.div.withConfig({
  displayName: "AccessUserDetailsForm__LoggedInAsContainer",
  componentId: "sc-1jhg163-6"
})(["@media (min-width:", "){padding-right:", ";padding-left:", ";}"], screenSmMin, spacer8, spacer8);
var SubmitButton = styled(ButtonPrimary).withConfig({
  displayName: "AccessUserDetailsForm__SubmitButton",
  componentId: "sc-1jhg163-7"
})(["float:right;"]);
export var AccessUserDetailsForm = function AccessUserDetailsForm(_ref) {
  var isCreatingNewTeam = _ref.isCreatingNewTeam,
      _ref$isArtist = _ref.isArtist,
      isArtist = _ref$isArtist === void 0 ? false : _ref$isArtist;

  var _useTeamStore = useTeamStore(),
      layoutType = _useTeamStore.layoutType,
      currentUser = _useTeamStore.currentUser,
      _useTeamStore$onboard = _useTeamStore.onboarding,
      labelDetails = _useTeamStore$onboard.labelAccessFlow.details,
      artistDetails = _useTeamStore$onboard.artistAccessFlow.details,
      platform = _useTeamStore.platform,
      setLabelAccessFlowDetails = _useTeamStore.setLabelAccessFlowDetails,
      setArtistAccessFlowDetails = _useTeamStore.setArtistAccessFlowDetails,
      goToLabelAccessFlowStep = _useTeamStore.goToLabelAccessFlowStep,
      goToArtistAccessFlowStep = _useTeamStore.goToArtistAccessFlowStep,
      submitAccessFlowDetails = _useTeamStore.submitAccessFlowDetails,
      trackEvent = _useTeamStore.trackEvent;

  var t = useT();
  var logLogoutButtonClick = useLogoutButtonLogger();
  var logFirstNameFieldFocus = useFirstNameTextboxLogger();
  var logLastNameFieldFocus = useLastNameTextboxLogger();
  var logBusinessEmailFieldFocus = useBusinessEmailTextboxLogger();
  var logRevealRoleDropdown = useRoleDropdownLogger();
  var logSelectRoleOption = useSelectRoleOptionLogger();
  var logCompanyFieldFocus = useCompanyTextboxLogger();
  var logCompanyWebsiteFieldFocus = useCompanyWebsiteTextboxLogger();
  var logSocialLinkFieldFocus = useSocialLinkTextboxLogger();
  var logTermsAndConditionsCheckbox = useTermsAndConditionsCheckboxLogger();
  var logGoBackButtonClick = useGoBackButtonLogger();
  var logNextButtonClick = useNextButtonLogger();
  var logSubmitButtonClick = useSubmitButtonLogger();
  var details = isArtist ? artistDetails : labelDetails;
  var setDetails = isArtist ? setArtistAccessFlowDetails : setLabelAccessFlowDetails;
  var errors = useValidationErrors(details);

  var _useState = useState(false),
      showErrors = _useState[0],
      setShowErrors = _useState[1];

  var modifiedFields = ['teamName', 'teamType', 'firstName', 'lastName', 'role', 'companyWebsiteUrl', 'socialUrl'];

  if (!isArtist) {
    // for artist teams, Company is not a required field
    modifiedFields.splice(5, 0, 'company');
  }

  var _useState2 = useState(false),
      termsAndConditionsAgreement = _useState2[0],
      setTermsAndConditionsAgreement = _useState2[1];

  var visibleTermsConditionsError = !isCreatingNewTeam && !termsAndConditionsAgreement && showErrors && t('ACCESS_USER_DETAILS_FORM_TERMS_ERROR', 'To continue, accept our terms and conditions', 'You must accept our terms and conditions to continue. Error message');
  var hasErrors = modifiedFields.some(function (field) {
    return errors.has(field);
  }) || !termsAndConditionsAgreement && !isCreatingNewTeam;
  var responsiveStyleProps = useLayoutType(layoutType);
  var homepageUrl = "".concat(window.location.protocol, "//").concat(window.location.host, "/c/team/access/").concat(isArtist ? 'artist' : 'label');
  var logoutUrl = "".concat(getAccountsDomain(), "/logout?continue=").concat(encodeURIComponent(homepageUrl));

  var goToSelectContent = function goToSelectContent() {
    trackEvent({
      action_target: 'label-onboarding:team-details-submit-button-next',
      action_type: 'label-onboarding:click',
      action_intent: 'label-onboarding:go-to-select-content',
      action_meta_str_1: 'create-team'
    });
    goToLabelAccessFlowStep(LabelAccessFlowStep.SELECT_CONTENT);
    logNextButtonClick();
  };

  var moveForward = function moveForward(goToNextPage) {
    if (goToNextPage) {
      goToSelectContent();
    } else {
      submitAccessFlowDetails(details, isCreatingNewTeam, t, isArtist, platform === null || platform === void 0 ? void 0 : platform.isApp);
      logSubmitButtonClick();
    }
  };

  return /*#__PURE__*/_jsx("div", {
    "data-testid": "access-user-details-form",
    children: /*#__PURE__*/_jsxs("form", {
      onSubmit: function onSubmit(e) {
        e.preventDefault();

        if (hasErrors) {
          setShowErrors(true);
        } else {
          moveForward(isCreatingNewTeam);
        }
      },
      children: [isCreatingNewTeam && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(Header, {
          teamDetails: true,
          children: /*#__PURE__*/_jsx(Type, {
            as: "h2",
            variant: "heading3",
            weight: "bold",
            condensed: true,
            children: t('ACCESS_USER_DETAILS_FORM_TEAM_DETAILS_HEADER', 'Team details', 'Team details section header')
          })
        }), /*#__PURE__*/_jsx(LabelArtistOrDistributor, {
          teamDetails: true,
          isArtist: isArtist
        }), /*#__PURE__*/_jsx(InputGroup, {
          teamDetails: true,
          children: /*#__PURE__*/_jsx(Input, {
            id: "teamName",
            disabled: true,
            onChange: function onChange() {
              /* noop: disabled field */
            },
            label: t('ACCESS_USER_DETAILS_FORM_TEAM_NAME_LABEL', 'Team name', 'Team name form input label'),
            value: details.teamName || ''
          })
        })]
      }), /*#__PURE__*/_jsx(Header, {
        children: /*#__PURE__*/_jsx(Type, {
          as: "h2",
          condensed: true,
          variant: "heading3",
          weight: "bold",
          children: t('ACCESS_USER_DETAILS_FORM_USER_DETAILS_HEADER', 'Tell us about yourself', 'User details header. Tell us about yourself')
        })
      }), /*#__PURE__*/_jsxs(InputGroup, {
        children: [isCreatingNewTeam ? /*#__PURE__*/_jsx(LabelOrDistributorFormRadio, {
          id: "teamType",
          label: t('ACCESS_USER_DETAILS_FORM_TEAM_TYPE_LABEL', 'Which team are you a part of?', 'Label or distributor team type form label'),
          onChange: function onChange(teamType) {
            return setLabelAccessFlowDetails({
              teamType: toLabelTeamType(teamType)
            });
          },
          value: details.teamType,
          forceShowErrors: showErrors,
          error: errors.get('teamType')
        }) : /*#__PURE__*/_jsx(LabelArtistOrDistributor, {
          isArtist: isArtist
        }), /*#__PURE__*/_jsx(LoggedInAsContainer, {
          children: /*#__PURE__*/_jsx(LoggedInAsFormLayout, {
            theme: {
              theme: 'dark'
            },
            currentUser: currentUser,
            actionUrl: logoutUrl,
            actionText: t('ACCESS_USER_DETAILS_FORM_LOG_OUT_ACTION', 'Log out', 'Log out'),
            platform: platform,
            onClick: logLogoutButtonClick
          })
        }), /*#__PURE__*/_jsx(Input, {
          id: "firstName",
          label: t('ACCESS_USER_DETAILS_FORM_FIRST_NAME_INPUT_LABEL', 'First name', 'First name input label'),
          onChange: function onChange(firstName) {
            return setDetails({
              firstName: firstName
            });
          },
          onFocus: logFirstNameFieldFocus,
          value: details.firstName,
          forceShowErrors: showErrors,
          error: errors.get('firstName'),
          required: true
        }), /*#__PURE__*/_jsx(Input, {
          id: "lastName",
          label: t('ACCESS_USER_DETAILS_FORM_LAST_NAME_INPUT_LABEL', 'Last name', 'Last name input label'),
          onChange: function onChange(lastName) {
            return setDetails({
              lastName: lastName
            });
          },
          onFocus: logLastNameFieldFocus,
          value: details.lastName,
          forceShowErrors: showErrors,
          error: errors.get('lastName'),
          required: true
        }), /*#__PURE__*/_jsx(Input, {
          id: "businessEmail",
          disabled: true,
          onChange: function onChange() {
            /* noop: disabled field */
          },
          onFocus: logBusinessEmailFieldFocus,
          helpText: t('ACCESS_USER_DETAILS_EMAIL_HELP_TEXT', "We'll link this email to your team.", 'This is the email that will be linked to your team.'),
          label: t('ACCESS_USER_DETAILS_FORM_BUSINESS_EMAIL_INPUT_LABEL', 'Business email', 'Business email input label'),
          value: details.businessEmail
        }), /*#__PURE__*/_jsx(RoleInput, {
          id: "role",
          label: t('ACCESS_USER_DETAILS_FORM_ROLE_INPUT_LABEL', 'Role', 'Role input label'),
          onChange: function onChange(role) {
            setDetails({
              role: role
            });
            logSelectRoleOption(role);
          },
          onFocus: logRevealRoleDropdown,
          value: details.role,
          forceShowErrors: showErrors,
          error: errors.get('role'),
          teamType: isArtist ? TeamType.artist : TeamType.label,
          required: true
        }), /*#__PURE__*/_jsx(Input, {
          id: "company",
          label: t('ACCESS_USER_DETAILS_FORM_COMPANY_INPUT_LABEL', 'Company', 'Company input label'),
          onChange: function onChange(company) {
            return setDetails({
              company: company
            });
          },
          onFocus: logCompanyFieldFocus,
          value: details.company,
          forceShowErrors: showErrors,
          error: !isArtist ? errors.get('company') : undefined,
          required: !isArtist
        }), isCreatingNewTeam && /*#__PURE__*/_jsx(Input, {
          id: "accessLevel",
          label: t('ACCESS_USER_DETAILS_FORM_ACCESS_LEVEL_INPUT_LABEL', 'Access level', 'Access level input label'),
          value: t('ACCESS_USER_DETAILS_ADMIN_VALUE', 'Admin', "Because you are creating this team, you'll have Admin access."),
          helpText: t('ACCESS_USER_DETAILS_FORM_ACCESS_LEVEL_HELP_TEXT', "Because you're creating the team, you'll be an admin. Admins can manage teams, including inviting and removing team members and changing access levels. They can also edit content on an artist's behalf, including playlist pitches, Artist Pick, and the artist profile.", 'Since you are creating a new team, you will be granted admin access.'),
          disabled: true,
          onChange: function onChange() {
            /* noop: disabled field */
          }
        })]
      }), isCreatingNewTeam && isLabelAccessFlowDetails(details) && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsxs(AdditionalLinksHeaderSection, {
          children: [/*#__PURE__*/_jsx(Type, {
            as: "h2",
            variant: "heading3",
            weight: "bold",
            children: t('ACCESS_USER_DETAILS_FORM_ADDITIONAL_LINKS_SECTION_HEADER', 'Additional links (Optional)', 'Additional links are optional')
          }), /*#__PURE__*/_jsx(Type, {
            as: "p",
            variant: "body1",
            children: t('ACCESS_USER_DETAILS_FORM_ADDITIONAL_LINKS_SECTION_DESCRIPTION', 'Include links to sites that show your name and email (e.g., LinkedIn, company about page, etc.). This will help us confirm who you are and where you work.', 'Include additional links to help us confirm who you are')
          })]
        }), /*#__PURE__*/_jsxs(AdditionalLinksInputGroup, {
          children: [/*#__PURE__*/_jsx(Input, {
            id: "companyWebsiteUrl",
            label: t('ACCESS_USER_DETAILS_FORM_COMPANY_WEBSITE_INPUT_LABEL', 'Company website', 'Company website input label'),
            onChange: function onChange(companyWebsiteUrl) {
              return setLabelAccessFlowDetails({
                companyWebsiteUrl: companyWebsiteUrl
              });
            },
            onFocus: logCompanyWebsiteFieldFocus,
            value: details.companyWebsiteUrl,
            forceShowErrors: showErrors,
            error: errors.get('companyWebsiteUrl')
          }), /*#__PURE__*/_jsx(Input, {
            id: "socialUrl",
            label: t('ACCESS_USER_DETAILS_FORM_SOCIAL_LINK_INPUT_LABEL', 'LinkedIn or other social profile', 'Social profile input label'),
            onChange: function onChange(socialUrl) {
              return setLabelAccessFlowDetails({
                socialUrl: socialUrl
              });
            },
            onFocus: logSocialLinkFieldFocus,
            value: details.socialUrl,
            forceShowErrors: showErrors,
            error: errors.get('socialUrl')
          })]
        })]
      }), !isCreatingNewTeam && /*#__PURE__*/_jsx(Container, {
        children: /*#__PURE__*/_jsx(TermsAndConditionsCheckbox, {
          termsAndConditionsAgreement: termsAndConditionsAgreement,
          onChange: function onChange() {
            setTermsAndConditionsAgreement(!termsAndConditionsAgreement);
            logTermsAndConditionsCheckbox();
          },
          visibleTermsConditionsError: visibleTermsConditionsError
        })
      }), /*#__PURE__*/_jsxs(ActionContainer, {
        children: [/*#__PURE__*/_jsx("div", {
          children: /*#__PURE__*/_jsx(ButtonSecondary, {
            "data-testid": "back-button",
            type: "button",
            onClick: function onClick() {
              isArtist ? goToArtistAccessFlowStep(ArtistAccessFlowStep.ENTER_EMAIL) : goToLabelAccessFlowStep(LabelAccessFlowStep.ENTER_EMAIL);
              logGoBackButtonClick();
            },
            buttonSize: responsiveStyleProps.buttonSize,
            children: t('ACCESS_USER_DETAILS_FORM_GO_BACK_BUTTON', 'Go back', 'Go back')
          })
        }), /*#__PURE__*/_jsx("div", {
          children: /*#__PURE__*/_jsx(SubmitButton, {
            "data-testid": "submit",
            "data-slo-id": "submit-join-team",
            type: "submit",
            buttonSize: responsiveStyleProps.buttonSize,
            children: isCreatingNewTeam ? t('ACCESS_USER_DETAILS_FORM_NEXT_BUTTON', 'Next', 'Next button') : t('ACCESS_USER_DETAILS_FORM_SUBMIT_BUTTON', 'Submit', 'Submit button')
          })
        })]
      })]
    })
  });
};