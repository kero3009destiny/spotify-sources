import React, { ChangeEvent, PureComponent } from 'react';
import i18n from 'i18next';
import styled from 'styled-components';

import { ButtonPrimary } from '@spotify-internal/adstudio-shared/lib/components/CustomEncore';
import { spacer20 } from '@spotify-internal/encore-foundation';
import {
  Backdrop,
  ButtonTertiary,
  DialogConfirmation,
  FormCheckbox,
  FormGroup,
} from '@spotify-internal/encore-web';

import { ColumnSelection } from 'ducks/columns/types';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';
import { FilterBarButton } from 'components/common/CampaignHierarchy/Filters/ButtonIcon';
import { IconColumns } from 'components/common/CampaignHierarchy/Filters/Icons';

import { ColumnGroup, ColumnValue, FormSchema, FormSection } from './types';

const StyledColumnGroupContainer = styled(FormGroup)`
  padding: 0 0 0 ${spacer20};
  display: grid;
  grid-template-columns: 50% 50%;
`;
export interface ColumnCustomizationFormState {
  showModal: boolean;
  values: ColumnSelection;
}

export interface ColumnCustomizationFormProps {
  onSavePreferences: (values: ColumnSelection) => void;
  schema: FormSchema;
  defaultValues: ColumnSelection;
}

export class ColumnCustomizationForm extends PureComponent<
  ColumnCustomizationFormProps,
  ColumnCustomizationFormState
> {
  state: ColumnCustomizationFormState = {
    showModal: false,
    values: {},
  };

  onCheckboxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { values } = this.state;
    this.setState({
      values: {
        ...values,
        [evt.target.name]: evt.target.checked,
      },
    });
  };

  onGroupCheckboxChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { values } = this.state;
    const columnGroup = this.props.schema.find(
      (formSection: FormSection) => formSection.groupKey === evt.target.name,
    )?.group;

    if (columnGroup) {
      const updatedValues = (Object.keys(columnGroup) as ColumnValue[]).reduce(
        (updatedVals, currentValue) => {
          updatedVals[currentValue] = evt.target.checked;
          return updatedVals;
        },
        {} as ColumnSelection,
      );

      this.setState({
        values: {
          ...values,
          ...updatedValues,
        },
      });
    }
  };

  isGroupCheckboxChecked = (columnGroup: ColumnGroup): boolean => {
    return (Object.keys(columnGroup) as ColumnValue[]).reduce(
      (flag: boolean, columnValue: ColumnValue) => {
        return flag && !!this.state.values[columnValue];
      },
      true,
    );
  };

  closeModal = () =>
    this.setState({
      showModal: false,
      values: {},
    });

  openModal = () =>
    this.setState({
      showModal: true,
      values: this.props.defaultValues,
    });

  renderForm() {
    const { schema } = this.props;

    return (
      <form>
        {schema.map((section: FormSection) => {
          const columnGroup = section.group;
          const groupLabel = section.label;
          const columnValues = Object.keys(columnGroup) as ColumnValue[];

          return (
            <FormGroup key={`custom-col-group-${section.groupKey}`}>
              <FormCheckbox
                onChange={this.onGroupCheckboxChange}
                name={section.groupKey}
                id={section.groupKey}
                checked={this.isGroupCheckboxChecked(columnGroup)}
              >
                {i18n.t(groupLabel.i18nKey, groupLabel.default)}
              </FormCheckbox>

              <StyledColumnGroupContainer>
                {columnValues.map(value => {
                  const checked: boolean = !!this.state.values[value];
                  const label = columnGroup[value];

                  return (
                    <FormCheckbox
                      key={`custom-col-${groupLabel.default}-${value}`}
                      id={`custom-col-${groupLabel.default}-${value}`}
                      onChange={this.onCheckboxChange}
                      name={value}
                      checked={checked}
                    >
                      {i18n.t(label!.i18nKey, label!.default)}
                    </FormCheckbox>
                  );
                })}
              </StyledColumnGroupContainer>
            </FormGroup>
          );
        })}
      </form>
    );
  }

  renderFooter() {
    return (
      <>
        <ButtonTertiary
          onClick={() => {
            this.closeModal();
          }}
          buttonLegacy
        >
          {i18n.t('I18N_CANCEL', 'Cancel')}
        </ButtonTertiary>
        <AnalyticsContextConsumer>
          {({ category, logUserAction }) => (
            <ButtonPrimary
              onClick={() => {
                this.props.onSavePreferences(this.state.values);
                logUserAction({
                  category,
                  label: 'custom_columns_updated',
                  params: {
                    newColumns: Object.keys(this.state.values).join(','),
                  },
                });
                this.closeModal();
              }}
              buttonLegacy
            >
              {i18n.t('I18N_APPLY', 'Apply')}
            </ButtonPrimary>
          )}
        </AnalyticsContextConsumer>
      </>
    );
  }

  render() {
    return (
      <>
        <FilterBarButton
          data-test="custom-column-trigger"
          onClick={this.openModal}
          tooltipText={i18n.t('I18N_CUSTOMIZE_COLUMNS', 'Customize columns')}
        >
          <IconColumns />
        </FilterBarButton>

        {this.state.showModal && (
          <Backdrop
            data-test="custom-column-backdrop"
            center
            onClose={this.closeModal}
          >
            <DialogConfirmation
              body={this.renderForm()}
              dialogTitle={i18n.t(
                'I18N_CUSTOMIZE_COLUMNS',
                'Customize columns',
              )}
              footer={this.renderFooter()}
            />
          </Backdrop>
        )}
      </>
    );
  }
}
