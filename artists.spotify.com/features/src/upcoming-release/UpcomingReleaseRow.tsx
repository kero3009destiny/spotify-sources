// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import { TableRow, TableCell } from '@spotify-internal/encore-web';
import {
  CanvasManager,
  renderCanvasButtonMiniLeftAligned,
} from '@mrkt/features/canvas';
import { StorylineManager } from '@mrkt/features/storylines';
import { StorylineArtist } from '@mrkt/features/storylines/lib/types';
import { DecoratedTrack } from '@mrkt/features/canvas/types/canvas';
import { GabitoEvent } from '@mrkt/features/gabito';
import {
  canvasExperience,
  storylinesExperience,
} from '@mrkt/features/experience-definitions';
import { createErrorBoundary } from '@mrkt/features/Platform';

type Props = {
  albumImageUrl: string;
  artist: StorylineArtist;
  hasStorylinesAccess: boolean;
  isCanvasEditor: boolean;
  track: DecoratedTrack;
  trackIndex: number;

  logGabitoEvent: (event: GabitoEvent) => void;

  onEditorClose: () => void;
  onEditorOpen: () => void;

  onCanvasRemoveError: (message: string, err: Error) => void;
  onCanvasRemoveSuccess: (message?: string) => void;
  onCanvasUpdateError: (uri: string, message: string, err: Error) => void;
  onCanvasUpdateSuccess: (uri: string, message: string) => void;

  onStorylineRemoveError: (message: string, err: Error) => void;
  onStorylineRemoveSuccess: (message: string) => void;
  onStorylineUploadError: (message: string, err: Error) => void;

  onUpdateStart: (uri: string) => void;
};

const TableCellBuffer = styled.div`
  height: 20px;
`;

const WideTableCell = styled(TableCell)`
  padding-top: 14px;
  padding-bottom: 14px;
  min-width: 120px;
`;

const [StorylinesErrorBoundary] = createErrorBoundary({
  view: 'upcoming-release',
  experience: storylinesExperience,
});

const [CanvasErrorBoundary] = createErrorBoundary({
  view: 'upcoming-release',
  experience: canvasExperience,
});

/*
    This contains rendering logic for the Canvas and Storyline
    columns
  */
export const UpcomingReleaseRow = React.memo((props: Props) => {
  const entity = {
    uri: props.track.uri,
    name: props.track.name,
    imageUrl: props.albumImageUrl,
  };

  return (
    <TableRow>
      <TableCell numerical align="center">
        {props.trackIndex + 1}
      </TableCell>
      <TableCell highlight truncate title={entity.name}>
        {entity.name}
      </TableCell>

      {props.isCanvasEditor && (
        <WideTableCell align="right">
          <TableCellBuffer>
            <CanvasErrorBoundary fallback={null}>
              <CanvasManager
                artistId={props.artist.id}
                enableRecordingGroups
                enableTeamSwitcher
                entityUri={entity.uri}
                isPrerelease
                logGabitoEvent={props.logGabitoEvent}
                onEditorClose={props.onEditorClose}
                onEditorOpen={props.onEditorOpen}
                onRemoveError={props.onCanvasRemoveError}
                onRemoveSuccess={props.onCanvasRemoveSuccess}
                onUpdateError={props.onCanvasUpdateError}
                onUpdateStart={props.onUpdateStart}
                onUpdateSuccess={props.onCanvasUpdateSuccess}
                renderButton={renderCanvasButtonMiniLeftAligned}
              />
            </CanvasErrorBoundary>
          </TableCellBuffer>
        </WideTableCell>
      )}

      {props.hasStorylinesAccess && (
        <WideTableCell align="right">
          <TableCellBuffer>
            <StorylinesErrorBoundary fallback={null}>
              <StorylineManager
                artist={props.artist}
                entity={entity}
                hasEditAccess
                isPrerelease
                onEditorClose={props.onEditorClose}
                onEditorOpen={props.onEditorOpen}
                onRemoveError={props.onStorylineRemoveError}
                onRemoveSuccess={props.onStorylineRemoveSuccess}
                onUploadError={props.onStorylineUploadError}
                textOnly
              />
            </StorylinesErrorBoundary>
          </TableCellBuffer>
        </WideTableCell>
      )}
    </TableRow>
  );
});
