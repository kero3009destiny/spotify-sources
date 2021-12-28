export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

type UserDataType = {
  id: number;
  role_id?: number;
};

// When using this action you must provide the user that is trying to change the user, as well as the user being changed
export const updateUser = (userData: UserDataType) => (dispatch: any) => {
  dispatch(updateUserStart());
  return fetch(`/api/users/${userData.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      user: userData
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => dispatch(updateUserSuccess(data)))
    .catch(err => dispatch(updateUserFailure(err)));
};

export const updateUserStart = () => ({
  type: UPDATE_USER_START
});

export const updateUserSuccess = (userData: any) => ({
  type: UPDATE_USER_SUCCESS,
  payload: {
    userData
  }
});

export const updateUserFailure = (error: any) => ({
  type: UPDATE_USER_FAILURE,
  payload: {
    error
  }
});
