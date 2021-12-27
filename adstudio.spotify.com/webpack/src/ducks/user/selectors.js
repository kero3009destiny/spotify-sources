export const getUser = state => state.user;
export const getUserId = state => getUser(state).id;
export const getUserImg = state => (getUser(state) || {}).imgSrc;
export const getUserEmail = state => (getUser(state) || {}).email;
export const getUserUsername = state => (getUser(state) || {}).id;
export const isUserFetched = state => (getUser(state) || {}).fetched;
export const getUserName = state => {
  const { displayName, id } = getUser(state) || {};
  return (displayName || '').split(' ')[0] || id;
};
export const getUserFullName = state => {
  const { displayName, id } = getUser(state) || {};
  return displayName || id;
};
