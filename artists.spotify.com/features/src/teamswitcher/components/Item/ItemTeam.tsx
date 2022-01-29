import React from 'react';
import { useT } from '@mrkt/features/i18n';
import { Item, Props as ItemProps } from './Item';

type Props = Omit<ItemProps, 'subtext'> & { teamUri: string };

export function ItemTeam({ teamUri, ...itemProps }: Props) {
  const t = useT();

  let subtext;

  if (teamUri.startsWith('spotify:artist')) {
    subtext = t(
      'TEAM_SWITCHER_ARTIST_TEAM_SUBTEXT',
      'Artist team',
      'Subtitle for a team in the team switcher list that is specifically an artist team (as opposed to a record label team)',
    );
  } else if (teamUri.startsWith('spotify:label')) {
    subtext = t(
      'TEAM_SWITCHER_LABEL_TEAM_SUBTEXT',
      'Label team',
      'Subtitle for a team in the team switcher list that is specifically a record label team (as opposed to an artist team)',
    );
  }

  return <Item {...itemProps} subtext={subtext} />;
}
