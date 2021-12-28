import { useEffect, useState } from 'react';
import get from 'lodash/get';

import { FILE_EXTENSIONS } from 'constants/file-extensions';

/**
 * Hook to verify browser support regarding webp
 * @returns {Object} { fileExt, queryUrl }
 */

const useImageSupport = () => {
  const initState =
    process.env.NODE_ENV !== 'test' ? null : FILE_EXTENSIONS.JPG;

  const [fileExt, setFIleExt] = useState(initState);

  useEffect(() => {
    const ext = get(document, 'documentElement.classList', []).contains(
      FILE_EXTENSIONS.WEBP,
    )
      ? FILE_EXTENSIONS.WEBP
      : FILE_EXTENSIONS.JPG;

    setFIleExt(ext);
  }, []);

  return {
    fileExt,
    queryUrl: fileExt === FILE_EXTENSIONS.WEBP ? `webpUrl` : 'optimizedUrl',
  };
};

export default useImageSupport;
