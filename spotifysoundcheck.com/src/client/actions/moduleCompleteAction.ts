import Cookie from 'js-cookie';

export const SET_MODULE_COMPLETE_START = 'SET_MODULE_COMPLETE_START';
export const SET_MODULE_COMPLETE_SUCCESS = 'SET_MODULE_COMPLETE_SUCCESS';
export const SET_MODULE_COMPLETE_FAILURE = 'SET_MODULE_COMPLETE_FAILURE';

export const setModuleComplete = (lessonID: string, moduleID: string, userID: number) => (dispatch: any) => {
  dispatch(setModuleCompleteStart());
  return fetch(`/api/module/completed`, {
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify({
      userID,
      moduleID,
      lessonID
    }),
    headers: {
      'Content-Type': 'application/json',
      'CSRF-TOKEN': Cookie.get('XSRF-TOKEN')
    }
  })
  .then(() => dispatch(setModuleCompleteSuccess(moduleID)))
  .catch(err => dispatch(setModuleCompleteFailure(err)))
}

export const setModuleCompleteStart = () => ({
  type: SET_MODULE_COMPLETE_START
});

export const setModuleCompleteSuccess = (moduleID: string) => ({
  type: SET_MODULE_COMPLETE_SUCCESS,
  payload: moduleID
})

export const setModuleCompleteFailure = (error: any) => ({
  type: SET_MODULE_COMPLETE_FAILURE,
  payload: error
});
