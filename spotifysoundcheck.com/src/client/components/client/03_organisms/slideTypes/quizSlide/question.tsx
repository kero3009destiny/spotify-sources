import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { IPalette } from '../../../../common/types';
import Draggable from 'react-draggable';
import { Heading4 } from '../../../01_atoms/heading';
import { ExtraSmallText, SmallText } from '../../../../common/01_atoms/text';
interface IStyledQuestionProps {
  palette: IPalette;
}

const StyledQuestion = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: var(--color-SNOW);
`;

const StyledDragBox = styled.div`
  background-color: ${(props: IStyledQuestionProps) => props.palette.foreground};
  max-width: 30vw;
  min-height: 30vh;
  justify-content: space-evenly;
  padding: 40px 50px;
  border-radius: 24px;
  overflow: hidden;
  cursor: grab;
  display: flex;
  flex-flow: column nowrap;

  ${Heading4} {
    flex-grow: 1;
  }

  &.react-draggable-dragging {
    cursor: grabbing;
  }
`

const StyledDragText = styled.p`
  font-size: 18px;
  font-weight: 700;
  line-height: 1em;
  text-align: center;
  margin-top: 1em;
`

interface IQuestionProps {
  question: string;
  palette: IPalette;
  questionNumber: number;
  totalQuestions: number;
  totalAnswers: number
  selectedCallback: (index:number) => void
  hoverCallback: (index:number) => void
}

const Question = (props: IQuestionProps) => {
  const [dragDelta, setDragDelta] = useState({x: 0, y: 0});
  const dragRef = useRef<HTMLDivElement>(null);
  const centerPadding = 100;
  const travelDistance = 400;
  const selectedBufferTime = 300;

  const dragPositionSelected = (e?:any) => {
    if (props.totalAnswers === 4) {
      fourGrid(e, false);
    } else {
      splitGrid(e, false);
    }
  }

  const dragPosition = (e?:any) => {
    if (props.totalAnswers === 4) {
      fourGrid(e, true);
    } else {
      splitGrid(e, true);
    }
  }

  const splitGrid = (e:any, realtime: boolean) => {
    // left
    if (e.x < (centerPadding * -1)) {
      if (!realtime) {
        setDragDelta({x: e.x + -travelDistance, y: 0});
        setSelectedTransition();
        setTimeout(() => props.selectedCallback(0), selectedBufferTime);
      return;
      } else {
        props.hoverCallback(0);
      }
    }
    // right
    if (e.x > centerPadding) {
      if (!realtime) {
        setDragDelta({x: e.x + travelDistance, y: 0});
        setSelectedTransition();
        setTimeout(() => props.selectedCallback(1), selectedBufferTime);
        return;
      } else {
        props.hoverCallback(1);
      }
    }
    if (!realtime) {
      // inside center padding bounces back to middle.
      setDragDelta({x: 0, y: 0});
      setReturnTransition();
    }
  }
  // realtime for on drag event vs on drag stop
  const fourGrid = (e:any, realtime: boolean) => {
    // top left
    if (e.x < (centerPadding * -1) && e.y < (centerPadding * -1)) {
      if (!realtime) {
        setDragDelta({x: e.x + -travelDistance, y: e.y + -travelDistance});
        setSelectedTransition();
        setTimeout(() => props.selectedCallback(0), selectedBufferTime);
        return;
      } else {
        props.hoverCallback(0);
      }
    }
    // top right
    if (e.x > centerPadding && e.y < (centerPadding * -1)) {
      if (!realtime) {
        setDragDelta({x: e.x + travelDistance, y: e.y + -travelDistance});
        setSelectedTransition();
        setTimeout(() => props.selectedCallback(1), selectedBufferTime);
        return;
      } else {
        props.hoverCallback(1);
      }

    }
    // bottom left
    if (e.x < (centerPadding * -1) && e.y > centerPadding) {
      if (!realtime) {
        setDragDelta({x: e.x + -travelDistance, y: e.y + travelDistance});
        setSelectedTransition();
        setTimeout(() => props.selectedCallback(2), selectedBufferTime);
        return;
      } else {
        props.hoverCallback(2);
      }
    }
    // bottom right
    if (e.x > centerPadding && e.y > centerPadding) {
      if (!realtime) {
        setDragDelta({x: e.x + travelDistance, y: e.y + travelDistance});
        setSelectedTransition();
        setTimeout(() => props.selectedCallback(3), selectedBufferTime);
        return;
      } else {
        props.hoverCallback(3);
      }
    }
    if (!realtime) {
      // inside center padding bounces back to middle.
      setDragDelta({x: 0, y: 0});
      setReturnTransition();
    }
  }

  // snap back to center
  const setReturnTransition = () => {
    //@ts-ignore
    dragRef.current.style.transition = 'all .4s';
    setTimeout(() => {
      //@ts-ignore
      dragRef.current.style.transition = 'unset';
    }, 400);
  }

  // push the element to the edges while also giving it a rotational effect
  const setSelectedTransition = () => {
    const dragEl = dragRef.current;
    //@ts-ignore
    dragEl.style.opacity = 0;
    //@ts-ignore
    dragEl.style.transform += ` rotate(${Math.random() * 90}deg)`;
    //@ts-ignore
    dragEl.style.transition = 'all .4s';
    setTimeout(() => {
      //@ts-ignore
      dragRef.current.style.transition = 'unset';
    }, 400);
  }

  return (
    <StyledQuestion>
      <Draggable
        onStop={(e, data) => dragPositionSelected(data)}
        onDrag={(e, data) => dragPosition(data)}
        position={dragDelta}
      >
        <StyledDragBox ref={dragRef} palette={props.palette}>
          <SmallText><strong>{props.questionNumber + 1} of {props.totalQuestions}</strong></SmallText>
          <Heading4 as="h3">{props.question}</Heading4>
          <StyledDragText><strong>Drag this card to select your answer</strong></StyledDragText>
        </StyledDragBox>
      </Draggable>
    </StyledQuestion>
  );
};

export default Question;
