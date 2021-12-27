import 'rxjs/add/operator/delay';

import {
  playlistGenerateFailed,
  playlistGenerated,
} from '../actions/SurveyActions';

import ActionTypes from '../actions/ActionTypes';
import { createGiftPlaylist } from '../api/surveyorClient';
import { of } from 'rxjs/observable/of';

const { GENERATE_PLAYLIST } = ActionTypes;

export default action$ =>
  action$
    .ofType(GENERATE_PLAYLIST)
    .switchMap(({ payload: { surveyId, questionId } }) =>
      createGiftPlaylist(surveyId)
        .map(url => playlistGenerated(surveyId, questionId, url))
        .catch(error => of(playlistGenerateFailed(surveyId, questionId, error)))
    );



// WEBPACK FOOTER //
// ./src/epics/generatePlaylistEpic.js