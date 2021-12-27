import React from 'react';
import RegistrationHeader from './Header/RegistrationHeader';

type Props = { children: React.ReactNode };

export const AppContainer = ({ children }: Props) => {
  return (
    <div>
      <RegistrationHeader />
      {children}
    </div>
  );
};
