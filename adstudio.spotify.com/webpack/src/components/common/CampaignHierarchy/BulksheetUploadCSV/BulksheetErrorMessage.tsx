import React from 'react';

import {
  IconExclamationAlt,
  semanticColors,
  Type,
} from '@spotify-internal/encore-web';

import { ErrorMessageContainer } from './styles';

interface BulksheetErrorMessageProps {
  children: React.ReactNode;
}

export const BulksheetErrorMessage = ({
  children,
}: BulksheetErrorMessageProps) => (
  <ErrorMessageContainer>
    <IconExclamationAlt
      semanticColor={semanticColors.textNegative}
      iconSize={16}
    />
    <Type condensed as="p" semanticColor={semanticColors.textNegative}>
      {children}
    </Type>
  </ErrorMessageContainer>
);
