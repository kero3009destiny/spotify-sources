import React, { ChangeEvent, FunctionComponent } from 'react';
import { FieldRenderProps } from 'react-final-form';
import { get } from 'lodash';

import { ReduxFormInput } from '@spotify-internal/adstudio-shared';
import { trim } from '@spotify-internal/adstudio-web-utils/lib/normalizers';

const NormalizeOnBlurInput: FunctionComponent<FieldRenderProps<
  any,
  HTMLElement
>> = ({ input: { onBlur }, normalizeFunction = trim, input, ...props }) => {
  return (
    <ReduxFormInput
      {...props}
      input={{
        ...input,
        onBlur: (event: ChangeEvent<HTMLInputElement>) => {
          // if target.value exists but is falsy, ensures it still defaults to an empty string
          const val = get(event, `target.value`, '') || '';
          return onBlur(normalizeFunction(val));
        },
      }}
    />
  );
};

export default NormalizeOnBlurInput;
