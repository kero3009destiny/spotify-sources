export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';


export function openModal(open:boolean, which?:string, id?: string) {
  return (dispatch:any) => {
    if (open) {
      return dispatch(openModalAction(open, which, id))
    } else {
      return dispatch(closeModalAction(open))
    }
  }
}


export const openModalAction = (open:boolean, which?:string, id?: string) => ({
  type: OPEN_MODAL,
  payload: {open, which, id}
});

export const closeModalAction = (open:boolean) => ({
  type: CLOSE_MODAL,
  payload: {open}
});