import styled from 'styled-components';
import { ButtonSecondary, spacer24 } from '@spotify-internal/encore-web';
import React from 'react';
import { useTeamStore } from '../../lib/store/useTeamStore';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
var StyledWrapper = styled.div.withConfig({
  displayName: "ExpandCollapseButton__StyledWrapper",
  componentId: "sc-1eda4n5-0"
})(["margin-top:", ";"], spacer24);
export var ExpandCollapseButton = function ExpandCollapseButton() {
  var _useTeamStore = useTeamStore(),
      joinTableIsExpanded = _useTeamStore.joinTableIsExpanded,
      toggleJoinTableExpansion = _useTeamStore.toggleJoinTableExpansion;

  var t = useT();
  return /*#__PURE__*/_jsx(StyledWrapper, {
    children: /*#__PURE__*/_jsx(ButtonSecondary, {
      "data-testid": "expand-collapse-button",
      buttonSize: ButtonSecondary.sm,
      onClick: function onClick() {
        return toggleJoinTableExpansion(joinTableIsExpanded);
      },
      children: joinTableIsExpanded ? t('JOIN_TABLE_SHOW_LESS_BUTTON', 'Show less', 'Collapse the table and show less requests.') : t('JOIN_TABLE_SHOW_ALL_BUTTON', 'Show all', 'Expand the table and show all requests')
    })
  });
};