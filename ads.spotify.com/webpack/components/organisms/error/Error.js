import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'i18n/nexti18n';

import * as Styled from './Error.styled';

/**
 * Error component
 * @param {object} props
 * @param {string|number} props.code - The error code
 * @param {string} props.description - The error description
 * @param {string} props.message - An user friendly message
 * @param {string} props.backgroundColor - The color used as background
 * @param {string} props.color - Top section color
 * @param {string} props.messageColor - The message color
 * @returns {ReactComponent}
 */
const Error = ({
  code,
  description,
  message,
  backgroundColor,
  color,
  messageColor,
}) => {
  const { t } = useTranslation();

  return (
    <Styled.Root backgroundColor={backgroundColor} tabIndex="0">
      <Styled.Container>
        <Styled.TopSection>
          <Styled.Code color={color}>{code}</Styled.Code>
          <Styled.Description color={color}>
            {t(description)}
          </Styled.Description>
        </Styled.TopSection>
      </Styled.Container>
      <Styled.Container>
        <Styled.BottomSection>
          <Styled.Message messageColor={messageColor}>
            {t(message)}
          </Styled.Message>
        </Styled.BottomSection>
      </Styled.Container>
    </Styled.Root>
  );
};

Error.propTypes = {
  /**
   * Error code
   */
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /**
   * Error description
   */
  description: PropTypes.string.isRequired,
  /**
   * User friendly message
   */
  message: PropTypes.string.isRequired,
  /**
   * The color used as background
   */
  backgroundColor: PropTypes.string.isRequired,
  /**
   * Top section color
   */
  color: PropTypes.string.isRequired,
  /**
   * Message color
   */
  messageColor: PropTypes.string.isRequired,
};

export default Error;
