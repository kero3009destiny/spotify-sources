import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { IPalette } from '../../../../common/types';

interface IStyledAnswerProps {
  id: number;
  isCorrect: boolean;
  isSelected: boolean;
  palette: IPalette;
  isHover: boolean;
  animationTime: number;
}

const getPadding = ({ id, isSelected }: IStyledAnswerProps) => {
  if (isSelected) return null;
  switch (id) {
    case 1: return '56px calc(15vw + 48px) 0 48px';
    case 2: return '56px 48px 0 calc(15vw + 48px)';
    case 3: return '0 calc(15vw + 48px) 68px 48px';
    case 4: return '0 48px 68px calc(15vw + 48px)';
  }
}

const StyledAnswer = styled.div<IStyledAnswerProps>`
  width: ${props => (props.isSelected ? '500px' : '50%')};
  height: ${props => (props.isSelected ? '500px' : 'auto')};
  min-height: 50%;
  display: flex;
  align-items: center;
  justify-content: ${props => (props.isSelected ? 'center' : null)};;
  ${props =>
    (props.isSelected)
      ? 'bottom: 0px; min-height: 0px;'
      : 'top: 50%;'
  }
  left: 25%;
  position: ${props => (props.isSelected ? 'absolute' : 'unset')};
  z-index: ${props => (props.isSelected ? 2 : 0)};
  background-color: ${props =>
    props.isSelected
      ? props.isCorrect
        ? props.palette.background
        : props.palette.foreground
      : props.palette.background};
  border: ${props =>
    props.isSelected ? 'none' : '1px solid var(--color-SNOW)'};
  opacity: ${props => (props.isHover ? '0.3' : '1.0')};
  transform: ${props => (props.isSelected ? 'scale(8)' : 'unset')};
  border-radius: ${props => (props.isSelected ? '100%' : 'unset')};
  transition: transform ${props => props.animationTime}ms ease-in-out;
  padding: ${getPadding};
  color: var(--color-SNOW);

  p { margin-bottom: 0; }
`;

interface IAnswerProps {
  text: string;
  id: number;
  isCorrect: boolean;
  isSelected: boolean;
  palette: IPalette;
  animationTime: number;
}

const Answer = (props: IAnswerProps) => {
  return (
    <Droppable droppableId={props.id}>
      {(provided: any, snapshot: any) => (
        <StyledAnswer
          ref={provided.innerRef}
          {...provided.droppableProps}
          id={props.id}
          isSelected={props.isSelected}
          isCorrect={props.isCorrect}
          palette={props.palette}
          isHover={snapshot.isDraggingOver}
          animationTime={props.animationTime}
        >
          {props.isSelected ? (
            props.isCorrect ? (
              <p><strong>Correct!</strong></p>
            ) : (
              <p><strong>Incorrect!</strong></p>
            )
          ) : (
            <p><strong>{props.text}</strong></p>
          )}
          <span style={{ display: 'none' }}>{provided.placeholder}</span>
        </StyledAnswer>
      )}
    </Droppable>
  );
};

export default Answer;
