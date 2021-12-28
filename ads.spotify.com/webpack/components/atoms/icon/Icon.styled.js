import styled from 'styled-components';
import { ReactSVG } from 'react-svg';

import { colors } from 'styles/variables';

export const Icon = styled(ReactSVG)`
  color: ${props => props.color || colors.black};
`;
