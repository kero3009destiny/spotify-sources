// ignore-string-externalization
import styled from 'styled-components';
import { cssColorValue } from '@spotify-internal/encore-web';

export const SliderBall = styled.div`
  background: #1ed760;
  border-radius: 16px;
  bottom: 6px;
  height: 16px;
  position: relative;
  width: 16px;
`;
export const SliderContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 16px;
`;
export const SliderCustom = styled.div`
  background: ${cssColorValue('essentialBase')};
  border-radius: 5px;
  height: 4px;
  margin-top: 6px;
  width: 100%;
`;
export const SliderGutterContainer = styled.div`
  height: 16px;
  margin: 0 12px;
  width: 100%;
  &:active {
    cursor: default;
  }
`;
export const SliderInput = styled.input`
  display: none;
`;
