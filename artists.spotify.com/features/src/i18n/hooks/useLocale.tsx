import React from 'react';

const LocaleContext = React.createContext('en');

export const LocaleProvider = LocaleContext.Provider;

export function useLocale() {
  return React.useContext(LocaleContext);
}
