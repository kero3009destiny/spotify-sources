import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushAC } from 'react-router-redux';
import i18n from 'i18next';
import { get, pick } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { compose } from 'recompose';
import {
  change,
  formValueSelector,
  submit,
  touch as touchAC,
} from 'redux-form';
import styled from 'styled-components';

import { ButtonPrimary } from '@spotify-internal/adstudio-shared/lib/components/CustomEncore';
import {
  cssColorValue,
  NavStepper,
  NavStepperItem,
  semanticColors,
  Type,
} from '@spotify-internal/encore-web/';

import {
  logTaggableAction as logTaggableActionAC,
  logUserAction as logUserActionAC,
} from 'ducks/analytics/actions';
import { addAccount as addAcountAC } from 'ducks/signup/actions';
import { triggerHardRedirect as triggerHardRedirectAC } from 'ducks/window/actions';
import { getGAPartnerId } from 'ducks/analytics/selectors';
import { getSignupErrors, getSignUpLoading } from 'ducks/signup/selectors';
import {
  getUserEmail,
  getUserFullName,
  getUserImg,
} from 'ducks/user/selectors';

import {
  BUSINESS_EMAIL_FORM_INPUT_NAME,
  default as AccountForm,
  FIRST_NAME_FORM_INPUT_NAME,
  INPUTS as ACCOUNT_FORM_INPUTS,
  LAST_NAME_FORM_INPUT_NAME,
} from 'components/common/AccountForm';
import UserBadge from 'components/common/AccountForm/UserBadge';
import AuthenticationRequired from 'components/Redirects/AuthenticationRequired';

import Card from '../Card';

import { SignupBreakpointMid, TAB_NAMES } from '../constants';
import { ACCOUNT_REDUX_FORM_ID } from 'config/account';
import { SIGNUP_VIEW } from 'config/googleTagManager';
import { routes } from 'config/routes';

import PropTypes from 'prop-types';

const CtaContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalBody = styled.div`
  padding: 0 32px 16px;
`;

const LeftNavStepper = styled(NavStepper)`
  text-align: left;
  margin-bottom: 16px !important;

  @media (${SignupBreakpointMid}) {
    text-align: center;
  }
`;

const ClickyStepperItem = styled(NavStepperItem)`
  cursor: pointer; /* todo: reflect disabled? */
  ${props =>
    props.active &&
    `color: var(${cssColorValue(semanticColors.textBrightAccent)})`}
`;

const SignupFormFlow = styled.div`
  margin-left: auto;
  width: 100%;
`;

const UserBadgeWithMargin = styled(UserBadge)`
  margin-bottom: 32px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 90px;

  @media (${SignupBreakpointMid}) {
    display: block;
  }
`;

const RightAlign = styled.div`
  text-align: right;
`;

const DisplayText = styled(Type.h1)`
  padding-bottom: 20px;
  margin-top: 50px !important; /* why? */

  @media (${SignupBreakpointMid}) {
    margin-top: 0 !important;
    padding-bottom: 0 !important;
    font-size: 24px;
    text-align: center;
    letter-spacing: -0.03em;
  }
`;

const SubCopyText = styled(Type.h1)`
  @media (${SignupBreakpointMid}) {
    display: none;
  }
`;

const MarketingImgNew = styled.img`
  position: absolute;
  height: 58vh;
  bottom: 0;
  left: 0;

  @media (${SignupBreakpointMid}) {
    display: none;
  }
`;

const LeftContent = styled.div`
  height: calc(
    100vh - 94px - 34px
  ); // Full height minus the padding and navbar, so the img can be flush with the bottom of the screen

  @media (${SignupBreakpointMid}) {
    height: auto;
  }
`;

const guessFirstAndLastName = string => {
  const firstSpaceIndex = string.indexOf(' ');
  if (firstSpaceIndex === -1) return [string];
  return [
    string.substr(0, firstSpaceIndex),
    string.substr(firstSpaceIndex + 1),
  ];
};

export class SignupForm extends Component {
  state = {
    activeTab: TAB_NAMES.LOGIN_INFO,
  };

