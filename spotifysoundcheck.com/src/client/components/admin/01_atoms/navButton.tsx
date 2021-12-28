import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Icon from './svgIcon';
import {withRouter} from 'react-router-dom';

interface INavButtonProps {
  title: string
  to: string
  icon?:string
  location: any
  match: any
  history: any
}

interface IStyledButton {
  active: boolean
}

const StyledNavButton = styled.a`
  font-size: 1.4rem;
  font-weight: bold;
  font-family: var(--font-PRIMARY);
  cursor: pointer;
  text-decoration: none;
  color: black;
  && {
    display: flex;
    align-items: center;
  }
  span{
    display: block;
    width: 100%;
    max-width: 30px;
    margin-right: 10px;
    height: 20px;
  }
  padding: 10px 10px 10px 20px;
  background: ${(p: IStyledButton) => p.active ? '#1C1C1C' : 'var(--color-DARKNESS)'};
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  svg{
    rect{
    fill: ${(p: IStyledButton) => p.active ? '#1C1C1C' : 'var(--color-DARKNESS)'};
    }
  }
`;

const NavButton = (props: INavButtonProps) => {
  return (
    <StyledNavButton 
      active={props.location.pathname === props.to}
      onClick={
        (e:any) => {
          props.history.push(props.to);
          e.preventDefault()
        }
      }
    >
      {props.icon && <Icon src={props.icon} />}
      <div>
        {props.title}
      </div>
    </StyledNavButton>
  )
}

NavButton.defaultProps = {
  to: "/"
}

export default withRouter(NavButton);