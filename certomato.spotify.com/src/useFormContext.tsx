import * as React from 'react';

import omit from './utils/omit';
import { FieldValues, FormProviderProps, UseFormReturn } from './types';

const FormContext = React.createContext<UseFormReturn | null>(null);

FormContext.displayName = 'RHFContext';

export const useFormContext = <
  TFieldValues extends FieldValues,
>(): UseFormReturn<TFieldValues> =>
  React.useContext(FormContext) as unknown as UseFormReturn<TFieldValues>;

export const FormProvider = <
  TFieldValues extends FieldValues,
  TContext extends object = object,
>(
  props: FormProviderProps<TFieldValues, TContext>,
) => (
  <FormContext.Provider
    value={omit(props, 'children') as unknown as UseFormReturn}
  >
    {props.children}
  </FormContext.Provider>
);
