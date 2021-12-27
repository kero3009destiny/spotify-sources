import React, { FormEvent } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { push } from 'react-router-redux';
import arrayMutators from 'final-form-arrays';
import i18n from 'i18next';
import styled from 'styled-components';

import { plum } from '@spotify-internal/adstudio-tape/lib/styles/tokens';
import { spacer12, white } from '@spotify-internal/encore-foundation';
import {
  Backdrop,
  ButtonTertiary,
  DialogConfirmation,
} from '@spotify-internal/encore-web';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';
import RemoteSubmitFormButton from 'components/common/RemoteSubmitFormButton';
// TODO: move to a common subdirectory
import { Radio } from 'components/CreativeRotation/Radio';

import { isPodcastFormatType } from 'utils/creativeHelpers';

import { FlightWithCreatives, FlightWithoutCreatives } from './Icons';

import {
  FIELD_NAME,
  FORM_ID,
  initialValues,
  MODAL_TEST_ID,
  podcastInitialValues,
} from './constants';
import { routeFragmentLiterals, routes } from 'config/routes';

import {
  FlightDuplicationModalProps,
  FlightDuplicationOptions,
  FlightDuplicationOptionValues,
} from './types';

const StyledRadio = styled(Radio)`
  display: block;

  &:first-of-type {
    margin-bottom: ${spacer12};
  }
`;

const StyledForm = styled.form`
  min-height: 400px;
`;

export const FlightDuplicationModal = (props: FlightDuplicationModalProps) => {
  const dispatch = useDispatch();
  const onSubmit = (formValues: FlightDuplicationOptionValues) => {
    let route: string;

    if (
      formValues.duplicationOption ===
      FlightDuplicationOptions.DUPLICATE_WITH_CREATIVES
    ) {
      route = routes.DUPLICATE_FLIGHT_WITH_CREATIVES;
    } else {
      route = routes.DUPLICATE_FLIGHT;
    }

    dispatch(
      push(
        route
          .replace(routeFragmentLiterals.ACCOUNT_ID, props.adAccountId)
          .replace(routeFragmentLiterals.FLIGHT_ID, props.flightId)
          .replace(routeFragmentLiterals.CAMPAIGN_ID, props.campaignId),
      ),
    );
  };

  const isPodcast = isPodcastFormatType(props.format);

  return (
    <Backdrop center>
      <Form
        initialValues={isPodcast ? podcastInitialValues : initialValues}
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <DialogConfirmation
            data-test={MODAL_TEST_ID}
            dialogTitle={i18n.t(
              'I18N_WHAT_DO_YOU_WANT_TO_DUPLICATE',
              'What do you want to duplicate?',
            )}
            body={
              <StyledForm id={FORM_ID} onSubmit={handleSubmit}>
                <Field
                  name={FIELD_NAME}
                  render={({ input }) => {
                    const checked =
                      input.value ===
                      FlightDuplicationOptions.DUPLICATE_WITH_CREATIVES;

                    return (
                      <StyledRadio
                        disabled={isPodcast}
                        checked={checked}
                        value={
                          FlightDuplicationOptions.DUPLICATE_WITH_CREATIVES
                        }
                        onChange={(e: FormEvent) => {
                          input.onChange(e);
                        }}
                        name={input.name}
                        data-test={`${FlightDuplicationOptions.DUPLICATE_WITH_CREATIVES}-test`}
                        label={i18n.t(
                          'I18N_DUPLICATE_AD_SET_WITH_ADS_DIALOG_TITLE',
                          'Duplicate ad set with ads',
                        )}
                        description={i18n.t(
                          'I18N_DUPLICATE_AD_SET_ADS_HELP_TEXT',
                          'Any ads attached to this ad set will also be duplicated.',
                        )}
                        icon={
                          <FlightWithCreatives color={checked ? white : plum} />
                        }
                      />
                    );
                  }}
                />
                <Field
                  name={FIELD_NAME}
                  render={({ input }) => {
                    const checked =
                      input.value ===
                      FlightDuplicationOptions.DUPLICATE_WITHOUT_CREATIVES;

                    return (
                      <StyledRadio
                        checked={checked}
                        value={
                          FlightDuplicationOptions.DUPLICATE_WITHOUT_CREATIVES
                        }
                        onChange={(e: FormEvent) => {
                          input.onChange(e);
                        }}
                        name={input.name}
                        data-test={`${FlightDuplicationOptions.DUPLICATE_WITHOUT_CREATIVES}-test`}
                        label={i18n.t(
                          'I18N_DUPLICATE_AD_SET_ONLY',
                          'Duplicate ad set only',
                        )}
                        description={i18n.t(
                          'I18N_DUPLICATE_AD_SET_ONLY_HELP_TEXT',
                          'You’ll need to create new ads for this ad set.',
                        )}
                        icon={
                          <FlightWithoutCreatives
                            color={checked ? white : plum}
                          />
                        }
                      />
                    );
                  }}
                />
              </StyledForm>
            }
            footer={
              <div>
                <ButtonTertiary
                  onClick={props.onClose}
                  buttonSize={ButtonTertiary.sm}
                  condensed
                  buttonLegacy
                >
                  {i18n.t('I18N_CANCEL', 'Cancel')}
                </ButtonTertiary>
                <AnalyticsContextConsumer>
                  {({ category, logUserAction }) => (
                    <FormSpy
                      render={({ form }) => (
                        <RemoteSubmitFormButton
                          htmlFormElementId={FORM_ID}
                          buttonSize={ButtonTertiary.sm}
                          onClick={() => {
                            logUserAction({
                              category,
                              label: 'duplicate_ad_set_modal_start',
                              params: {
                                duplicationOption: form.getState().values[
                                  FIELD_NAME
                                ],
                              },
                            });
                          }}
                        >
                          {i18n.t('I18N_CONTINUE', 'Continue')}
                        </RemoteSubmitFormButton>
                      )}
                    />
                  )}
                </AnalyticsContextConsumer>
              </div>
            }
          />
        )}
      />
    </Backdrop>
  );
};
