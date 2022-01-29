import { useT } from '@mrkt/features/i18n';
import React from 'react';
import {
  Type,
  IconInformationAlt,
  gray75,
  gray90,
} from '@spotify-internal/encore-web';
import { Avatar, Subtext, TeamWrapper, Text } from './styled';

type Props = { underlined?: boolean };

export function ItemNoTeamSelected(props: Props) {
  const t = useT();
  return (
    <TeamWrapper underlined={props.underlined}>
      <Avatar background={gray90}>
        <IconInformationAlt color={gray75} iconSize={32} />
      </Avatar>
      <Text>
        <Type weight={Type.bold}>
          {t(
            'TEAM_SWITCHER_NO_TEAM_SELECTED',
            'No team selected',
            'Lets user known that no artist/label team has been selected from the team switcher form',
          )}
        </Type>
        <Subtext>
          {t(
            'TEAM_SWITCHER_CHOOSE_TEAM',
            'Choose from the teams below',
            'Instructions above a list of artist/label teams from which the user should select one',
          )}
        </Subtext>
      </Text>
    </TeamWrapper>
  );
}
