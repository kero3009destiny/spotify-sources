// ignore-string-externalization
import {
  Image as ImageComponent,
  spacer12,
} from '@spotify-internal/encore-web';
import styled from 'styled-components';

export const Image = styled(ImageComponent).attrs(props => ({
  imageHeight: '36px',
  imageWidth: '36px',
  crop: true,
  circle: props.circle ?? true,
  alt: '',
}))`
  flex-shrink: 0;
  margin-right: ${spacer12};
`;
