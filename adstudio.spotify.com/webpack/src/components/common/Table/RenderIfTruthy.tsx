import React, { ReactNode } from 'react';

export const NA = '-';

export interface RenderIfTruthyProps {
  children: number | string | ReactNode;
  ifFalsy?: ReactNode | null;
  predicate: boolean;
}

export const RenderIfTruthy = ({
  children,
  predicate,
  ifFalsy,
}: RenderIfTruthyProps) => {
  const falsyTreatment = ifFalsy === undefined ? '-' : ifFalsy;
  return <>{predicate ? children : falsyTreatment}</>;
};
