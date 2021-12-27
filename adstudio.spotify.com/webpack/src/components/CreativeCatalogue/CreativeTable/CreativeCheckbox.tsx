import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormCheckbox } from '@spotify-internal/encore-web';

import { deselectCreatives, selectCreatives } from 'ducks/dashboard/actions';
import { getCreativesAreSelected } from 'ducks/dashboard/selectors';

interface CreativeCheckboxProps {
  creativeIds: string[];
  checkboxId: string;
}

export const CreativeCheckbox = ({
  creativeIds,
  checkboxId,
}: CreativeCheckboxProps) => {
  const dispatch = useDispatch();
  const checked = useSelector(state =>
    getCreativesAreSelected(state, creativeIds),
  );

  return (
    <FormCheckbox
      id={checkboxId}
      // eslint-disable-next-line i18next/no-literal-string
      name="dashboard-multiselect"
      checked={!!creativeIds.length && checked}
      onChange={() => {
        if (checked) {
          dispatch(deselectCreatives(creativeIds));
        } else {
          dispatch(selectCreatives(creativeIds));
        }
      }}
    />
  );
};
