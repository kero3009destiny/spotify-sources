import React from 'react';
import { window } from 'global';

import { replaceLocation } from 'utils/windowHelpers';

const redirectTimer = 4000;
const CloseWindowElement: React.FunctionComponent = () => {
  React.useEffect(() => {
    setTimeout(() => {
      replaceLocation('/');
    }, redirectTimer);
  });
  window.close();
  return <div />;
};

export default CloseWindowElement;
