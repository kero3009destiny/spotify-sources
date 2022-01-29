import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import FocusLock from 'react-focus-lock';
import {
  Backdrop,
  gray95,
  screenSmMax,
  screenXsMax,
  spacer16,
  spacer32,
  black,
  gray90,
  gray50,
  Popover,
  Type,
} from '@spotify-internal/encore-web';
import { useT } from '../../hooks/useT';
import { getDisplayName, getDisplayNameEn } from '../../locales';

const LanguageGrid = styled.div`
  display: grid;

  // 4 columns by default
  grid-template-columns: repeat(4, 1fr);

  // 2 columns for small screens
  @media (max-width: ${screenSmMax}) {
    grid-template-columns: repeat(2, 1fr);
  }

  // 1 column for the extra small screens
  @media (max-width: ${screenXsMax}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const LanguageOption = styled.a`
  display: inline-flex;
  flex-direction: column;
  text-align: left;
  padding: ${spacer16};

  &,
  &:hover,
  &:focus {
    color: ${black};
  }

  &:hover {
    background-color: ${gray95};
  }

  &:focus {
    background-color: ${gray90};
  }
`;

const TextContainer = styled.div`
  padding: 0 ${spacer16};
`;

const CustomBackdrop = styled(Backdrop)`
  overflow: auto;
`;

const Container = styled.div`
  max-height: 100%;
`;

const CustomPopover = styled(Popover)`
  margin: ${spacer32};
  width: calc(100vw - ${spacer32} - ${spacer32});
  max-width: 978px;
`;

const MutedText = styled.span`
  color: ${gray50};
`;

type Props = {
  onClose?: () => void;
};

export function LanguageSelectionDialog({ onClose }: Props) {
  const t = useT();
  const { locale: currentLocale, locales, asPath, basePath } = useRouter();
  const focusLangRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    focusLangRef.current?.focus();
  }, []);

  const ariaLabelledBy = 'language-selection-title';
  const ariaDescribedBy = 'language-selection-description';

  return (
    <FocusLock returnFocus>
      <CustomBackdrop center onClose={onClose}>
        <Container>
          {/** the extra div is to fix the margin since Container has a max-height of 100% to force an overflow */}
          <div>
            <CustomPopover
              popoverTitle={
                <TextContainer>
                  <span id={ariaLabelledBy}>
                    {t(
                      'LANGUAGE_MODAL_CHOOSE_A_LANGUAGE',
                      'Choose a language',
                      'User needs to choose a language',
                    )}
                  </span>
                </TextContainer>
              }
              onClose={onClose}
              role="dialog"
              aria-labelledby={ariaLabelledBy}
              aria-describedby={ariaLabelledBy}
            >
              <TextContainer>
                <Type as="p" id={ariaDescribedBy}>
                  {t(
                    'LANGUAGE_MODAL_DESCRIPTION',
                    'This updates what you read on Spotify for Artists. To update your email language, go to Notification settings.',
                    'Description for the choose a language dialog',
                  )}
                </Type>
              </TextContainer>
              <LanguageGrid>
                {locales?.map(locale => (
                  <LanguageOption
                    key={locale}
                    data-testid={`language-option-${locale}`}
                    href={`${basePath}/${locale}${asPath}`}
                    ref={locale === currentLocale ? focusLangRef : null}
                    onClick={() => {
                      document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`;
                    }}
                  >
                    {getDisplayName(locale)}
                    <MutedText>{getDisplayNameEn(locale)}</MutedText>
                  </LanguageOption>
                ))}
              </LanguageGrid>
            </CustomPopover>
          </div>
        </Container>
      </CustomBackdrop>
    </FocusLock>
  );
}
