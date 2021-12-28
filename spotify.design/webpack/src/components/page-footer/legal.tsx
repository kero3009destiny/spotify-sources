import React from 'react';
import style from './legal.module.css';

const LEGAL_LINKS = [
  {
    href: 'https://www.spotify.com/uk/legal/end-user-agreement/',
    title: 'Legal',
  },
  {
    href: 'https://www.spotify.com/uk/legal/privacy-policy/',
    title: 'Privacy',
  },
  {
    href: 'https://www.spotify.com/uk/legal/cookies-policy/',
    title: 'Cookies',
  },
  {
    href: 'https://www.spotify.com/uk/account/apps/',
    title: 'Revoke access',
  },
  {
    href: '/rss.xml',
    title: 'RSS',
  },
];

export const Legal = () => {
  // Check if array has exists and has items.
  const gotRelevantLinks = LEGAL_LINKS && LEGAL_LINKS.length;
  // Check if every array item has the "href" key.
  const gotHref = LEGAL_LINKS.every(item => item.hasOwnProperty('href'));

  if (gotRelevantLinks && gotHref) {
    return (
      <ul className={`unstyled-list ${style.nav}`}>
        {LEGAL_LINKS.map(({ title, href }) => (
          <li key={title}>
            <a
              className="t-ui-3"
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>{title}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return null;
};
