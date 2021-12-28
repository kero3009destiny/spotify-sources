export const SET_FAB_FORM   = 'SET_FAB_FORM';

export function setFabForm(type:string) {
  return (dispatch:any) => {
    dispatch(setFabFormAction(type))
  }
}


export const setFabFormAction = (type:string) => ({
  type: SET_FAB_FORM,
  payload: {type: type}
});