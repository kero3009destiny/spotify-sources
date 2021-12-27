import React, { useEffect, useState, ReactNode } from 'react';

const BrowserOnly = ({ children }: { children: ReactNode }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return <>{!!isBrowser && children}</>;
};

export default BrowserOnly;
