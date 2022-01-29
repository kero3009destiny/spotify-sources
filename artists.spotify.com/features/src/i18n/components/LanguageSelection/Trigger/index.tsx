import React from 'react';
import styled from 'styled-components';
import { ButtonSecondary } from '@spotify-internal/encore-web';
import { useT } from '../../../hooks/useT';
import { useLocale } from '../../../hooks/useLocale';
import { useLanguageSelectionDispatch } from '../index';
import { getDisplayName } from '../../../locales';

const Svg = styled.svg`
  fill: currentColor;
  height: 1em;
  width: 1em;
  display: inline;
`;

const Icon = () => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 36 36"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 0C8.059 0 0 8.059 0 18C0 27.941 8.059 36 18 36C27.941 36 36 27.941 36 18C36 8.059 27.941 0 18 0ZM2.05 19H6.033C6.125 21.506 6.555 23.871 7.262 26H4.158C2.951 23.917 2.208 21.541 2.05 19ZM19 8V2.081C21.747 2.517 24.162 4.736 25.799 8H19ZM26.651 10C27.405 12.083 27.87 14.46 27.968 17H19V10H26.651ZM17 2.081V8H10.201C11.837 4.736 14.253 2.517 17 2.081ZM17 10V17H8.032C8.13 14.46 8.595 12.083 9.349 10H17ZM6.034 17H2.05C2.208 14.46 2.951 12.083 4.157 10H7.261C6.556 12.129 6.126 14.495 6.034 17ZM8.032 19H17V26H9.349C8.595 23.917 8.13 21.541 8.032 19ZM17 28V33.919C14.253 33.482 11.837 31.264 10.201 28H17ZM19 33.919V28H25.8C24.163 31.264 21.747 33.482 19 33.919ZM19 26V19H27.969C27.87 21.541 27.406 23.917 26.652 26H19ZM29.967 19H33.949C33.792 21.541 33.049 23.917 31.842 26H28.738C29.444 23.871 29.874 21.506 29.967 19ZM29.967 17C29.874 14.495 29.444 12.129 28.738 10H31.842C33.049 12.083 33.792 14.46 33.949 17H29.967ZM30.479 8H27.976C27.259 6.396 26.37 4.985 25.357 3.801C27.346 4.833 29.089 6.267 30.479 8ZM10.643 3.801C9.629 4.985 8.74 6.396 8.023 8H5.521C6.911 6.267 8.654 4.834 10.643 3.801ZM5.521 28H8.024C8.74 29.604 9.629 31.015 10.643 32.198C8.654 31.166 6.911 29.733 5.521 28ZM25.357 32.198C26.371 31.014 27.259 29.604 27.976 28H30.479C29.089 29.733 27.346 31.166 25.357 32.198Z" />
  </Svg>
);

type Props = Omit<React.ComponentProps<typeof ButtonSecondary>, 'children'>;

export function LanguageSelectionTrigger(props: Props) {
  const locale = useLocale();
  const t = useT();
  const languageSelectionDispatch = useLanguageSelectionDispatch();

  return (
    <ButtonSecondary
      aria-label={t(
        'FRODOR_change_language_label',
        'Change language',
        'Allow user to change the langauge displayed on the screen',
      )}
      data-testid="language-selection-trigger"
      iconLeading={Icon}
      {...props}
      onClick={e => {
        props.onClick?.(e);
        languageSelectionDispatch({ type: 'open' });
      }}
    >
      {getDisplayName(locale)}
    </ButtonSecondary>
  );
}
