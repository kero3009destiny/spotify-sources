import React from 'react';
import styled, { css } from 'styled-components';
import {
  ButtonIcon,
  IconPlus,
  IconVideo,
  IconCheck,
  Type,
  body2LineHeight,
  cssColorValue,
} from '@spotify-internal/encore-web';
import { Spinner } from '@mrkt/features/spinner';
import { useT } from '@mrkt/features/i18n';
import { CanvasButtonProps } from './types';

const ButtonIconBrightAccent = styled(ButtonIcon)`
  cursor: pointer;
`;

const CanvasButtonContainer = styled.span<{
  align: 'left' | 'right';
  highlight?: boolean;
}>`
  align-items: center;
  display: flex;
  flex-direction: ${props => (props.align === 'right' ? 'row-reverse' : 'row')};
  min-height: ${body2LineHeight}; /* line-height of the text */

  ${({ highlight }) =>
    highlight &&
    css`
      color: ${cssColorValue('textBrightAccent')};
    `};
`;

const IconMargin = styled.span<{ align: 'left' | 'right' }>`
  display: flex;
  margin-left: ${props => (props.align === 'left' ? 0 : '6px')};
  margin-right: ${props => (props.align === 'right' ? 0 : '6px')};
`;

export type CanvasButtonMiniProps = CanvasButtonProps & {
  align: 'left' | 'right';
};

export function CanvasButtonMini(props: CanvasButtonMiniProps) {
  const { processing, posted, postedIntermediate, align, onEdit, textOnly } =
    props;

  const t = useT();

  if (postedIntermediate) {
    return (
      <ButtonIcon>
        <CanvasButtonContainer align={align} highlight>
          <IconMargin align={align}>
            <IconCheck iconSize={16} aria-hidden />
          </IconMargin>
          <Type as="p" condensed>
            {t(
              'CANVAS_DONE',
              'Done',
              'The image or video upload has completed',
            )}
          </Type>
        </CanvasButtonContainer>
      </ButtonIcon>
    );
  }
  if (processing) {
    return (
      <ButtonIcon>
        <CanvasButtonContainer align={align} highlight>
          <IconMargin align={align}>
            <Spinner />
          </IconMargin>
          <Type as="p" condensed>
            {t(
              'CANVAS_PROCESSING_SHORT',
              'Processing',
              'Indicates that the Canvas is currently processing',
            )}
          </Type>
        </CanvasButtonContainer>
      </ButtonIcon>
    );
  }

  return (
    <ButtonIconBrightAccent
      data-testid="edit-canvas-button"
      data-slo-id="edit-canvas-button"
      onClick={() => onEdit()}
      semanticColor="textBrightAccent"
    >
      {posted ? (
        <CanvasButtonContainer align={align}>
          {textOnly ? (
            t(
              'CANVAS_MANAGE_SHORT',
              'Manage',
              'Button that opens the modal to edit an existing Canvas',
            )
          ) : (
            <IconVideo
              iconSize={16}
              aria-label={t(
                'CANVAS_MANAGE_FULL',
                'Manage Canvas',
                'Button that opens the modal to edit an existing Canvas',
              )}
            />
          )}
        </CanvasButtonContainer>
      ) : (
        <CanvasButtonContainer align={align}>
          {textOnly ? (
            t(
              'CANVAS_ADD_SHORT',
              'Add',
              'Button that opens the modal to add a new Canvas',
            )
          ) : (
            <IconPlus
              iconSize={16}
              aria-label={t(
                'CANVAS_ADD_FULL',
                'Add Canvas',
                'Button that opens the modal to add a new Canvas',
              )}
            />
          )}
        </CanvasButtonContainer>
      )}
    </ButtonIconBrightAccent>
  );
}

// helper functions to pass into CanvasManager's `renderButton` prop
export function renderCanvasButtonMiniLeftAligned(props: CanvasButtonProps) {
  return <CanvasButtonMini {...props} align="left" textOnly />;
}
export function renderCanvasButtonMiniRightAligned(props: CanvasButtonProps) {
  return <CanvasButtonMini {...props} align="right" textOnly />;
}
