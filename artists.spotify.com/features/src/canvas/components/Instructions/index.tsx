import React from 'react';
import styled from 'styled-components';
import {
  cssColorValue,
  ButtonTertiary,
  IconCheck,
  Type,
  TypeList,
  TypeListItem,
  spacer12,
  spacer16,
  spacer24,
  spacer4,
  spacer8,
} from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';

import { Spinner } from '@mrkt/features/spinner';
import { DecoratedCanvas } from '../../types/canvas';
import { LayoutGuidelines } from './LayoutGuidelines';

const MAX_CANVASES_SHOWN = 5;

const CanvasInstructions = styled.div`
  padding-left: ${spacer24};
  color: ${cssColorValue('textSubdued')};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const ExternalLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  color: ${cssColorValue('textBrightAccent')};
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const List = styled(TypeList).attrs({
  forwardedAs: 'ul',
})`
  padding-left: 0;
  margin-bottom: ${spacer16};
`;
const ListItem = styled(TypeListItem)`
  clear: both;
  font-size: 14px;
  list-style: none;
  padding-left: ${spacer12};

  &::before {
    content: '•';
    float: left;
    margin-left: -${spacer12};
    padding-right: 7px;
    position: relative;
  }
`;

const Paragraph = styled(Type).attrs({
  forwardedAs: 'p',
  variant: Type.body2,
  condensed: true,
})<{
  spacing?: string;
}>`
  margin-bottom: ${({ spacing }) => `${spacing || spacer4}`};
`;

const Hr = styled.hr`
  margin: ${spacer12} 0;
  width: 100%;
