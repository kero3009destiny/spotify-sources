export const rootUrl = () => '/';

export const startSurveyUrl = surveyId => `${rootUrl()}${surveyId}`;
export const surveyUrl = surveyId => `${rootUrl()}${surveyId}`;
export const spotifyUrl = (path = '/') => `https://www.spotify.com${path}`;



// WEBPACK FOOTER //
// ./src/lib/urls.js