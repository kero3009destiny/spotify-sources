import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'i18n/nexti18n';

import * as Styled from './SpotifyPlayer.styled';

const TYPES = {
  PLAYLIST: 'playlist',
  ALBUM: 'album',
  CONCERT: 'concert',
  ARTIST: 'artist',
  TRACK: 'track',
  SHOW: 'show',
  EPISODE: 'episode',
};

const PLAYER_VARIATIONS = {
  [TYPES.PLAYLIST]: Styled.MODIFIERS.PLAYLIST,
  [TYPES.ALBUM]: Styled.MODIFIERS.PLAYLIST,
  [TYPES.CONCERT]: Styled.MODIFIERS.PLAYLIST,
  [TYPES.ARTIST]: Styled.MODIFIERS.PLAYLIST,
  [TYPES.TRACK]: Styled.MODIFIERS.TRACK,
  [TYPES.SHOW]: Styled.MODIFIERS.PODCAST,
  [TYPES.EPISODE]: Styled.MODIFIERS.PODCAST,
};

/**
 * getSpotifySrcFromTypeId - Gets a Spotify URI from type and id
 * @param {string} type - Source type
 * @param {string} id - Source id
 * @returns {string} src
 */
const getSpotifySrcFromTypeId = (type, id) => {
  const isPodcast = [TYPES.SHOW, TYPES.EPISODE].includes(type);
  const embed = isPodcast ? `embed-podcast/${type}` : `embed/${type}`;

  return `https://open.spotify.com/${embed}/${id}`;
};

/**
 * getUriData - Gets the URI data
 * @param {string} src - The Spotify URI "spotify:track:4YGSpi9g7ohPFO8TXpvSUZ"
 * @returns {object} data
 * @returns {string} data.type - Source type
 * @returns {string} data.id - Source id
 */
const getUriData = (src = '') => {
  // gets the last two pieces of data in the Spotify URI string
  const [, type = '', id = ''] = src.match(/[^:]+:([^:]+):([^:]+)/) || [];

  return {
    type,
    id,
  };
};

const getPlayerVariation = type => {
  return PLAYER_VARIATIONS[type] || Styled.MODIFIERS.TRACK;
};

/**
 * SpotifyPlayer Component
 * @param {object} props
 * @param {string} props.uri - The Spotify URI "spotify:track:4YGSpi9g7ohPFO8TXpvSUZ"
 * @param {string} props.pageContext - The page context modifier
 * @returns {ReactElement}
 */
const SpotifyPlayer = ({ uri, pageContext = '' }) => {
  const { t } = useTranslation();
  const { type, id } = useMemo(() => getUriData(uri), [uri]);

  const src = useMemo(() => getSpotifySrcFromTypeId(type, id), [type, id]);
  const variation = useMemo(() => getPlayerVariation(type), [type]);

  return (
    <Styled.Root modifier={pageContext}>
      <Styled.Container modifier={pageContext}>
        <Styled.Iframe
          title={`${t('embeddedSpotify')} ${type}`}
          src={src}
          frameBorder="0"
          allow="encrypted-media"
          modifier={variation}
          scrolling="no"
        />
      </Styled.Container>
    </Styled.Root>
  );
};

SpotifyPlayer.propTypes = {
  /**
   * The source URI
   */
  uri: PropTypes.string.isRequired,
  /**
   * The Page context string
   */
  pageContext: PropTypes.string,
};

export default SpotifyPlayer;
