import { getLocalStorage, getStorage, jsonParse } from 'utils/storageHelpers';
import { replaceLocation } from 'utils/windowHelpers';

import { DEVICE_HAS_AUTHENTICATED_WITH_AD_ACCOUNT } from 'config/account';
import { routes } from 'config/routes';

import PropTypes from 'prop-types';

export const LOGIN_URL = `${routes.ADSTUDIO_SIGNUP}${routes.LOGIN}`;

export const RedirectIfAuthorizedAdAccountOnDevice = props => {
  const shouldRedirect = !!jsonParse(
    getStorage(getLocalStorage(), DEVICE_HAS_AUTHENTICATED_WITH_AD_ACCOUNT),
  );

  if (shouldRedirect) {
    replaceLocation(window.location.origin + LOGIN_URL);
    return null;
  }

  return props.children;
};

RedirectIfAuthorizedAdAccountOnDevice.propTypes = {
  children: PropTypes.node,
};

export default RedirectIfAuthorizedAdAccountOnDevice;
