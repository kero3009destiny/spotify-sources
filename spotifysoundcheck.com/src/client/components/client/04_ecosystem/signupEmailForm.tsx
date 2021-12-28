import React, { FormEvent, useState } from "react";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import styled from "styled-components";
import { openModal } from "../../../actions/modalAction";
import {
  setLoadingBegin,
  setLoadingFinished
} from "../../../actions/contentLoadingAction";
import {setNotification} from '../../../actions/notificationAction';
import FieldGroup from "../../common/02_molecules/fieldGroup";
import Field from "../../common/01_atoms/field";
import FormButton from "../../common/01_atoms/formButton";
import { ExtraSmallText } from "../../common/01_atoms/text";
const checkEmailImage = require('~/static/images/global/check-email-icon.svg');
const closeIcon = require('~/static/images/icons/close-black.svg');


const StyledHeader = styled.h2`
  text-align: center;
  padding-top: 50px;
  padding-bottom: 10px;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  & button {
    background-color: var(--color-BRAND-GREEN);
    border: 0;
  }
`;

const StyledCancelButton = styled(ExtraSmallText)`
  text-align: center;
  margin-top: 16px;
  a {
    color: var(--color-GRAY-DARK);
    text-decoration: underline;
    font-weight: normal;
    cursor: pointer;
  }
`;

const StyledCloseIcon = styled.div`
  text-align: right;
  margin-top: -20px;
  margin-right: -20px;
  margin-bottom: 20px;
`

const StyledInviteSentImage = styled.img`
  display: block;
  margin: 0 auto 40px;
`

const StyledInviteSentText = styled.h1`
  text-align: center;
  padding-bottom: 20px;
`

interface ISignupEmailFormProps {
  setLoadingBegin: () => void;
  setLoadingFinished: () => void;
  setNotification: (message:any) => void
  closeModal: () => void;
}

const SignupEmailForm = (props: ISignupEmailFormProps) => {
  const [inviteSent, setInviteSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      email: new FormData(e.target as HTMLFormElement).get("email")
    };
    props.setLoadingBegin();
    fetch("/api/user/emailCheck", {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "CSRF-TOKEN": Cookie.get("XSRF-TOKEN")
      }
    })
      .then(res => {
        if (res.ok) {
          setInviteSent(true);
        } else {
          res.json().then(err => {
            if(err.error === 'Invalid Email') {
              props.setNotification({
                status: 'error',
                type: 'signup',
                message: 'Sorry, that is not a valid email address.'
              });
            }
          });
        }
      }).catch(err => {
        console.log("error", err);
      }).finally(() => props.setLoadingFinished());
  };

  return inviteSent ? (
    <>
      <StyledCloseIcon>
        <img src={closeIcon} onClick={props.closeModal} />
      </StyledCloseIcon>

      <StyledInviteSentImage src={checkEmailImage} />

      <StyledInviteSentText>
        Check your email for an<br />
        invite to Spotify Soundcheck.
      </StyledInviteSentText>

      <StyledCancelButton>
        <a onClick={props.closeModal}>Cancel</a>
      </StyledCancelButton>
    </>
  ) : (
    <form onSubmit={handleSubmit}>
      <StyledHeader>All we need is an email!</StyledHeader>

      <FieldGroup split={1} noBorder>
        <Field
          label=""
          placeholder="email@emailsuffix.com"
          name="email"
          type="email"
          isBordered
        />
      </FieldGroup>
      <StyledButtonWrapper>
        <FormButton label="Continue" type="submit" />
      </StyledButtonWrapper>
      <StyledCancelButton>
        <a onClick={props.closeModal}>Cancel</a>
      </StyledCancelButton>
    </form>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setLoadingBegin: () => dispatch(setLoadingBegin()),
  setLoadingFinished: () => dispatch(setLoadingFinished()),
  setNotification: (message:any) => dispatch(setNotification(message)),
  closeModal: () => dispatch(openModal(false))
});

export default connect(
  null,
  mapDispatchToProps
)(SignupEmailForm);
