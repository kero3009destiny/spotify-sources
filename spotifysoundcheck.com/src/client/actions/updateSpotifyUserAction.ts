
export const UPDATE_SPOTIFY_ACCESS_BEGIN   = 'FETCH_USER_AUTH_BEGIN';
export const UPDATE_SPOTIFY_ACCESS_SUCCESS = 'FETCH_USER_AUTH_SUCCESS';
export const UPDATE_SPOTIFY_ACCESS_FAILURE = 'FETCH_USER_AUTH_FAILURE';

export function updateSpotifyAccess(refreshToken:string) {
  return (dispatch:any) => {
    dispatch(updateSpotifyAccessBegin())
    fetch(`/api/refreshtoken/${refreshToken}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.access_token) {
        dispatch(updateSpotifyAccessSuccess(data.access_token))
      } else {
        dispatch(updateSpotifyAccessFailure(data.message))
      }
    })
    .catch((err) => {
      dispatch(updateSpotifyAccessFailure(err.message))
    })
  }
}


export const updateSpotifyAccessBegin = () => ({
  type: UPDATE_SPOTIFY_ACCESS_BEGIN
})

export const updateSpotifyAccessSuccess = (token:string) => ({
  type: UPDATE_SPOTIFY_ACCESS_SUCCESS,
  payload: {
    access_token: token
  }
})

export const updateSpotifyAccessFailure = (error:any) => ({
  type: UPDATE_SPOTIFY_ACCESS_FAILURE,
  payload: { error }
})