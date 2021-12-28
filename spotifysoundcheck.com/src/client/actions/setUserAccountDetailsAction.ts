export const SET_USER_ACCOUNT_BEGIN   = 'SET_USER_ACCOUNT_BEGIN';
export const SET_USER_ACCOUNT_SUCCESS = 'SET_USER_ACCOUNT_SUCCESS';
export const SET_USER_ACCOUNT_FAILURE = 'SET_USER_ACCOUNT_FAILURE';

export function setUserAccount(access_token:string, cb:() => void = () => {}) {
  return (dispatch:any) => {
    dispatch(setUserAccountBegin())
    fetch('https://api.spotify.com/v1/me',
      {
        method: 'get',
        headers: new Headers({
          'Authorization': `Bearer ${access_token}`
        })
      }
    )
    .then((res) => res.json())
    .then((data) => {
      if (typeof data.error !== 'undefined') {
        cb();
        dispatch(setUserAccountError(data.error.message))
      } else {
        const image = (data.images !== undefined && data.images.length > 0) ? data.images[0].url : null
        dispatch(setUserAccountSuccess(
          {
            image: image,
            displayName: data.display_name,
            email: data.email
          }
        ))
      }
    })
    .catch((err) => {
      cb();
      dispatch(setUserAccountError(err.message))
    })
  }
}

export const setUserAccountBegin = () => ({
  type: SET_USER_ACCOUNT_BEGIN
});

export const setUserAccountSuccess = (user:any) => ({
  type: SET_USER_ACCOUNT_SUCCESS,
  payload: user
});

export const setUserAccountError = (error:any) => ({
  type: SET_USER_ACCOUNT_FAILURE,
  payload: { error }
});