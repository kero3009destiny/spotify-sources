import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { darken } from 'polished';
import Button from '../../common/01_atoms/button';
import Circle from '../../common/01_atoms/circle';
import { IPalette } from '../../common/types';

interface IStyledLessonBar {
  palette: any;
  isDisplayedOnMobile: boolean
}

const StyledLessonBar = styled.div<IStyledLessonBar>`
  width: 100%;
  background-color: ${(p) => darken(0.25, p.palette.background)};
  height: 68px;
  padding-left: 13px;
  padding-right: 30px;
  position: fixed;
  z-index: 10;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1024px) {
    justify-content: center;
    padding: 20px;
    height: auto;
    z-index: 10;
    position: fixed;
    bottom: 0;
    transform: translate3d(0, 100%, 0);
    transition: transform 0.3s ease;

    ${(p) => p.isDisplayedOnMobile && `
      transform: translate3d(0, 0, 0);
    `}
  }
`;

const StyledModules = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const StyledModuleTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  color: white;
  margin-right: 64px;
  line-height: 24px;
  font-size: 16px;
  svg {
    margin-right: 10px;
  }
`;

type IModuleArray = {
  title: string;
  id: string;
};

interface ILessonBarProps {
  modules: IModuleArray[];
  palette: IPalette;
  lessonID: string;
  nextModule: IModuleArray;
  isNextModuleAvailable: boolean;
  isLessonCompleted: boolean;
  isLastLesson: boolean;
  completedModules: Array<string>;
  currentModule: any;
  firstGalleryId: string;
  nextModuleFunc: any;
}

const LessonBar = (props: ILessonBarProps) => {
  const {
    modules,
    nextModule,
    palette,
    lessonID,
    isNextModuleAvailable,
    isLessonCompleted,
    isLastLesson,
    completedModules,
    currentModule,
    firstGalleryId,
    nextModuleFunc
  } = props;

  return (
    <StyledLessonBar
      palette={props.palette}
      isDisplayedOnMobile={isNextModuleAvailable || isLessonCompleted}
    >
      <StyledModules>
        {modules.map((mod, index) => (
          <StyledModuleTitle key={index}>
            <Circle
              isFilled={completedModules.indexOf(mod.id) > -1}
              isSemiFilled={mod.id === currentModule.id}
            />
            {mod.title}
          </StyledModuleTitle>
        ))}
      </StyledModules>
      {isNextModuleAvailable && !isLessonCompleted && (
        <div onClick={nextModuleFunc}>
          <Button
            to={`/lesson/${lessonID}/${nextModule.id}`}
            bgColor="black"
            fgColor={palette.foreground}
            label={`Next: ${nextModule.title}`}
          />
        </div>
      )}
      {isLessonCompleted && !isNextModuleAvailable && (
        <div>
          <Button
            to={(isLastLesson && firstGalleryId !== undefined)
              ? `/gallery/${firstGalleryId}`
              : `/lessons`}
            bgColor="black"
            fgColor={palette.foreground}
            label={isLastLesson ? `Let’s Get Creative` : `Return to Lessons`}
          />
        </div>
      )}
    </StyledLessonBar>
  );
};

const mapStateToProps = (state: any) => ({
  firstGalleryId: (state.galleries.data[0] !== undefined) && state.galleries.data[0].id
})

export default connect(mapStateToProps)(LessonBar);
