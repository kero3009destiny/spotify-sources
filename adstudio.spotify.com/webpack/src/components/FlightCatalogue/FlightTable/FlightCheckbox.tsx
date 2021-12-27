import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormCheckbox } from '@spotify-internal/encore-web';

import { deselectFlights, selectFlights } from 'ducks/dashboard/actions';
import { getFlightsAreSelected } from 'ducks/dashboard/selectors';

interface FlightCheckboxProps {
  flightIds: string[];
  checkboxId: string;
}

export const FlightCheckbox = ({
  flightIds,
  checkboxId,
}: FlightCheckboxProps) => {
  const dispatch = useDispatch();
  const checked = useSelector(state => getFlightsAreSelected(state, flightIds));

  return (
    <FormCheckbox
      id={checkboxId}
      // eslint-disable-next-line i18next/no-literal-string
      name="dashboard-multiselect"
      checked={!!flightIds.length && checked}
      onChange={() => {
        if (checked) {
          dispatch(deselectFlights(flightIds));
        } else {
          dispatch(selectFlights(flightIds));
        }
      }}
    />
  );
};
