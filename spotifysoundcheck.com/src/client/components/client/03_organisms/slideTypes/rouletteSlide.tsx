import { Heading2Styles, Heading4Styles } from '../../01_atoms/heading';
import React, { useEffect, useState } from 'react';

import { IPalette } from '../../../common/types';
import { SmallTextStyles } from '../../../common/01_atoms/text';
import styled from 'styled-components';

const StyledRouletteSlide = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 60px 10% 1fr 100px;
  grid-column-gap: 24px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    padding: 24px;
  }
`;

const StyledRouletteWheel = styled.div`
  grid-row: 3;
  grid-column: 2 / span 4;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-height: 100%;
  @media screen and (max-width: 1024px) {
    grid-column: 1 / span 4;
    justify-content: flex-end;
  }
`;

interface IStyledRouletteItem {
  palette: IPalette;
  isSelected: boolean;
}

const StyledRouletteItem = styled.h1`
  color: ${(props: IStyledRouletteItem) => props.palette.foreground};
  margin-bottom: 0;
  margin-top: ${(props: IStyledRouletteItem) => (props.isSelected ? '10px' : 0)};
  transition: all 250ms ease-in-out;

  &:hover {
    cursor: pointer;
  }

  h2 {
    ${Heading2Styles};
    opacity: ${(props: IStyledRouletteItem) => (props.isSelected ? 1 : 0.5)};
    transform: ${(props: IStyledRouletteItem) => (props.isSelected ? 'scale(1.1)' : 'scale(1)')};
    transform-origin: 0;
    transition: all 250ms ease-in-out;
  }
  p {
    display: none;
    color: var(--color-SNOW);
    &::after {
      content: ' ';
      display: block;
      margin-bottom: 48px;
    }
  }
  @media screen and (max-width: 1024px) {
    p {
      display: block;
    }
  }
`;

interface IStyledTopHeaderProps {
  palette: IPalette;
}

const StyledTopHeader = styled.h3`
  ${SmallTextStyles};
  grid-row: 2;
  margin-bottom: 0;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  grid-column: 2 / span 10;
  font-weight: bold;
  color: ${(props: IStyledTopHeaderProps) => props.palette.foreground};
  line-height: 1;
  @media screen and (max-width: 1024px) {
    grid-column: 1 / span 4;
    justify-content: center;
    margin-bottom: 40px;
  }
`;

const StyledRouletteContent = styled.div`
  grid-row: 3;
  grid-column: 7 / span 5;
  height: 100%;
  display: grid;
  grid-template-rows: 90% 10%;
  p {
    ${Heading4Styles};
    grid-row: 1;
    color: var(--color-SNOW);
    font-weight: normal;
    height: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }
  span {
    grid-row: 2;
    font-size: 16px;
    color: var(--color-SNOW);
    display: flex;
    align-items: flex-end;
    height: 100%;
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

interface IRouletteSlideProps {
  slide: any;
  palette: IPalette;
  onSlideEnd: any;
}

const RouletteSlide = (props: IRouletteSlideProps) => {
  const {
    fields: { topCopy, footnoteCopy, rouletteCategoryList }
  } = props.slide;

  const [rouletteData, setRouletteData] = useState<any>([]);
  const [selectedRouletteItem, setSelectedRouletteItem] = useState<any>(null);
  const [selectedRouletteItems, setSelectedRouletteItems] = useState<any>([]);

  useEffect(() => {
    rouletteCategoryList.forEach((categoryID: string) => {
      return fetch(`/api/slide/${categoryID}`)
        .then(res => res.json())
        .then(data => {
          setRouletteData((prevRouletteData: any) => [...prevRouletteData, data]);
        })
        .catch(err => console.log(err));
    });
  }, []);

  useEffect(() => {
    if (rouletteData.length > 0 && selectedRouletteItem === null) {
      setSelectedRouletteItem(rouletteData[0]);
    }
  }, [rouletteData]);

  useEffect(() => {
    if (selectedRouletteItem !== null) {
      setSelectedRouletteItems((prevSelection: any) => {
        if (prevSelection.indexOf(selectedRouletteItem.id) === -1) {
          return [...prevSelection, selectedRouletteItem.id];
        }
        return [...prevSelection];
      });
    }
  }, [selectedRouletteItem]);

  useEffect(() => {
    if (selectedRouletteItems.length > 2) {
      props.onSlideEnd();
    }
  }, [selectedRouletteItems.length]);

  return (
    <StyledRouletteSlide>
      <StyledTopHeader palette={props.palette}>{topCopy}</StyledTopHeader>
      {rouletteData.length > 0 && selectedRouletteItem !== null && (
        <StyledRouletteWheel>
          {rouletteData.map((rouletteItem: any) => (
            <StyledRouletteItem
              isSelected={selectedRouletteItem.id === rouletteItem.id}
              palette={props.palette}
              onClick={() => setSelectedRouletteItem(rouletteItem)}
            >
              <h2>{rouletteItem.fields.title}</h2>
              {selectedRouletteItem.id === rouletteItem.id && (
                <p>{selectedRouletteItem.fields.categoryCopy}</p>
              )}
            </StyledRouletteItem>
          ))}
        </StyledRouletteWheel>
      )}
      <StyledRouletteContent>
        <p>{selectedRouletteItem !== null && selectedRouletteItem.fields.categoryCopy}</p>
        <span>{footnoteCopy !== null && footnoteCopy}</span>
      </StyledRouletteContent>
    </StyledRouletteSlide>
  );
};

export default RouletteSlide;
