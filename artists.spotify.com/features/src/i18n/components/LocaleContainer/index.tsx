// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { info } from '../../locales/info';
import { RtlProvider } from '../../hooks/useRtl';
import { LocaleProvider } from '../../hooks/useLocale';
import { Fonts } from './Fonts';

const Container = styled.div`
  display: contents;
`;

export type LocaleContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  locale: string;
};

export function LocaleContainer({ locale, ...props }: LocaleContainerProps) {
  const rtl = info[locale]?.rtl ?? false;

  return (
    <>
      <Fonts locale={locale} />
      <LocaleProvider value={locale}>
        <RtlProvider value={rtl}>
          <Container {...props} lang={locale} dir={rtl ? 'rtl' : 'ltr'} />
        </RtlProvider>
      </LocaleProvider>
    </>
  );
}
