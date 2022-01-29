import React from 'react';
import { useLocales } from '../../../hooks/useLocales';

type Props = {
  fallback: React.ReactNode;
  children: React.ReactNode;
};

export function LanguageSelectionBoundary({ fallback, children }: Props) {
  const isEnabled = useLocales().length > 2; // 2 because we are soft launching with en, fr-CA

  // fallback if not enabled
  return <>{isEnabled ? children : fallback}</>;
}
