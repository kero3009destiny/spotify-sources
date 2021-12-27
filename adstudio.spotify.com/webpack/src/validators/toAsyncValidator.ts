import { FieldValidator } from 'final-form';

import { AsyncValidator } from '../types/common/validators';

export const toAsyncValidator = <FieldType>(
  validator: FieldValidator<FieldType>,
): AsyncValidator<FieldType> => {
  return async (value: FieldType) => {
    const validationResult = validator(value, {}, {} as any);
    return validationResult;
  };
};
