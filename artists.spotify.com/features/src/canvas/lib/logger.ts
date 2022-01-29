// ignore-string-externalization
import { createMrktCanvasEditorBrowser } from '@spotify-internal/event-definitions/es5/events/createMrktCanvasEditorBrowser';
import { GabitoEvent } from '@mrkt/features/gabito';
import { Team } from '@mrkt/features/teamswitcher';

type CanvasEditorEvent = {
  step: string;
  action: string;
  artistUri: string;
  entityUri: string;
  team?: Team;
};

export function createCanvasEvent({
  step,
  action,
  artistUri,
  entityUri,
  team,
}: CanvasEditorEvent): GabitoEvent {
  const teamUri = team ? team.uri : undefined;

  return createMrktCanvasEditorBrowser({
    step,
    action,
    entity_uri: entityUri,
    creator_uri: artistUri,
    organization_uri: teamUri || '',
  });
}
