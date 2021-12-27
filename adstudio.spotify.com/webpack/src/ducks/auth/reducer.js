import * as types from 'ducks/auth/types';

const initialState = {
  hasAccess: false,
  isAuthenticated: false,
  errorMessage: '',
  hasLoginError: false,
  // mark these as true off the bat since
  // saga bootstrap takes care of starting the fetch
  fetchingAuthenticated: true,
  fetchingAccess: true,
};

// TODO refactor this reducer to do a combine reducers approach similar to ads.
export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.SSO_SESSION_ACTIVE:
      return {
        ...state,
        isAuthenticated: true,
        fetchingAuthenticated: false,
        errorMessage: '',
        hasLoginError: false,
      };

    case types.SSO_SESSION_INACTIVE:
      return {
        ...state,
        isAuthenticated: false,
        fetchingAuthenticated: false,
        errorMessage: '',
        hasLoginError: false,
      };

    case types.SSO_SESSION_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        fetchingAuthenticated: false,
        errorMessage: action.payload.message,
        hasLoginError: true,
      };

    case types.AUTHORIZED_SESSION_ACTIVE:
      return {
        ...state,
        fetchingAccess: false,
        hasAccess: true,
      };

    case types.AUTHORIZED_SESSION_INACTIVE:
      return {
        ...state,
        fetchingAccess: false,
        hasAccess: false,
      };

    case types.USER_LOGGED_OUT:
      return {
        ...state,
      };

    default:
      return state;
  }
}
