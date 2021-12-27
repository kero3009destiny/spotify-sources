import { ColumnSelection } from 'ducks/columns/types';

import {
  HIERARCHY_TOOLTIP_TEXT,
  HIERARCHY_TOOLTIP_TEXT_SPAN,
} from 'config/browseAds';

export const getTooltipText = (
  column: keyof ColumnSelection,
  isSpanEnabled: boolean,
): string | React.ReactElement | undefined => {
  if (isSpanEnabled) {
    return HIERARCHY_TOOLTIP_TEXT_SPAN.hasOwnProperty(column)
      ? HIERARCHY_TOOLTIP_TEXT_SPAN[column]!
      : undefined;
  }
  return HIERARCHY_TOOLTIP_TEXT.hasOwnProperty(column)
    ? HIERARCHY_TOOLTIP_TEXT[column]!
    : undefined;
};
