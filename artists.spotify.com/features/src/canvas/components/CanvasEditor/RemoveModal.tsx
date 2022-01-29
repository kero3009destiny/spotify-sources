import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Backdrop, ButtonTertiary } from '@spotify-internal/encore-web';
import { DialogAlert } from '@mrkt/features/Dialog';
import { useT } from '@mrkt/features/i18n';
import { DecoratedCanvas } from '../../types/canvas';

type Props = {
  canvases?: DecoratedCanvas[];
  onCancel: () => void;
  onRemove: () => void;
};

const ForceAlertToFront = styled.div`
  z-index: 9999;
`;

export function RemoveModal({ canvases, onCancel, onRemove }: Props) {
  const t = useT();

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          onRemove();
          break;
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [onRemove]);

  return (
    <ForceAlertToFront>
      <Backdrop center onClose={onCancel}>
        <DialogAlert
          dialogId="remove-canvas-dialog"
          dialogTitle={
            canvases && canvases.length > 1
              ? t(
                  'CANVAS_REMOVE_MULTI_TITLE',
                  'Remove all {canvasesLength} Canvases?',
                  'Asking the user if they want to delete their Canvases.',
                  {
                    canvasesLength: canvases.length,
                  },
                )
              : t(
                  'CANVAS_REMOVE_SINGLE_TITLE',
                  'Remove Canvas?',
                  'Asking the user if they want to delete their Canvas.',
                )
          }
          body={t(
            'CANVAS_REMOVE_BODY',
            'Listeners will see your default album artwork instead.',
            "Explanation that listeners on the app will see the album's cover art",
          )}
          footer={
            <div>
              <ButtonTertiary
                condensed
                onClick={onCancel}
                buttonSize={ButtonTertiary.sm}
              >
                {t('CANVAS_CANCEL', 'Cancel', 'Button to close the modal')}
              </ButtonTertiary>
              <ButtonTertiary
                condensed
                onClick={onRemove}
                buttonSize={ButtonTertiary.sm}
                semanticColor="textNegative"
                data-testid="canvas--confirm-remove"
                data-slo-id="confirm-remove"
              >
                {canvases && canvases.length > 1
                  ? t(
                      'CANVAS_REMOVE_MULTI_CTA',
                      'Remove all {canvasesLength} Canvases',
                      'Button to confirm that the user will delete their Canvases',
                      {
                        canvasesLength: canvases.length,
                      },
                    )
                  : t(
                      'CANVAS_REMOVE_SINGLE_CTA',
                      'Remove Canvas',
                      'Button to confirm that the user will delete their Canvas',
                    )}
              </ButtonTertiary>
            </div>
          }
        />
      </Backdrop>
    </ForceAlertToFront>
  );
}
