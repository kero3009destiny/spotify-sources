import React from 'react';
import styled from 'styled-components';
import Icon from './svgIcon';
const defaultIcon = require("../../../../static/images/icons/creative.svg");

interface IMenuItemProps {
  title: string
  icon?: string
  className?: string
  clickCallback?: () => void
}

const StyledMenuItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  button{
    background: none;
    display: inline-block;
    cursor: pointer;
  }
  span{
    display: block;
    width: 100%;
    max-width: 30px;
    margin-right: 10px;
  }

  &:last-child {
    margin-bottom: 0;
  }

  & > *{color: white};
`;

const MenuItem = (props: IMenuItemProps) => {
  return (
    <StyledMenuItem onClick={() => {
        if (typeof props.clickCallback === 'function') {
          props.clickCallback();
        }
      }
    } className={props.className}>
      <Icon src={props.icon ? props.icon : defaultIcon} />
      <button>
      {props.title}
      </button>
    </StyledMenuItem>
  )
}

export default MenuItem;
