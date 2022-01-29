// ignore-string-externalization
import styled from 'styled-components';

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* min-width: 0 is needed to support truncating text within flex children */
  min-width: 0;
`;
