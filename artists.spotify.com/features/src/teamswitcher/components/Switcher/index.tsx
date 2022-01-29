// ignore-string-externalization
import React from 'react';
import { ItemNoTeamSelected, ItemTeam } from '../Item';
import { Team } from '../../lib/types';

type Props<T extends Team> = {
  items: T[];
  selected?: T;
  onSelect: (team: T) => void;
};

export function Switcher<T extends Team>(props: Props<T>) {
  const { items, selected, onSelect } = props;

  if (!items.length) {
    return null;
  }

  return (
    <>
      {selected ? (
        <ItemTeam
          name={selected.name}
          imageUrl={selected.image_url}
          teamUri={selected.uri}
          checked
          seperated={items.length > 1}
          selectable
        />
      ) : (
        <ItemNoTeamSelected underlined={items.length > 1} />
      )}

      {items
        .filter(team => !selected || team.uri !== selected.uri)
        .map(team => (
          <ItemTeam
            key={team.uri}
            name={team.name}
            imageUrl={team.image_url}
            teamUri={team.uri}
            selectable
            onClick={() => {
              onSelect(team);
            }}
          />
        ))}
    </>
  );
}
