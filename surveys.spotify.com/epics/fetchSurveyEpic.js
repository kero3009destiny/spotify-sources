import 'rxjs/add/operator/delay';

import {
  surveyMetadataFetchFailed,
  surveyMetadataFetched,
} from '../actions/SurveyActions';

import ActionTypes from '../actions/ActionTypes';
import { fetchSurveyById } from '../api/surveyorClient';
import { interval } from 'rxjs/observable/interval';
import { of } from 'rxjs/observable/of';

const { FETCH_SURVEY_METADATA, OAUTH_TOKEN_ACQUIRED } = ActionTypes;

export default (action$, store) =>
  action$
    .ofType(FETCH_SURVEY_METADATA)
    .pluck('payload')
    .filter(surveyId => !store.getState().surveyMeta[surveyId])
    .debounce(() => {
      const auth = store.getState().auth;

      if (auth.accessToken && !auth.expired) {
        return interval(1).take(1);
      }

      return action$.ofType(OAUTH_TOKEN_ACQUIRED);
    })
    .switchMap(surveyId =>
      fetchSurveyById(surveyId)
        .map(response => surveyMetadataFetched(surveyId, response))
        .catch(error => of(surveyMetadataFetchFailed(surveyId, error)))
    );



// WEBPACK FOOTER //
// ./src/epics/fetchSurveyEpic.js