import React from 'react';
import styled from 'styled-components';

import { semanticColors, Type } from '@spotify-internal/encore-web';

const StyledType = styled(Type)`
  word-break: break-word;
`;

const NameText = styled.p`
  display: block;
`;

const Container = styled.div`
  width: 375px;
`;

export interface NameCellProps {
  name: string;
  'data-test'?: string;
  keyId: string;
}

export const NameCell = (props: NameCellProps) => (
  <Container data-test={props['data-test']}>
    <NameText>
      <StyledType
        semanticColor={semanticColors.textBase}
        variant={Type.body1}
        weight={Type.bold}
      >
        {props.name}
      </StyledType>
    </NameText>
  </Container>
);
