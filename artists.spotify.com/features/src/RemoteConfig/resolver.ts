// ignore-string-externalization
import { Resolver } from '@spotify-internal/remote-config-resolver';
import properties from './properties';

type Options = {
  transport: Resolver.Config['transport'];
};

/** @deprecated use RemoteConfig component instead */
export function createResolver({ transport }: Options) {
  const resolver = new Resolver({
    clientId: 'mrkt-web',
    transport,
    properties,
    timeout: 20000,
    // only applies when there isnt anything in the cache
    // potential place where app could slow down
  });

  // see: https://nodejs.org/api/events.html#events_emitter_setmaxlisteners_n
  // this PR sees 79 usages of useRemoteProperty, so this value needs to be
  // higher than that, but not so high as to hide an actual possible memory leak
  resolver.setMaxListeners(100);

  return resolver;
}
