import React from 'react';
import styled from 'styled-components';
import { sanitize } from 'dompurify';

interface IStyledGalleryItemCard {
  titleColor: string;
}

const StyledGalleryItemCard = styled.div`
  width: 372px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  img {
    width: 100%;
    height: 410px;
    object-fit: cover;
    box-shadow: 7px 11px 15px rgba(0, 0, 0, 0.17);
  }
  p {
    margin-top: 29px;
    font-size: 18px;
    margin-bottom: 18px;
    margin-top: 29px;
  }
  h3 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 32px;
    color: ${(props: IStyledGalleryItemCard) => props.titleColor}
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    height: auto;
    img {
      max-width: 100%;
      height: auto;
    }
  }
`;

interface IGalleryItemCard {
  titleColor: string;
  subtitle: string;
  title: string;
  backgroundImageURL: string;
  onClick: any;
}

const GalleryItemCard = (props: IGalleryItemCard) => {
  return (
    <StyledGalleryItemCard titleColor={props.titleColor}>
      <img src={props.backgroundImageURL} />
      <p>{props.subtitle}</p>
      <h3 dangerouslySetInnerHTML={{__html: sanitize(props.title)}} />
    </StyledGalleryItemCard>
  );
};

export default GalleryItemCard;
