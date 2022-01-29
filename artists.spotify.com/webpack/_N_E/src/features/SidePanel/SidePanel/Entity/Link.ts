// ignore-string-externalization
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { gray10, gray15, white, spacer24 } from '@spotify-internal/encore-web';
/* eslint-disable-next-line import/no-default-export */

export default styled(Link).withConfig({
  displayName: "Link",
  componentId: "sc-68aijr-0"
})(["color:inherit;padding:14px ", ";display:flex;align-items:center;position:relative;&:hover,&:focus{background-color:", ";color:", ";box-shadow:0 1px 0 0 ", ",0 -1px 0 0 ", ";outline:none;z-index:1;}"], spacer24, gray15, white, gray10, gray10);