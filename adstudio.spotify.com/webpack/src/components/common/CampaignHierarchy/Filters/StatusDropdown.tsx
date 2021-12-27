import React, { ChangeEvent, Component } from 'react';
import i18n from 'i18next';
import styled from 'styled-components';

import { FormSelect } from '@spotify-internal/encore-web';

import { EntityState } from 'types/common/state/api';

const Container = styled.div`
  width: 200px;
`;

export interface Option {
  key: EntityState;
  value: string;
}

export interface StatusDropdownProps {
  onChange: (status: string) => void;
  options: Option[];
  defaultValue?: EntityState;
}

export interface StatusDropdownState {
  selectValue: string;
}

export class StatusDropdown extends Component<
  StatusDropdownProps,
  StatusDropdownState
> {
  state: StatusDropdownState = {
    selectValue: '',
  };

  componentWillUpdate(nextProps: StatusDropdownProps) {
    if (
      nextProps.defaultValue &&
      nextProps.defaultValue !== this.props.defaultValue
    ) {
      this.setState({
        selectValue: nextProps.defaultValue,
      });
    }
  }

  itemOnClick = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    this.setState({
      selectValue: e.target.value,
    });

    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <Container>
        <FormSelect
          data-test="SelectDropdown-Test"
          value={this.state.selectValue}
          onChange={this.itemOnClick}
        >
          <option value="">
            {i18n.t('I18N_ALL_STATUSES', 'All statuses')}
          </option>
          {this.props.options.map((option, key) => (
            <option key={`statusIndicator_${key}`} value={option.key}>
              {option.value}
            </option>
          ))}
        </FormSelect>
      </Container>
    );
  }
}
