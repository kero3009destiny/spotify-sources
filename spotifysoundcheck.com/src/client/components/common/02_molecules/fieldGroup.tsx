import React, {ReactNode} from 'react';
import styled from 'styled-components';

interface IFieldGroup {
  split: number
  children: ReactNode
  show?: boolean
  noBorder?: boolean
}

interface IStyledFieldGroup {
  split: number
  show?: boolean
  noBorder?: boolean
}

const margin = 2;
const StyledFieldGroup = styled.div`
  display: ${(p: IStyledFieldGroup) => p.show ? 'flex' : 'none'};
  margin-bottom: 20px;
  border-bottom: ${(p: IStyledFieldGroup) => p.noBorder ? 'none' : '1px solid rgba(0,0,0,.2)'};
  padding-bottom:  20px;
  align-items: stretch;
  width: 100%;

  & > * {
    width: ${(p: IStyledFieldGroup) => p.split > 1 ? 100/p.split - ((p.split - 1) * margin) : 100}%;
    margin-right: ${(p: IStyledFieldGroup) => p.split > 1 ? p.split * margin : 0}%;
    &:last-child{margin-right: 0;}
  }

  @media (max-width: 1024px) {
    flex-direction: column;

    & > * {
      width: 100%;
      margin-right: 0;

      & + * {
        margin-top: 40px;
      }
    }
  }
`;

const FieldGroup = (props: IFieldGroup) => {
  return (
    <StyledFieldGroup split={props.split} show={props.show} noBorder={props.noBorder}>
      {props.children}
    </StyledFieldGroup>
  )
}

FieldGroup.defaultProps = {
  show: true
}

export default FieldGroup;
