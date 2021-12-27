import { withProps } from 'recompose';

import { black } from '@spotify-internal/encore-foundation';

import SignupRoot from './';

export default withProps({
  className: 'signup-flow-container-white-full-screen',
  logoColor: black,
})(SignupRoot);
