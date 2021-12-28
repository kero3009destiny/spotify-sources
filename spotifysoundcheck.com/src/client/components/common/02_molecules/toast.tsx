import React, {useEffect, useState} from 'react';
import styled, {FlattenSimpleInterpolation,css} from 'styled-components';
import CloseIcon from '../../../../static/images/icons/close.svg';

interface IToastProps {
  type: string
  message: string
  ready: boolean
  status: string
  hideAction: () => void
}

interface IStyledToast {
  type: string
  status: string
  ready: boolean
}

const getToastStyle = (type:string) => {
  let styles:FlattenSimpleInterpolation;
  switch(type) {
    case 'error':
      styles = css`
        background: red;
      `;
      break;
    default:
      styles = css`
        background: black;
      `;
      break;
  }
  return styles;
}

const StyledToast = styled.div`
  ${(p: IStyledToast) => getToastStyle(p.status)}
  padding: 25px;
  width: 100vw;
  opacity: .01;
  padding: 0px 25px;
  margin-bottom: 0px;
  max-height: 0px;
  z-index: 1;
  transition: all .4s;
  box-shadow: 0 0 20px rgba(0,0,0,.4);
  p{
    color: var(--color-SNOW);
    font-size: 1.6rem;
    text-transform: capitalize;
    flex: 1;
    margin: 0 1em;
    text-align: center;
  }
  &.toast-enter{
    opacity: .01;
    padding: 0px 25px;
    margin-bottom: 0px;
    max-height: 0px;
    z-index: 1;
  }
  &.toast-enter-done{
    opacity: 1;
    padding: 25px 25px;
    margin-bottom: 20px;
    max-height: 90px;
  }
  &.toast-exit{
    opacity: .01;
    padding: 0px 25px;
    margin-bottom: 0px;
    max-height: 0px;
    z-index: 0;
  }
  &.toast-exit-active{
    opacity: .01;
    margin-bottom: 0px;
    max-height: 0px;
  }
`;

const StyledWrapper = styled.div`
  max-width: 1440px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;

const StyledCloseIcon = styled.img`
  display: block;
  height: 24px;
  width: 24px;
  margin-right: 16px;
  cursor: pointer;
`;

const Toast = (props: IToastProps) => {
  return (
    <StyledToast type={props.type} ready={props.ready} status={props.status}>
      <StyledWrapper>
        <p>{props.message}</p>
        <StyledCloseIcon src={CloseIcon} onClick={props.hideAction} />
      </StyledWrapper>
    </StyledToast>
  )
}

Toast.defaultProps = {
  type: 'success'
}

export default Toast;