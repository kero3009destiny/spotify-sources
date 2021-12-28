import {
  FETCH_GALLERIES_BEGIN,
  FETCH_GALLERIES_SUCCESS,
  FETCH_GALLERIES_FAILURE
} from '../actions/getGalleriesAction';
import store from 'store';

type GalleryType = {
  loading: boolean;
  error: any;
  data: any;
}

const initialState: GalleryType = {
  loading: false,
  error: null,
  data: []
}

const galleriesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_GALLERIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_GALLERIES_SUCCESS:
      store.set('galleries', action.payload.data);
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null
      }
    case FETCH_GALLERIES_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    default:
      return state;
  }
}

export default galleriesReducer;
