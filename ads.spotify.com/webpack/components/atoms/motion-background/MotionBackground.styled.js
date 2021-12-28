import styled from 'styled-components';

export const CanvasBg = styled.canvas`
  height: 100%;
  position: fixed;
  top: 0;
  width: 100%;
  opacity: ${props => Number(!props.pause)};
  transition: opacity 1s;
`;
