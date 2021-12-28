import React from 'react';
import styled from 'styled-components';
import Button from '../../common/01_atoms/button';
import { IPalette } from '../../common/types';
import { Heading3 } from '../01_atoms/heading';
import { SmallTextStyles } from '../../common/01_atoms/text';

interface IStyledGalleryCardProps {
  palette: IPalette;
}

const StyledGalleryCard = styled.div`
  width: 100%;
  background-color: ${(props: IStyledGalleryCardProps) => props.palette.background};
  padding: 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  @media (min-width: 1025px) {
    border-radius: 20px;
    padding: 96px 119px;
    flex-direction: row;
    align-items: center;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;

    ${Heading3} {
      color: ${(props: IStyledGalleryCardProps) => props.palette.foreground};
      margin-bottom: 13px;
    }
    h3 {
      color: ${(props: IStyledGalleryCardProps) => props.palette.foreground};
      margin-bottom: 0;
      ${SmallTextStyles};
    }
    p {
      ${SmallTextStyles};
      color: var(--color-SNOW);
      margin-bottom: 0;
    }

    @media (max-width: 1024px) {
      margin-bottom: 20px;
    }
  }
`;

interface IGalleryCardProps {
  palette: IPalette;
  title: string;
  subheader: string;
  smallCopy: string;
  id: string;
  isLocked: boolean;
}

const GalleryCard = (props: IGalleryCardProps) => {
  const { palette, title, subheader, smallCopy, id, isLocked } = props;
  return (
    <StyledGalleryCard palette={palette}>
      <div>
        <h3>{subheader}</h3>
        <Heading3 as="h2">{title}</Heading3>
        <p>{smallCopy}</p>
      </div>
      <Button
        to={isLocked ? '' : `/gallery/${id}`}
        fgColor={palette.foreground}
        bgColor={palette.background}
        isLocked={isLocked}
        label={isLocked ? 'Complete Previous Courses' : "Visit the Gallery"}
      />
    </StyledGalleryCard>
  );
};

export default GalleryCard;
