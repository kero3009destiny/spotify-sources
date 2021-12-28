import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../actions/modalAction';

type ModalType = {
  open: boolean
  which: string
}

const initialState:ModalType = {
  open: false,
  which: 'fab'
}

export default function modalReducer(state = initialState, action:any) {
  switch(action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        ...action.payload
      }
      break;
    case CLOSE_MODAL:
      return {
        ...state,
        ...action.payload
      }
      break;
    default:
      return state;
  }
}