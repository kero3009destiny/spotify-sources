import React from 'react';

import { ERROR_404 } from 'constants/errors';
import { Error } from 'components/organisms/error';

/**
 * Custom404 component
 * @returns {ReactComponent}
 */
const Custom404 = () => (
  <Error
    code={ERROR_404.CODE}
    description={ERROR_404.DESCRIPTION}
    message={ERROR_404.MESSAGE}
    color={ERROR_404.COLOR}
    messageColor={ERROR_404.MESSAGE_COLOR}
    backgroundColor={ERROR_404.BACKGROUND_COLOR}
  />
);

export default Custom404;
