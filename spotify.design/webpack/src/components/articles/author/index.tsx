import React from 'react';
import Img, { FluidObject } from 'gatsby-image';
import { ContentfulAsset } from '../../../../typings/graphql-types';
import { Link } from '../../utilities/gatsby-link';
import style from './style.module.css';
import { Avatar } from './placeholder';
import { IMAGE_PLACEHOLDER_COLOR } from '../../../common/constants';

interface Props {
  name: string;
  jobTitle?: string;
  link?: string;
  headshot?: ContentfulAsset;
  bio?: string;
}

interface HeadshotProps {
  className?: string;
  alt?: string;
  headshot: ContentfulAsset;
}

const Headshot = ({ headshot, alt, className }: HeadshotProps) => {
  if (headshot?.fluid?.src) {
    return (
      <Img
        fluid={headshot.fluid as FluidObject}
        alt={alt || headshot.description || undefined}
        backgroundColor={IMAGE_PLACEHOLDER_COLOR}
        className={className}
      />
    );
  }

  return null;
};

Headshot.defaultProps = {
  className: '',
};

export const Author = ({ name, bio, link, headshot, jobTitle }: Props) => (
  <div className={style.author}>
    <div className={style.imageContainer}>
      {headshot ? (
        <Headshot headshot={headshot} alt={name} className={style.image} />
      ) : (
        <div className={`${style.image} ${style.placeholder}`}>
          <Avatar />
        </div>
      )}
    </div>

    <div className={style.content}>
      {name && <h3 className={`t-heading-2 ${style.name}`}>{name}</h3>}
      {jobTitle && (
        <span className={`t-subhead-2 ${style.jobTitle}`}>{jobTitle}</span>
      )}
      {bio && <p className={`t-body-3 ${style.bio}`}>{bio}</p>}

      {link && (
        <Link to={link} className={`t-ui-4 ${style.link}`}>
          Read More
        </Link>
      )}
    </div>
  </div>
);

export const AuthorCondensed = ({ name, headshot }: Props) => (
  <div className={style.authorCondensed}>
    <div className={style.imageContainer}>
      {headshot ? (
        <Headshot headshot={headshot} className={style.image} />
      ) : (
        <div className={`${style.image} ${style.placeholder}`}>
          <Avatar />
        </div>
      )}
    </div>
    <div>
      {name && <span className={`t-heading-3 ${style.name}`}>{name}</span>}
    </div>
  </div>
);
