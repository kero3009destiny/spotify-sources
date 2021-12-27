import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import memoize from 'lodash/memoize';

export default class TrackRatingQuestionWrapper {
  constructor(state, surveyId, questionId) {
    this.state = state;
    this.surveyId = surveyId;
    this.questionId = questionId;

    this.getPath = memoize(this._fromPath.bind(this), (...args) => {
      return JSON.stringify(args);
    });
  }

  _fromPath(root, defaultValue, ...path) {
    return get(
      this.state,
      [root, this.surveyId, this.questionId, ...path],
      defaultValue
    );
  }

  get tracks() {
    return this.getPath('surveyQuestionDetails', []);
  }

  get ratings() {
    return this.getPath('surveyQuestionMeta', {}, 'ratings');
  }

  get currentTrack() {
    return this.getPath('surveyQuestionMeta', 0, 'currentTrack');
  }

  get question() {
    const surveyMeta = this.state.surveyMeta[this.surveyId];
    if (!(surveyMeta && surveyMeta.questions)) {
      return null;
    }
    return surveyMeta.questions[this.questionId];
  }

  get allTracksRated() {
    return this.tracks.reduce(
      (reduction, track) =>
        reduction && typeof this.ratings[track.uri] === 'number',
      true
    );
  }

  get allTracksRatedOrSkipped() {
    return this.tracks.reduce(
      (reduction, track) => reduction && !isUndefined(this.ratings[track.uri]),
      true
    );
  }

  canAdvance(startTrack) {
    return this.getNextUnratedTracks(startTrack).length > 0;
  }

  getNextUnratedTracks(startTrack) {
    const { currentTrack, ratings, tracks } = this;

    const trackIndex =
      (isUndefined(startTrack) ? currentTrack : startTrack) + 1;

    const trackIndices = [];
    for (let i = trackIndex; i < tracks.length; i++) {
      const track = tracks[i];
      if (isUndefined(ratings[track.uri])) {
        trackIndices.push(i);
      }
    }

    return trackIndices;
  }

  getNextUnratedDescriptorTracks(startTrack) {
    const {currentTrack, ratings, tracks} = this;

    const trackIndex =
      (isUndefined(startTrack) ? currentTrack : startTrack) + 1;

    const trackIndices = [];
    const trackDescriptorLists = {};
    for (let i = trackIndex; i < tracks.length; i++) {
      const track = tracks[i];

      if (!isUndefined(ratings[track.uri]) ||
        ((typeof trackDescriptorLists[track.uri.toString()] !== 'undefined') ?
          (trackDescriptorLists[track.uri.toString()].indexOf(track.descriptors.text) < 0) : true)) {
        trackIndices.push(i);
      }

      if (trackDescriptorLists.hasOwnProperty(track.uri.toString())) {
        trackDescriptorLists[track.uri.toString()] = trackDescriptorLists[track.uri.toString()].concat([track.descriptors.text]);
      } else {
        trackDescriptorLists[track.uri.toString()] = [track.descriptors.text];
      }
    }

    return trackIndices;
  }

  getPreviousTrack(startTrack) {
    const trackIndex = Math.min(startTrack, this.tracks.length - 1);
    return trackIndex > 0 ? trackIndex - 1 : 0;
  }
}



// WEBPACK FOOTER //
// ./src/lib/TrackRatingQuestionWrapper.js