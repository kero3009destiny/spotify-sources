export const getRedirectState = state => state.redirect;
export const getIsRedirecting = state => getRedirectState(state).redirecting;
