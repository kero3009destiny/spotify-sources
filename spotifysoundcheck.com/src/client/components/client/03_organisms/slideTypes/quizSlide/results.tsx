import React from 'react';
import styled from 'styled-components';
import { IPalette } from '../../../../common/types';
import { Heading3, Heading4 } from '../../../01_atoms/heading';
import { SmallText } from '../../../../common/01_atoms/text';

import CorrectIcon from '../../../../../../static/images/icons/correct.svg'
import IncorrectIcon from '../../../../../../static/images/icons/incorrect.svg'

const StyledQuizResultsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 110px;
  margin-bottom: 300px;
  background: var(--color-SNOW);

  ${Heading3} {
    color: var(--color-RED-ORANGE);
    margin-bottom: 0;

    &:last-of-type {
      margin-bottom: 48px;
    }
  }

  @media (max-width: 1025px) {
    margin-bottom: 60px;
  }
`;

const StyledQuizResults = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;

  @media (max-width: 1025px) {
    width: 100%;
    padding: 0 30px;
  }
`;

const StyledResult = styled.div`
  margin-bottom: 64px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid var(--color-GRAY-MED);
  padding-bottom: 44px;
`;

const StyledResultDescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  width: 100%;
  img {
    margin-right: 17px;
  }
  p {
    margin-bottom: 0;
  }
`

const StyledResultDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  p:first-child {
    margin-top: 6px;
    font-weight: bold;
  }
`

interface IStyledButtonProps {
  palette: IPalette;
}

const StyledButton = styled.button`
  background-color: ${(props: IStyledButtonProps) => props.palette.background};
  width: 182px;
  height: 54px;
  border-radius: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-SNOW);
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  &:hover {
    cursor: pointer;
  }
`

interface IQuizResultsProps {
  recordedAnswers: any;
  palette: IPalette;
  nextFunc: any;
}

const QuizResults = (props: IQuizResultsProps) => {
  const answersCorrect = props.recordedAnswers.filter((answer: any) => answer.userAnswer.isCorrect).length;
  return (
    <StyledQuizResultsContainer>
      <StyledQuizResults>
        <Heading3 as="h1">Great job.</Heading3>
        <Heading3 as="h2">
          You got {answersCorrect} out of {props.recordedAnswers.length} correct!
        </Heading3>
        {props.recordedAnswers.map((recordedAnswer: any, index: number) => (
          <StyledResult key={index}>
            <SmallText as="h3">
              <strong>{index + 1} of {props.recordedAnswers.length}</strong>
            </SmallText>
            <Heading4 as="h2">{recordedAnswer.question.fields.questionText}</Heading4>
            <StyledResultDescriptionContainer>
              <img src={recordedAnswer.userAnswer.isCorrect ? CorrectIcon : IncorrectIcon} />
              <div>
                <p>{recordedAnswer.userAnswer.answerText}</p>
                {recordedAnswer.userAnswer.isCorrect ? (
                  <StyledResultDescription>
                    <p style={{ color: 'var(--color-BRAND-GREEN)' }}>
                      <strong>Correct! You&rsquo;re crushing it.</strong>
                    </p>
                  </StyledResultDescription>
                ) : (
                  <StyledResultDescription>
                    <p style={{ color: 'var(--color-RED-ORANGE' }}>
                      <strong>Incorrect</strong>
                    </p>
                    <p>
                      {
                        recordedAnswer.question.fields.answers.find((answer: any) => answer.isCorrect)
                          .answerText
                      }
                    </p>
                  </StyledResultDescription>
                )}
              </div>
            </StyledResultDescriptionContainer>
            <hr />
          </StyledResult>
        ))}
      <StyledButton palette={props.palette} type="button" onClick={() => props.nextFunc()}>Next</StyledButton>
      </StyledQuizResults>
    </StyledQuizResultsContainer>
  );
};

export default QuizResults;
