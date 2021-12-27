import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18n from 'i18next';
import { get, orderBy as _orderBy } from 'lodash';

import { logUserAction as logUserActionAC } from 'ducks/analytics/actions';
import { fetchStockMusic } from 'ducks/stockMusic/actions';
import { getStockMusic } from 'ducks/stockMusic/selectors';

import { AnalyticsContextConsumer } from 'components/common/AnalyticsContext';

import BgAudioTable from './BgAudioTable';

import { BG_MUSIC } from 'config';
import { genreMapping } from 'config/backgroundTracks';
import { ORDERS } from 'config/browseAds';

import PropTypes from 'prop-types';

export class StockMusicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingTrack: {},
      order: ORDERS.ASC,
      orderBy: 'genre',
    };
  }

  handleSort = ({ orderBy: newOrderBy }) => {
    let nextOrder;
    const { orderBy: oldOrderBy, order } = this.state;

    if (newOrderBy === oldOrderBy) {
      nextOrder = order === ORDERS.ASC ? ORDERS.DESC : ORDERS.ASC;
    } else {
      nextOrder = ORDERS.DESC;
    }

    this.setState({
      order: nextOrder,
      orderBy: newOrderBy,
      // Reset playing track when re-rendering tracks to avoid weird audio state
      playingTrack: {},
    });
  };

  updateSelectedTrack = onSelect => (isActive, track) => {
    if (isActive) {
      onSelect({});
    } else {
      onSelect(track);
    }
  };

  updatePlayingTrack = (playingTrack, currentTime, category) => {
    this.setState({ playingTrack });
    this.props.logUserAction({
      category,
      label: 'click_play_on_bg_track',
      params: {
        trackName: playingTrack,
        duration: currentTime,
      },
    });
  };

  tracksWithGenres = () => {
    const { availableStockMusicTracks } = this.props;
    const { order, orderBy } = this.state;

    const tracks = availableStockMusicTracks.map(trackInfo => ({
      ...trackInfo,
      genre: get(genreMapping, trackInfo.genre, i18n.t('I18N_NA', 'N/A')),
    }));

    return _orderBy(tracks, [orderBy], [order]);
  };

  componentWillMount() {
    const { availableStockMusicTracks } = this.props;
    if (availableStockMusicTracks.length === 0) {
      this.props.fetchStockMusic();
    }
  }

  render() {
    const { onSelect, selectedTrack } = this.props;

    const tracks = this.tracksWithGenres();

    return (
      <AnalyticsContextConsumer>
        {({ category }) => (
          <BgAudioTable
            tracks={tracks}
            selectedTrack={selectedTrack}
            handleRowClick={this.updateSelectedTrack(onSelect)}
            handleTitleClick={this.handleSort}
            handleClickPlay={(playingTrack, currentTime) =>
              this.updatePlayingTrack(playingTrack, currentTime, category)
            }
            order={this.state.order}
            orderBy={this.state.orderBy}
            playingTrack={this.state.playingTrack}
            src={this.state.playingTrack && this.state.playingTrack.uri}
          />
        )}
      </AnalyticsContextConsumer>
    );
  }
}

StockMusicTable.defaultProps = {
  availableStockMusicTracks: [],
};

StockMusicTable.propTypes = {
  audioType: PropTypes.oneOf([BG_MUSIC]).isRequired,
  availableStockMusicTracks: PropTypes.array.isRequired,
  fetchStockMusic: PropTypes.func.isRequired,
  logUserAction: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedTrack: PropTypes.shape({
    id: PropTypes.string,
    uri: PropTypes.string,
  }),
};

function mapStateToProps(state) {
  return {
    availableStockMusicTracks: getStockMusic(state),
  };
}

export default connect(mapStateToProps, {
  fetchStockMusic,
  logUserAction: logUserActionAC,
})(StockMusicTable);
