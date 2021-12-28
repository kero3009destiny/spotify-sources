/**
 * Shell component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext, useEffect } from 'react';
import '../../style/critical.css';

import style from './style.module.css';
import { AppContext } from '../../common/context.app';

interface Props {
  children: React.ReactNode;
  theme?: string;
}

const Shell = ({ children, theme }: Props): JSX.Element => {
  const { setTheme } = useContext(AppContext);

  useEffect(() => {
    if (theme && setTheme) {
      setTheme(theme);
    }
  }, [theme, setTheme]);

  return <div className={style.appShell}>{children}</div>;
};

export default Shell;
