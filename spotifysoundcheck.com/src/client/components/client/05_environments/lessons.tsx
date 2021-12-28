import React, { useEffect, useState } from 'react';

import AdminBar from '../03_organisms/adminBar';
import GalleryCard from '../03_organisms/galleryCard';
import { Heading1 } from '../01_atoms/heading';
import LessonCard from '../03_organisms/lessonCard';
import Throbber from '../../common/01_atoms/throbber';
import { connect } from 'react-redux';
import { getGalleries } from '../../../actions/getGalleriesAction';
import { getLessons } from '../../../actions/lessonsActions';
import styled from 'styled-components';

const StyledWelcomeMessage = styled.div`
  background-color: var(--color-DODGER-BLUE);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 120px 50px 50px;
  min-height: 448px;
  margin-bottom: 96px;

  > * {
    width: 83.3%;
  }

  h1,
  p {
    color: var(--color-SNOW);
  }

  p {
    max-width: 700px;
  }

  @media (max-width: 1024px) {
    margin-bottom: 48px;
    padding: 120px 30px 50px;
    min-height: 0;

    & > * {
      width: 100%;
    }
  }
`;

const StyledLessonCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > * {
    width: 83.3%;
    margin-bottom: 68px;
  }

  @media (max-width: 1024px) {
    & > * {
      width: 100%;
      margin-bottom: 48px;
    }
  }
`;

interface ILessonProps {
  getLessonsData: (userID: string) => void;
  getGalleriesData: () => void;
  lessons: any;
  galleries: any;
  userID: string;
  isSpotifyLoading: boolean;
}

const Lessons = (props: ILessonProps) => {
  const controller = new AbortController();
  const signal = controller.signal;
  // First we make sure the user has authenticated & that we're done loading lessons
  if (props.isSpotifyLoading) {
    return <Throbber />;
  }

  const [userName, setUserName] = useState();
  useEffect(() => {
    // Get User Data
    fetch(`/api/user/${props.userID}`, { signal })
      .then(res => res.json())
      .then(userData => {
        if (typeof userData.user !== 'undefined') {
          setUserName(userData.user.first_name);
        }
      })
      .catch(err => {});
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (props.userID !== undefined) {
      // Get all of our lessons
      props.getLessonsData(props.userID);
      // Get all of our galleries
      props.getGalleriesData();
    }
  }, [props.userID]);

  const getLessonPrerequisites = (lessonID: string) => {
    // First grab the entire value of the relative lesson
    const relativeLesson = props.lessons.find((lesson: any) => lesson.lessonID === lessonID);
    // Next pull out our prerequisites
    // NOTE: If the lesson doesn't have prerequisite, the field won't exist. So we have to give it a default value
    const {
      fields: { prerequisite = [] }
    } = relativeLesson;

    return prerequisite
  }

  const checkIsLocked = (prerequisite: any[]) => {
    // Remove all prereqs which are completed
    // If the array is empty, that means all of our prereqs are completed and we'll return false (meaning the lesson is not locked)
    // If the array isn't empty, we'll return true (meaning the lesson is locked)
    if (prerequisite.length > 0) {
      // If the prequisite length is greater than zero, we need to grab each prereq's ID and check if it's completed in Redux
      // Now we map out each ID, grab the relative lesson from Redux, and filter out ones who's has_completed values === true
      const prerequisitesCompleted = prerequisite
        .map((id: string) => {
          return props.lessons.find((lesson: any) => lesson.lessonID === id);
        })
        .filter((pr: any) => pr.isCompleted !== true);

      // Then we'll return whether the length of our completed prereqs is 0.
      // If it's not zero, it means we have prereqs that aren't completed, and therefore returns true (true means it should be locked)
      // If it is zero, it means all of our prereqs are completed, and therefore returns false (false means it shouldn't be locked)
      return prerequisitesCompleted.length !== 0;
    }
    return false;
  };

  // This sorts our lesson
  // It sorts them first by their lesson numbers
  // Then it sorts them again by whether they're completed or not
  const sortedLessons = props.lessons;
  return (
    <>
      <AdminBar />
      <StyledWelcomeMessage>
        <div>
          <Heading1>Welcome, {userName}</Heading1>
          <p>
            Keep rollin&rsquo; through Spotify Soundcheck. Dive back in wherever
            you left off, or feel free to start a lesson over if you need a
            refresher.
          </p>
        </div>
      </StyledWelcomeMessage>
      <StyledLessonCardWrapper>
        {sortedLessons.map((lesson: any, index: number) => {
          return (
            <LessonCard
              isInverted={(index + 1) % 2 === 0}
              lesson={lesson}
              subtitle={`Lesson ${lesson.fields.lessonNumber}:`}
              key={lesson.lessonID}
              isLocked={checkIsLocked(getLessonPrerequisites(lesson.lessonID))}
              isLessonStarted={lesson.dbID !== null}
              userID={props.userID}
            />
          );
        })}
        {
          sortedLessons.length > 0 &&
          props.galleries.map((gallery: any, index: number) => (
            <GalleryCard
              key={index}
              title={gallery.title}
              subheader={gallery.subheader}
              smallCopy={gallery.smallCopy}
              isLocked={checkIsLocked(gallery.prerequisite)}
              id={gallery.id}
              palette={gallery.palette}
            />
          ))
        }

        {/* Present loader while lessons are loading */}
        {
          sortedLessons.length === 0 &&
          <Throbber />
        }
      </StyledLessonCardWrapper>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isSpotifyLoading: state.user.spotifyLoading,
  isLessonsLoading: state.lessons.loading,
  lessons: state.lessons.data,
  galleries: state.galleries.data,
  userID: state.user.user_id
});

const mapDispatchToProps = (dispatch: any) => ({
  getLessonsData: (userID: string) => dispatch(getLessons(userID)),
  getGalleriesData: () => dispatch(getGalleries())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lessons);
