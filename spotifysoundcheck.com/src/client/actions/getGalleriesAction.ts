export const FETCH_GALLERIES_BEGIN = 'FETCH_GALLERIES_BEGIN';
export const FETCH_GALLERIES_SUCCESS = 'FETCH_GALLERIES_SUCCESS';
export const FETCH_GALLERIES_FAILURE = 'FETCH_GALLERIES_FAILURE';

// get galleries from the api
export const getGalleries = () => (dispatch: any) => {
  dispatch(fetchGalleriesBegin());
  return fetch(`/api/galleries`)
    .then(res => res.json())
    .then(galleries => {
      if (galleries.error != undefined) {
        dispatch(fetchGalleriesFailure(galleries.error));
      } else {
        dispatch(fetchGalleriesSuccess(galleries))
      }
    })
    .catch(err => dispatch(fetchGalleriesFailure(err)));
};

export const fetchGalleriesBegin = () => ({
  type: FETCH_GALLERIES_BEGIN
})

export const fetchGalleriesSuccess = (galleries: any) => ({
  type: FETCH_GALLERIES_SUCCESS,
  payload: {
    data: galleries
  }
});

export const fetchGalleriesFailure = (error: any) => ({
  type: FETCH_GALLERIES_FAILURE,
  payload: {
    error
  }
});

