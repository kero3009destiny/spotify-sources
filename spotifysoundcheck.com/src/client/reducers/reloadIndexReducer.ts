import { FORCE_RELOAD } from "../actions/forceReloadAction";

const initialState = 0

export default function reloadIndex(state = initialState, action: any) {
  if (action.type === FORCE_RELOAD) {
    return ++state;
  } else {
    return state;
  }
}
