import React from 'react';
import { Link } from 'gatsby';
import style from './style.module.css';

export interface TagData {
  title: string;
  href: string;
  parentCategory?: string;
  alternate?: boolean;
  isFilter?: boolean;
  isActive?: boolean;
}

export const Tag = ({
  title,
  href,
  alternate,
  isFilter,
  isActive,
}: TagData) => {
  if (!href) return null;

  let url = href;

  // If the tag is active, clicking on it should de-select it.
  if (isActive) {
    // Remove everything after the last "/", which should allow the user
    //    goes back to the parent category.
    url = href.substr(0, href.lastIndexOf('/'));
  }

  const activeClass = isFilter && isActive ? style.active : '';

  return (
    <Link
      to={url}
      className={`t-ui-4 ${style.tag} ${
        alternate ? style.alternate : ''
      } ${activeClass}`}
      activeClassName={style.active}
    >
      <span>{title}</span>
    </Link>
  );
};
