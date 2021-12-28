import { ExtraSmallTextStyles, NormalTextStyles } from '../../common/01_atoms/text';
import { Heading1Styles, Heading2Styles } from '../01_atoms/heading';

import BookIcon from '../../../../static/images/icons/book.svg';
import Button from '../../common/01_atoms/button';
import Cookie from 'js-cookie';
import PieIcon from '../../../../static/images/icons/progress.svg';
import React from 'react';
import Timeline from '../02_molecules/timeline';
import styled from 'styled-components';

type TLesson = {
  lessonID: string;
  fields: {
    title: string;
    palette: any;
    cardBackground: any;
    modules: any;
    estimatedTime: string;
  };
  isCompleted: boolean;
  completedModules: Array<any>;
};

interface ILessonCardProps {
  lesson: TLesson;
  isLocked: boolean;
  subtitle?: string;
  isInverted?: boolean;
  isLessonStarted: boolean;
  userID: string;
}

interface IStyledWrapper {
  bgImage: string;
  fgColor: string;
  bgColor: string;
  isMinimal: boolean;
}

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-image: ${(p: IStyledWrapper) => (p.isMinimal ? 'none' : `url(${p.bgImage})`)};
  background-color: ${(p: IStyledWrapper) => p.bgColor};
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: contain;
  padding: 30px;

  @media (min-width: 1025px) {
    padding: 96px 119px;
    border-radius: 20px;
    flex-direction: ${(p: IStyledWrapper) => (p.isMinimal ? 'row' : 'column')};
  }
`;

interface IStyledLessonTitle {
  fgColor: string;
  bgColor?: string;
}

const StyledHeading = styled.h2<IStyledLessonTitle>`
  ${Heading1Styles};
  color: ${p => p.fgColor};
  text-shadow: 0 0 2px ${(p: IStyledLessonTitle) => p.bgColor};

  @media (min-width: 1025px) {
    ${Heading2Styles};
  }
`

const StyledLessonTitle = styled.h3`
  ${NormalTextStyles};

  color: ${(p: IStyledLessonTitle) => p.fgColor};
  text-shadow: 0 0 2px ${(p: IStyledLessonTitle) => p.bgColor};
  margin-bottom: 0;
`;

const StyledContentWrapper = styled.div`
  width: 83.3%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const StyledText = styled.p`
  ${ExtraSmallTextStyles};

  color: var(--color-SNOW);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;

  img {
    margin-right: 8px;
    color: var(--color-SNOW);
  }
`;

const StyledTimelineContainer = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
`;

interface IStyledMinimalProps {
  isMinimal: boolean;
}

const StyledButtonContainer = styled.div`
  margin-top: 2.5em;

  @media (min-width: 1024px) {
    margin-top: ${(p: IStyledMinimalProps) => (p.isMinimal ? '0' : '2.5em')};
  }
`;

const StyledCourseInformation = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${(p: IStyledMinimalProps) => (p.isMinimal ? '0' : '34px')};
  flex-wrap: wrap;

  > * {
    margin-right: 32px;
  }
`;

const LessonCard = (props: ILessonCardProps) => {
  const { lessonID, fields, isCompleted, completedModules = [] } = props.lesson;
  const { title, palette, cardBackground, modules, estimatedTime } = fields;

  // Get the appropriate label for the button
  const getLabel = () => {
    // If the card is locked, we know they need to complete the previous course
    if (props.isLocked) {
      return 'COMPLETE PREVIOUS COURSE';
      // Otherwise we check if it's completed
    } else if (isCompleted && completedModules.length > 0) {
      return 'RESUME COURSE';
    } else if (isCompleted) {
      return 'Retake Course';
      // Otherwise we check if the lesson has been started
    } else if (props.isLessonStarted) {
      return 'RESUME COURSE';
      // If it's none of the above, we know they haven't taken it
    } else {
      return 'BEGIN COURSE';
    }
  };

  // Get the appropriate link for the button
  const getButtonHref = () => {
    // We just need to make sure that there's no lesson's started
    if (completedModules.length === 0) {
      return `/lesson/${lessonID}`;
    } else {
      // Otherwise, we know they've started the lesson and have at least completed some modules
      // In turn, we need to take them to the first module they haven't completed
      // We're going to loop through the completedModules first
      const firstIncompleteModuleID = modules
        .map((mod: any) => mod.id)
        .find((mod: any) => completedModules.indexOf(mod) === -1);
      // In some rare cases, the modules are all completed, but the lesson isn't registered as "completed".
      // We know this is the case if this variable (firstIncompleteModuleID) is returned as undefined
      // If that's the case, we need to update the lesson
      if (firstIncompleteModuleID === undefined) {
        fetch(`/api/lesson/${props.lesson.lessonID}`, {
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify({
            userID: props.userID,
            isCompleted: true
          }),
          headers: {
            'Content-Type': 'application/json',
            'CSRF-TOKEN': Cookie.get('XSRF-TOKEN')
          }
        });

        // send to homepage if no incompleted module id is found
        return `/lesson/${lessonID}`;
      }
      return `/lesson/${lessonID}/${firstIncompleteModuleID}`;
    }
  };

  return (
    <StyledWrapper
      bgImage={cardBackground.url}
      fgColor={palette.foreground}
      bgColor={palette.background}
      isMinimal={isCompleted}
    >
      <StyledContentWrapper>
        {props.subtitle !== undefined && (
          <StyledLessonTitle fgColor={palette.foreground} bgColor={palette.background}>{props.subtitle}</StyledLessonTitle>
        )}
        <StyledHeading fgColor={palette.foreground} bgColor={palette.background}>{title}</StyledHeading>
        <StyledCourseInformation isMinimal={isCompleted}>
          <StyledText>
            <img src={BookIcon} />
            <strong>Total sections</strong>: {modules.length}
          </StyledText>
          <StyledText>
            <img src={PieIcon} />
            <strong>Estimated time</strong>: {`${estimatedTime}m`}
          </StyledText>
        </StyledCourseInformation>
      </StyledContentWrapper>
      {completedModules.length > 0 && !isCompleted && (
        <StyledTimelineContainer>
          <Timeline total={modules.length} filled={completedModules.length} />
        </StyledTimelineContainer>
      )}
      <StyledButtonContainer isMinimal={isCompleted}>
        <Button
          to={props.isLocked ? '' : getButtonHref()}
          fgColor={palette.foreground}
          bgColor={palette.background}
          isLocked={props.isLocked}
          label={getLabel()}
        />
      </StyledButtonContainer>
    </StyledWrapper>
  );
};

export default LessonCard;
