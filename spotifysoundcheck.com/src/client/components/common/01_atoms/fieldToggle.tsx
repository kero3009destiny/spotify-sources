import React from 'react';
import styled from 'styled-components';

interface IFieldToggleProps {
  type: "radio" | "checkbox"
  label: string
  title: string
  value?: boolean
  name?: string
  isEditable?: boolean
  onChange?: (e:any) => void
}

const StyledField = styled.fieldset`
  display: block;
  width: 100%;
  h4{
    font-size: 1.4rem;
    margin-bottom: 20px;
    text-transform: capitalize;
  }
  label{
    display: inline-flex;
    align-items: flex-start;
    position: relative;
    padding-left: 40px;
    margin-bottom: 12px;
    font-weight: 300;
    cursor: pointer;
    user-select: none;
    justify-content: space-around;
    input{
      display: block;
      position: absolute;
      opacity: 0;
      height: 0;
      width: 0;
    }
    span{
      position: absolute;
      top: -3px;
      left: 0;
      height: 25px;
      width: 25px;
      background-color: var(--color-SNOW);
      border: 1px solid var(--color-GRAY-MEDDARK);
      border-radius: 5px;
      &:after {
        content: "";
        position: absolute;
        display: none;
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid black;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
      }
    }
    input:checked ~ span:after {
      display: block;
    }
    input:disabled ~ span:after {
      border-color: var(--color-GRAY-DARK);
    }
  }
`;

const FieldToggle = (props: IFieldToggleProps) => {
  const changeCallback = (e:any) => {
    if (typeof props.onChange === 'function') {
      return props.onChange(e);
    }
  }
  return (
    <StyledField>
      <h4>{props.title}</h4>
      <label>
        {props.label}
        <input
          type={props.type}
          name={props.name}
          defaultChecked={props.value}
          onChange={(e) => changeCallback(e)}
          disabled={!props.isEditable}
        />
        <span></span>
      </label>
    </StyledField>
  )
}


export default FieldToggle;