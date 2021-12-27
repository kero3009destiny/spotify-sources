import React from 'react';
import styled from 'styled-components';
import { ButtonPrimary, ButtonTertiary, color } from '@spotify-internal/encore-web';

export const FOOTER_HEIGHT = '95px';

type Props = {
  onPrevious: () => void;
  submitButtonText: string;
  shouldHidePreviousButton: boolean;
  shouldHideSubmitButton: boolean;
};

const Footer = styled.div`
  display: flex;
  justify-content: flex-start;
  height: ${FOOTER_HEIGHT};
  border-top: 1px solid ${color.gray80};
`;

const PreviousButton = styled(ButtonTertiary)``;

const SubmitButton = styled(ButtonPrimary).attrs(() => ({
  colorSet: 'announcement',
}))``;

// This is needed because we want to style the wrapper element,
// not the inner text element which happens because Encore propagates
// the styling down to the inner element
const buttonStyles = {
  marginLeft: 'auto',
  marginRight: '24px',
};

export function FormFooter({ onPrevious, submitButtonText, shouldHidePreviousButton, shouldHideSubmitButton }: Props) {
  return (
    <Footer>
      {!shouldHidePreviousButton && (
        <PreviousButton data-testid="previous-button" type="button" onClick={onPrevious}>
          Previous
        </PreviousButton>
      )}
      {!shouldHideSubmitButton && (
        // This button will trigger submit on the form it's embedded into
        <SubmitButton style={buttonStyles} data-testid="submit-button" type="submit" form="step-form">
          {submitButtonText}
        </SubmitButton>
      )}
    </Footer>
  );
}
