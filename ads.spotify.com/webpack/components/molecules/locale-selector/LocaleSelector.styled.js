import styled from 'styled-components';

import { Headline, Cta } from 'components/atoms';
import { colors } from 'styles/variables';
import { minWidth } from 'styles/media-queries';

export const Root = styled.div`
  background-color: ${props => props.backgroundColor};
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 5.3rem;
  padding-top: 6.4rem;

  ${minWidth.lg`
    display: block;
    height: auto;
    padding-bottom: 8.5rem;
    padding-top: 8.85rem;
  `}
`;

export const Title = styled(Headline).attrs({ tag: 'h4', styling: 'h4' })`
  color: ${colors.white};
  margin-bottom: 3.2rem;

  ${minWidth.lg`
    font-size: 3.6rem;
    margin-bottom: 4.8rem;
  `}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  scrollbar-color: ${colors.white} ${colors.grey200};
  scrollbar-width: thin;
  width: 100%;
  -webkit-overflow-scrolling: touch;

  ${minWidth.md`
    flex-direction: row;
    flex-wrap: wrap;
    flex: -1;
    height: 50vh;
    max-height: 48.8rem;
  `}

  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background: ${colors.grey200};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.white};
    border-radius: 0.4rem;
  }
`;

export const CountryItem = styled.div`
  margin-bottom: 1.6rem;

  ${minWidth.md`
    flex: 60%;

    &:nth-child(even) {
      flex: 40%;
    }
  `}
`;

export const LocaleCta = styled(Cta).attrs({
  type: 'textLink',
})`
  align-items: center;
  display: flex;
  flex-direction: row;
  text-decoration: none;
`;

export const CountryName = styled.span`
  color: ${props => props.color};
  font-size: 1.6rem;
  line-height: 2.4rem;

  ${minWidth.lg`
    font-size: 2rem;
    line-height: 3.2rem;
  `}
`;

export const CountryFlag = styled.div`
  display: flex;
  height: 1.8rem;
  margin-right: 1.6rem;
  width: 2.4rem;

  & svg {
    flex: 1;
  }
`;
