import { useEffect, useState } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    const isMobileOnMount =
      navigator.userAgent.toLowerCase().indexOf('mobile') > -1;

    setIsMobile(isMobileOnMount);
  }, []);

  return isMobile;
};

export default useIsMobile;
