import React from 'react';
import Img, { FluidObject } from 'gatsby-image';
import { ContentfulAsset } from '../../../../typings/graphql-types';
import style from './style.module.css';
import { IMAGE_PLACEHOLDER_COLOR } from '../../../common/constants';

interface Props {
  images: ContentfulAsset[];
  caption: string;
}

export const Gallery = ({ images, caption }: Props) => {
  if (!images?.length) return null;

  let columns = images.length < 2 ? images.length : 2;
  if (images.length === 3) columns = images.length;
  const columnClass = style[`gallery${columns}`];

  return (
    <div className={`sd-article-gallery ${style.gallery} ${columnClass}`}>
      {images.map((data, index) => {
        if (!data?.fluid?.src) return null;

        return (
          <figure key={index} className={style.figure}>
            <div className={style.imageContainer}>
              <Img
                fluid={data.fluid as FluidObject}
                alt={data.title ? data.title : undefined}
                backgroundColor={IMAGE_PLACEHOLDER_COLOR}
              />
            </div>
            {data?.description && (
              <figcaption className={`t-body-4 ${style.caption}`}>
                {data.description}
              </figcaption>
            )}
          </figure>
        );
      })}
      {caption && <p className={`t-body-4 ${style.caption}`}>{caption}</p>}
    </div>
  );
};
