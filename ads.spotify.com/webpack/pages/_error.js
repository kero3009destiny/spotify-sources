import React from 'react';
import PropTypes from 'prop-types';

import { CODE_500, ERROR_500, ERRORS } from 'constants/errors';
import { Error } from 'components/organisms/error';

/**
 * Renders an error page.
 * @param {Object} props
 * @param {string|number} props.statusCode The error status code.
 * @returns {ReactComponent}
 */
const ErrorPage = ({ statusCode }) => {
  const ERROR = ERRORS.find(error => error.CODE === statusCode) || ERROR_500;

  return (
    <Error
      code={ERROR.CODE}
      description={ERROR.DESCRIPTION}
      message={ERROR.MESSAGE}
      color={ERROR.COLOR}
      messageColor={ERROR.MESSAGE_COLOR}
      backgroundColor={ERROR.BACKGROUND_COLOR}
    />
  );
};

ErrorPage.getInitialProps = ({ res = {}, err = {} }) => {
  const statusCode = res.statusCode || err.statusCode || CODE_500;

  return {
    statusCode,
    namespacesRequired: ['common'],
  };
};

ErrorPage.propTypes = {
  /**
   * Error status code
   */
  statusCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default ErrorPage;