`;

const iconStyles = { margin: '0 10px' };

type Props = {
  canvases?: DecoratedCanvas[];
  isPrerelease?: boolean;
  previewCanvas?: DecoratedCanvas;
  setPreviewCanvas: (canvas: DecoratedCanvas) => void;
  onRemove?: () => void;
  removable?: boolean;
  uploading?: boolean;
  processing?: boolean;
  posted?: boolean;
  readonly?: boolean;
  showContentGuidelines?: boolean;
  toggleContentGuidelines: () => void;
};

export function Instructions({
  canvases,
  isPrerelease,
  previewCanvas,
  setPreviewCanvas,
  onRemove,
  removable,
  uploading,
  processing,
  posted,
  readonly,
  showContentGuidelines,
  toggleContentGuidelines,
}: Props) {
  const t = useT();

  const hasArtistCanvas =
    canvases &&
    canvases?.some(
      (canvas: DecoratedCanvas) =>
        canvas.organization.uri === canvas.artist.uri,
    );
  const licensorsAmount =
    canvases && hasArtistCanvas ? canvases.length - 1 : canvases?.length;

  return (
    <CanvasInstructions>
      {(() => {
        if (readonly) {
          return (
            <>
              <Type
                as="p"
                variant={Type.body1}
                weight="black"
                semanticColor="textBase"
              >
                {t(
                  'CANVAS_INSTRUCTIONS_ERROR',
                  'Unable to post or edit Canvas',
                  "Error message for when we fail to save the user's Canvas",
                )}
              </Type>
              <Type as="p">
                {t(
                  'CANVAS_INSTRUCTIONS_ERROR_SECONDARY',
                  "We'll have things back to normal soon.",
                  "Message to comfort the user when things aren't working",
                )}
              </Type>
            </>
          );
        }

        if (uploading) {
          return (
            <>
              <Type
                as="p"
                variant={Type.body1}
                weight="black"
                semanticColor="textBase"
              >
                {t(
                  'CANVAS_INSTRUCTIONS_UPLOADING',
                  'Uploading',
                  "Status indicator that the user's image or video is uploading",
                )}
                <Spinner style={iconStyles} />
              </Type>
              <Type as="p">
                {t(
                  'CANVAS_INSTRUCTIONS_UPLOADING_2',
                  'Do not close this page until your Canvas has finished uploading.',
                  'Warning to the user to not leave the page while their Canvas is uploading',
                )}
              </Type>
            </>
          );
        }

        if (processing) {
          return (
            <>
              <Type
                as="p"
                variant={Type.body1}
                weight="black"
                semanticColor="textBase"
              >
                {t(
                  'CANVAS_PROCESSING_SHORT',
                  'Processing',
                  'Indicates that the Canvas is currently processing',
                )}
                <Spinner style={iconStyles} />
              </Type>
              <Type as="p">
                {t(
                  'CANVAS_PROCESSING_2',
                  'Your Canvas could take up to 10 minutes to process.',
                  "The user's image or video could take up to 10 minutes to process",
                )}
              </Type>
              <Type as="p">
                {t(
                  'CANVAS_PROCESSING_3',
                  "You may close this window. We'll let you know when it's done.",
                  'Notifying the user that they can close the modal while a background task is performed.',
                )}
              </Type>
            </>
          );
        }

        if (posted) {
          return (
            <>
              <Type
                as="p"
                variant={Type.body1}
                weight="black"
                semanticColor="textBase"
              >
                {isPrerelease
                  ? t(
                      'CANVAS_DONE',
                      'Done',
                      'The image or video upload has completed',
                    )
                  : t('CANVAS_POSTED', 'Posted', 'The image or video is live')}
                <IconCheck
                  iconSize={16}
                  semanticColor="textBrightAccent"
                  style={iconStyles}
                />
              </Type>
              <Type as="p">
                {isPrerelease
                  ? t(
                      'CANVAS_INSTRUCTIONS_SUCCESS_PRERELEASE',
                      'Your Canvas is ready. It will go live with your release.',
                      'Success message for when a user uploads a Canvas for their unreleased song. Listeners can see the Canvas after the song is released.',
                    )
                  : t(
                      'CANVAS_INSTRUCTIONS_SUCCESS',
                      'Your Canvas is on Spotify but it could still take about an hour to appear for some listeners.',
                      'Success message for when a user uploads a Canvas for their song. Listeners can see the Canvas but it may take an hour to show up on the app',
                    )}
              </Type>
            </>
          );
        }

        if (removable && onRemove) {
          return (
            <>
              {canvases && canvases.length > 1 && (
                <>
                  <Paragraph spacing={spacer8}>
                    {hasArtistCanvas
                      ? t(
                          'CANVAS_SPLIT_TEAM_NOTICE',
                          `You and {licensorsAmount} {licensorsAmount, plural,
                          one {licensor}
                          other {licensors}
                        } have added Canvases to this song:`,
                          'The artist and several other licensor/labels have added a Canvas to the song.',
                          { licensorsAmount },
                        )
                      : t(
                          'CANVAS_SPLIT_TEAM_NOTICE_2',
                          `{licensorsAmount} {licensorsAmount, plural,
                          one {licensor has}
                          other {licensors have}
                        } added Canvases to this song:`,
                          'Other licensor/labels have added a Canvas to the song.',
                          { licensorsAmount },
                        )}
                  </Paragraph>

                  {canvases
                    .slice(
                      0,
                      canvases.length > MAX_CANVASES_SHOWN
                        ? MAX_CANVASES_SHOWN - 1 // we show the "and <n> more" line that will replace the last Canvas
                        : MAX_CANVASES_SHOWN,
                    )
                    .map(canvas => (
                      <Paragraph
                        key={canvas.id}
                        weight={Type.bold}
                        semanticColor={
                          previewCanvas && previewCanvas.id === canvas.id
                            ? 'textBase'
                            : 'textSubdued'
                        }
                        spacing={spacer8}
                        style={{ cursor: 'pointer' }}
                        onMouseOver={() => setPreviewCanvas(canvas)}
                        onFocus={() => setPreviewCanvas(canvas)}
                      >
                        {canvas.organization.name}
                      </Paragraph>
                    ))}

                  {canvases.length > MAX_CANVASES_SHOWN && (
                    <Paragraph spacing={spacer8}>
                      {t(
                        'CANVAS_OTHER_LICENSORS',
                        'and {numLicensors} more licensors.',
                        'in addition, more licensor/labels',
                        {
                          numLicensors:
                            canvases.length - (MAX_CANVASES_SHOWN - 1),
                        },
                      )}
                    </Paragraph>
                  )}
                </>
              )}

              <div>
                <ButtonTertiary
                  buttonSize={ButtonTertiary.sm}
                  semanticColor="textNegative"
                  condensed
                  style={{
                    marginTop: canvases && canvases.length > 1 ? spacer8 : 0,
                  }}
                  onClick={onRemove}
                  data-testid="remove-button"
                  data-slo-id="remove-button"
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

              <Type as="p" variant={Type.body2} condensed>
                {t(
                  'CANVAS_REMOVE_BODY',
                  'Listeners will see your default album artwork instead.',
                  "Explanation that listeners on the app will see the album's cover art",
                )}
              </Type>

              <Hr />

              <LayoutGuidelines
                enabled={showContentGuidelines}
                toggle={toggleContentGuidelines}
              />
            </>
          );
        }

        return (
          <>
            <Type
              as="p"
              variant={Type.body1}
              weight="black"
              semanticColor="textBase"
            >
              {t(
                'CANVAS_DRAG_DROP',
                'Drag and drop a file',
                'Users can use their computer mouse to drag a file into this area to upload',
              )}
            </Type>

            <List>
              <ListItem condensed>
                {t(
                  'CANVAS_NO_LINKS',
                  'URLs and CTAs are prohibited',
                  'URLs as in links; CTAs as in call-to-action buttons',
                )}
              </ListItem>
              <ListItem condensed>
                {t(
                  'CANVAS_NO_LINKS_2',
                  'If used, text should be relevant to the track',
                  'Text on the Canvas should relate to the song',
                )}
              </ListItem>
              <ListItem condensed>
                {t(
                  'CANVAS_PREVIEW_PROMPT',
                  'Preview your Canvas with player controls before uploading',
                  'Before submitting the Canvas, view it with music playing controls',
                )}
              </ListItem>
              <ListItem condensed>
                {t(
                  'CANVAS_POLICY_WARNING',
                  "Canvases that don't follow our policies will be removed.",
                  'Notice that we remove Canvases in violation of our content policies',
                )}{' '}
                <ExternalLink href="https://artists.spotify.com/help/article/canvas-content-policy">
                  {t(
                    'CANVAS_VIEW_POLICIES',
                    'View our content policies.',
                    'Link to view content policies',
                  )}
                </ExternalLink>
              </ListItem>
            </List>

            <Paragraph>
              {t(
                'CANVAS_FILE_REQS',
                'File requirements:',
                'Requirements for file upload',
              )}
            </Paragraph>
            <List>
              <ListItem condensed>
                {t(
                  'CANVAS_SPEC_RATIO',
                  '9:16 ratio',
                  'Width to height ratio of an image or video',
                )}
              </ListItem>
              <ListItem condensed>
                {t(
                  'CANVAS_SPEC_HEIGHT',
                  'At least 720px tall',
                  'Height requirement for an image or video',
                )}
              </ListItem>
              <ListItem condensed>
                {t(
                  'CANVAS_SPEC_FORMAT',
                  'An MP4 or JPEG file',
                  'File format requirement for an image or video',
                )}
              </ListItem>
              <ListItem condensed>
                {t(
                  'CANVAS_SPEC_LENGTH',
                  '3s to 8s long (MP4 only)',
                  'Length requirement for a video, in seconds',
                )}
              </ListItem>
            </List>

            <Paragraph>
              <ExternalLink href="https://canvas.spotify.com">
                {t(
                  'CANVAS_SPECS',
                  'See our best practices and specs.',
                  'Link to view best practices and specs',
                )}
              </ExternalLink>
            </Paragraph>

            <Hr />

            <LayoutGuidelines
              enabled={showContentGuidelines}
              toggle={toggleContentGuidelines}
            />
          </>
        );
      })()}
    </CanvasInstructions>
  );
}
