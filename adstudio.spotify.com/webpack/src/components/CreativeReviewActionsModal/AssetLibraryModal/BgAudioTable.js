import React from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import styled from 'styled-components';

import { Icons, Table } from '@spotify-internal/adstudio-tape';
import { StyledTableRow } from '@spotify-internal/adstudio-tape/lib/components/TableRow';
import { spacer32, white } from '@spotify-internal/encore-foundation';

import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';

import ThemedIconCheckAlt from './ThemedIconCheckAlt';
import WrappedPlayButton from './WrappedPlayButton';

import PropTypes from 'prop-types';

const { IconCircle } = Icons;

const StyledIconCircle = styled(IconCircle)`
  display: block;
`;

const StyledTable = styled(Table)`
  padding-right: ${spacer32};
  padding-left: ${spacer32};

  ${StyledTableRow} {
    .td.play,
    ${StyledIconCircle} {
      float: right;
      visibility: hidden;
    }

    &:hover {
      .btn-play,
      ${StyledIconCircle} {
        visibility: visible;
      }
    }

    .btn-play.playing {
      visibility: visible;
    }
  }
`;

const DEFAULT_SCHEMA = [
  {
    heading: '',
    size: 'icon',
    type: 'custom',
    name: 'playBtn',
    sort: null,
    cell: (row, props) => {
      /* eslint-disable react/prop-types */
      const { handleClickPlay, playingTrack, rows } = props;
      const trackInfo = rows.find(obj => obj.name === row.name);
      /* eslint-enable react/prop-types */

      return (
        <div className="td play">
          <WrappedPlayButton
            hideText
            handleClickPlay={handleClickPlay}
            src={trackInfo.uri}
            track={trackInfo}
            playingTrack={playingTrack}
          />
        </div>
      );
    },
  },

  {
    cell: 'name',
    heading: i18n.t('I18N_TRACK_NAME', 'Track Name'),
    name: 'name',
    size: 'lg',
    sort: 'name',
    type: null,
  },
];

const CHECK_COLUMN = [
  {
    heading: '',
    name: 'checked',
    size: 'icon',
    sort: null,
    type: 'custom',
    cell: (row, { selectedTrack }) =>
      selectedTrack.name === row.name ? (
        <ThemedIconCheckAlt />
      ) : (
        <StyledIconCircle fillColor={white} iconSize={24} />
      ),
  },
];

const schemaWithGenre = [
  ...DEFAULT_SCHEMA,
  {
    cell: 'genre',
    heading: i18n.t('I18N_GENRE', 'Genre'),
    name: 'genre',
    size: 'md',
    sort: 'genre',
    type: null,
  },

  ...CHECK_COLUMN,
];

export const BgAudioTable = ({
  tracks,
  handleClickPlay,
  handleRowClick,
  handleTitleClick,
  order,
  orderBy,
  selectedTrack,
  ...rest
}) => {
  const rows = tracks.map(trackInfo => ({
    ...trackInfo,
    active: selectedTrack.id === trackInfo.id,
  }));

  return (
    <StyledTable
      {...rest}
      handleRowClick={id => {
        const isActive = selectedTrack.id === id;
        const trackInfo = tracks.find(obj => obj.id === id);
        handleRowClick(isActive, trackInfo);
      }}
      handleClickPlay={handleClickPlay}
      handleTitleClick={handleTitleClick}
      order={order}
      orderBy={orderBy}
      rows={rows}
      selectedTrack={selectedTrack}
      tableSchema={schemaWithGenre}
    />
  );
};

const trackProps = PropTypes.shape({
  name: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  genre: PropTypes.string,
});

BgAudioTable.propTypes = {
  handleClickPlay: PropTypes.func,
  handleRowClick: PropTypes.func,
  handleTitleClick: PropTypes.func,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  selectedTrack: trackProps,
  playingTrack: trackProps,
  trackName: PropTypes.string,
  tracks: PropTypes.arrayOf(trackProps),
};

export default connect(null, {
  logUserAction: logUserActionAC,
})(BgAudioTable);
