import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { ValidationErrors } from 'final-form';
import i18n from 'i18next';
import isEqual from 'lodash/isEqual';
import styled from 'styled-components';

import { spacer16 } from '@spotify-internal/encore-foundation';
import {
  FormInput,
  IconExclamationAlt,
  semanticColors,
  Table,
  TableCell,
  TableContainer,
  TableHeaderCell,
  TableRow,
  TableThumbnail,
  Tooltip,
  TooltipTrigger,
  Type,
} from '@spotify-internal/encore-web';

import { CreativesCatalogueState } from 'ducks/creatives/reducer';
import { getCreativesForRotationTables } from 'ducks/creatives/selectors';

import { TableBody } from '../common/Table/TableBody';
import { NameCell } from './NameCell';

import { CreativeRotationFormData } from './constants';

import { CreativesCatalogueEntityWithRotationParameters } from './types';
import { CreativesCatalogueEntity } from 'types/common/state/api/creatives';

const StyledNameCellContainer = styled.div`
  display: flex;
`;

const WeightInput = styled(FormInput)`
  float: right;
  width: 88px;

  /* Chrome, Safari, Edge, Opera - remove numerical input arrows */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox - remove numerical input arrows */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

const RelativeContainer = styled.div`
  position: relative;
`;

const PercentageSpan = styled.span`
  &:after {
    content: '%';
    position: absolute;
    top: 14px;
    left: calc(100% - 46px);
  }
`;

const TableTotalSection = styled.div`
  width: 100%;
  text-align: right;
  height: 60px;
  padding: ${spacer16};
`;

const TotalType = styled(Type)`
  margin-left: ${spacer16};
`;

const StyledIconExclamationAlt = styled(IconExclamationAlt)`
  vertical-align: middle;
