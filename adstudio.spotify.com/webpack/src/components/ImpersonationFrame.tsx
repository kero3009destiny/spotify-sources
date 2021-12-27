import React from 'react';
import i18n from 'i18next';
import styled from 'styled-components';

// we want the border to appear over the sidebar nav so it needs
// a higher z-index

const frameColor = `#f86624`;
const zindex = `3000`;

const commonStyles = `
  background: ${frameColor};
  position: fixed;
  z-index: ${zindex};
`;

const leftRightStyles = `
  top: 0;
  bottom: 0;
  width: 8px;
`;

const topBottomStyles = `
  left: 0;
  right: 0;
  height: 8px;
`;

const Left = styled.div`
  ${commonStyles}
  ${leftRightStyles}
  left: 0;
`;

const Right = styled.div`
  ${commonStyles}
  ${leftRightStyles}
  right: 0;
`;

const Top = styled.div`
  ${commonStyles}
  ${topBottomStyles}
  top: 0;
`;

const Bottom = styled.div`
  ${commonStyles}
  ${topBottomStyles}
  bottom: 0;
`;

const Label = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  background: ${frameColor};
  color: white;
  height: 24px;
  font-size: 12px;
  padding: 5px 10px;
  z-index: ${zindex};
`;

interface ImpersonationFrameProps {
  accountName?: string;
}

export const ImpersonationFrame = ({
  accountName,
}: ImpersonationFrameProps) => {
  return (
    <div data-test="impersonation-frame">
      <Left />
      <Right />
      <Top />
      <Bottom />
      {accountName && (
        <Label>
          {i18n.t('I18N_ACTING_AS_ADVERTISER', {
            accountName,
            defaultValue: `Acting as: ${accountName}`,
          })}
        </Label>
      )}
    </div>
  );
};
