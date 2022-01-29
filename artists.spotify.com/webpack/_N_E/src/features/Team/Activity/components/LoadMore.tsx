import { ButtonSecondary, spacer32 } from '@spotify-internal/encore-web';
import React from 'react';
import styled from 'styled-components';
import { useT } from '@mrkt/features/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
var LoadMoreButton = styled(ButtonSecondary).withConfig({
  displayName: "LoadMore__LoadMoreButton",
  componentId: "sc-1edw0ws-0"
})(["margin-top:", ";"], spacer32);
export var LoadMore = function LoadMore(_ref) {
  var _onClick = _ref.onClick;
  var t = useT();
  return /*#__PURE__*/_jsx(LoadMoreButton, {
    "data-testid": "load_more",
    onClick: function onClick() {
      return _onClick();
    },
    buttonSize: ButtonSecondary.sm,
    children: t('ACTIVITY_LOAD_MORE_BUTTON', 'Load more', 'load more activities')
  });
};