import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

interface Props {
  children: React.ReactNode;
  to: string;
  activeClassName?: string;
  partiallyActive?: boolean;

  [other: string]: string | boolean | React.ReactNode | undefined;
}

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
export const Link = ({
  children,
  to,
  activeClassName,
  partiallyActive,
  ...other
}: Props) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to);
  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </GatsbyLink>
    );
  }
  return (
    <a href={to} rel="noopener noreferrer" target="_blank" {...other}>
      {children}
    </a>
  );
};
