import styled from 'styled-components';
import { Type, gray70, white, spacer24 } from '@spotify-internal/encore-web';

type Props = {
  active: boolean;
};

export const EntityItem = styled.li<Props>`
  margin-left: -${spacer24};
  margin-right: -${spacer24};
  color: ${(props) => (props.active ? white : gray70)};
  font-weight: ${(props) => (props.active ? Type.bold : undefined)};
`;
