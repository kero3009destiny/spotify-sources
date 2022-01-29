// ignore-string-externalization
import { isSpotifyNet } from './constants';

// todo: remove all references to this in favor of login/logout/changeAccount helpers below
export function getAccountsDomain() {
  return isSpotifyNet
    ? 'https://accounts.spotify.net'
    : 'https://accounts.spotify.com';
}

export function login(continueTo = window.location.href) {
  const loginUrl = getLoginUrl(continueTo);
  window.location.assign(loginUrl);
}

export function logout(continueTo = window.location.href) {
  const logoutUrl = getLogoutUrl(continueTo);
  window.location.assign(logoutUrl);
}

export function changeAccount(continueTo = window.location.href) {
  logout(getLoginUrl(continueTo));
}

export function getLoginUrl(continueTo: string) {
  const search = new URLSearchParams();
  search.append('continue', continueTo);
  return `${getAccountsDomain()}/login?${search}`;
}

function getLogoutUrl(continueTo: string) {
  const search = new URLSearchParams();
  search.append('continue', continueTo);
  return `${getAccountsDomain()}/logout?${search}`;
}
