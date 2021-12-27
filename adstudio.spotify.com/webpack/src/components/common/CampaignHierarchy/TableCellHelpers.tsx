import React, { ReactNode } from 'react';
import i18n from 'i18next';
import styled from 'styled-components';

import { TooltipInfo } from '@spotify-internal/adstudio-tape';

import {
  CostType,
  FlightsCatalogueEntity,
} from 'types/common/state/api/flights';

const NA = '-';

const StyledTooltipInfo = styled(TooltipInfo)`
  justify-content: flex-end;
`;

export const costModelNa = (
  model: CostType,
  tooltipText: string | ReactNode,
) => {
  return (row: FlightsCatalogueEntity, element: ReactNode) => {
    if (row.pricingModel === model) {
      return (
        <StyledTooltipInfo
          icon={false}
          tooltipText={tooltipText}
          placement="right"
        >
          <span
            data-test={`metric-does-not-apply-tooltip-cell-${model.toLowerCase()}`}
          >
            {NA}
          </span>
        </StyledTooltipInfo>
      );
    }
    return element;
  };
};

export const ifCpmNa: (
  row: FlightsCatalogueEntity,
  element: ReactNode,
) => ReactNode = costModelNa(
  CostType.CPM,
  i18n.t(
    'I18N_THIS_METRIC_DOESNT_APPLY_EX_AU',
    "This metric doesn't apply to ads targeted outside of Australia.",
  ),
);

export const ifCpclNa: (
  row: FlightsCatalogueEntity,
  element: ReactNode,
) => ReactNode = costModelNa(
  CostType.CPCL,
  i18n.t(
    'I18N_THIS_METRIC_DOESNT_APPLY_IN_AU',
    "This metric doesn't apply to ads targeted inside of Australia.",
  ),
);
