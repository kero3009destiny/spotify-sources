// ignore-string-externalization
import React, { useContext, createContext } from 'react';

const Context = createContext('');
const useDocumentTitle = (previousTitle: string, nextTitle: string) => {
  React.useEffect(() => {
    document.title = nextTitle;
    return () => {
      document.title = previousTitle;
    };
  }, [nextTitle, previousTitle]);
};

type DocumentTitleProps = {
  title: string;
  children?: React.ReactNode;
};

export const DocumentTitle = ({ title, children }: DocumentTitleProps) => {
  const previousTitle = useContext(Context);
  const nextTitle = title;
  useDocumentTitle(previousTitle, nextTitle);
  return <Context.Provider value={nextTitle}>{children}</Context.Provider>;
};
