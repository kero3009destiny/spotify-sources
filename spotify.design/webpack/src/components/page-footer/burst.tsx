import React, { useContext } from 'react';
import {
  THEME_CLASSES,
  ThemeIdentifiers,
} from '../../common/constants/colour-combinations';
import { AppContext } from '../../common/context.app';

import {
  Footer1,
  Footer2,
  Footer3,
  Footer4,
  Footer5,
} from '../utilities/decorative-bursts/footer';

const Bursts = {
  [THEME_CLASSES.process]: <Footer1 />,
  [THEME_CLASSES.noted]: <Footer2 />,
  [THEME_CLASSES.inspiration]: <Footer3 />,
  [THEME_CLASSES.blank]: <Footer3 />,
  [THEME_CLASSES.design]: <Footer4 />,
  [THEME_CLASSES.tools]: <Footer4 />,
  [THEME_CLASSES.team]: <Footer5 />,
  [THEME_CLASSES.listen]: <div />,
};

export const Burst = () => {
  const { theme } = useContext(AppContext);

  return Bursts[theme as ThemeIdentifiers] || <Footer1 />;
};
