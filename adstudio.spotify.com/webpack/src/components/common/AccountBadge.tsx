import React from 'react';
import styled from 'styled-components';

import { color as brandColors } from '@spotify-internal/encore-foundation';

export const UserIcon = styled.div<{ width: string; height: string }>`
  width: ${props => props.width};
  height: ${props => props.height};
  margin: 0 1rem 0 0;
  font-size: 0.7rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primaryColor};
  text-transform: capitalize;
  background-color: ${props => props.color};
`;

const {
  aquamarine,
  citric,
  pink,
  factoryYellow,
  powderGreen,
  storm,
  sunflower,
} = brandColors;

const colors = [
  aquamarine,
  citric,
  pink,
  factoryYellow,
  powderGreen,
  storm,
  sunflower,
];

export const hashTool = (string: string) =>
  string.split('').reduce((accumulative: number, current: string) => {
    const token = (accumulative << 5) - accumulative + current.charCodeAt(0);
    return token & token;
  }, 0);

export const colorGenerator = (account: string): string =>
  colors[hashTool(account.slice(-4)) % colors.length];

// Pass classname in case there are styled-components above it
const AccountBadge: React.FC<{
  account: string;
  className?: string;
  width?: string;
  height?: string;
}> = ({ account, children, className, width = '2rem', height = '2rem' }) => {
  const color = colorGenerator(account);
  return (
    <UserIcon color={color} className={className} width={width} height={height}>
      {children}
    </UserIcon>
  );
};

export default AccountBadge;
