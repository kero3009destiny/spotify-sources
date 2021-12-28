import store from 'store';
import Cookie from 'js-cookie';

export const FETCH_USER_AUTH_BEGIN = 'FETCH_USER_AUTH_BEGIN';
export const FETCH_USER_AUTH_SUCCESS = 'FETCH_USER_AUTH_SUCCESS';
export const FETCH_USER_AUTH_FAILURE = 'FETCH_USER_AUTH_FAILURE';

export function setUserAuth() {
  return (dispatch: any) => {
    dispatch(fetchUserAuthBegin());
    fetch('/auth/checktoken')
      .then(res => {
        if (!res.ok) {
          dispatch(fetchUserAuthError(res.status));
        } else {
          return res.json();
        }
      })
      .then(user => {
        if (user !== undefined) {
          const userWithCSRF = {
            ...user,
            csrfToken: Cookie.get('XSRF-TOKEN')
          }
          dispatch(fetchUserAuthSuccess(userWithCSRF));
          store.set('user', JSON.stringify(userWithCSRF));
          return userWithCSRF;
        } else {
          fetchUserAuthError({ error: 'user not defined' });
        }
      })
      .catch(error => dispatch(fetchUserAuthError({ error: error.message })));
  };
}

export const fetchUserAuthBegin = () => ({
  type: FETCH_USER_AUTH_BEGIN
});

export const fetchUserAuthSuccess = (user: any) => ({
  type: FETCH_USER_AUTH_SUCCESS,
  payload: user
});

export const fetchUserAuthError = (error: any) => ({
  type: FETCH_USER_AUTH_FAILURE,
  payload: { error }
});
