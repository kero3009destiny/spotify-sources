import React, { FormEvent, FunctionComponent } from 'react';
import styled from 'styled-components';

import {
  cssColorValue,
  FormRadio,
  semanticColors,
  spacer4,
  spacer16,
  Type,
} from '@spotify-internal/encore-web';

import { formRadioOverrides, iconColorSet } from 'components/common/styles';

export const RadioPanel = styled.div<{ checked: boolean }>`
  display: inline-block;
  :last-child {
    margin-right: 0;
  }
  background-color: ${cssColorValue(semanticColors.backgroundBase)};
  box-shadow: 0 1px 3px ${cssColorValue(semanticColors.backgroundElevatedPress)};
  border-radius: ${spacer4};
  padding: ${spacer16};

  ${formRadioOverrides}

  input + label > span:first-of-type {
    align-self: center;
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  gap: ${spacer16};
  align-items: center;
`;

export interface RadioProps {
  checked: boolean;
  value: string;
  onChange: (evt: FormEvent) => void;
  name: string;
  label: string | React.ReactElement;
  icon: React.ReactElement;
  description: string;
  className?: string;
  disabled?: boolean;
}

export const Radio: FunctionComponent<RadioProps> = ({
  checked,
  value,
  onChange,
  name,
  label,
  icon,
  description,
  className,
  disabled,
  ...rest
}: RadioProps) => (
  <RadioPanel
    className={`${className} ${iconColorSet(checked)}`}
    checked={checked}
  >
    <FormRadio
      {...rest}
      checked={checked}
      defaultChecked={checked}
      value={value}
      id={value}
      onChange={onChange}
      name={name}
      disabled={disabled}
    >
      <LabelContainer>
        <div>{icon}</div>
        <div>
          <div>
            <Type
              condensed
              variant={Type.body1}
              semanticColor={semanticColors.textBase}
            >
              {label}
            </Type>
          </div>
          <div>
            {description ? (
              <Type
                as="p"
                condensed
                variant={Type.body2}
                semanticColor={
                  checked ? semanticColors.textBase : semanticColors.textSubdued
                }
              >
                {description}
              </Type>
            ) : null}
          </div>
        </div>
      </LabelContainer>
    </FormRadio>
  </RadioPanel>
);
