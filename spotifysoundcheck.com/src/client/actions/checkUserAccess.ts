export const CHECK_USER_ACCESS_BEGIN = 'CHECK_USER_ACCESS_BEGIN';
export const CHECK_USER_ACCESS_SUCCESS = 'CHECK_USER_ACCESS_SUCCESS';
export const CHECK_USER_ACCESS_FAILURE = 'CHECK_USER_ACCESS_FAILURE';

export const checkUserAccess = (allowed: number[]) => {
  const controller = new AbortController();
  const signal = controller.signal;

  return (dispatch:any) => {
    dispatch(checkUserAccessBegin());
    fetch('/auth/checktoken', {signal})
    .then((res) => res.json())
    .then((res:any) => {
      if (typeof res.error === 'undefined' && allowed.indexOf(res.role_id) !== -1) {
        dispatch(checkUserAccessSuccess(true));
      } else {
        dispatch(checkUserAccessSuccess(false));
      }
    })
    .catch(err => {
      dispatch(checkUserAccessError(err));
    });
  }
}

export const checkUserAccessBegin = () => ({
  type: CHECK_USER_ACCESS_BEGIN
});

export const checkUserAccessSuccess = (auth:boolean) => ({
  type: CHECK_USER_ACCESS_SUCCESS,
  payload: {
    auth
  }
});

export const checkUserAccessError = (error:any) => ({
  type: CHECK_USER_ACCESS_FAILURE,
  payload: {
    error
  }
});