`;

export interface StateProps {
  creativesCatalogue: CreativesCatalogueState;
}

export interface OwnProps {
  onChangeWeights: (
    creatives: CreativesCatalogueEntityWithRotationParameters[],
  ) => void;
  errors?: ValidationErrors;
}

export type WeightedTableProps = StateProps & OwnProps;

export const applyCreativeWeights = (
  creatives: CreativesCatalogueEntity[],
  setState: (
    weightedCreatives: CreativesCatalogueEntityWithRotationParameters[],
  ) => void,
  onChange: (
    creatives: CreativesCatalogueEntityWithRotationParameters[],
  ) => void,
  initialize: boolean = false,
) => {
  const creativesAlreadyHaveAWeight =
    creatives[0] &&
    creatives[0].flightLink &&
    !!creatives[0].flightLink.creativeRotationParameters.weight;
  let weightedCreatives: CreativesCatalogueEntityWithRotationParameters[];
  if (initialize && creativesAlreadyHaveAWeight) {
    // Get the existing weights
    weightedCreatives = creatives.map(
      (creativeCatalogueEntity: CreativesCatalogueEntity) => {
        return {
          ...creativeCatalogueEntity,
          weight:
            creativeCatalogueEntity.flightLink?.creativeRotationParameters
              .weight,
        };
      },
    );
  } else {
    // Create a new weighting, setting all weights to 1.0
    weightedCreatives = creatives.map(
      (creativeCatalogueEntity: CreativesCatalogueEntity) => {
        return {
          ...creativeCatalogueEntity,
          weight: 1.0,
        };
      },
    );
  }
  setState(weightedCreatives);
  onChange(weightedCreatives);
};

export const WeightedTable: FunctionComponent<WeightedTableProps> = ({
  creativesCatalogue,
  onChangeWeights,
  errors,
}) => {
  const [weightedCreatives, setWeightedCreatives] = useState<
    CreativesCatalogueEntityWithRotationParameters[]
  >([]);
  const [showTooltip, setShowTooltip] = useState<Record<string, boolean>>({});
  const prevCreativesCatalogueItems = useRef<CreativesCatalogueEntity[]>();
  useEffect(() => {
    if (
      !creativesCatalogue.loading &&
      creativesCatalogue.items &&
      !isEqual(creativesCatalogue.items, prevCreativesCatalogueItems.current)
    ) {
      applyCreativeWeights(
        creativesCatalogue.items,
        setWeightedCreatives,
        onChangeWeights,
        true,
      );
    }
    prevCreativesCatalogueItems.current = creativesCatalogue.items;
  }, [creativesCatalogue, onChangeWeights]);
  const totalWeight: number = weightedCreatives.reduce((accum, current) => {
    return Number.isFinite(current.weight) ? accum + current.weight! : accum;
  }, 0);
  const weightRemaining = Math.max(100 - totalWeight, 0);
  return (
    <>
      <TableContainer>
        <Table data-test="ad-rotation-weighted-table">
          <thead>
            <TableRow>
              <TableHeaderCell>
                {i18n.t('I18N_AD_NAME', 'Ad name')}
              </TableHeaderCell>
              <TableHeaderCell align="right">
                {i18n.t('I18N_WEIGHT', 'Weight')}
              </TableHeaderCell>
            </TableRow>
          </thead>
          <TableBody
            isLoading={creativesCatalogue.loading}
            empty={weightedCreatives.length === 0}
          >
            {weightedCreatives.map(
              (creativeRow: CreativesCatalogueEntityWithRotationParameters) => {
                return (
                  <TableRow key={creativeRow.creativeId}>
                    <TableCell>
                      <StyledNameCellContainer>
                        <TableThumbnail
                          small
                          imgAlt={creativeRow.name}
                          img={creativeRow.imageUrl}
                        />
                        <NameCell
                          keyId={creativeRow.creativeId}
                          name={creativeRow.name}
                        />
                      </StyledNameCellContainer>
                    </TableCell>
                    <TableCell>
                      <RelativeContainer>
                        <PercentageSpan>
                          <TooltipTrigger
                            overlay={
                              showTooltip[creativeRow.creativeId] && (
                                <Tooltip>
                                  <Trans
                                    i18nKey="I18N_PERCENT_LEFT_TO_USE"
                                    values={{ percentage: weightRemaining }}
                                  >
                                    {weightRemaining.toString()}% left to use
                                  </Trans>
                                </Tooltip>
                              )
                            }
                            placement={TooltipTrigger.left}
                            onShow={() =>
                              setShowTooltip({
                                ...showTooltip,
                                [creativeRow.creativeId]: true,
                              })
                            }
                            onHide={() =>
                              setShowTooltip({
                                ...showTooltip,
                                [creativeRow.creativeId]: false,
                              })
                            }
                          >
                            <WeightInput
                              data-test="ad-rotation-weight-input"
                              type="number"
                              min="1"
                              required
                              max="100"
                              step="1"
                              defaultValue={creativeRow.weight}
                              onChange={(
                                e: React.FormEvent<HTMLInputElement>,
                              ) => {
                                const updatedWeights: CreativesCatalogueEntityWithRotationParameters[] = weightedCreatives.map(
                                  (
                                    creative: CreativesCatalogueEntityWithRotationParameters,
                                  ) => {
                                    if (
                                      creative.flightLink!.id ===
                                      creativeRow.flightLink?.id
                                    ) {
                                      return {
                                        ...creative,
                                        weight: parseFloat(
                                          e.currentTarget.value,
                                        ),
                                      };
                                    }
                                    return {
                                      ...creative,
                                    };
                                  },
                                );
                                setWeightedCreatives(updatedWeights);
                                onChangeWeights(updatedWeights);
                              }}
                            />
                          </TooltipTrigger>
                        </PercentageSpan>
                      </RelativeContainer>
                    </TableCell>
                  </TableRow>
                );
              },
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TableTotalSection>
        {errors && errors[CreativeRotationFormData.Fields.Creatives] && (
          <StyledIconExclamationAlt
            semanticColor={semanticColors.textNegative}
          />
        )}
        <TotalType variant={Type.body2}>
          {i18n.t('I18N_TOTAL', 'Total')}: {totalWeight}%
        </TotalType>
      </TableTotalSection>
    </>
  );
};

export const mapStateToProps = (state: TSFixMe): StateProps => {
  return {
    creativesCatalogue: getCreativesForRotationTables(state),
  };
};

export const ConnectedWeightedTable = connect(mapStateToProps)(WeightedTable);

export default ConnectedWeightedTable;
