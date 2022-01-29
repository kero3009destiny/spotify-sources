// ignore-string-externalization
import styled from 'styled-components';
import { gray25 } from '@spotify-internal/encore-web';
import { navPadding } from '../../../../shared/components/Header';
export var Section = styled.section.withConfig({
  displayName: "Section",
  componentId: "sc-1hqynuq-0"
})(["flex:1;overflow:auto;position:relative;&::before{border-top:1px solid ", ";width:calc(100% - (", " * 2));content:'';display:block;height:1px;position:sticky;top:0;left:", ";z-index:1;}"], gray25, navPadding, navPadding);