import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Dropdown,
  DropdownItem,
  DropdownLink,
  DropdownList,
  DropdownTrigger,
} from '@spotify-internal/encore-web';

import { ALL_LANGUAGES, Language } from '../TermsAndConditions/Language';
import { TranslationMap } from '../TermsAndConditions/TranslationMap';
import { useT } from '@mrkt/features/i18n';

const TermsDropdownContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const StyledDropdownTrigger = styled(DropdownTrigger)`
  min-width: 160px;
`;

export type Props = {
  currentLanguage: Language;
  onSelectLanguage: (value: Language) => void;
};

export const TermsDropdown = ({ currentLanguage, onSelectLanguage }: Props) => {
  const [show, toggleShow] = useState(false);
  const t = useT();

  const itemOnClick = (
    e: React.MouseEvent<any, MouseEvent>,
    language: Language,
  ) => {
    e.preventDefault();
    onSelectLanguage(language);
  };

  const currentLanguagePlaceholder = TranslationMap[currentLanguage];

  const translationDropdownItem = (language: Language) => {
    const dropdownItemProps = {
      selected: currentLanguage === language,
      onClick: (e: React.MouseEvent<any, MouseEvent>) =>
        itemOnClick(e, language),
    };

    const entry = TranslationMap[language];

    return (
      <DropdownItem
        {...dropdownItemProps}
        key={language}
        data-slo-id={`terms-translation-${language}`}
      >
        <DropdownLink>{entry.displayName}</DropdownLink>
      </DropdownItem>
    );
  };

  const translationDropdownItems = () => {
    const items = [];

    for (const key of ALL_LANGUAGES) {
      items.push(translationDropdownItem(key));
    }

    return items;
  };

  return (
    <TermsDropdownContainer>
      <StyledDropdownTrigger
        data-slo-id="terms-translation-dropdown"
        overlay={
          show && <DropdownList>{translationDropdownItems()}</DropdownList>
        }
        onShow={() => toggleShow(true)}
        onHide={() => toggleShow(false)}
      >
        <Dropdown>
          {currentLanguagePlaceholder?.displayName ||
            t(
              'CANVAS_LANGUAGE_PICKER',
              'Select Language',
              'Prompt to choose a language from a list',
            )}
        </Dropdown>
      </StyledDropdownTrigger>
    </TermsDropdownContainer>
  );
};
