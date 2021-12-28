export const SET_ACTIVE_LESSON = 'SET_ACTIVE_LESSON';

// Set the ID of the active lesson
export const setActiveLesson = (activeLessonID: string) => ({
  type: SET_ACTIVE_LESSON,
  payload: activeLessonID
});
