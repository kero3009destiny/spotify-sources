import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import FieldWrapper from './fieldWrapper';

type DataType = {
  id: number
  name: string
}

interface IFieldSelectProps {
  label?: string
  name?: string
  selectLabel: string
  data: DataType[]
  callback?: (value:any) => void
  show?: boolean
  separatorIndex?: number;
  isEditable?: boolean;
}

interface IStyledSelectWrapperProps {
  disabled?: boolean
}

const StyledSelectWrapper = styled.div`
  background: white;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    right: 20px;
    top: 50%;
    margin-top: -5px;
    display: block;
    width: 0px;
    height: 0px;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    border-top: 10px solid var(--color-GRIM);
    opacity: ${(props: IStyledSelectWrapperProps) => props.disabled ? 0.35 : null};
  }
`

const StyledSelect = styled.select`
  display: block;
  width: 100%;
  background: none;
  appearance: none;
  font-size: 14px;
  font-weight: 500;
  padding: 13px;
  border: 1px solid var(--color-GRAY-DARK);
  border-radius: 0;
  color: var(--color-GRIM);
  margin-top: 10px;

  &[disabled] {
    opacity: 0.5;
  }
`

const FieldSelect = (props: IFieldSelectProps) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // @ts-ignore
    setData(props.data);
  }, [props.data])

  let options = data.map((c:any, i:number) => <option value={c.id} key={i}>{c.name}</option>)
  if (props.separatorIndex !== undefined) {
    options.splice(props.separatorIndex, 0, <option disabled className="">─────────────────────────────────────</option>)
  }

  return (
    <FieldWrapper
      label={props.label}
      name={props.name}
    >
      <StyledSelectWrapper
        disabled={!props.isEditable}
      >
        <StyledSelect
          id={props.name}
          name={props.name}
          disabled={!props.isEditable}
          onChange={
            (e) => {
              if (typeof props.callback === 'function') {
                props.callback(e)
              }
            }
          }>
          <option value="0">{props.selectLabel}</option>
          {options}
        </StyledSelect>
      </StyledSelectWrapper>
    </FieldWrapper>
  )
}

FieldSelect.defaultProps = {
  show: true,
  isEditable: true
}

export default FieldSelect;
