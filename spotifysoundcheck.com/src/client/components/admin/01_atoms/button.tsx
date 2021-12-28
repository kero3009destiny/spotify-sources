import React from 'react';
import styled from 'styled-components';

interface IDownloadButton {
  link: string
  label: string
  file?: boolean
  clickBack?: () => void
  className?:string
  submit?: boolean
}

const StyledDownloadLink = styled.a`
  display: inline-block;
  padding: 13px 40px;
  background: black;
  text-transform: uppercase;
  color: var(--color-SNOW);
  text-transform: uppercase;
  border-radius:  100px;
  font-size: 1.4rem;
  text-decoration: none;
  cursor: pointer;
`;

const StyledDownloadButton = styled.button`
  display: inline-block;
  padding: 13px 40px;
  background: black;
  text-transform: uppercase;
  color: var(--color-SNOW);
  text-transform: uppercase;
  border-radius:  100px;
  font-size: 1.4rem;
  text-decoration: none;
  cursor: pointer;
`;

const Button = (props: IDownloadButton) => {
  const clickHandler = (e:any) => {
    if(typeof props.clickBack === 'function') {
      props.clickBack();
      e.preventDefault();
    }
  }
  const getButton = () => {
    // if not a submit button use a link button with more options
    if (!props.submit) {
      // if it's a file  make sure to add {download} attribute
      if (props.file) {
        return (
          <StyledDownloadLink 
            className={props.className}
            href={props.link}
            onClick={(e) => clickHandler(e)}
            download 
          >
            {props.label}
          </StyledDownloadLink>
        )
      } else {
        return  (
          <StyledDownloadLink
            className={props.className}
            href={props.link}
            onClick={(e) => clickHandler(e)}
          >
            {props.label}
          </StyledDownloadLink>
        )
      }
    // if it a submit button return minimal attributes
    } else {
      return (
        <StyledDownloadButton className={props.className}>
          {props.label}
        </StyledDownloadButton>
      )
    }

  }
  return (
    <>
      {getButton()}
    </>
  )
}


Button.defaultProps = {
  file: false
}

export default Button;