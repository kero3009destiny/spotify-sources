import React, { createContext, useContext, useReducer, useEffect } from 'react';

import has from 'lodash/has';
import get from 'lodash/get';

import { Portal } from 'components/atoms/portal';
import { defaultLocale } from 'i18n/config';
import {
  SPOTIFY_AUTH,
  USER_PROFILE_API,
  AD_ACCOUNTS_API,
} from 'constants/urls';

const AppStateContext = createContext();
const AppDispatchContext = createContext();
export const ACTION_TYPES = {
  MODAL_FORM_TOGGLE: 'MODAL_FORM_TOGGLE',
  NAVIGATION_TOGGLE: 'NAVIGATION_TOGGLE',
  TABLE_OF_CONTENT_TOGGLE: 'TABLE_OF_CONTENT_TOGGLE',
  SET_MODAL_LOCALE_VISIBLE: 'SET_MODAL_LOCALE_VISIBLE',
  SET_USER_LOGGED_IN: 'SET_USER_LOGGED_IN',
  SET_COOKIE_BANNER_VISIBILITY: 'SET_COOKIE_BANNER_VISIBILITY',
  FETCHING_USER_DATA_FAILED: 'FETCHING_USER_DATA_FAILED',
};
const initialState = {
  cookieBannerVisibility: true,
  isModalFormOpen: false,
  isNavigationOpen: false,
  isTableOfContentOpen: false,
  locale: defaultLocale.id,
  localeNudge: null,
  isModalLocaleVisible: false,
  cookieFromHeaders: {},
  isLoggedIn: false,
  userData: null,
  hasAdAccountData: null,
  isLoading: {
    userData: true,
  },
  isAntiFlickerActive: true,
};

/**
 * Provides logic for handling dispatch actions, and updating the state.
 * @param {Object} state The current state object values.
 * @param {Object} action The object passed from the dispatch method.
 */
export const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.MODAL_FORM_TOGGLE: {
      return { ...state, isModalFormOpen: action.status };
    }
    case ACTION_TYPES.NAVIGATION_TOGGLE: {
      return { ...state, isNavigationOpen: action.status };
    }
    case ACTION_TYPES.TABLE_OF_CONTENT_TOGGLE: {
      return { ...state, isTableOfContentOpen: action.status };
    }
    case ACTION_TYPES.SET_MODAL_LOCALE_VISIBLE: {
      return { ...state, isModalLocaleVisible: action.visible };
    }
    case ACTION_TYPES.SET_COOKIE_BANNER_VISIBILITY: {
      return {
        ...state,
        cookieBannerVisibility: action.cookieBannerVisibility,
      };
    }
    case ACTION_TYPES.SET_USER_LOGGED_IN: {
      /**
       * TODO: Ensure that if PPI data is persisted in the application,
       * we have the consent that it can be stored.
       * Contact @jcubides
       */

      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        userData: action.userData,
        hasAdAccountData: action.hasAdAccountData,
        isLoading: {
          ...state.isLoading,
          userData: false,
        },
      };
    }
    case ACTION_TYPES.FETCHING_USER_DATA_FAILED: {
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          userData: false,
        },
      };
    }
    case ACTION_TYPES.IS_ANTI_FLICKER_ACTIVE: {
      return {
        ...state,
        isAntiFlickerActive: action.isActive,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

/**
 * References the state context.
 * @returns {Object} The state object.
 */
const useAppState = () => {
  const context = useContext(AppStateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within AppProvider');
  }

  return context;
};

/**
 * References the dispatch context. Rather than using action creators,
 * this context is invoked whenever an update is pushed to the state.
 * @returns {Function} The dispatch function.
 */
const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);

  if (context === undefined) {
    throw new Error('useAppDispatch must be used within AppProvider');
  }

  return context;
};

/**
 * Allows for clearer destructuring assignments in components.
 * @returns {Array} An array of React Contexts.
 */
export const useAppContext = () => [useAppState(), useAppDispatch()];

/**
 * @async
 * Gets User and Ad account data
 * @returns {Promise<Array>} tuple
 * @returns {Promise<Array>} tuple[0] userData
 * @returns {Promise<Array>} tuple[1] adAccountData
 */
const getUserAndAdData = async () => {
  const { accessToken } = await fetch(SPOTIFY_AUTH, {
    credentials: 'include',
  }).then(data => data.json());

  if (!accessToken) throw new Error('No access allowed');

  const userDataPromise = fetch(USER_PROFILE_API, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(data => data.json())
    .catch(error => ({ error }));
  const adAccountDataPromise = fetch(AD_ACCOUNTS_API, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(data => data.json())
    .catch(error => ({ error }));

  return Promise.all([userDataPromise, adAccountDataPromise]);
};

/**
 * Creates a provider/context for both state and dispatch. This prevents any
 * components from unnecessary re-renders when only using the dispatch context.
 * @param {string} locale A locale id.
 * @param {Array} children An array of ReactElements to be rendered.
 * @returns {ReactElement}
 */
const AppProvider = ({
  locale = defaultLocale.id,
  localeNudge,
  children,
  cookieFromHeaders,
  isAntiFlickerActive = true,
}) => {
  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    locale,
    localeNudge,
    cookieFromHeaders,
  });

  useEffect(() => {
    if (has(state, 'cookieFromHeaders.sp_dc')) {
      getUserAndAdData()
        .then(([userData, adAccountData]) => {
          if (userData.error) throw userData.error;

          dispatch({
            type: ACTION_TYPES.SET_USER_LOGGED_IN,
            isLoggedIn: true,
            userData: {
              id: userData.id,
            },
            hasAdAccountData: Boolean(get(adAccountData, 'ad_accounts.length')),
          });
        })
        .catch(error => {
          console.error(error);

          dispatch({
            type: ACTION_TYPES.FETCHING_USER_DATA_FAILED,
          });
        });
    } else {
      dispatch({
        type: ACTION_TYPES.FETCHING_USER_DATA_FAILED,
      });
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: ACTION_TYPES.IS_ANTI_FLICKER_ACTIVE,
      isActive: isAntiFlickerActive,
    });
  }, [isAntiFlickerActive]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <Portal.Host>{children}</Portal.Host>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export default AppProvider;
