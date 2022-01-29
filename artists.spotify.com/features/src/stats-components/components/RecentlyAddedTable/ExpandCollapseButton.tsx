import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  ButtonSecondary,
  Type,
  gray60,
  spacer20,
  spacer40,
} from '@spotify-internal/encore-web-v3';
import { withT } from '@mrkt/features/i18n';
import { MAX_COLLAPSED_PLAYLISTS } from '.';

const StyledWrapper = styled.div`
  margin-top: ${spacer40};
`;

const StyledButton = styled(ButtonSecondary)`
  margin-right: ${spacer20};
`;

export class ExpandCollapseButtonComponent extends Component<$TSFixMe> {
  static propTypes = {
    isExpanded: PropTypes.bool,
    handleExpandToggle: PropTypes.func,
    numPlaylists: PropTypes.number.isRequired,
    t: PropTypes.func,
  };

  static defaultProps = {
    isExpanded: false,
  };

  render() {
    const { isExpanded, handleExpandToggle, numPlaylists, t } = this.props;
    const visiblePlaylists = isExpanded
      ? numPlaylists
      : MAX_COLLAPSED_PLAYLISTS;

    return (
      <StyledWrapper>
        <StyledButton
          buttonSize={ButtonSecondary.sm}
          onClick={handleExpandToggle}
        >
          {isExpanded
            ? t(
                'RECENTLY_ADDED_TABLE_EXPAND_COLLAPSE_BTN_5c8ae6',
                'Show Less',
                '',
              )
            : t(
                'RECENTLY_ADDED_TABLE_EXPAND_COLLAPSE_BTN_d0beef',
                'Show More',
                '',
              )}
        </StyledButton>
        <Type variant={Type.body2} color={gray60}>
          {`${t(
            'RECENTLY_ADDED_TABLE_EXPAND_COLLAPSE_BTN_dd0077',
            'Showing {visiblePlaylists} of {totalPlaylists}',
            'This text appears next to a button which expands and collapses a table with playlist data. Example Usage: Showing 3 of 10',
            {
              visiblePlaylists,
              totalPlaylists: numPlaylists,
            },
          )}`}
        </Type>
      </StyledWrapper>
    );
  }
}

export const ExpandCollapseButton = withT(ExpandCollapseButtonComponent);
