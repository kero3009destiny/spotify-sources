import React from 'react';
import styled from 'styled-components';


interface IFabButton {
  clickBack?: () => void
  toggler: boolean
}

interface IStyledFabMenuProps {
  open: boolean
}

const StyledFab = styled.button`
  display: block;
  background: ${(p: IStyledFabMenuProps) => p.open ? 'black' : 'var(--color-BRAND-GREEN)'};
  padding: 23px;
  color: var(--color-SNOW);
  font-weight: bold;
  font-size: 1.6rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius:100px;
  position: relative;
  z-index: 2;
  transition: all .4s;
  cursor: pointer;
  transform: ${(p: IStyledFabMenuProps) => p.open ? 'rotate(-45deg)' : 'rotate(0deg)'};
  transition-delay: ${(p: IStyledFabMenuProps) => p.open ? '0s' : '.6s'};
  span{
    display: inline-block;
    width: 21px;
    height: 21px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: center center;
    transform: translate(-50%, -50%);
    &:before, &:after{
      content: '';
      display: block;
      height: 4px;
      width: 100%;
      background: var(--color-SNOW);
      position: absolute;
      top: 50%;
    }
    &:before{
      transform: translateY(-50%) rotate(-90deg);
    }
    &:after{
      transform: translateY(-50%) rotate(0deg);
    }
  }
`;

const FabButton = (props: IFabButton) => {
  const clickHandler = (e:any) => {
    if (typeof props.clickBack === 'function') {
      props.clickBack();
    }
    e.preventDefault();
  }

  return (
    <StyledFab
      onClick={(e:any) => clickHandler(e)}
      open={props.toggler}
    >
      <span></span>
    </StyledFab>
  )
}


export default FabButton;
