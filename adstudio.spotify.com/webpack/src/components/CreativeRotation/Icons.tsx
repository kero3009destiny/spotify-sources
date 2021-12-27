import React, { FunctionComponent } from 'react';
import { withTheme } from 'styled-components';

interface SVGIconProps {
  width: number | string;
  height: number | string;
  color?: string;
}

interface SVGProps extends SVGIconProps {
  theme: { colors: { primaryColor: string } };
}

export const EvenlyIcon: FunctionComponent<SVGIconProps> = withTheme(
  ({ width, height, color, theme }: SVGProps) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 26 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="1"
          width="7"
          height="25"
          stroke={color ? color : theme.colors.primaryColor}
        />
        <rect
          x="9.5"
          y="1"
          width="7"
          height="25"
          stroke={color ? color : theme.colors.primaryColor}
        />
        <rect
          x="18.5"
          y="1"
          width="7"
          height="25"
          stroke={color ? color : theme.colors.primaryColor}
        />
      </svg>
    );
  },
);

export const SequentialIcon: FunctionComponent<SVGIconProps> = withTheme(
  ({ width, height, color, theme }: SVGProps) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 26 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="1"
          width="7"
          height="25"
          stroke={color ? color : theme.colors.primaryColor}
        />
        <rect
          x="9.5"
          y="1"
          width="7"
          height="25"
          stroke={color ? color : theme.colors.primaryColor}
        />
        <rect
          x="18.5"
          y="1"
          width="7"
          height="25"
          stroke={color ? color : theme.colors.primaryColor}
        />
        <path
          d="M4.77869 16V11.746H4.05869C3.97469 12.19 3.54869 12.526 2.93669 12.544V13.108H3.95669V16H4.77869Z"
          fill={color ? color : theme.colors.primaryColor}
        />
        <path
          d="M12.2937 13.366C12.2817 13.294 12.2697 13.216 12.2697 13.138C12.2697 12.718 12.4977 12.388 12.9777 12.388C13.4397 12.388 13.6617 12.688 13.6617 13.018C13.6617 13.324 13.5057 13.564 13.1397 13.792L12.4437 14.224C11.6937 14.68 11.4417 15.262 11.4357 16H14.5257V15.274H12.4557C12.5157 15.076 12.6777 14.95 12.8577 14.83L13.6857 14.32C14.1957 14.008 14.5017 13.558 14.5017 13C14.5017 12.274 13.9377 11.656 12.9957 11.656C12.0237 11.656 11.4717 12.322 11.4717 13.06C11.4717 13.156 11.4837 13.264 11.4957 13.324L12.2937 13.366Z"
          fill={color ? color : theme.colors.primaryColor}
        />
        <path
          d="M21.6216 14.086C21.7236 14.038 21.8616 14.002 21.9936 14.002C22.3596 14.002 22.7376 14.206 22.7376 14.692C22.7376 15.064 22.4616 15.376 21.9696 15.376C21.5136 15.376 21.1776 15.052 21.1536 14.584L20.3496 14.746C20.4036 15.454 20.9916 16.09 21.9756 16.09C22.9956 16.09 23.5776 15.43 23.5776 14.698C23.5776 13.9 22.9656 13.426 22.3236 13.408L23.4576 12.43V11.746H20.4876V12.466H22.3956L21.2436 13.486L21.6216 14.086Z"
          fill={color ? color : theme.colors.primaryColor}
        />
      </svg>
    );
  },
);

export const WeightedIcon: FunctionComponent<SVGIconProps> = withTheme(
  ({ width, height, color, theme }: SVGProps) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 26 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="1"
          width="12"
          height="25"
          stroke={color ? color : theme.colors.primaryColor}
        />
        <rect
          x="14.5"
          y="1"
          width="6"
          height="25"
          stroke={color ? color : theme.colors.primaryColor}
        />
        <rect
          x="22.5"
          y="1"
          width="3"
          height="25"
          stroke={color ? color : theme.colors.primaryColor}
        />
      </svg>
    );
  },
);
