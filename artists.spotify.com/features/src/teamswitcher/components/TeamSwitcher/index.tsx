import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
  Type,
  gray60,
  spacer16,
  spacer24,
  screenXsMax,
  screenSmMin,
} from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';

import { Team, User } from '../../lib/types';
import { getTeams } from '../../lib/useTeams';
import { inferSelectedTeam } from '../../lib/inferSelectedTeam';
import { Item } from '../Item';
import { Notice, noticeType } from '../Notice';
import { Switcher } from '../Switcher';

type CoreProps = {
  resourceUri: string;
  action: string;
  params?: { [key: string]: string };
  switcherTitle?: string | React.ReactNode;
  selectedTeam?: Team;
  /**
   * Callback when a team gets selected.
   * @param {Team} team The selected team.
   * @param {boolean} skipConfirmation If this flag is set to `true`, immediately continue to the next step and close the team switcher.
   */
  onSelect: (team: Team, skipConfirmation?: boolean) => void;
};

/**
 * This is the functionality of the team switcher but it does not have
 * any included layout compoonents.
 *
 * If you don't want to handle layout yourself, then use the TeamSwitcher
 * component.
 */
export function TeamSwitcherCore(props: CoreProps) {
  const [teams, setTeams] = useState<Team[]>();
  const [user, setUser] = useState<User>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);

  const { resourceUri, action, params, onSelect } = props;
  const isOffline = !window.navigator.onLine;

  const t = useT();

  // load teams
  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);

      // show a loading spinner if the endpoint takes longer to respond
      const slowpoke = window.setTimeout(() => {
        if (isMounted) {
          setShowSpinner(true);
        }
      }, 3000);

      try {
        const data = await getTeams(resourceUri, action, params);
        if (isMounted) {
          setUser(data.user);
          // automatically select the first team and close the switcher
          // only call onSelect if there isn't a team already selected
          // to prevent an infinite rendering loop.
          const inferredTeam = inferSelectedTeam(data);
          if (inferredTeam && !props.selectedTeam) {
            onSelect(inferredTeam, true);
          } else {
            setTeams(data.teams);
            setError(false);
          }
        }
      } catch (e) {
        if (isMounted) {
          setError(true);
        }
      }

      if (isMounted) {
        setLoading(false);
        setShowSpinner(false);
      }
      window.clearTimeout(slowpoke);
    }
    load();

    return () => {
      isMounted = false;
    };
  }, [resourceUri, action, params, onSelect, props.selectedTeam]);

  if (loading && !showSpinner) return <div data-testid="loading" />;
  if (showSpinner) return <Notice type={noticeType.loading} />;
  if (isOffline) return <Notice type={noticeType.offline} />;
  if (error || !user) return <Notice type={noticeType.error} />;
  if (!teams?.length) return <Notice type={noticeType.noTeams} />;

  return (
    <>
      {props.switcherTitle && typeof props.switcherTitle === 'string' && (
        <Type as="p" condensed>
          {props.switcherTitle}
        </Type>
      )}
      {props.switcherTitle && typeof props.switcherTitle !== 'string' && (
        <>{props.switcherTitle}</>
      )}
      <Type
        as="p"
        condensed
        color={gray60}
        variant={Type.cta4}
        style={{ marginTop: spacer24 }}
      >
        {t(
          'TEAM_SWITCHER_YOU_LABEL',
          'You',
          "Label for the logged-in user's name",
        )}
      </Type>
      <Item name={user.name} imageUrl={user.image_url} seperated />

      <Type
        as="p"
        condensed
        color={gray60}
        variant={Type.cta4}
        style={{ marginTop: spacer16 }}
      >
        {t(
          'TEAM_SWITCHER_YOUR_TEAMS_LABEL',
          'Your teams',
          'Label for a list of the label/artist teams of which the user is part',
        )}
      </Type>
      <Switcher
        items={teams}
        selected={props.selectedTeam}
        onSelect={onSelect}
      />
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 400px;
`;

const Content = styled.div<{ fullscreen?: boolean; condensed?: boolean }>`
  padding: 0 ${spacer16};
  max-width: 416px;

  ${props =>
    props.fullscreen
      ? css`
          @media (max-width: ${screenXsMax}) {
            margin-top: 36px;
          }
          @media (min-width: ${screenSmMin}) {
            margin-top: ${props.condensed ? '72px' : '96px'};
          }
        `
      : css`
          @media (max-width: ${screenXsMax}) {
            margin-top: 24px;
          }
          @media (min-width: ${screenSmMin}) {
            margin-top: 48px;
          }
        `}
`;

type SwitcherProps = CoreProps & {
  fullscreen?: boolean;
  condensed?: boolean;
};

/**
 * This is the existing TeamSwitcher that has it's own layout and container.
 * Use this if you want a drop-in solution that has basic layout as well.
 *
 * If you want to handle the layout yourself, then use the TeamSwitcherCore
 * component.
 */
export function TeamSwitcher({ onSelect, ...props }: SwitcherProps) {
  const wrapperRef = React.createRef<HTMLDivElement>();

  function handleSelect(team: Team, skipConfirmation?: boolean) {
    onSelect(team, skipConfirmation);
    /* istanbul ignore next */
    if (wrapperRef.current && wrapperRef.current.scrollIntoView) {
      wrapperRef.current.scrollIntoView(true);
    }
  }

  return (
    <Wrapper ref={wrapperRef}>
      <Content fullscreen={props.fullscreen} condensed={props.condensed}>
        <TeamSwitcherCore {...props} onSelect={handleSelect} />
      </Content>
    </Wrapper>
  );
}
