import React from 'react';
import { Field, Form } from 'react-final-form';
import { FieldValidator } from 'final-form';
import i18n from 'i18next';
import styled from 'styled-components';
import { i18nRequired } from 'validators/i18nRequired';

import { combineValidators } from '@spotify-internal/adstudio-web-utils/lib/utils/combineValidators';
import {
  FormInput,
  FormRadio,
  semanticColors,
  Type,
} from '@spotify-internal/encore-web';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';
import { FinalFormGroup } from 'components/form-common/FinalFormGroup';

import { constructSavedQuery } from './utils';

import { SavedQuery } from 'types/common/state/api/savedQueries';

const CreateFormContainer = styled.div`
  padding: 1rem 0;
`;

const RadioContainer = styled.div`
  display: flex;
`;

const WrappedRadio = styled.section`
  &:hover > div > label {
    cursor: pointer;
  }
`;

// Field names should match fields in request proto
const SavedQueryNameField = 'savedQueryName';
const IsPublicField = 'isPublic';

// Definitions here should match constants of same name in dunder (RequestValidator.java)
export const SAVED_QUERY_NAME_MIN_LENGTH = 2;
export const SAVED_QUERY_NAME_MAX_LENGTH = 120;
export const savedQueryNameFieldTestId = 'saved-query-name-field';

const validateNameLength: FieldValidator<string> = (name: string) => {
  const nameTrimmed = name.trim();
  if (
    nameTrimmed.length < SAVED_QUERY_NAME_MIN_LENGTH ||
    nameTrimmed.length > SAVED_QUERY_NAME_MAX_LENGTH
  ) {
    return i18n.t('I18N_NAME_INVALID_LENGTH', {
      min: SAVED_QUERY_NAME_MIN_LENGTH,
      max: SAVED_QUERY_NAME_MAX_LENGTH,
      defaultValue: 'Name must be between {{min}} and {{max}} characters long.',
    });
  }
  return undefined;
};

interface CreateSavedQueryProps {
  formId: string;
  iamDomain: string;
  createSavedQuery: (savedQuery: SavedQuery, params: string) => void;
  selectedCampaigns: string[];
  selectedFlights: string[];
}

interface CreateSavedQueryFormValues {
  savedQueryName: string;
  isPublic: string;
}

export const CreateSavedQuery = ({
  formId,
  iamDomain,
  createSavedQuery,
  selectedCampaigns,
  selectedFlights,
}: CreateSavedQueryProps) => {
  const onSubmit = (formValues: CreateSavedQueryFormValues) => {
    const savedQuery = constructSavedQuery(
      iamDomain,
      formValues.savedQueryName.trim(),
      formValues.isPublic,
      window.location.pathname,
      window.location.search,
      selectedCampaigns,
      selectedFlights,
    );
    createSavedQuery(savedQuery, window.location.search);
  };

  return (
    <AnalyticsContextConsumer>
      {({ logUserAction, category }) => (
        <CreateFormContainer>
          <Form<CreateSavedQueryFormValues>
            onSubmit={formValues => {
              onSubmit(formValues);
              logUserAction({
                category,
                label: 'save_current_filter',
              });
              if (formValues.isPublic === 'true') {
                logUserAction({
                  category,
                  label: 'saved_filter_share',
                });
              }
            }}
          >
            {props => (
              <form onSubmit={props.handleSubmit} id={formId}>
                <Field
                  name={SavedQueryNameField}
                  validate={combineValidators([
                    i18nRequired,
                    validateNameLength,
                  ])}
                  render={({ input, meta }) => (
                    <FinalFormGroup
                      input={input}
                      meta={meta}
                      label={i18n.t('I18N_SAVED_FILTERS_NAME_LABEL', 'Name')}
                      hideErrorUntilTouched
                    >
                      <FormInput
                        data-test={savedQueryNameFieldTestId}
                        placeholder={i18n.t(
                          'I18N_SAVED_FILTERS_NAME_PLACEHOLDER',
                          'E.g., My Saved Filter',
                        )}
                        {...input}
                      />
                    </FinalFormGroup>
                  )}
                />

                <RadioContainer>
                  <Field
                    name={IsPublicField}
                    type="radio"
                    value="false"
                    initialValue="false"
                    render={({ input }) => (
                      <WrappedRadio>
                        <FormRadio {...input} id="false">
                          {i18n.t(
                            'I18N_SAVED_FILTERS_ACCESS_PRIVATE',
                            'Private',
                          )}
                        </FormRadio>
                      </WrappedRadio>
                    )}
                  />
                  <Field
                    name={IsPublicField}
                    type="radio"
                    value="true"
                    render={({ input }) => (
                      <WrappedRadio>
                        <FormRadio {...input} id="true">
                          {i18n.t('I18N_SAVED_FILTERS_ACCESS_SHARED', 'Shared')}
                        </FormRadio>
                      </WrappedRadio>
                    )}
                  />
                </RadioContainer>
                <Type.p semanticColor={semanticColors.textSubdued}>
                  {i18n.t(
                    'I18N_SAVED_FILTERS_ACCESS_DESCRIPTION',
                    `You can keep this view private or share it with others in your organization
                    with access to this ad account`,
                  )}
                </Type.p>
              </form>
            )}
          </Form>
        </CreateFormContainer>
      )}
    </AnalyticsContextConsumer>
  );
};
