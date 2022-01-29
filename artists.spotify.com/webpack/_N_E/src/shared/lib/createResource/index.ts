// ignore-string-externalization
var Status;

(function (Status) {
  Status[Status["LOADING"] = 0] = "LOADING";
  Status[Status["LOADED"] = 1] = "LOADED";
  Status[Status["ERROR"] = 2] = "ERROR";
})(Status || (Status = {}));

function defaultGetKey(key) {
  return key;
}
/**
 * Creates a cache of fetch responses that works with react.Suspense.
 *
 * ## Why use?
 *  - it saves you from accidentally making multiple unnecessary requests
 *    for the same resouce
 *  - it (when used with Suspense) lets you write code that appears synchronous
 *    despite relying on an async server call. How? It throws a Promise whenever
 *    you try to use a resouce that's loading. This gets intercepted by Suspense,
 *    which displays a loading indicator. A contentious use of "throw", sure, but
 *    one that results in easier to read code.
 *
 * ## Usage
 *
 * type ALBUM_ID = string;
 *
 * // Create a Resource that wraps an async call to fetch
 * const albumsResource = createResource<ALBUM_ID, Album>((albumId: ALBUM_ID) =>
 *   webgateFetchJson(`${WEBGATE_DOMAIN}/foo/v0/album/${albumId}`)
 *       .then((response) => response.album));
 *
 * // Fetches the Album if a fetch isn't already in progress. Unlike albumsResource.read('my-album-id')),
 * // this will not throw an error. This doesn't return anything, but makes it more likely that the Album
 * // will be loaded when you later call albumsResource.read('my-album-id').
 * albumsResource.preload('my-album-id');
 *
 * // Fetch the album from the server if it's not been fetched previously, and return the album if a
 * // previous fetch successfully returned.
 * // THROWS Promise<Album> if the album is loading, or error if the fetch resulted in
 * //        an error.
 * // RETURNS the Album if the fetch successfully completed.
 * const album = albumsResource.read('my-album-id');
 *
 * // Invalidate the cached Album, error response, or in-flight fetch so that next time
 * // preload('my-album-id') or  albumsResource.read('my-album-id') is called, it will be fetched
 * // from the server again.
 * albumsResource.invalidate('my-album-id');
 *
 * ## FAQ
 * ### Why throw when a request is in-flight, instead of returning a promise?
 * A thrown Promise is intercepted by the Suspense library. You can find more details by searching
 * for "Wait - what?" here: https://medium.com/@baphemot/understanding-react-suspense-1c73b4b0b1e6
 *
 * ## What do I use for ID if I'm fetching a singleton resource (e.g. currentUser)?
 * Short answer: 0
 * Long answer: it doesn't matter, provided you consistently use the same value (since that's used
 *              as the cache key). By convention, we use 0 e.g. currentUserResource.read(0)
 *
 * Alternatively, you can specify 'void' as the ID type and don't worry about providing an ID, like so:
 *   const fooResource = createResource<void, Foo>(() => { ... });
 *   fooResource.preload();
 *   const foo = fooResource.read();
 *   fooResource.invalidate();
 */

/** @deprecated use react-query or SWR for data loading */


export function createResource(init) {
  var getKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultGetKey;
  var records = new Map();

  function getRecord(source) {
    var key = getKey(source);
    var record = records.get(key);

    if (record === undefined) {
      records.set(key, record = {});
    }

    if (record.status === undefined) {
      record.status = Status.LOADING;
      record.value = init(source).then(function (value) {
        record.status = Status.LOADED;
        record.value = value;
      }, function (error) {
        record.status = Status.ERROR;
        record.value = error;
      });
    }

    return record;
  }

  function preload(source) {
    var record = getRecord(source);
    return record.status === Status.LOADING ? record.value : Promise.resolve();
  }

  function read(source) {
    var record = getRecord(source);

    switch (record.status) {
      case Status.LOADING:
        throw record.value;

      case Status.LOADED:
        return record.value;

      case Status.ERROR:
        throw record.value;

      default:
        throw new Error('bad record');
    }
  }

  function invalidate(source) {
    records.delete(getKey(source));
  }

  return {
    preload: preload,
    read: read,
    invalidate: invalidate
  };
}