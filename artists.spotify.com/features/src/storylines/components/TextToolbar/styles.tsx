// ignore-string-externalization
import styled, { css } from 'styled-components';
import {
  white,
  black,
  gray15,
  spacer16,
  cssColorValue,
} from '@spotify-internal/encore-web';

const ICON_SIZE = 24;
const ICON_BORDER = 8;

const iconBorder = `${ICON_BORDER}px`;
const iconPadding = `${ICON_BORDER * 2}px`;
const iconClickAreaSize = `${ICON_SIZE + ICON_BORDER}px`;
const iconSize = `${ICON_SIZE}px`;

export const Icon = styled.div`
  align-items: center;
  display: inline-flex;
  height: ${iconClickAreaSize};
  justify-content: center;
  width: ${iconClickAreaSize};
`;

export const ToolbarItem = styled.div`
  align-items: center;
  display: inline-flex;
  height: ${iconClickAreaSize};
  justify-content: center;
  width: ${iconClickAreaSize};
`;

export const Toolbar = styled.div<{ condensed?: boolean }>`
  align-items: center;
  border-radius: ${iconBorder};
  box-sizing: content-box;
  color: ${white};
  display: inline-flex;
  height: ${iconClickAreaSize};
  position: relative;
  width: auto;

  > ${ToolbarItem} {
    margin: 0 ${props => (props.condensed ? iconBorder : spacer16)};

    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const Tooltip = styled.div`
  background-color: ${gray15};
  border-radius: ${iconBorder};
  box-shadow: 2px 4px 20px ${gray15};
  margin-left: ${ICON_SIZE / 2}px;
  margin-top: ${ICON_SIZE - ICON_BORDER / 2}px;
  overflow: hidden;
  padding: ${iconPadding};
  position: absolute;
  z-index: 1;
`;

export const ColorDot = styled.span<{ color: string; active?: boolean }>`
  display: block;
  height: ${iconClickAreaSize};
  position: relative;
  width: ${iconClickAreaSize};

  ${props =>
    props.active &&
    css`
      &::before {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: ${iconBorder};
        bottom: -${iconBorder};
        content: '';
        left: -${iconBorder};
        position: absolute;
        right: -${iconBorder};
        top: -${iconBorder};
      }
    `}

  &::after {
    background-color: ${props => props.color};
    border-radius: 100%;
    content: '';
    display: inline-block;
    height: ${iconSize};
    position: relative;
    top: ${ICON_BORDER / 2}px;
    width: ${iconSize};
  }
`;

export const HexLabel = styled.label`
  position: relative;
  color: ${cssColorValue('textSubdued')};
  height: ${iconClickAreaSize};
  margin-left: 8px;
  width: 96px;
  font-size: 12px;
  font-weight: 700;

  &::before {
    content: '#';
    position: absolute;
    line-height: ${iconClickAreaSize};
    left: 8px;
  }
`;

export const HexInput = styled.input`
  border: 1px solid ${gray15};
  border-radius: ${iconBorder};
  color: ${black};
  font-weight: inherit;
  height: 100%;
  padding-left: ${iconSize};
  width: 100%;

  &:invalid {
    border-color: ${cssColorValue('essentialNegative')};
  }
`;
