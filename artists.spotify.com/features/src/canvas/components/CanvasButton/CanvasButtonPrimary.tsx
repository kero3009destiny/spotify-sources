import React from 'react';
import styled from 'styled-components';
import {
  ButtonPrimary,
  Type,
  body2LineHeight,
} from '@spotify-internal/encore-web';
import { Spinner } from '@mrkt/features/spinner';
import { useT } from '@mrkt/features/i18n';
import { CanvasButtonProps } from './types';

const CanvasButtonContainer = styled.span`
  align-items: center;
  display: flex;
  flex-direction: row;
  min-height: ${body2LineHeight}; /* line-height of the text */
`;

const IconMargin = styled.span`
  display: flex;
  margin-left: 16px;
  margin-right: 6px;
`;

export type CanvasButtonPrimaryProps = CanvasButtonProps;

export function CanvasButtonPrimary(props: CanvasButtonPrimaryProps) {
  const { processing, posted, onEdit } = props;
  const t = useT();
  return (
    <CanvasButtonContainer>
      <ButtonPrimary
        buttonSize="sm"
        data-testid="edit-canvas-button"
        data-slo-id="edit-canvas-button"
        disabled={processing}
        onClick={() => onEdit()}
      >
        {posted
          ? t(
              'CANVAS_MANAGE_FULL',
              'Manage Canvas',
              'Button that opens the modal to edit an existing Canvas',
            )
          : t(
              'CANVAS_ADD_FULL',
              'Add Canvas',
              'Button that opens the modal to add a new Canvas',
            )}
      </ButtonPrimary>

      {processing && (
        <>
          <IconMargin>
            <Spinner />
          </IconMargin>
          <Type as="p" condensed>
            {t(
              'CANVAS_PROCESSING_FULL',
              'Processing Canvas...',
              'Indicates that the Canvas is currently uploading',
            )}
          </Type>
        </>
      )}
    </CanvasButtonContainer>
  );
}

// helper function to pass into CanvasManager's `renderButton` prop
export function renderCanvasButtonPrimary(props: CanvasButtonProps) {
  return <CanvasButtonPrimary {...props} />;
}
