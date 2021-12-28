import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import store from 'store';
import { darken } from 'polished';
import Sound from 'react-sound';

import { getLessonModule, fetchLessonsSuccess, getLessons, setLessonStarted } from '../../../actions/lessonsActions';
import { setActiveLesson } from '../../../actions/activeLessonAction';
import { setUserAuth } from '../../../actions/setUserAction';
import {
  setGlobalTrackStopped,
  setGlobalTrackDuration
} from '../../../actions/globalTrackActions';
import { setModuleComplete } from '../../../actions/moduleCompleteAction';
import { setLessonComplete } from '../../../actions/lessonCompleteAction';

import {
  setGlobalVoiceOverStopped,
  setGlobalVoiceOverDuration
} from '../../../actions/globalVoiceOverActions';

import AdminBar from '../03_organisms/adminBar';
import Throbber from '../../common/01_atoms/throbber';
import LessonBar from '../03_organisms/lessonBar';
import LessonIntro from '../04_ecosystem/lessonIntro';
// TODO: Delete module.tsx and rename modulev2.tsx -> module.tsx
import Module from '../04_ecosystem/module';

interface ILessonProps {
  match: {
    params: {
      lessonID: string;
      moduleID?: string;
    };
  };
  userID: number;
  lessons: any;
  isLessonsLoading: boolean;
  activeLessonID: string;
  globalTrack: any;
  globalVoiceOver: any;
  colorPaletteOverride: any | null;
  getLessonsData: (userID: number) => void;
  updateLessons: (lessons: any) => void;
  updateActiveLesson: (lessonID: string) => void;
  getModuleData: (lessonID: string, moduleID: string, userID: number) => void;
  getUser: () => void;
  setTrackDuration: (duration: number) => void;
  setVODuration: (duration: number | null) => void;
  updateLessonStarted: (lessonID: string, userID: number) => void;
  updateLessonComplete: (lessonID: string, userID: number) => void;
  updateModuleComplete: (lessonID: string, moduleID: string, userID: number) => Promise<void>;
}

