import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import i18n from 'i18next';
import isEqual from 'lodash/isEqual';
import { i18nRequired } from 'validators/i18nRequired';

import { Banner } from '@spotify-internal/encore-web';

import { AgeRanges } from 'components/common/AgeRanges';
import { ValidatingEditableFormGroup } from 'components/form-common/FormGroups/ValidatingEditableFormGroup';

import { toAgeRangesString } from 'utilities';
import { containsInvalidAgeRange } from 'utils/flightHelpers';

import { TARGETING_MIN_AGE } from 'config';

import { AgeRange } from 'types/common/state/api/flight';

export const RANGE_MIN_17 = { ageMin: TARGETING_MIN_AGE, ageMax: 17 };
export const RANGE_18_24 = { ageMin: 18, ageMax: 24 };
export const RANGE_21_24 = { ageMin: 21, ageMax: 24 };
const RANGE_25_34 = { ageMin: 25, ageMax: 34 };
const RANGE_35_44 = { ageMin: 35, ageMax: 44 };
const RANGE_45_54 = { ageMin: 45, ageMax: 54 };
const RANGE_55_64 = { ageMin: 55, ageMax: 64 };
const RANGE_65_MAX = { ageMin: 65 };

export const AGE_RANGE_DEFAULT_VALUES: AgeRange[] = [
  RANGE_MIN_17,
  RANGE_18_24,
  RANGE_25_34,
  RANGE_35_44,
  RANGE_45_54,
  RANGE_55_64,
  RANGE_65_MAX,
];
export const PODCAST_ONLY_AGE_RANGE_DEFAULT_VALUES: AgeRange[] = [
  // PODCAST DOES NOT SUPPORT < 17 targeting
  RANGE_18_24,
  RANGE_25_34,
  RANGE_35_44,
  RANGE_45_54,
  RANGE_55_64,
  RANGE_65_MAX,
];

export interface AgeRangesFieldProps {
  ageRangesFieldName: string;
  targetingMinAge: number;
  isPodcast: boolean;
}

export const AgeRangesField: React.FC<AgeRangesFieldProps> = ({
  ageRangesFieldName,
  targetingMinAge,
  isPodcast,
}: AgeRangesFieldProps) => {
  // set country based minimum age range
  const COUNTRY_RESTRICTED_TARGETING_MIN = {
    ageMin: targetingMinAge,
    ageMax: 17,
  };
  const ageRanges = isPodcast
    ? PODCAST_ONLY_AGE_RANGE_DEFAULT_VALUES
    : [
        COUNTRY_RESTRICTED_TARGETING_MIN,
        ...PODCAST_ONLY_AGE_RANGE_DEFAULT_VALUES,
      ];

  return (
    <Field
      name={ageRangesFieldName}
      validate={i18nRequired}
      initialValue={ageRanges}
      render={(props: FieldRenderProps<any>) => {
        /*
         * Race condition where the update is not reflected in the input.value before ageRangeInvalid check
         * This returns the updated list after the call to update the input
         * ensuring the validity check is on the updated ranges list
         */
        const updatedRanges = applyCorrectMinAgeTarget(
          props.input.value,
          COUNTRY_RESTRICTED_TARGETING_MIN,
          props.input.onChange,
          isPodcast,
        );
        const ageRangeIsInvalid = containsInvalidAgeRange(
          updatedRanges,
          isPodcast,
        );

        return (
          <ValidatingEditableFormGroup
            validateFields={[props.input.name]}
            isEditing={!ageRangeIsInvalid}
            editText={i18n.t('I18N_EDIT_AGE', 'Edit age')}
            prefix={isEditing =>
              !isEditing ? i18n.t('I18N_AGE', 'Age') : undefined
            }
            label={isEditing =>
              !isEditing
                ? toAgeRangesString(updatedRanges)
                : i18n.t('I18N_AGE', 'Age')
            }
            onEdit={() => props.input.onChange(ageRanges)} // call onChange and set value to All ranges
            hideClose
            condensed
          >
            {isEditing => {
              if (ageRangeIsInvalid)
                return (
                  <Banner contextual colorSet="announcement">
                    {i18n.t(
                      'I18N_AGE_RANGES_CHANGED_WARNING',
                      'Our age ranges have changed. You will need to select an updated age range if you edit your audience.',
                    )}
                  </Banner>
                );
              if (!isEditing) return null;
              return <AgeRanges ranges={ageRanges} {...props.input} />;
            }}
          </ValidatingEditableFormGroup>
        );
      }}
    />
  );
};

export function applyCorrectMinAgeTarget(
  providedRanges: AgeRange[],
  countryRestrictedMinRange: AgeRange,
  updateValues: (values: AgeRange[]) => void,
  isPodcast: boolean,
): AgeRange[] {
  let ranges = [...providedRanges];
  const minRangeIndex = ranges.findIndex(r => r.ageMax === 17);
  if (minRangeIndex !== -1) {
    if (isPodcast) {
      // PODCAST DOES NOT SUPPORT < 17 targeting, so remove that ageRange
      ranges = ranges.filter((_, i) => i !== minRangeIndex);
      updateValues(ranges);
    } else if (
      !isPodcast &&
      !isEqual(ranges[minRangeIndex], countryRestrictedMinRange)
    ) {
      // NON PODCAST SUPPORTS < 17 targeting, so replace minRange with the min range for the selected country
      ranges[minRangeIndex] = countryRestrictedMinRange;
      updateValues(ranges);
    }
  }
  return ranges;
}
