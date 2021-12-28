import Cookie from 'js-cookie';

export const SET_LESSON_COMPLETE_START = "SET_LESSON_COMPLETE_START";
export const SET_LESSON_COMPLETE_SUCCESS = 'SET_LESSON_COMPLETE_SUCCESS';
export const SET_LESSON_COMPLETE_FAILURE = 'SET_LESSON_COMPLETE_FAILURE';

export const setLessonComplete = (lessonID: string, userID: number) => (dispatch: any) => {
  dispatch(setLessonCompleteStart());
  return fetch(`/api/lesson/${lessonID}`, {
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify({
      userID: userID,
      isCompleted: true
    }),
    headers: {
      'Content-Type': 'application/json',
      'CSRF-TOKEN': Cookie.get('XSRF-TOKEN')
    }
  })
  .then(() => dispatch(setLessonCompleteSuccess(lessonID)))
  .catch((err: any) => dispatch(setLessonCompleteFailure(err)));
}

export const setLessonCompleteStart = () => ({
  type: SET_LESSON_COMPLETE_START
});

export const setLessonCompleteSuccess = (lessonID: string) => ({
  type: SET_LESSON_COMPLETE_SUCCESS,
  payload: lessonID
});

export const setLessonCompleteFailure = (error: any) => ({
  type: SET_LESSON_COMPLETE_FAILURE,
  payload: error
});