const Lesson = (props: ILessonProps) => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(0);
  const [isAdminBarShown, setAdminBarShown] = useState<boolean>(true);
  const [isLessonBarShown, setLessonBarShown] = useState<boolean>(true);
  const [isLastModule, setLastModule] = useState<boolean>(false);
  const [isLastLesson, setLastLesson] = useState<boolean>(false);
  const [isCurrentModuleComplete, setCurrentModuleComplete] = useState<boolean>(false);
  const [isLessonComplete, setLessonComplete] = useState<boolean>(false);
  const [completedModules, setCompletedModules] = useState<Array<string>>([]);

  // NOTE: For use with fade-in/fade-out of track & vo
  // // Track volume
  // const [trackVolume, setTrackVolume] = useState<number>(props.globalTrack.volume);
  // // Track audio state
  // const [trackPlayStatus, setTrackPlayStatus] = useState<string>(props.globalTrack.status);

  useEffect(() => {
    // The DB can't be notified that we've completed a module without knowing
    // that we've started the module's lesson:
    if (props.userID !== undefined) {
      props.updateLessonStarted(props.match.params.lessonID, props.userID);
    }
  }, [props.match.params.lessonID, props.userID])

  // This is intentionally not managed by state so that it always matches redux
  const lesson = props.lessons.find(
    (lesson: any) => lesson.lessonID === props.match.params.lessonID
  );

  useEffect(() => {
    if (props.lessons.length > 0&& props.lessons[props.lessons.length -1].lessonID === props.activeLessonID) {
      setLastLesson(true)
    }
  }, [props.lessons])

  const currentModule =
    lesson !== undefined && props.match.params.moduleID !== undefined
      ? lesson.fields.modules[currentModuleIndex]
      : null;

  useEffect(() => {
    // We want to tell Redux that we're currently on this lesson (for other components to access)
    props.updateActiveLesson(props.match.params.lessonID);
    // We need to make sure lessons are in redux
    // If they aren't, we need to try to grab them from local storage
    if (props.lessons.length === 0) {
      const localStorageLessons = store.get('lessons');
      if (localStorageLessons.length > 0) {
        // If the local storage lessons exist, we want to let redux know about them
        props.updateLessons(localStorageLessons);
      } else {
        // Otherwise we need to just fetch it from contentful
        props.getLessonsData(props.userID);
      }
    }
    if (props.userID === undefined) {
      props.getUser();
    }
  }, []);

  useEffect(() => {
    if (lesson !== undefined) {
      // This may have duplicates, but for now that's alright because the LessonBar (only component using this) doesn't need the items to be unique
      setCompletedModules((prevState: any) => [
        ...prevState,
        ...lesson.fields.modules.filter((mod: any) => mod.isCompleted && mod.id !== lesson.fields.modules[currentModuleIndex].id).map((mod: any) => mod.id)
      ]);
      // When a current module is completed, we want to add it to the list of completed modules
      if (isCurrentModuleComplete) {
        setCompletedModules((prevState: any) => [
          ...prevState,
          lesson.fields.modules[currentModuleIndex].id
        ]);
      }
    }
  }, [isCurrentModuleComplete, lesson]);

  useEffect(() => {
    const {
      userID,
      match: {
        params: { moduleID, lessonID }
      }
    } = props;
    if (userID !== undefined && moduleID !== undefined && lessonID !== undefined) {
      props.getModuleData(lessonID, moduleID, userID);
    }
  }, [currentModuleIndex, props.userID]);

  useEffect(() => {
    if (lesson !== undefined) {
      // Updating current module index if match params props don't match the id  of the currentmoduleindex
      if (
        props.match.params.moduleID !== undefined &&
        currentModule.id !== props.match.params.moduleID
      ) {
        setCurrentModuleIndex(
          lesson.fields.modules.map((mod: any) => mod.id).indexOf(props.match.params.moduleID)
        );
      }
      // Establish final module
      if (lesson.fields.modules[currentModuleIndex + 1] === undefined) {
        setLastModule(true);
      }
    }
  }, [currentModuleIndex, currentModule]);

  useEffect(() => {
    if (isLessonComplete) {
      props.updateLessonComplete(lesson.lessonID, props.userID);
    }
  }, [isLessonComplete])

  useEffect(() => {
    if (isCurrentModuleComplete) {
      props.updateModuleComplete(lesson.lessonID, currentModule.id, props.userID)
        // When the module is completed we want to let the DB know
        .then(() => {
          if (isLastModule) {
            setLessonComplete(true);
          }
        });
    }
  }, [isCurrentModuleComplete, isLastModule]);

  // NOTE: These are inteceptor functions for creating a fade-in/fade-out effect with the VO & Tracks
  // For this to work you have to enable the track/vo related state, enable these below
  // TODO: Figure out a way to efficiently clear interval because it's causing re-rendering issues
  // const volumeFadeIn = (startInteger: number, endInteger: number, delay: number = 100) => {
  //   let currentVolume = startInteger;
  //   const endingVolume = endInteger;
  //   const volumeIncrease = () => {
  //     if (currentVolume < endingVolume) {
  //       currentVolume++;
  //       setTrackVolume(() => currentVolume);
  //     }
  //   }
  //   setInterval(volumeIncrease, delay)
  // }

  // const volumeFadeOut = (startInteger: number, endInteger: number, delay: number = 100, callbackOnComplete: any) => {
  //   let currentVolume = startInteger;
  //   const endingVolume = endInteger;
  //   const volumeIncrease = () => {
  //     if (currentVolume > endingVolume) {
  //       currentVolume--;
  //       setTrackVolume(() => currentVolume);
  //     }
  //     if (currentVolume === endingVolume) {
  //       callbackOnComplete();
  //     }
  //   }
  //   setInterval(volumeIncrease, delay)
  // }

  // useEffect(() => {
  //   // Effect for fading in the volume
  //   if (props.globalTrack.volume > trackVolume) {
  //     volumeFadeIn(trackVolume, props.globalTrack.volume, 100)
  //   }
  //   // Effect for fading out the track
  //   if (trackPlayStatus === 'PLAYING' && props.globalTrack.status === 'STOPPED') {
  //     volumeFadeOut(trackVolume, 0, 10, () => setTrackPlayStatus('STOPPED'));
  //   }
  //   if (trackPlayStatus === 'STOPPED' && props.globalTrack.status !== 'STOPPED') {
  //     setTrackPlayStatus(props.globalTrack.status);
  //   }
  // }, [props.globalTrack.volume, props.globalTrack.status]);

  // If our lessons our loading, return a Throbber
  if (props.isLessonsLoading) {
    return <Throbber />;
  }

  // Function for moving to our next module
  const handleNextModuleFunc = () => {
    if (!isLastModule) {
      setCurrentModuleComplete(false);
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  return (
    lesson !== undefined &&
    props.userID !== undefined && (
      <>
        {isAdminBarShown && (
          <AdminBar
            theme={{
              background: darken(
                0.25,
                (props.colorPaletteOverride && props.colorPaletteOverride.background) ||
                lesson.fields.palette.background
              )
            }}
          />
        )}
        {props.match.params.moduleID === undefined ? (
          <LessonIntro lesson={lesson} isLoading={props.isLessonsLoading} />
        ) : (
          currentModule !== null &&
          currentModule.slides !== undefined && (
            <Module
              currentModule={currentModule}
              key={currentModuleIndex}
              onModuleComplete={() => setCurrentModuleComplete(true)}
              setAdminBarShown={setAdminBarShown}
              setLessonBarShown={setLessonBarShown}
            />
          )
        )}
        {isLessonBarShown && props.match.params.moduleID !== undefined && (
          <LessonBar
            modules={lesson.fields.modules}
            nextModule={lesson.fields.modules[currentModuleIndex + 1]}
            nextModuleFunc={handleNextModuleFunc}
            lessonID={lesson.lessonID}
            palette={props.colorPaletteOverride || lesson.fields.palette}
            isNextModuleAvailable={
              isCurrentModuleComplete && lesson.fields.modules[currentModuleIndex + 1] !== undefined
            }
            isLessonCompleted={isLessonComplete}
            completedModules={completedModules}
            currentModule={lesson.fields.modules[currentModuleIndex]}
            isLastLesson={isLastLesson}
          />
        )}
        {props.globalVoiceOver.url.length > 0 && (
          <Sound
            url={props.globalVoiceOver.url}
            playStatus={props.globalVoiceOver.status}
            volume={props.globalVoiceOver.volume}
            onLoading={(loadingObject: any) => props.setVODuration(loadingObject.duration)}
          />
        )}
        {/* {props.globalTrack.url.length > 0 && (
          <Sound
            url={props.globalTrack.url}
            playStatus={props.globalTrack.status}
            volume={props.globalTrack.volume}
            onLoading={(loadingObject: any) => props.setTrackDuration(loadingObject.duration)}
          />
        )} */}
      </>
    )
  );
};

const mapStateToProps = (state: any) => ({
  lessons: state.lessons.data,
  isLessonsLoading: state.lessons.loading,
  activeLessonID: state.activeLesson,
  userID: state.user.user_id,
  globalVoiceOver: state.globalVoiceOver,
  globalTrack: state.globalTrack,
  colorPaletteOverride: state.lessons.activeColorPalette
});

const mapDispatchToProps = (dispatch: any) => ({
  updateLessons: (lessons: any) => dispatch(fetchLessonsSuccess(lessons)),
  getLessonsData: (userID: string) => dispatch(getLessons(userID)),
  updateActiveLesson: (lessonID: string) => dispatch(setActiveLesson(lessonID)),
  getModuleData: (lessonID: string, moduleID: string, userID: number) =>
    dispatch(getLessonModule(lessonID, moduleID, userID)),
  getUser: () => dispatch(setUserAuth()),
  stopTrack: () => dispatch(setGlobalTrackStopped()),
  stopVO: () => dispatch(setGlobalVoiceOverStopped()),
  setTrackDuration: (duration: number) => dispatch(setGlobalTrackDuration(duration)),
  setVODuration: (duration: number | null) => dispatch(setGlobalVoiceOverDuration(duration)),
  updateModuleComplete: (lessonID: string, moduleID: string, userID: number) => dispatch(setModuleComplete(lessonID, moduleID, userID)),
  updateLessonStarted: (lessonID: string, userID: number) => dispatch(setLessonStarted(lessonID, userID)),
  updateLessonComplete: (lessonID: string, userID: number) => dispatch(setLessonComplete(lessonID, userID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lesson);
