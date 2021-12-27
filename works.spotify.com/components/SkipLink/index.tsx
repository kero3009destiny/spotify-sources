import { TextLink } from '@spotify-internal/encore-web';
import styled from 'styled-components';

const StyledSkipLink = styled(TextLink)`
  color: white;
  z-index: 10000;
  background: rgb(0, 0, 0);
  position: absolute;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  border: 0;
  height: 10px;
  width: 50px;
  overflow: hidden;
  white-space: nowrap;

  /* a:active used to take into account a:focus bug in earlier versions of Internet Explorer. */
  &:focus,
  &:active {
    overflow: visible;
    height: auto;
    width: auto;
    clip: auto;
  }
`;

type Props = {
  href: string;
};

export default function SkipLink({ href }: Props) {
  return <StyledSkipLink href={href}>Skip to main content</StyledSkipLink>;
}
