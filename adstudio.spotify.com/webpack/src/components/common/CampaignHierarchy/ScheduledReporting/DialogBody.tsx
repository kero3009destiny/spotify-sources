import React from 'react';

import { ReportList } from './ReportList';

import { ViewOptions } from './types';

type DialogBodyProps = {
  currentView: string;
};

export const DialogBody: React.FC<DialogBodyProps> = ({ currentView }) => {
  return (
    <>
      {currentView === ViewOptions.CREATE && <></>}
      {currentView === ViewOptions.VIEW && <ReportList />}
      {currentView === ViewOptions.EDIT && <></>}
    </>
  );
};
