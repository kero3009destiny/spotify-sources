import React from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';

import { COMMON_LINK_PROPS } from 'constants/common-props';
import { MODULES } from 'constants/modules';

import * as Styled from './ErrorBoundary.styled';

const { publicRuntimeConfig = {} } = getConfig() || {};

const isAllowedEnvToDisplayUI =
  publicRuntimeConfig.CONTENTFUL_ENVIRONMENT !== 'master' &&
  publicRuntimeConfig.CONTENTFUL_ENVIRONMENT !== 'staging';

const shouldDisplayErrorUI =
  isAllowedEnvToDisplayUI || publicRuntimeConfig.CONTENTFUL_PREVIEW === 'true';

const CURATED_LIST_HINT = `Hint: This component can't handle different page locales, check that all the page references correspond to the same locale in the browser URL`;

const EXTRA_HINTS = {
  [MODULES.CURATED_LIST]: CURATED_LIST_HINT,
  [MODULES.CURATED_LIST_GROUP]: CURATED_LIST_HINT,
};

/**
 * ErrorBoundary
 * @param {string} sysId - The wrapped element sys id
 * @param {string} contentType - The wrapped element contentType
 * @returns {ReactElement}
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { children, sysId = '', contentType = '' } = this.props;
    const { hasError, error } = this.state;

    if (hasError) {
      return shouldDisplayErrorUI ? (
        <Styled.Error>
          <Styled.Headline>{`Error in ${contentType}`}</Styled.Headline>
          <Styled.Description>
            {`id: `}
            <a
              target={COMMON_LINK_PROPS.TARGET_BLANK}
              rel={COMMON_LINK_PROPS.NO_OPENER}
              href={`https://app.contentful.com/spaces/${publicRuntimeConfig.CONTENTFUL_SPACE_ID}/environments/${publicRuntimeConfig.CONTENTFUL_ENVIRONMENT}/entries?filters.0.key=sys.id&filters.0.op=match&filters.0.val=${sysId}&contentTypeId=`}
            >
              {sysId}
            </a>
          </Styled.Description>
          <Styled.ErrorMessage styling="h4">{`${error}`}</Styled.ErrorMessage>
          <Styled.HintMessage>{EXTRA_HINTS[contentType]}</Styled.HintMessage>
        </Styled.Error>
      ) : null;
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  /**
   * The wrapped element sys id
   */
  sysId: PropTypes.string,
  /**
   * The wrapped element contentType
   */
  contentType: PropTypes.string,
};

ErrorBoundary.defaultProps = {
  sysId: '',
  contentType: '',
};

export default ErrorBoundary;
