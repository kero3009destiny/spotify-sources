// TODO: likely should move these to the design system
import React, { ComponentProps } from 'react';

import { Icon } from '@spotify-internal/encore-web';

type IconProps = ComponentProps<typeof Icon>;

export const IconColumns = (props: IconProps) => (
  <Icon
    {...props}
    fill="none"
    dangerouslySetInnerHTML={{
      __html: `
      <path d="M20.5 4V3.5H20H4H3.5V4V20V20.5H4H20H20.5V20V4Z" stroke="#181818" stroke-miterlimit="10"/>
      <line x1="9" y1="4" x2="9" y2="20" stroke="#181818"/>
      <line x1="15" y1="4" x2="15" y2="20" stroke="#181818"/>`,
    }}
  />
);

export const IconReport = (props: IconProps) => (
  <Icon
    {...props}
    viewBox="0 0 17 20"
    fill="none"
    dangerouslySetInnerHTML={{
      __html: `
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5909 0H11.8721L16.5 4.85091V4.90909V6V20H0.5V0H10.5H11.5909ZM11.5909 1.10994L15.2154 4.90909H11.5909V1.10994ZM15.5588 6V19H1.44118V1H10.5V6H15.5588ZM8 7H7V16H8V7ZM9 8H10V16H9V8ZM6 10H5V16H6V10ZM11 10H12V16H11V10Z" fill="#181818"/>`,
    }}
  />
);

export const IconAdRotation = (props: IconProps) => (
  <Icon
    {...props}
    fill="none"
    dangerouslySetInnerHTML={{
      __html: `
      <path d="M19.5 11V1H9.5V3H8.5V0H20.5V12H11.5V11H19.5Z" fill="#181818"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 14V4H1.5V14H11.5ZM0.5 3V15H12.5V3H0.5Z" fill="#181818"/>
      <path d="M7.5 16L7.5 20L17.5 20L17.5 14M17.5 14L15.5 16M17.5 14L19.5 16" stroke="#181818"/>`,
    }}
  />
);
