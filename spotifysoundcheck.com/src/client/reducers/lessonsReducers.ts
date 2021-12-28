import {
  FETCH_LESSONS_BEGIN,
  FETCH_LESSONS_SUCCESS,
  FETCH_LESSONS_FAILURE,
  FETCH_LESSON_MODULE_BEGIN,
  FETCH_LESSON_MODULE_SUCCESS,
  FETCH_LESSON_MODULE_FAILURE,
  SET_LESSON_COLOR_PALETTE
} from '../actions/lessonsActions';

import {
  SET_LESSON_COMPLETE_START,
  SET_LESSON_COMPLETE_SUCCESS,
  SET_LESSON_COMPLETE_FAILURE
} from '../actions/lessonCompleteAction';

import {
  SET_MODULE_COMPLETE_START,
  SET_MODULE_COMPLETE_SUCCESS,
  SET_MODULE_COMPLETE_FAILURE
} from '../actions/moduleCompleteAction';

import store from 'store';

type LessonType = {
  loading: boolean;
  error: any;
  data: any;
};

const initialState: LessonType = {
  loading: false,
  error: null,
  data: []
};

const lessonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_LESSONS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_LESSONS_SUCCESS:
      store.set('lessons', action.payload.data);
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null
      };
    case FETCH_LESSONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case FETCH_LESSON_MODULE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_LESSON_MODULE_SUCCESS:
      // Grab the relative lesson so we can update it
      const relativeLessonIndex = state.data
        .map((lesson: any) => lesson.lessonID)
        .indexOf(action.payload.lessonID);
      // Make sure it exists in our current state
      if (relativeLessonIndex > -1) {
        const relativeLesson = state.data[relativeLessonIndex];
        const relativeModuleIndex = relativeLesson.fields.modules
          .map((module: any) => module.id)
          .indexOf(action.payload.data.id);
        const updatedLesson = {
          ...relativeLesson,
          fields: {
            ...relativeLesson.fields,
            modules: [
              ...relativeLesson.fields.modules.slice(0, relativeModuleIndex),
              action.payload.data,
              ...relativeLesson.fields.modules.slice(
                relativeModuleIndex + 1,
                relativeLesson.fields.modules.length
              )
            ]
          }
        };
        const updatedData = [
          ...state.data.slice(0, relativeLessonIndex),
          updatedLesson,
          ...state.data.slice(relativeLessonIndex + 1, state.data.length)
        ];
        store.set('lessons', updatedData);
        return {
          ...state,
          data: updatedData,
          loading: false,
          error: null
        };
      }
    case FETCH_LESSON_MODULE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case SET_LESSON_COLOR_PALETTE:
      return {
        ...state,
        ...action.payload
      };
    // TODO: Add state change for the isCompleted key and then modify the lessonBar prop completedModules to completely look at redux
    case SET_LESSON_COMPLETE_START:
    case SET_LESSON_COMPLETE_SUCCESS:
    case SET_LESSON_COMPLETE_FAILURE:
    case SET_MODULE_COMPLETE_START:
    case SET_MODULE_COMPLETE_SUCCESS:
    case SET_MODULE_COMPLETE_FAILURE:
    default:
      return state;
  }
};

export default lessonReducer;
