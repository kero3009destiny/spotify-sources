import React, { useState, useEffect } from 'react';
import {
  ButtonPrimary,
  Type,
  Backdrop,
  TableRow,
  TableHeaderCell,
  Banner,
} from '@spotify-internal/encore-web';
import { GabitoEvent } from '@mrkt/features/gabito';
import {
  DecoratedAlbum,
  DecoratedTrack,
} from '@mrkt/features/canvas/types/canvas';
import {
  getAlbumMetadata,
  getCanvasPermissions,
} from '@mrkt/features/canvas/lib/actions';
import { useT } from '@mrkt/features/i18n';
import { CANVAS_PERMISSION_EDITOR } from '@mrkt/features/canvas/lib/constants';
import { UpcomingReleaseRow } from './UpcomingReleaseRow';
import {
  StyledTableThumbnail,
  StyledTable,
  StyledDialogConfirmation,
} from './styled';

type StorylineArtist = {
  id: string;
  uri: string;
  name: string;
  imageUrl?: string;
};

type Props = {
  onClose: () => void;
  onCanvasRemoveError: (message: string, err: Error) => void;
  onCanvasRemoveSuccess: (message?: string) => void;
  onCanvasUpdateError: (message: string, err: Error) => void;
  onCanvasUpdateSuccess: (message: string) => void;
  onStorylineRemoveError: (message: string, err: Error) => void;
  onStorylineRemoveSuccess: (message: string) => void;
  onStorylineUploadError: (message: string, err: Error) => void;

  artist: StorylineArtist;
  hasCanvasAccess: boolean;
  hasStorylinesAccess: boolean;
  logGabitoEvent: (event: GabitoEvent) => void;
  parentName: string;
  parentUri: string;
  hasEditAccess: boolean;
  parentType: string;
};

