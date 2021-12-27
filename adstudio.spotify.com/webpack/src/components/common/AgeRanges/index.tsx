import React, { useEffect, useState } from 'react';
import { FieldInputProps } from 'react-final-form';
import i18n from 'i18next';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import styled from 'styled-components';

import {
  FormCheckbox,
  FormRadio,
  spacer24,
} from '@spotify-internal/encore-web';

import { RANGE_21_24 } from 'components/FlightForm/Fields/AgeRanges/Field';

import { toAgeRangeString } from 'utilities';

import { useAnalytics } from '../AnalyticsContext';

import { GA_ACTIONS } from '../CampaignHierarchy/CreateFlows/CopyExisting/constants';

import { AgeRange } from 'types/common/state/api/flight';

export enum RADIO_SELECTION {
  ALL_AGES,
  CHOOSE_RANGE,
}

export type AgeRangesProps = {
  ranges: AgeRange[];
} & Pick<FieldInputProps<AgeRange[]>, 'onChange' | 'value'>;

const CheckboxContainer = styled.div`
  padding-left: ${spacer24};
`;

const RangeContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 420px;

  & > div {
    flex: 0 0 105px;

    &:nth-of-type(3) {
      margin-right: 5px; // bump 4th child to next line
    }
  }
`;

export const AgeRanges: React.FC<AgeRangesProps> = ({
  ranges,
  value,
  onChange,
}: AgeRangesProps) => {
  const { category, logUserAction } = useAnalytics();

  const initialRadioSelection =
    !isEqual(new Set<AgeRange>(value), new Set<AgeRange>(ranges)) ||
    isEmpty(value)
      ? RADIO_SELECTION.CHOOSE_RANGE
      : RADIO_SELECTION.ALL_AGES;

  const [radioSelection, setRadioSelection] = useState(initialRadioSelection);

  const AGE_RESTRICTED_RANGES = [
    RANGE_21_24,
    ...ranges.filter(r => r.ageMax !== 17 && r.ageMin !== 18),
  ];

  const [ageRestrictionEnabled, setAgeRestrictionEnabled] = useState(
    !!value.find(r => isEqual(r, RANGE_21_24)),
  );

  const OPTIONS = ageRestrictionEnabled ? AGE_RESTRICTED_RANGES : ranges;

  useEffect(() => {
    // If value has range below 21+, uncheck age restriction checkbox
    if (value.find(r => r.ageMin && r.ageMin < 21)) {
      setAgeRestrictionEnabled(false);
      // If value has 21 - 24 range, check age restriction checkbox
    } else if (value.find(r => isEqual(r, RANGE_21_24))) {
      setAgeRestrictionEnabled(true);
    }
  }, [value]);

  React.useEffect(() => {
    // Set radio_selection to ALL if value is equal to ranges
    setRadioSelection(
      isEqual(value, ranges)
        ? RADIO_SELECTION.ALL_AGES
        : RADIO_SELECTION.CHOOSE_RANGE,
    );
  }, [ranges, value]);

  return (
    <>
      <FormRadio
        id="all-ages"
        checked={radioSelection === RADIO_SELECTION.ALL_AGES}
        onChange={() => {
          setRadioSelection(RADIO_SELECTION.ALL_AGES);
          onChange(ranges);
          logUserAction({
            category,
            label: GA_ACTIONS.ALL_AGES_SELECTED,
          });
        }}
      >
        {i18n.t('I18N_ALL_AGES_LABEL', 'All ages')}
      </FormRadio>
      <FormRadio
        id="choose-range"
        checked={radioSelection === RADIO_SELECTION.CHOOSE_RANGE}
        onChange={() => {
          setRadioSelection(RADIO_SELECTION.CHOOSE_RANGE);
          onChange([]);
          logUserAction({
            category,
            label: GA_ACTIONS.PICK_SPECIFIC_AGES_SELECTED,
          });
        }}
      >
        {i18n.t('I18N_PICK_SPECIFIC_AGES_LABEL', 'Pick specific ages')}
      </FormRadio>
      <CheckboxContainer>
        <FormCheckbox
          id="age-restricted"
          onChange={() => {
            setRadioSelection(RADIO_SELECTION.CHOOSE_RANGE);
            if (ageRestrictionEnabled) {
              onChange([]);
            } else {
              onChange(AGE_RESTRICTED_RANGES);
            }
            setAgeRestrictionEnabled(!ageRestrictionEnabled);
            logUserAction({
              category,
              label: GA_ACTIONS.CLICK_AGE_RESTRICTED_BOX,
              params: {
                ageRestrictionEnabled: !ageRestrictionEnabled
                  ? 'True'
                  : 'False',
              },
            });
          }}
          checked={ageRestrictionEnabled}
        >
          {i18n.t('I18N_AGE_RESTRICTED_LABEL', 'Age-restricted advertising')}
          {' (21+)'}
        </FormCheckbox>
        <RangeContainer>
          {radioSelection === RADIO_SELECTION.CHOOSE_RANGE &&
            OPTIONS.map((range, i) => {
              const inclusionPredicate = (r: AgeRange) => isEqual(r, range);
              const exclusionPredicate = (r: AgeRange) => !isEqual(r, range);

              return (
                <FormCheckbox
                  data-test={toAgeRangeString(range)}
                  key={`range-${i}`}
                  id={`range-${i}`}
                  checked={!!value.find(inclusionPredicate)}
                  onChange={() => {
                    let nextRangesState: AgeRange[] = Array.from(value);
                    const rangePreviouslySelected = !!value.find(
                      inclusionPredicate,
                    );
                    if (rangePreviouslySelected) {
                      nextRangesState = nextRangesState.filter(
                        exclusionPredicate,
                      );
                    } else {
                      nextRangesState.push(range);
                    }
                    onChange(nextRangesState);
                    logUserAction({
                      category,
                      label: rangePreviouslySelected
                        ? GA_ACTIONS.UNCHECK_AGE_RANGE_BOX
                        : GA_ACTIONS.CHECK_AGE_RANGE_BOX,
                      params: {
                        value: toAgeRangeString(range).toString(),
                      },
                    });
                  }}
                >
                  {/* TODO : USE HELPER FUNCTION FOR FORMATTING */}
                  {toAgeRangeString(range)}
                </FormCheckbox>
              );
            })}
        </RangeContainer>
      </CheckboxContainer>
    </>
  );
};
