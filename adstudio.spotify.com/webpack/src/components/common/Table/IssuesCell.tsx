import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

import {
  IconExclamationAlt,
  semanticColors,
  Tooltip,
  TooltipTrigger,
} from '@spotify-internal/encore-web';

const StyledTooltip = styled(Tooltip)`
  max-width: 100%;
`;

interface IssuesCellProps {
  issues: ReactNode;
}

export const IssuesCell = ({ issues }: IssuesCellProps) => {
  const [show, toggleShow] = useState(false);
  return (
    <div>
      <TooltipTrigger
        overlay={show && <StyledTooltip>{issues}</StyledTooltip>}
        placement={TooltipTrigger.right}
        onShow={() => toggleShow(true)}
        onHide={() => toggleShow(false)}
      >
        <IconExclamationAlt semanticColor={semanticColors.textSubdued} />
      </TooltipTrigger>
    </div>
  );
};