export function UpcomingReleaseDialog({
  onClose,
  onCanvasRemoveError,
  onCanvasRemoveSuccess,
  onCanvasUpdateError,
  onCanvasUpdateSuccess,
  onStorylineRemoveError,
  onStorylineRemoveSuccess,
  onStorylineUploadError,
  artist,
  hasCanvasAccess,
  hasStorylinesAccess,
  logGabitoEvent,
  parentName,
  parentUri,
  hasEditAccess,
  parentType,
}: Props) {
  const [isCanvasEditor, setIsCanvasEditor] = useState(
    hasCanvasAccess && !!hasEditAccess,
  );
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [processing, setProcessing] = useState(new Set() as Set<string>); // a set of entity URIs that are still processing (to disable closing the dialog until all have finished)
  const [album, setAlbum] = useState({
    uri: '',
    tracks: [] as DecoratedTrack[],
    imageUrl: '',
  } as DecoratedAlbum);
  const [error, setError] = useState('');
  const t = useT();

  useEffect(() => {
    let didCancel = false;
    getAlbumMetadata(parentUri)
      .then((res: DecoratedAlbum) => {
        if (!didCancel) {
          setAlbum(res);
        }
      })
      .catch(() => {
        if (!didCancel) {
          setError('Error while getting album metadata.');
        }
      });
    return () => {
      didCancel = true;
    };
  }, [parentUri]);

  useEffect(() => {
    let didCancel = false;
    if (hasCanvasAccess && !isCanvasEditor && album.tracks.length) {
      const trackPermissionsPromises = album.tracks.map(track =>
        getCanvasPermissions(artist.id, track.uri),
      );
      Promise.all(trackPermissionsPromises)
        .then(trackPermissionsData => {
          const validPermissions = trackPermissionsData.filter(permissions =>
            permissions.includes(CANVAS_PERMISSION_EDITOR),
          );

          if (!didCancel) {
            setIsCanvasEditor(validPermissions.length > 0);
          }
        })
        .catch(() => {
          if (!didCancel) {
            setError('Error while getting canvas permissions.');
          }
        });
    }
    return () => {
      didCancel = true;
    };
  }, [hasCanvasAccess, isCanvasEditor, album.tracks, artist.id]);

  const onCloseDialog = () => {
    if (processing.size === 0 && !isEditorOpen) {
      onClose();
    }
  };

  const deepCloneProcessingSet = (processingSet: Set<string>): Set<string> =>
    new Set(JSON.parse(JSON.stringify(processingSet)));

  const _onCanvasUpdateSuccess = (uri: string, message: string) => {
    const clone = deepCloneProcessingSet(processing);
    clone.delete(uri);
    setProcessing(clone);
    onCanvasUpdateSuccess(message);
  };

  const _onCanvasUpdateError = (uri: string, message: string, err: Error) => {
    const clone = deepCloneProcessingSet(processing);
    clone.delete(uri);
    setProcessing(clone);
    onCanvasUpdateError(message, err);
  };

  const onEditorClose = () => setIsEditorOpen(false);

  const onEditorOpen = () => setIsEditorOpen(true);

  const onUpdateStart = (uri: string) => {
    const clone = deepCloneProcessingSet(processing);
    clone.add(uri);
    setProcessing(clone);
  };

  const renderTableTop = () => {
    return (
      <>
        <colgroup>
          <col width="20" />
          <col width="*" />
          {isCanvasEditor && <col width="50" />}
          {hasStorylinesAccess && <col width="50" />}
          <col />
        </colgroup>
        <thead>
          <TableRow>
            <TableHeaderCell colSpan={2}>
              {t('CANVAS_UPCOMING_SONG', 'Song', 'Track of an album')}
            </TableHeaderCell>
            {isCanvasEditor && (
              <TableHeaderCell align="right">
                {t('CANVAS', 'Canvas', 'Name of a product feature')}
              </TableHeaderCell>
            )}
            {hasStorylinesAccess && (
              <TableHeaderCell align="right">
                {t('STORYLINES', 'Storylines', 'Name of a product feature')}
              </TableHeaderCell>
            )}
          </TableRow>
        </thead>
      </>
    );
  };

  if (!album) {
    return null;
  }

  return (
    <Backdrop center onClose={onCloseDialog}>
      <StyledDialogConfirmation
        dialogId="upcoming-release-dialog"
        dialogTitle={t(
          'CANVAS_UPCOMING_RELEASE',
          'Release',
          'Release refers to a music release such as an album',
        )}
        body={
          <>
            {error && <Banner colorSet="negative">{error}</Banner>}
            <StyledTableThumbnail
              img={album.imageUrl}
              imgAlt={t(
                'CANVAS_UPCOMING_ALBUM_ALT',
                'Album cover for "{name}"',
                'Description of cover art for a specific album',
                {
                  name: parentName,
                },
              )}
              thumbnailTitle={parentName}
              subtitle={
                parentType && (
                  <Type condensed semanticColor="textSubdued">
                    {parentType === 'SINGLE' &&
                      t(
                        'CANVAS_RELEASE_SINGLE',
                        'SINGLE',
                        'Type of music release with only one track.',
                      )}
                    {parentType === 'EP' &&
                      t(
                        'CANVAS_RELEASE_EP',
                        'EP',
                        'Extended play. Type of music release with several tracks.',
                      )}
                    {parentType === 'ALBUM' &&
                      t(
                        'CANVAS_RELEASE_ALBUM',
                        'ALBUM',
                        'Type of music release with many tracks.',
                      )}
                  </Type>
                )
              }
            />

            <StyledTable>
              {renderTableTop()}

              <tbody>
                {album.tracks.map((track, index: number) => (
                  <UpcomingReleaseRow
                    key={track.uri}
                    albumImageUrl={album.imageUrl}
                    artist={artist}
                    hasStorylinesAccess={hasStorylinesAccess}
                    isCanvasEditor={isCanvasEditor}
                    logGabitoEvent={logGabitoEvent}
                    onCanvasRemoveError={onCanvasRemoveError}
                    onCanvasRemoveSuccess={onCanvasRemoveSuccess}
                    onCanvasUpdateError={_onCanvasUpdateError}
                    onCanvasUpdateSuccess={_onCanvasUpdateSuccess}
                    onEditorClose={onEditorClose}
                    onEditorOpen={onEditorOpen}
                    onStorylineRemoveError={onStorylineRemoveError}
                    onStorylineRemoveSuccess={onStorylineRemoveSuccess}
                    onStorylineUploadError={onStorylineUploadError}
                    onUpdateStart={onUpdateStart}
                    track={track}
                    trackIndex={index}
                  />
                ))}
              </tbody>
            </StyledTable>
          </>
        }
        footer={
          <ButtonPrimary
            onClick={onCloseDialog}
            data-testid="close-button"
            disabled={processing.size > 0}
            buttonSize={ButtonPrimary.sm}
          >
            {t('CANVAS_CLOSE', 'Close', 'Button to close the modal')}
          </ButtonPrimary>
        }
      />
    </Backdrop>
  );
}
