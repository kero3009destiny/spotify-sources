import React from 'react';
import styled, { css } from 'styled-components';
import {
  IconExclamationAlt,
  IconOffline,
  LoadingIndicator,
  Type,
  gray75,
  failure,
  spacer12,
  spacer32,
  spacer40,
  screenXsMax,
  screenSmMin,
  heading2FontSize,
  heading2FontWeight,
  heading2LetterSpacing,
  heading2LineHeight,
  heading3FontSize,
  heading3FontWeight,
  heading3LetterSpacing,
  heading3LineHeight,
} from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';

const ErrorContent = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const iconLarge = css`
  @media (max-width: ${screenXsMax}) {
    height: 100px;
    margin-bottom: ${spacer32};
    stroke-width: 4px;
    width: 100px;
  }
  @media (min-width: ${screenSmMin}) {
    height: 144px;
    margin-bottom: ${spacer40};
    stroke-width: 6px;
    width: 144px;
  }
`;
const IconOfflineLarge = styled(IconOffline)`
  ${iconLarge}
`;
const IconExclamationAltLarge = styled(IconExclamationAlt)`
  ${iconLarge}
`;

export enum noticeType {
  'loading',
  'error',
  'offline',
  'noTeams',
}

type Props = {
  type: noticeType;
};

const Title = styled.h1`
  @media (max-width: ${screenXsMax}) {
    font-size: ${heading3FontSize};
    font-weight: ${heading3FontWeight};
    letter-spacing: ${heading3LetterSpacing};
    line-height: ${heading3LineHeight};
    margin: 0;
    padding: 0 0 ${spacer12};
  }
  @media (min-width: ${screenSmMin}) {
    font-size: ${heading2FontSize};
    font-weight: ${heading2FontWeight};
    letter-spacing: ${heading2LetterSpacing};
    line-height: ${heading2LineHeight};
    margin: 0;
    padding: 0 0 ${spacer12};
  }
`;

export function Notice(props: Props) {
  const t = useT();

  switch (props.type) {
    case noticeType.offline:
      return (
        <ErrorContent>
          <IconOfflineLarge color={gray75} iconSize={64} />
          <Title>
            {t(
              'TEAM_SWITCHER_OFFLINE_ERROR_TITLE',
              'You’re offline',
              "This is a title for an error that says you are offline so the team switcher can't load.",
            )}
          </Title>
          <Type as="p">
            {t(
              'TEAM_SWITCHER_OFFLINE_ERROR',
              'Connect to the Internet and try again.',
              "This is the main text of an error for when you are offline and the team switcher can't load.",
            )}
          </Type>
        </ErrorContent>
      );

    case noticeType.error:
      return (
        <ErrorContent>
          <IconExclamationAltLarge color={failure} iconSize={64} />
          <Title>
            {t(
              'TEAM_SWITCHER_GENERIC_ERROR_TITLE',
              'Something went wrong',
              "This is a title for an error when the team switcher doesn't load. We don't know what happened.",
            )}
          </Title>
          <Type as="p">
            {t(
              'TEAM_SWITCHER_GENERIC_ERROR',
              'Please refresh and try again.',
              "This is the main text of an error for when the team switcher doesn't load.",
            )}
          </Type>
        </ErrorContent>
      );

    case noticeType.loading:
      return (
        <ErrorContent>
          <LoadingIndicator
            indicatorSize={LoadingIndicator.lg}
            style={{ marginBottom: spacer40 }}
          />
          <Title>
            {t(
              'TEAM_SWITCHER_LOADING',
              'Give us a sec...',
              "The team switcher is loading and taking a little longer than usual. You canuse the full word 'second' if needed.",
            )}
          </Title>
        </ErrorContent>
      );

    case noticeType.noTeams:
      return (
        <ErrorContent>
          <IconExclamationAltLarge color={failure} iconSize={64} />
          <Title>
            {t(
              'TEAM_SWITCHER_NO_TEAMS_TITLE',
              'No eligible teams found',
              "This is a title for an empty state when we can't find any teams for you.",
            )}
          </Title>
          <Type as="p">
            {t(
              'TEAM_SWITCHER_NO_TEAMS',
              "Try again once you've been added to one.",
              "This is the main text for an empty state for when we can't find any teams for you. We advise you to be added to a team before trying again.",
            )}
          </Type>
        </ErrorContent>
      );

    default:
      return null;
  }
}
