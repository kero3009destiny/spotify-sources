import React from 'react'
import styled from 'styled-components';
import { connect } from "react-redux";
import {
  setLoadingBegin,
  setLoadingFinished
} from "../../../actions/contentLoadingAction";
import { setNotification } from "../../../actions/notificationAction";
import Cookie from "js-cookie";

interface IReInviteLinkProps {
  companyEmail: string
  setLoadingBegin: () => void;
  setLoadingFinished: () => void;
  setNotification: (message: any) => void;
}

const StyledContainer = styled.span`
  display: inline-block;
  font-weight: normal;
  font-size: 1.3rem;

  button {
    appearance: none;
    background-color: transparent;
    border: none;
    border-radius: 0;
    color: var(--color-TUNDORA);
    font-size: 1em;
    cursor: pointer;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`

const ReInviteLink = (props: IReInviteLinkProps) => {
  const handleClick = (ev: any) => {
    const payload = { company_email: props.companyEmail }
    ev.preventDefault()
    props.setLoadingBegin();
    fetch("/api/reinvite", {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "CSRF-TOKEN": Cookie.get("XSRF-TOKEN")
      }
    })
    .then((res) =>  res.json())
    .then((data) => {
      props.setLoadingFinished();
      if (typeof data.success !== 'undefined') {
        props.setNotification({
          status: 'success',
          type: 'profile',
          message: 'User invite sent.'
        })
        return data
      } else {
        const {error} = data;
        props.setNotification({
          status: 'error',
          type: 'profile',
          message: error
        });
      }
    })
    .catch(err => {
      props.setLoadingFinished();
    });
  }

  return <StyledContainer><button onClick={handleClick}>re-invite?</button></StyledContainer>
}

export default connect(
  null,
  { setLoadingBegin, setLoadingFinished, setNotification }
)(ReInviteLink)
