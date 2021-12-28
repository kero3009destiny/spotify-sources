import React from 'react';
import styled from 'styled-components';
import { Heading2 } from '../../client/01_atoms/heading';
import Button from '../../common/01_atoms/button'

const MobileBlockerMessage = styled.div`
  display: none;
  padding: 5vw;

  & > * + * {
    margin-top: 1em;
  }
`

const MobileBlockerContent = styled.div``

const MobileBlockerContainer = styled.div`
  @media (max-width: 1024px) {
    display: flex;
    height: 100vh;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: var(--color-DODGER-BLUE);
    color: var(--color-SNOW);

    ${MobileBlockerMessage} { display: block; }
    ${MobileBlockerContent} { display: none; }
  }
`

const MobileBlockerAction = styled.button`
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: block;
  position: absolute;
  top: 5vw;
  right: 5vw;
  width: 2.5em;
  height: 2.5em;

  span {
    font-size: 0;
    color: transparent;
  }

  div {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    background-color: white;
    margin-top: -2px;

    &:nth-child(1) { transform: rotate(45deg); }
    &:nth-child(2) { transform: rotate(-45deg); }
  }
`

interface IMobileBlockerProps {
  forceDisplay?: boolean
  children: any
}

function MobileBlocker ({ forceDisplay, children }: IMobileBlockerProps) {
  if (forceDisplay || process.env.ENVIRONMENT !== 'production') {
    return <React.Fragment>{children}</React.Fragment>
  }

  return (
    <MobileBlockerContainer>
      <MobileBlockerAction onClick={() => history.back()}>
        <div /><div />
        <span>Back</span>
      </MobileBlockerAction>
      <MobileBlockerMessage>
        <Heading2>Soundcheck’s admin panel isn’t quite ready for mobile so head to the nearest laptop, or get started learning.</Heading2>
        <p><Button variant="dark-blue" href="/lessons" label="Begin Lessons" /></p>
      </MobileBlockerMessage>
      <MobileBlockerContent>{children}</MobileBlockerContent>
    </MobileBlockerContainer>
  )
}

export default MobileBlocker