  componentDidMount() {
    if (this.props.userEmail) {
      this.props.change(
        ACCOUNT_REDUX_FORM_ID,
        BUSINESS_EMAIL_FORM_INPUT_NAME,
        this.props.userEmail,
      );
    }

    this.props.logTaggableAction(SIGNUP_VIEW);

    this.props.logUserAction({
      category: 'Account Setup',
      label: 'land_on_account_setup',
      params: {
        version: 'Refresh May 2020',
      },
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.country !== prevProps.country) {
      this.props.logUserAction({
        category: 'Account Setup',
        label: 'change_country',
        params: {
          country: this.props.country,
        },
      });
    }
  }

  handleSubmit = () => {
    const { reduxFormSubmit } = this.props;

    // Not sure why I had to add this here too. Submit used to validate on its own?
    if (!isEmpty(this.props.signupFormErrors)) {
      this.triggerAnyErrors();
      return;
    }
    reduxFormSubmit();
  };

  onClickLoginInfo = () => {
    this.setState({
      activeTab: TAB_NAMES.LOGIN_INFO,
    });
  };

  onClickBusinessInfo = () => {
    if (!isEmpty(this.props.signupFormErrors)) {
      this.triggerAnyErrors();
      return;
    }
    this.setState({
      activeTab: TAB_NAMES.BUSINESS_INFO,
    });
  };

  triggerAnyErrors = () => {
    this.props.touch(
      ACCOUNT_REDUX_FORM_ID,
      ...Object.keys(this.props.signupFormErrors),
    );
  };

  getFormInitialValues() {
    const valuesFromQuery = pick(
      get(this.props, 'router.location.query', {}),
      ...ACCOUNT_FORM_INPUTS,
    );

    const [guessedFirstName, guessedLastName] = guessFirstAndLastName(
      this.props.userFullName,
    );

    return {
      ...valuesFromQuery,
      [FIRST_NAME_FORM_INPUT_NAME]: guessedFirstName,
      [LAST_NAME_FORM_INPUT_NAME]: guessedLastName,
    };
  }

  switchAccount = async () => {
    const { triggerHardRedirect } = this.props;
    const returnUrl = `${window.location.origin}${routes.ADSTUDIO_SIGNUP}?${window.location.search}`;
    await triggerHardRedirect(
      `https://accounts.spotify.com/logout?continue=${encodeURIComponent(
        returnUrl,
      )}`,
    );
  };

  render() {
    const {
      isFormSubmitting,
      logUserAction,
      reduxFormSubmit,
      userEmail,
      userFullName,
      userImg,
      addAccount,
      partnerID,
    } = this.props;

    const accountFormSubmissionHandler = submission => {
      const partnerValue = partnerID || '';
      addAccount(submission, partnerValue);
    };

    return (
      <AuthenticationRequired
        redirectUrl={`${routes.ADSTUDIO_SIGNUP}${routes.LOGIN}`}
      >
        <Container data-test="signup-flow-form">
          <LeftContent>
            <DisplayText
              variant={Type.heading1}
              semanticColor={semanticColors.textBrightAccent}
              condensed
            >
              {i18n.t(
                'I18N_AD_STUDIO_GETS_YOUR_MESSAGE',
                'Ad\u00A0Studio gets your message heard.',
              )}
            </DisplayText>
            <SubCopyText variant={Type.body1}>
              {i18n.t(
                'I18N_ADVERTISING_IS_EASY',
                'Advertising on Spotify is easy with our self-serve ad platform. Sign up and get started in minutes — we’ll even help you create audio ads for free.',
              )}
            </SubCopyText>
            <MarketingImgNew
              alt={i18n.t('I18N_FIXME', 'A hand holding a phone')}
              src="https://adstudio.scdn.co/assets/signup-images/hand-phone-2.png"
            />
          </LeftContent>
          <SignupFormFlow>
            <LeftNavStepper>
              <ClickyStepperItem
                active={this.state.activeTab === TAB_NAMES.LOGIN_INFO}
                onClick={this.onClickLoginInfo}
              >
                {i18n.t('I18N_LOGIN_INFO', 'Login Info')}
              </ClickyStepperItem>
              <ClickyStepperItem
                active={this.state.activeTab === TAB_NAMES.BUSINESS_INFO}
                onClick={this.onClickBusinessInfo}
              >
                {i18n.t('I18N_BUSINESS_INFO', 'Business Info')}
              </ClickyStepperItem>
            </LeftNavStepper>
            <Card>
              {this.state.activeTab === 'LOGIN_INFO' && (
                <UserBadgeWithMargin
                  email={userEmail}
                  imgSrc={userImg}
                  onChange={() => {
                    logUserAction({
                      category: 'Account Setup',
                      label: 'click_change',
                    });

                    this.switchAccount();
                  }}
                  showCTA
                  ctaName={i18n.t(
                    'I18N_ACCOUNT_MANAGEMENT_BUTTON_CHANGE_USER',
                    'Change',
                  )}
                  truncateEmail
                  userName={userFullName}
                  subcopy={i18n.t(
                    'I18N_THIS_IS_THE_SPOTIFY_ACCOU',
                    "This is the Spotify account you'll use to log into Ad Studio",
                  )}
                />
              )}
              <AccountForm
                hasTabs
                initialValues={this.getFormInitialValues()}
                allowAllCountries
                showNameFields
                onSubmit={accountFormSubmissionHandler}
                activeTab={this.state.activeTab}
              />
              {this.state.activeTab === TAB_NAMES.LOGIN_INFO && (
                <RightAlign>
                  <ButtonPrimary
                    disabled={!isEmpty(this.props.signupFormErrors)}
                    onClick={this.onClickBusinessInfo}
                    data-test="SUBMIT_LOGIN_INFO_BUTTON"
                    buttonLegacy
                  >
                    {i18n.t('I18N_NEXT', 'Next')}
                  </ButtonPrimary>
                </RightAlign>
              )}
              {this.state.activeTab === TAB_NAMES.BUSINESS_INFO && (
                <RightAlign>
                  <ButtonPrimary
                    type="submit"
                    disabled={isFormSubmitting}
                    onClick={this.handleSubmit}
                    buttonLegacy
                  >
                    {i18n.t('I18N_SIGN_UP', 'Sign Up')}
                  </ButtonPrimary>
                </RightAlign>
              )}
            </Card>
          </SignupFormFlow>
        </Container>
      </AuthenticationRequired>
    );
  }
}

SignupForm.propTypes = {
  change: PropTypes.func.isRequired,
  country: PropTypes.string,
  features: PropTypes.objectOf(PropTypes.bool),
  isFormSubmitting: PropTypes.bool,
  logTaggableAction: PropTypes.func.isRequired,
  logUserAction: PropTypes.func.isRequired,
  pushHistory: PropTypes.func.isRequired,
  reduxFormSubmit: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  userEmail: PropTypes.string,
  userFullName: PropTypes.string.isRequired,
  userImg: PropTypes.string,
  triggerHardRedirect: PropTypes.func,
  addAccount: PropTypes.func.isRequired,
  signupFormErrors: PropTypes.Object,
  touch: PropTypes.func,
  partnerID: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const country = formValueSelector(ACCOUNT_REDUX_FORM_ID)(state, 'country');

  return {
    country,
    signupFormErrors: getSignupErrors(state),
    isFormSubmitting: getSignUpLoading(state),
    userEmail: getUserEmail(state),
    userImg: getUserImg(state),
    userFullName: getUserFullName(state),
    partnerID: getGAPartnerId(state),
  };
}

export default compose(
  connect(mapStateToProps, {
    change,
    logUserAction: logUserActionAC,
    logTaggableAction: logTaggableActionAC,
    pushHistory: pushAC,
    reduxFormSubmit: () => submit(ACCOUNT_REDUX_FORM_ID),
    submit,
    triggerHardRedirect: triggerHardRedirectAC,
    addAccount: addAcountAC,
    touch: touchAC,
  }),
  withRouter,
)(SignupForm);
