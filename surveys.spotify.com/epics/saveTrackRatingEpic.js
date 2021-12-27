import {
  fetchQuestionDetails,
  saveDescriptorRating,
  saveTrackRating,
} from '../api/surveyorClient';
import {
  incrementTrackRatingTrack,
  replaceTrack, skipTrackDescriptors,
  trackDescriptorSaved,
  trackRatingSaved,
  trackRatingSaveFailed,
} from '../actions/QuestionActions';

import ActionTypes from '../actions/ActionTypes';
import TrackRatingQuestionWrapper from '../lib/TrackRatingQuestionWrapper';
import isNull from 'lodash/isNull';
import {merge} from 'rxjs/observable/merge';
import negate from 'lodash/fp/negate';
import {of} from 'rxjs/observable/of';

const isNonNull = negate(isNull);

export default (action$, store) =>
  action$.ofType(ActionTypes.SAVE_TRACK_RATING).switchMap(action => {
    const {surveyId, questionId, uri, rating} = action.payload;
    const wrapper = new TrackRatingQuestionWrapper(
      store.getState(),
      surveyId,
      questionId
    );

    if (surveyId === 'track-descriptors') {
      const descriptorDetails = wrapper.state
        .surveyQuestionDetails['track-descriptors'][0][wrapper.currentTrack]
        .descriptors;
      const rating_ = rating && rating[0];
      const descriptor = rating && rating[1];
      const ratingWithRank = {
        'rating': rating_,
        'model': descriptorDetails.model,
        'rank': descriptorDetails.rank,
      };
      return saveDescriptorRating(surveyId, uri, descriptor, ratingWithRank)
        .mergeMap(() => {
          return merge(
            of(rating_)
              .filter(isNonNull)
              .mapTo(incrementTrackRatingTrack(surveyId, questionId)),
            of(rating_)
              .filter(isNull)
              // We need to call skipTrackDescriptors, so we create an array
              // with a dummy element to be able to call map().
              // There might be a better way to do this but I couldn't find it
              .mergeMap(() => [1])
              .map(() => skipTrackDescriptors(surveyId, questionId, uri))
          ).startWith(trackDescriptorSaved(surveyId, questionId, uri, descriptor, rating_));
        })
        .catch(error =>
            of(trackRatingSaveFailed(surveyId, questionId, uri, error))
          );
    }

    return saveTrackRating(surveyId, uri, rating)
      .mergeMap(() => {
        const unratedTrackUris = wrapper
          .getNextUnratedTracks(0)
          .map(index => wrapper.tracks[index].uri);
        return merge(
          of(rating)
            .filter(isNonNull)
            .mapTo(incrementTrackRatingTrack(surveyId, questionId)),
          of(rating)
            .filter(isNull)
            .mergeMap(() => fetchQuestionDetails(surveyId, 1, unratedTrackUris))
            .map(tracks => replaceTrack(surveyId, questionId, uri, tracks[0]))
        ).startWith(trackRatingSaved(surveyId, questionId, uri, rating));
      })
      .catch(error =>
        of(trackRatingSaveFailed(surveyId, questionId, uri, error))
      );
  });



// WEBPACK FOOTER //
// ./src/epics/saveTrackRatingEpic.js