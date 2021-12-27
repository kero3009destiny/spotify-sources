import React from 'react';
import loadable from 'react-loadable';

export default loadable({
  loader: () => import(/* webpackChunkName: "onboarding" */ './Main'),
  loading: () => <div />,
});
