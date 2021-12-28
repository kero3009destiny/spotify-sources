import {
  LOADING_BEGIN,
  LOADING_FAILED,
  LOADING_FINISHED
} from '../actions/contentLoadingAction';


export default function contentLoadingReducer(state = {loading: false}, action:any) {
  switch(action.type) {
    case LOADING_BEGIN:
      return {
        loading: true
      }
      break;
    case LOADING_FAILED:
    case LOADING_FINISHED:
      return {
        loading: false
      }
      break;
    default:
      return state;
  }
}
