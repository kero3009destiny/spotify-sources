import Cookie from 'js-cookie';

export const FETCH_LESSONS_BEGIN = 'FETCH_LESSONS_BEGIN';
export const FETCH_LESSONS_SUCCESS = 'FETCH_LESSONS_SUCCESS';
export const FETCH_LESSONS_FAILURE = 'FETCH_LESSONS_FAILURE';
export const FETCH_LESSON_MODULE_BEGIN = 'FETCH_LESSON_MODULE_BEGIN';
export const FETCH_LESSON_MODULE_SUCCESS = 'FETCH_LESSON_MODULE_SUCCESS';
export const FETCH_LESSON_MODULE_FAILURE = 'FETCH_LESSON_MODULE_FAILURE';
export const SET_LESSON_STARTED_START = 'SET_LESSON_STARTED_START';
export const SET_LESSON_STARTED_SUCCESS = 'SET_LESSON_STARTED_SUCCESS';
export const SET_LESSON_STARTED_FAILURE = 'SET_LESSON_STARTED_FAILURE';
export const SET_LESSON_COMPLETE_START = 'SET_LESSON_COMPLETE_START';
export const SET_LESSON_COMPLETE_SUCCESS = 'SET_LESSON_COMPLETE_SUCCESS';
export const SET_LESSON_COMPLETE_FAILURE = 'SET_LESSON_COMPLETE_FAILURE';
export const SET_LESSON_COLOR_PALETTE = 'SET_LESSON_COLOR_PALETTE';

// get lessons data from the api
export const getLessons = (userID: string) => (dispatch: any) => {
  dispatch(fetchLessonsBegin());
  return fetch(`/api/lessons/${userID}`)
    .then(res => res.json())
    .then(lessons => {
      if (lessons.error != undefined) {
        dispatch(fetchLessonsError(lessons.error));
      } else {
        dispatch(fetchLessonsSuccess(lessons));
      }
    })
    .catch(err => dispatch(fetchLessonsError(err)));
};

export const fetchLessonsBegin = () => ({
  type: FETCH_LESSONS_BEGIN
});

export const fetchLessonsSuccess = (lessons:any) => ({
  type: FETCH_LESSONS_SUCCESS,
  payload: {
    data: lessons
  }
});

export const fetchLessonsError = (error:any) => ({
  type: FETCH_LESSONS_FAILURE,
  payload: {
    error
  }
});

// This requires the lessonID to be used with the reducer, and the moduleID to get the actual data
export const getLessonModule = (lessonID: string, moduleID: string, userID: number) => (dispatch:any) => {
  if (lessonID && moduleID && userID) {
    dispatch(fetchLessonModuleBegin());
    return fetch(`/api/lesson/${lessonID}/${moduleID}/${userID}`)
      .then(res => res.json())
      .then(module => {
        dispatch(fetchLessonModuleSuccess({ lessonID, data: module }));
      })
      .catch(err => fetchLessonModuleFailure(err));
  }

};

export const fetchLessonModuleBegin = () => ({
  type: FETCH_LESSON_MODULE_BEGIN
});

export const fetchLessonModuleSuccess = (moduleData:any) => ({
  type: FETCH_LESSON_MODULE_SUCCESS,
  payload: moduleData
});

export const fetchLessonModuleFailure = (error:any) => ({
  type: FETCH_LESSON_MODULE_FAILURE,
  payload: {
    error
  }
});

export const setLessonStarted = (lessonID: string, userID: number) => (dispatch: any) => {
  dispatch(setLessonStartedStart());
  fetch(`/api/lesson/${lessonID}`, {
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify({
      userID: userID,
    }),
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': Cookie.get('XSRF-TOKEN')
    }
  })
  .then(res => res.json())
  .then(data => dispatch(setLessonStartedSuccess(data)))
  .catch(err => dispatch(setLessonStartedFailure(err)));
}

const setLessonStartedStart = () => ({
  type: SET_LESSON_STARTED_START
})

const setLessonStartedSuccess = (data: any) => ({
  type: SET_LESSON_STARTED_SUCCESS,
  payload: {
    data
  }
})

const setLessonStartedFailure = (err: any) => ({
  type: SET_LESSON_STARTED_FAILURE,
  payload: {
    err
  }
})

// Set lessons as complete
export const setLessonComplete = (lessonID: string, userID: string) => (dispatch: any) => {
  dispatch(setLessonCompleteStart());
  fetch(`/api/lesson/${lessonID}`, {
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify({
      userID: userID,
      isCompleted: true
    }),
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': Cookie.get('XSRF-TOKEN')
    }
  })
    .then(res => res.json())
    .then(data => dispatch(setLessonCompleteSuccess(data)))
    .catch(err => dispatch(setLessonCompleteFailure(err)));
};

const setLessonCompleteStart = () => ({
  type: SET_LESSON_COMPLETE_START
})

const setLessonCompleteSuccess = (data: any) => ({
  type: SET_LESSON_COMPLETE_SUCCESS,
  payload: {
    data
  }
})

const setLessonCompleteFailure = (err: any) => ({
  type: SET_LESSON_COMPLETE_FAILURE,
  payload: {
    err
  }
})

export const setLessonColorPalette = (activeColorPalette: any) => ({
  type: SET_LESSON_COLOR_PALETTE,
  payload: {
    activeColorPalette
  }
})
