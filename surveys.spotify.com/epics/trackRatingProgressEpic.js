import {
  fetchMoreTracks,
  setTrackRatingTrack,
} from '../actions/QuestionActions';
import {finishSurvey, generatePlaylist} from '../actions/SurveyActions';

import ActionTypes from '../actions/ActionTypes';
import TrackRatingQuestionWrapper from '../lib/TrackRatingQuestionWrapper';
import {empty} from 'rxjs/observable/empty';
import {merge} from 'rxjs/observable/merge';
import {of} from 'rxjs/observable/of';

const JTF_SURVEY_PATTERN = /^jtf-.+music/;

export default (actions$, store) => {
  return actions$
    .ofType(
      ActionTypes.TRACK_RATING_INCREMENT_TRACK,
      ActionTypes.TRACK_RATING_DECREMENT_TRACK,
      ActionTypes.RESUME_SURVEY
    )
    .map(({type, payload: {surveyId, questionId, forceIncrement}}) => ({
      type,
      surveyId,
      questionId,
      increment: type === ActionTypes.TRACK_RATING_DECREMENT_TRACK ? -1 : 1,
      forceIncrement: !!forceIncrement,
    }))
    .mergeMap(args => {
      const {type, surveyId, questionId, increment} = args;
      const wrapper = new TrackRatingQuestionWrapper(
        store.getState(),
        surveyId,
        questionId
      );

      let currentTrack = null;

      if (surveyId === 'track-descriptors') {
        currentTrack = type === ActionTypes.RESUME_SURVEY ? wrapper.currentTrack - 1 : wrapper.currentTrack;
      } else {
        currentTrack = type === ActionTypes.RESUME_SURVEY ? -1 : wrapper.currentTrack;
      }

      let nextUnratedTrack = null;

      if (increment < 0 && currentTrack === 0) {
        return empty();
      }

      if (increment > 0) {
        let nextTracks = null;

        if (surveyId === 'track-descriptors') {
          nextTracks = wrapper.getNextUnratedDescriptorTracks(currentTrack);
        } else {
          nextTracks = wrapper.getNextUnratedTracks(currentTrack);
        }

        if (nextTracks.length === 0) {
          return merge(
            of(generatePlaylist(surveyId, questionId)).filter(
              () =>
                wrapper.allTracksRated &&
                wrapper.question.type === 'track_rating'
            ),
            of(finishSurvey(surveyId)).filter(
              () => !surveyId.match(JTF_SURVEY_PATTERN)
            ),
            of(fetchMoreTracks(surveyId, questionId)).filter(
              () => surveyId.match(JTF_SURVEY_PATTERN)
            ),
            of(finishSurvey(surveyId, questionId)).filter(
              () => surveyId.match('track-descriptors')
            ),
            of(fetchMoreTracks(surveyId, questionId)).filter(
              () => surveyId.match('track-descriptors')
            )
          );
        }
        nextUnratedTrack = nextTracks[0];
      } else {
        nextUnratedTrack = wrapper.getPreviousTrack(currentTrack);
      }

      return of(setTrackRatingTrack(surveyId, questionId, nextUnratedTrack));
    });
};



// WEBPACK FOOTER //
// ./src/epics/trackRatingProgressEpic.js