// ignore-string-externalization
import { useContext, useEffect, useReducer } from 'react';
import {
  Configuration,
  PropertyRef,
  Event,
} from '@spotify-internal/remote-config-resolver';
import { createContext } from 'react';
import properties, { RemoteConfigLoadedBool } from './properties';

// default config uses default values
export const defaultConfig = Configuration.withOverride(properties, {});

// see: https://nodejs.org/api/events.html#events_emitter_setmaxlisteners_n
defaultConfig.setMaxListeners(100);

export const Context = createContext<Configuration>(defaultConfig);

/** @deprecated use RemoteConfig component instead */
export const RemoteConfigProvider = Context.Provider;

export function useRemoteProperty<T>(ref: PropertyRef<T>) {
  const config = useContext(Context);
  const [, forceRender] = useReducer(state => state + 1, 0);

  useEffect(() => {
    config.on(Event.CHANGE, forceRender);

    return () => {
      config.off(Event.CHANGE, forceRender);
    };
  }, [config]);

  return config.getValue(ref);
}

/**
 * Hook for determining when remote config has loaded remote property values.
 * Useful when you want to perform a side effect (like redirecting) only after remote config has loaded.
 *
 * @example
 * function MyFeature() {
 *   const isEnabled = useRemoteProperty(FeatureBool);
 *   const isLoaded = useRemoteConfigLoaded();
 *
 *   // loading state
 *   if (!isLoaded) {
 *     return null;
 *   }
 *
 *   // redirect is feature not enabled
 *   if (!isEnabled) {
 *     return <Redirect to="/" />;
 *   }
 *
 *   // render feature if enabled
 *   return <h1>You have access to this feature!</h1>;
 * }
 */
export function useRemoteConfigLoaded() {
  return useRemoteProperty(RemoteConfigLoadedBool);
}
