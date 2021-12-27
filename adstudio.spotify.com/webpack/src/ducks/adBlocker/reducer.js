import { DETECT_AD_BLOCKER } from 'ducks/adBlocker/types';

export default function adBlocker(state = false, action) {
  if (action.type === DETECT_AD_BLOCKER) return action.payload;
  return state;
}
