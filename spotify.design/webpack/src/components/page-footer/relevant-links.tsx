import React from 'react';
import style from './relevant-links.module.css';
import { sendTrackingEvent } from '../../common/utils/sendTrackingEvent';

const RELEVANT_LINKS = [
  {
    href: 'https://newsroom.spotify.com/',
    title: 'Newsroom',
  },
  {
    href: 'https://www.spotifyjobs.com/',
    title: 'Spotify Jobs',
  },
  {
    href: 'https://www.spotify.com',
    title: 'Spotify.com',
  },
  {
    href: 'https://engineering.atspotify.com/',
    title: 'Spotify R&D Engineering',
  },
  {
    href: 'https://research.atspotify.com/',
    title: 'Spotify R&D Research',
  },
  {
    href: 'https://medium.com/spotify-insights',
    title: 'Spotify R&D Insights',
  },
  {
    href: 'https://www.instagram.com/spotify.design/',
    title: 'Instagram',
  },
  {
    href: 'https://twitter.com/spotifydesign',
    title: 'Twitter',
  },
];

export const RelevantLinks = () => {
  // Check if array has exists and has items.
  const gotRelevantLinks = RELEVANT_LINKS && RELEVANT_LINKS.length;
  // Check if every array item has the "href" key.
  const gotHref = RELEVANT_LINKS.every(item => item.hasOwnProperty('href'));

  if (gotRelevantLinks && gotHref) {
    return (
      <nav aria-label="relevant links">
        <ul className={`unstyled-list ${style.list}`}>
          {RELEVANT_LINKS.map(({ title, href }) => (
            <li key={title}>
              <a
                className="t-subhead-2"
                href={href}
                rel="noopener noreferrer"
                target="_blank"
                onClick={() => sendTrackingEvent('footer', 'click', title)}
              >
                <span>{title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return null;
};
