import React from 'react';

export type PageWithTheme = { darkTheme?: boolean };

type Props = {
  Component: PageWithTheme;
  children: React.ReactNode;
};

export function createAppTheme(themes: { light: string; dark: string }) {
  return function AppTheme({ Component: { darkTheme }, children }: Props) {
    return (
      <div className={darkTheme ? themes.dark : themes.light}>{children}</div>
    );
  };
}
