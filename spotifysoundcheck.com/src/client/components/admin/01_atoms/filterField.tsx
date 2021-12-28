import React, { useState } from 'react';
import Field from '../../common/01_atoms/field';
import styled from 'styled-components';


interface IFilterField {
  label: string
  name: string
  type: string
  operatorClickback?: (operator:string, name:string) => void
}

const StyledFilterField =  styled(Field)`
  margin-bottom: 25px;
  z-index: 0;
  position:relative;
  & > div{
    border: 1px solid var(--color-SNOW);
  }
  label{
    background: var(--color-DARKNESS);
    color: var(--color-SNOW);
  }
  div{
    background: var(--color-DARKNESS);
    div{
      background: none;
      input{
        color: var(--color-SNOW);
        font-size: 1.4rem;
      }
    }
  }
`

const StyledFieldContainer = styled.div`
  position: relative;
`;

const StyledOperator = styled.a`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  background: var(--color-SNOW);
  color: var(--color-DARKNESS);
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 1.2rem;
`;

const FilterField = (props: IFilterField) => {
  const [operator, setOperator] = useState('greater');

  const toggleOperator = (e:any) => {
    const flip = operator === 'greater' ? 'less' : 'greater';
    setOperator(flip);
    if (typeof props.operatorClickback === 'function') {
      props.operatorClickback(flip, props.name)
    }
    e.preventDefault();
  }

  return (
    <StyledFieldContainer>
      <StyledFilterField 
        label={props.label}
        name={props.name}
        type={props.type}
      />
      {
        props.type === 'number' && 
        <StyledOperator 
          href="operator" 
          onClick={(e) => toggleOperator(e)}
        >
          {operator}
        </StyledOperator>
      }
      {props.type === 'number' && <input type="hidden" name={`${props.name}_operator`} value={operator}/>}
    </StyledFieldContainer>
  )
}


export default FilterField;