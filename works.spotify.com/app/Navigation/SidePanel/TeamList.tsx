import { EntityItem, EntityLink, EntityList, EntityTitle } from 'components/SidePanel';
import styled from 'styled-components';
import { spacer24 } from '@spotify-internal/encore-web';
import { Badge } from 'components/Badge';
import { setSearchResults, useSidePanel } from './SidePanelState';
import { useEffect } from 'react';
import { searchTeams, useCurrentUser, useCurrentTeams } from 'libs/services/s4p';
import { selectTeam } from '.';
import { isSongwriterTeamUser } from 'libs/utils';

const StyledList = styled(EntityList)`
  list-style-type: none;
  margin: 0 ${spacer24} 0 ${spacer24};
  padding: 0;
`;

const EntityButton = styled(EntityLink)`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  width: 100%;
`;

export function TeamList() {
  const [{ searchValue, shouldShowSearch, searchResults }, sidePanelDispatch] = useSidePanel();
  const { team, employee } = useCurrentUser();
  const userTeams = useCurrentTeams();

  useEffect(() => {
    if (!searchValue) {
      sidePanelDispatch(setSearchResults([]));
      return undefined;
    }

    let subscribed = true;

    searchTeams(searchValue).then(
      (teams) => subscribed && sidePanelDispatch(setSearchResults(teams)),
    );

    return () => {
      subscribed = false;
    };
  }, [searchValue, sidePanelDispatch]);

  return (
    <StyledList>
      {!shouldShowSearch && (
        <EntityItem active>
          <EntityButton as="button" title={`Select ${team.organizationName}`}>
            <Badge variant="publisher" initial={team.organizationName} />
            <EntityTitle style={{ fontWeight: 'bold' }}>{team.organizationName}</EntityTitle>
          </EntityButton>
        </EntityItem>
      )}
      {!shouldShowSearch &&
        userTeams
          .filter((userTeam) => userTeam.organizationUri !== team.organizationUri)
          .map((accessibleTeam) => (
            <EntityItem active={false} key={accessibleTeam.organizationUri}>
              <EntityButton
                as="button"
                title={`Select ${accessibleTeam.organizationName}`}
                onClick={() => selectTeam(accessibleTeam.organizationUri)}
              >
                <Badge variant="publisher" initial={accessibleTeam.organizationName} />
                <EntityTitle style={{ fontWeight: 'bold' }}>
                  {accessibleTeam.organizationName}
                </EntityTitle>
              </EntityButton>
            </EntityItem>
          ))}
      {!shouldShowSearch && employee && team.organizationName !== 'God Mode' ? (
        <EntityItem active={false}>
          <EntityButton
            as="button"
            title="Return to God Mode"
            onClick={() => {
              localStorage.setItem('SPA-Current-Team', '');
              window.location.reload();
            }}
          >
            <Badge variant="publisher" initial="Return to God Mode" />
            <EntityTitle>Return to God Mode</EntityTitle>
          </EntityButton>
        </EntityItem>
      ) : null}
      {searchResults.map((result) => (
        <EntityItem key={result.organizationUri} active={false}>
          <EntityButton
            as="button"
            title={`Select ${result.organizationName}`}
            onClick={() => selectTeam(result.organizationUri)}
          >
            <Badge
              variant={getBadgeVariant(result.organizationUri)}
              initial={result.organizationName}
            />
            <EntityTitle>{result.organizationName}</EntityTitle>
          </EntityButton>
        </EntityItem>
      ))}
    </StyledList>
  );
}

function getBadgeVariant(uri: string): 'songwriter' | 'publisher' {
  if (!isSongwriterTeamUser(uri)) {
    return 'publisher';
  }
  return 'songwriter';
}
