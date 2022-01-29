import React from 'react';
import styled from 'styled-components';
import {
  Backdrop,
  ButtonPrimary,
  Table,
  TableCell,
  TableRow,
  TableThumbnail,
  Type,
  spacer16,
} from '@spotify-internal/encore-web';
import { DialogConfirmation } from '@mrkt/features/Dialog';
import { useT } from '@mrkt/features/i18n';
import { CanvasAlternateEntity } from '../../types/canvas';

type Props = {
  trackAlternates?: CanvasAlternateEntity[];
  onClose: () => void;
};

const ForceAlertToFront = styled.div`
  z-index: 9999;
`;

export function TrackAlternatesModal({ trackAlternates, onClose }: Props) {
  const t = useT();

  if (!trackAlternates || trackAlternates.length < 1) {
    onClose();
    return null;
  }

  const trackAlternatesText =
    trackAlternates.length > 1
      ? t(
          'CANVAS_TRACK_ALT_MULTI',
          'Canvas will post to these {trackAlternatesLength} tracks:',
          'Letting the user know that their Canvas will be uploaded to multiple tracks of an album',
          { trackAlternatesLength: trackAlternates.length },
        )
      : t(
          'CANVAS_TRACK_ALT_SINGLE',
          'Canvas will post to this {trackAlternatesLength} track:',
          'Letting the user know that their Canvas will be uploaded to a track of an album',
          { trackAlternatesLength: trackAlternates.length },
        );

  return (
    <ForceAlertToFront>
      <Backdrop center onClose={onClose}>
        <DialogConfirmation
          style={{ width: '448px' }}
          dialogId="track-alternates-dialog"
          dialogTitle={t('CANVAS_TRACKS', 'Tracks', 'Songs of an album')}
          body={
            <>
              <Type as="p">{trackAlternatesText}</Type>

              <Table style={{ marginBottom: spacer16 }}>
                <tbody>
                  {trackAlternates.map(alternate => (
                    <TableRow key={alternate.uri}>
                      <TableCell condensed>
                        <TableThumbnail
                          img={alternate.imageUrl}
                          imgAlt={t(
                            'CANVAS_ALT_ALBUM_COVER',
                            'Album cover for "{name}"',
                            'Explains that the image is the album cover artwork',
                            {
                              name: alternate.name,
                            },
                          )}
                          thumbnailTitle={alternate.name}
                          subtitle={
                            alternate.parentName && (
                              <Type
                                as="span"
                                variant={Type.body3}
                                semanticColor="textSubdued"
                                condensed
                              >
                                {alternate.parentName}
                              </Type>
                            )
                          }
                          small
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>

              <Type
                as="p"
                variant={Type.body3}
                semanticColor="textSubdued"
                condensed
                style={{ marginBottom: spacer16 }}
              >
                {t(
                  'CANVAS_TRACK_ALT_NONE',
                  'Canvas will not post to additional tracks in this recording group that you do not own the rights to.',
                  "Letting the user know that their Canvas will not be uploaded to tracks where they don't have artist or label rights",
                )}
              </Type>
            </>
          }
          footer={
            <ButtonPrimary onClick={onClose} buttonSize={ButtonPrimary.sm}>
              {t('CANVAS_CLOSE', 'Close', 'Button to close the modal')}
            </ButtonPrimary>
          }
        />
      </Backdrop>
    </ForceAlertToFront>
  );
}
