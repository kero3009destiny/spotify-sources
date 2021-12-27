import {
  gray10,
  gray20,
  gray30,
  gray50,
  gray70,
  gray80,
  gray90,
} from '@spotify-internal/encore-foundation';

interface theme {
  [name: string]: string;
}

export const lightTheme: theme = {
  backgroundColor: 'white',
  backgroundColorLighter: 'white',
  backgroundColorHover: gray90,
  borderColor: gray90,
  borderColorLighter: gray90,
  textColor: gray50,
  textColorHover: gray80,
  textColorActive: gray10,
};

export const darkTheme: theme = {
  backgroundColor: gray10,
  backgroundColorLighter: gray20,
  backgroundColorHover: gray20,
  borderColor: 'transparent',
  borderColorLighter: gray30,
  textColor: gray70,
  textColorHover: 'white',
  textColorActive: 'white',
};
