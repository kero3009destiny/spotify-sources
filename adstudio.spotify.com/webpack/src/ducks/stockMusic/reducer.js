import * as types from 'ducks/stockMusic/types';

export default function stockMusic(state = [], action) {
  if (action.type === types.FETCH_STOCK_MUSIC_SUCCESS) return action.payload;
  return state;
}
