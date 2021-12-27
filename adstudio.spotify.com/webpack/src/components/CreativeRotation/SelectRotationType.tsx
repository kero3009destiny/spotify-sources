import React, { FormEvent, FunctionComponent } from 'react';
import { Field } from 'react-final-form';
import { Trans } from 'react-i18next';
import i18n from 'i18next';
import styled from 'styled-components';

import { spacer16, white } from '@spotify-internal/encore-foundation';
import { TextLink } from '@spotify-internal/encore-web';

import { EXTERNAL_FAQ_ADDRESS } from '../../config/routes';
import { AnalyticsContextConsumer } from '../common/AnalyticsContext';
import { FinalFormGroup } from '../form-common/FinalFormGroup';
import { EvenlyIcon, SequentialIcon, WeightedIcon } from './Icons';
import { Radio } from './Radio';

import {
  CreativeRotationFormData,
  CreativeRotationTypeOption,
  GA_EVENTS,
  GA_SELECTION_LABELS,
} from './constants';

export const I18N_CREATIVE_ROTATION_EVENLY = i18n.t(
  'I18N_CREATIVE_ROTATION_EVENLY',
  'Evenly',
);
export const I18N_CREATIVE_ROTATION_SEQUENTIAL = i18n.t(
  'I18N_CREATIVE_ROTATION_SEQUENTIAL',
  'Sequential',
);
export const I18N_CREATIVE_ROTATION_WEIGHTED = i18n.t(
  'I18N_CREATIVE_ROTATION_WEIGHTED',
  'Weighted',
);
export const I18N_CREATIVE_ROTATION_EVENLY_DESCRIPTION = i18n.t(
  'I18N_CREATIVE_ROTATION_EVENLY_DESCRIPTION',
  'Ads will be served to a listener about the same number of times.',
);
export const I18N_CREATIVE_ROTATION_SEQUENTIAL_DESCRIPTION = i18n.t(
  'I18N_CREATIVE_ROTATION_SEQUENTIAL_DESCRIPTION',
  'Ads will be served to a listener  in the order you specify.',
);
export const I18N_CREATIVE_ROTATION_WEIGHTED_DESCRIPTION = i18n.t(
  'I18N_CREATIVE_ROTATION_WEIGHTED_DESCRIPTION',
  'Ads will be served to a listener at a frequency you define.',
);

const FAQ =
  EXTERNAL_FAQ_ADDRESS[i18n.language]?.AD_CREATION ||
  EXTERNAL_FAQ_ADDRESS.en_US.AD_CREATION;

const StyledFinalFormGroup = styled(FinalFormGroup)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: ${spacer16};
  *:first-child {
    grid-column-start: span 3;
  }
  *:first-child > span {
    align-self: center;
  }
`;

const IconRelativeContainer = styled.div`
  position: relative;
  top: 6px;
`;

export const SelectRotationType: FunctionComponent<{}> = ({}) => {
  return (
    <Field
      name={CreativeRotationFormData.Fields.RotationType}
      render={({ input, meta }) => {
        return (
          <AnalyticsContextConsumer>
            {({ category, logUserAction }) => (
              <StyledFinalFormGroup
                input={input}
                meta={meta}
                label={
                  <Trans i18nKey="I18N_SELECT_HOW_YOU_WANT_TO_ROTATE">
                    Choose how you want to rotate your ads. For more help with
                    ad rotation,{' '}
                    <TextLink href={FAQ} target="_blank">
                      visit our help center
                    </TextLink>
                    .
                  </Trans>
                }
              >
                <Radio
                  data-test="radio-select-rotation-type-even"
                  checked={input.value === CreativeRotationTypeOption.EVENLY}
                  name={input.name}
                  value={CreativeRotationTypeOption.EVENLY}
                  onChange={(e: FormEvent) => {
                    logUserAction({
                      category,
                      label: GA_EVENTS.SELECT_AD_DELIVERY_OPTION,
                      params:
                        GA_SELECTION_LABELS[CreativeRotationTypeOption.EVENLY],
                    });
                    input.onChange(e);
                  }}
                  icon={
                    <IconRelativeContainer>
                      <EvenlyIcon
                        width={26}
                        height={27}
                        color={
                          input.value === CreativeRotationTypeOption.EVENLY
                            ? white
                            : undefined
                        }
                      />
                    </IconRelativeContainer>
                  }
                  label={I18N_CREATIVE_ROTATION_EVENLY}
                  description={I18N_CREATIVE_ROTATION_EVENLY_DESCRIPTION}
                />
                <Radio
                  data-test="radio-select-rotation-type-sequential"
                  checked={
                    input.value === CreativeRotationTypeOption.SEQUENTIAL
                  }
                  name={input.name}
                  value={CreativeRotationTypeOption.SEQUENTIAL}
                  onChange={(e: FormEvent) => {
                    logUserAction({
                      category,
                      label: GA_EVENTS.SELECT_AD_DELIVERY_OPTION,
                      params:
                        GA_SELECTION_LABELS[
                          CreativeRotationTypeOption.SEQUENTIAL
                        ],
                    });
                    input.onChange(e);
                  }}
                  icon={
                    <IconRelativeContainer>
                      <SequentialIcon
                        width={26}
                        height={27}
                        color={
                          input.value === CreativeRotationTypeOption.SEQUENTIAL
                            ? white
                            : undefined
                        }
                      />
                    </IconRelativeContainer>
                  }
                  label={I18N_CREATIVE_ROTATION_SEQUENTIAL}
                  description={I18N_CREATIVE_ROTATION_SEQUENTIAL_DESCRIPTION}
                />
                <Radio
                  data-test="radio-select-rotation-type-weighted"
                  checked={input.value === CreativeRotationTypeOption.WEIGHTED}
                  name={input.name}
                  value={CreativeRotationTypeOption.WEIGHTED}
                  onChange={(e: FormEvent) => {
                    logUserAction({
                      category,
                      label: GA_EVENTS.SELECT_AD_DELIVERY_OPTION,
                      params:
                        GA_SELECTION_LABELS[
                          CreativeRotationTypeOption.WEIGHTED
                        ],
                    });
                    input.onChange(e);
                  }}
                  icon={
                    <IconRelativeContainer>
                      <WeightedIcon
                        width={26}
                        height={27}
                        color={
                          input.value === CreativeRotationTypeOption.WEIGHTED
                            ? white
                            : undefined
                        }
                      />
                    </IconRelativeContainer>
                  }
                  label={I18N_CREATIVE_ROTATION_WEIGHTED}
                  description={I18N_CREATIVE_ROTATION_WEIGHTED_DESCRIPTION}
                />
              </StyledFinalFormGroup>
            )}
          </AnalyticsContextConsumer>
        );
      }}
    />
  );
};
