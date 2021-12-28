/**
 * Returns a URL object with current `hostName` and `pathName` properties.
 * @returns {Object}
 */
const getURL = ({ req, path } = {}) => {
  const URL = {
    hostName: null,
    pathName: null,
  };

  if (req) {
    // Server rendered
    URL.hostName = `${req.protocol}://${req.headers.host}`;
    URL.pathName = req.originalUrl;
  } else {
    // Client rendered
    const { protocol, host, pathname } = window.location;

    URL.hostName = `${protocol}//${host}`;
    URL.pathName = path || pathname;
  }

  return URL;
};

export default getURL;
