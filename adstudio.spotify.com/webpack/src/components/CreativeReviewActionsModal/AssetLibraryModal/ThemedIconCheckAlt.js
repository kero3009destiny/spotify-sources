import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Icons } from '@spotify-internal/adstudio-tape';

const { IconCheckAlt } = Icons;
const StyledIconCheckAlt = styled(IconCheckAlt)`
  display: block;
`;

export default () => {
  const themeContext = useContext(ThemeContext);
  return (
    <StyledIconCheckAlt iconSolid color={themeContext.colors.primaryColor} />
  );
};
