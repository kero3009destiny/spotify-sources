// ignore-string-externalization
import { useEffect } from 'react';
import { Team } from '@mrkt/features/teamswitcher';
import { GabitoEvent } from '@mrkt/features/gabito';
import { createCanvasEvent } from '../../lib/logger';

type Props = {
  artistUri: string;
  children?: any; // @see https://github.com/Microsoft/TypeScript/issues/6471#issuecomment-171456118
  entityUri: string;
  logGabitoEvent: (event: GabitoEvent) => void;
  step: string;
  team?: Team;
};

export function LogImpression(props: Props) {
  const { logGabitoEvent, step, artistUri, entityUri, team } = props;

  useEffect(() => {
    logGabitoEvent(
      createCanvasEvent({
        step,
        action: 'view',
        artistUri,
        entityUri,
        team,
      }),
    );
  }, [logGabitoEvent, step, artistUri, entityUri, team]);

  if (!props.children) {
    return null;
  }
  return props.children;
}
