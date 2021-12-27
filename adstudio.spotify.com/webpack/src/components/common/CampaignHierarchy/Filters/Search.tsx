import React, { ChangeEvent, PureComponent, RefObject } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';

import {
  FormInput,
  FormInputIcon,
  IconSearch,
} from '@spotify-internal/encore-web';

export const DEBOUNCE_TIMEOUT = 200;

export type SearchProps = React.HTMLAttributes<HTMLInputElement> & {
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
  'data-test'?: string;
  skipInputValueOverride?: boolean;
};

export const SearchContainer = styled.div`
  min-width: 375px;
`;

export class Search extends PureComponent<SearchProps> {
  debouncedHandler = debounce((evt: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(evt);
  }, DEBOUNCE_TIMEOUT);

  searchInput: RefObject<HTMLInputElement>;

  constructor(props: SearchProps) {
    super(props);
    this.searchInput = React.createRef();
  }

  componentWillReceiveProps(nextProps: SearchProps) {
    // Pre-fill the search input text based on the query param, so that it matches in
    // cases where the user has not typed it themselves (e.g. if the user navigates to
    // the URL directly, or loads a saved filter)
    // Due to debouncing, the input cannot be set up as controlled directly
    const hasNewDefaultValue =
      this.props.defaultValue !== nextProps.defaultValue;

    if (
      hasNewDefaultValue &&
      this.searchInput.current &&
      !this.props.skipInputValueOverride
    ) {
      this.searchInput.current.value = nextProps.defaultValue || '';
    }
  }

  render() {
    const { name, placeholder, disabled, className, onBlur } = this.props;

    return (
      <SearchContainer className={className}>
        <FormInputIcon iconLeading={<IconSearch />}>
          <FormInput
            onBlur={onBlur}
            ref={this.searchInput}
            name={name}
            type="text"
            placeholder={placeholder}
            disabled={disabled}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              evt.persist();
              this.debouncedHandler(evt);
            }}
            data-test={this.props['data-test'] || 'dashboard-search-input'}
          />
        </FormInputIcon>
      </SearchContainer>
    );
  }
}
