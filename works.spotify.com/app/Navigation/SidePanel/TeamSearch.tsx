import React, { createRef, forwardRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
  addColorSet,
  gray30,
  IconSearch,
  VisuallyHidden,
  screenSmMin,
  screenXsMax,
  spacer24,
} from '@spotify-internal/encore-web';

import { useViewport, Viewport } from 'libs/utils/useViewport';
import { CloseButton, Input, SearchButtonIcon, SearchFormInputIcon } from 'components/SidePanel';
import { useSidePanel, setSearchValue, showSearch, hideSearch } from './SidePanelState';
import { selectTeam } from '.';

const InputWrapper = styled.div`
  line-height: 0;
  position: relative;
`;

const SearchInputContainer = styled.div<{ showSearch: boolean }>`
  @media (min-width: ${screenSmMin}) {
    ${({ showSearch }) =>
      showSearch &&
      css`
        left: ${spacer24};
        right: ${spacer24};
        position: absolute;
      `}
  }

  @media (max-width: ${screenXsMax}) {
    position: relative;
    width: 100vw;
    padding: 14px ${spacer24} 0;
    margin-top: 20px;
    margin-bottom: -6px;
    margin-left: -${spacer24};
    margin-right: -${spacer24};
    border-top: 1px solid ${gray30};
  }
`;

export const TeamSearch = forwardRef<HTMLElement, {}>(function NavigationSearch(
  _props,
  firstFocusableRef,
) {
  const [{ searchValue, shouldShowSearch, searchResults }, sidePanelDispatch] = useSidePanel();
  const searchTeamsInputRef = createRef<HTMLInputElement>();
  const viewport = useViewport();
  const isMobile = viewport === Viewport.XS;

  useEffect(() => {
    if (shouldShowSearch) {
      searchTeamsInputRef.current?.focus();
    }
  }, [searchTeamsInputRef, shouldShowSearch]);

  const searchTitle = 'Filter teams';
  const closeButtonTitle = 'Close teams filter view';

  return (
    <SearchInputContainer showSearch={shouldShowSearch}>
      <InputWrapper className={addColorSet('invertedDark')}>
        {!shouldShowSearch && !isMobile && (
          <SearchButtonIcon
            ref={firstFocusableRef}
            title={searchTitle}
            onClick={() => sidePanelDispatch(showSearch())}
          >
            <IconSearch />
          </SearchButtonIcon>
        )}

        {(shouldShowSearch || isMobile) && (
          <>
            <VisuallyHidden as="label" htmlFor="sidepanel-search-teams">
              Filter teams, press Enter to select first result
            </VisuallyHidden>
            <SearchFormInputIcon iconLeading={<IconSearch />}>
              <Input
                placeholder={searchTitle}
                type="text"
                value={searchValue}
                onChange={(e: React.ChangeEvent) =>
                  sidePanelDispatch(setSearchValue((e.target as HTMLInputElement).value))
                }
                onFocus={() => sidePanelDispatch(showSearch())}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (searchResults.length > 0 && e.code === 'Enter') {
                    selectTeam(searchResults[0].organizationUri);
                  }
                }}
                ref={searchTeamsInputRef}
                id="sidepanel-search-teams"
                areSearchResultsVisible={shouldShowSearch}
              />
            </SearchFormInputIcon>
            <CloseButton
              disabled={!shouldShowSearch}
              buttonTitle={closeButtonTitle}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                sidePanelDispatch(hideSearch());
              }}
            />
          </>
        )}
      </InputWrapper>
    </SearchInputContainer>
  );
});
