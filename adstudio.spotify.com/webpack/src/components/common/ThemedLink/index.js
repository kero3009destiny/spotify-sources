import styled from 'styled-components';

import { azure } from '@spotify-internal/adstudio-tape/lib/styles/tokens';

// TODO: Deprecat this and use components/common/TextLink instead
const ThemedLink = styled.a`
  color: ${props => (props.theme ? props.theme.colors.primaryColor : azure)};
`;

export default ThemedLink;
