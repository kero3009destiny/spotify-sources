import React from 'react';
import { IconArrow } from '../../utilities/ui-icons';
import style from './style.module.css';
import buttonStyle from '../../buttons/style.module.css';
import { Tag, TagData } from '../../tag';

interface Props {
  playlist: SpotifyApi.PlaylistObjectFull;
  className?: string;
  tags?: TagData[];
}

export const PlayerPlaylistHeader = ({ className, playlist, tags }: Props) => {
  return (
    <header className={`${style.header} ${className}`}>
      <div className={style.headerInner}>
        {tags && (
          <ul className={`unstyled-list ${style.tags}`}>
            {tags.map(({ title, href }) => (
              <li key={title}>
                <Tag title={title} href={href} />
              </li>
            ))}
          </ul>
        )}
        <img
          src={playlist.images[0]?.url}
          alt="Playlist cover"
          className={style.image}
        />
        <div className={style.content}>
          <h2 className="t-heading-2">{playlist.name}</h2>
          <p className="t-body-4">{playlist.description}</p>

          <div>
            <a
              href={playlist.external_urls.spotify}
              rel="noopener noreferrer"
              target="_blank"
              className={`t-ui-4 ${buttonStyle.buttonSmall} ${style.link}`}
            >
              <span className={buttonStyle.label}>Open Spotify</span>
              <span className={buttonStyle.icon}>
                <IconArrow rotation={-135} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
