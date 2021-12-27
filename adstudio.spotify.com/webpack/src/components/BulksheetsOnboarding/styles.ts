import styled from 'styled-components';

import { Popover } from '@spotify-internal/encore-web';

export const ButtonContainer = styled.div`
  display: grid;
  justify-content: right;
`;

export const StyledPopover = styled(Popover)<{ top?: string }>`
  position: absolute;
  min-width: 280px;
  ${props => (props.top ? `top: ${props.top};` : '')}
`;
export const FixedPopover = styled(Popover)`
  position: fixed;
  top: calc(100% - 410px);
  left: calc(50% - 170px);
`;
