import React, { FormEvent, FunctionComponent } from 'react';
import { Field } from 'react-final-form';
import { FormApi } from 'final-form';
import i18n from 'i18next';

import CreativesTable from './CreativesTable';
import { SelectRotationType } from './SelectRotationType';
import SequentialTable from './SequentialTable';
import WeightedTable from './WeightedTable';

import {
  CreativeRotationFormData,
  CreativeRotationTypeOption,
} from './constants';

import { CreativesCatalogueEntityWithRotationParameters } from './types';

export interface CreativeRotationFormValues {
  creativeRotationType: CreativeRotationTypeOption;
  creatives: CreativesCatalogueEntityWithRotationParameters[];
}

export interface CreativeRotationFormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  form: FormApi<CreativeRotationFormValues>;
}

export const validateCreatives = (
  creatives: CreativesCatalogueEntityWithRotationParameters[],
  allValues: {},
) => {
  const rotationType = (allValues as CreativeRotationFormValues)
    .creativeRotationType;
  let totalWeightPercentage;
  let creativeHasInvalidWeight = false;
  let weightIsntAnInteger = false;
  switch (rotationType) {
    case CreativeRotationTypeOption.WEIGHTED:
      totalWeightPercentage = creatives.reduce((accum, current) => {
        if (!current.weight || current.weight <= 0) {
          creativeHasInvalidWeight = true;
        }

        if (!Number.isInteger(current.weight)) {
          weightIsntAnInteger = true;
        }

        return accum + (current.weight || 0);
      }, 0);

      if (creativeHasInvalidWeight) {
        return i18n.t(
          'I18N_CREATIVE_WEIGHTS_MUST_BE_GREATER_THAN_0',
          'Ads must have a weight greater than 0%.',
        );
      }

      if (weightIsntAnInteger) {
        return i18n.t(
          'I18N_CREATIVE_WEIGHTS_MUST_BE_INTEGER',
          'Ads must have a non-decimal weight.',
        );
      }

      return totalWeightPercentage === 100
        ? undefined
        : i18n.t(
            'I18N_PERCENTAGES_MUST_ADD_TO_100',
            'Percentages must add to exactly 100%.',
          );

    case CreativeRotationTypeOption.EVENLY:
    case CreativeRotationTypeOption.SEQUENTIAL:
    case CreativeRotationTypeOption.UNKNOWN:
    default:
      return undefined;
  }
};

export const CreativeRotationForm: FunctionComponent<CreativeRotationFormProps> = ({
  handleSubmit,
  form,
}) => {
  const formState = form.getState();
  return (
    <form id={CreativeRotationFormData.id} onSubmit={handleSubmit}>
      <SelectRotationType />
      <Field
        name={CreativeRotationFormData.Fields.Creatives}
        validate={validateCreatives}
        render={() => {
          return (
            <>
              {formState.values.creativeRotationType ===
                CreativeRotationTypeOption.EVENLY && <CreativesTable />}
              {formState.values.creativeRotationType ===
                CreativeRotationTypeOption.SEQUENTIAL && (
                <SequentialTable
                  onChangeOrder={creatives =>
                    form.change(
                      CreativeRotationFormData.Fields.Creatives,
                      creatives,
                    )
                  }
                />
              )}
              {formState.values.creativeRotationType ===
                CreativeRotationTypeOption.WEIGHTED && (
                <WeightedTable
                  onChangeWeights={(
                    creatives: CreativesCatalogueEntityWithRotationParameters[],
                  ) =>
                    form.change(
                      CreativeRotationFormData.Fields.Creatives,
                      creatives,
                    )
                  }
                  errors={formState.submitFailed ? formState.errors : undefined}
                />
              )}
            </>
          );
        }}
      />
    </form>
  );
};
