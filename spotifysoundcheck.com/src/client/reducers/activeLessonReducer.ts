import { SET_ACTIVE_LESSON } from '../actions/activeLessonAction';

const activeLessonReducer = (state = '', action: any) => {
  switch (action.type) {
    case SET_ACTIVE_LESSON:
      return action.payload
    default:
      return state;
  }
}

export default activeLessonReducer;
