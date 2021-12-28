import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Results from './quizSlide/results';
import Throbber from '~/client/components/common/01_atoms/throbber';
import { Heading2 } from '~/client/components/client/01_atoms/heading';
import { SmallText, ExtraSmallText } from '~/client/components/common/01_atoms/text';
import { Heading1 } from '../../01_atoms/heading';

import angryCirclesSvg from '~/static/images/icons/angrycircles.svg';
import smoothCirclesSvg from '~/static/images/icons/smoothcircles.svg';

const ANIMATION_DURATION = 800
const ANSWER_TIMEOUT = 1500

interface IStyledQuizSlideProps {
  palette: any;
}

const StyledQuizSlide = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding-top: 56px;
  padding-bottom: 68px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  position: relative;
  background-color: ${(props: IStyledQuizSlideProps) => props.palette.background};
`;

const StyledQuizContent = styled.div`
  height: 100%;
  overflow: auto;
`

const StyledQuizQuestion = styled.div`
  background-color: black;
  color: white;
  padding: 30px 30px;

  ${ExtraSmallText} {
    font-weight: 700;
    text-align: center;
    margin-top: 3em;
  }

  @media (min-height: 600px) {
    position: sticky;
    top: -48px; /* pushed the 1 of 4 off screen */
  }
`

const StyledAnswerContainer = styled.div`
  padding: 15px;

  & > * + * {
    margin-top: 10px;
  }

  @media (min-width: 600px) {
    padding: 30px;

    & > * + * {
      margin-top: 20px;
    }
  }
`

const StyledAnswer = styled.button`
  appearance: none;
  color: ${(props: IStyledQuizSlideProps) => props.palette.background};
  background-color: ${(props: IStyledQuizSlideProps) => props.palette.foreground};
  padding: 15px;
  text-align: left;
  cursor: pointer;
  border-radius: 4px;
  display: block;
  width: 100%;

  @media (min-width: 600px) {
    padding: 20px;
  }
`

interface IStyledAnswerPopoverProps {
  palette: any;
  answer: any;
}

const correctPopover = (props: IStyledAnswerPopoverProps) => css`
  div {
    background-color: ${(props: IStyledAnswerPopoverProps) => props.palette.foreground};
    background-image: url(${smoothCirclesSvg});
  }
`

const incorrectPopover = (props: IStyledAnswerPopoverProps) => css`
  div {
    background-color: ${(props: IStyledAnswerPopoverProps) => props.palette.background};
    background-image: url(${angryCirclesSvg});
  }
`

const popoverKeyframes = keyframes`
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`

const popoverBackgroundKeyframes = keyframes`
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1.25); opacity: 1; }
`

const StyledAnswerPopover = styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 56px);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;

  ${({ answer }: IStyledAnswerPopoverProps) => (
    answer && answer.userAnswer.isCorrect
      ? correctPopover
      : incorrectPopover
  )};

  & > * {
    animation: ${popoverKeyframes} ${ANIMATION_DURATION}ms ease forwards;
  }

  ${Heading1} {
    margin: 0;
  }

  div {
    position: absolute;
    z-index: -1;
    border-radius: 100%;
    height: 100vh;
    width: 100vh;
    top: 0;
    left: 50%;
    margin-left: -50vh;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    animation: ${popoverBackgroundKeyframes} ${ANIMATION_DURATION * 0.6}ms ease forwards;
  }
`

interface IQuizSlideProps {
  palette: any;
  slide: any;
  onSlideEnd: any;
  lessonNumber: number;
}

const QuizSlide = (props: IQuizSlideProps) => {
  const { questions } = props.slide.fields;
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDisplayingAnswerResult, setIsDisplayingAnswerResult] = useState<boolean>(false);
  const [isShowingResults, setIsShowingResults] = useState<boolean>(false);
  const [recordedAnswers, setRecordedAnswers] = useState<any>([]);
  // const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  // const [correctAnswer, setCorrectAnswer] = useState();

  const nextQuestion = () => setQuestionNumber(questionNumber + 1)

  const handleAnswerClick = (userAnswer: any) => (ev: any) => {
    setIsDisplayingAnswerResult(true);
    setRecordedAnswers([
      ...recordedAnswers,
      {
        question: currentQuestion,
        userAnswer
      }
    ]);

    // start loading next question before animation is complete
    setTimeout(nextQuestion, ANIMATION_DURATION)

    setTimeout(() => {
      setIsDisplayingAnswerResult(false);

      if (questionNumber + 1 >= questions.length) {
        setIsShowingResults(true)
      }
    }, ANSWER_TIMEOUT)
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (questions[questionNumber] !== undefined) {
      setIsLoading(true);
      fetch(`/api/slide/${questions[questionNumber]}`, { signal })
        .then(res => res.json())
        .then(questionData => {
          setCurrentQuestion(questionData)
          // setCorrectAnswer(questionData.fields.answers.find((answer: any) => answer.isCorrect));
        })
        .then(() => setIsLoading(false))
        .catch(res => {});
    }
    return () => {
      controller.abort();
    };
  }, [questionNumber]);

  // If we're reading for results, show that page
  if (isShowingResults) {
    return (
      <Results
        recordedAnswers={recordedAnswers}
        palette={props.palette}
        nextFunc={props.onSlideEnd}
      />
    );
  }

  if (isLoading && !isDisplayingAnswerResult) {
    return <Throbber contentLoading />;
  }

  const { fields: { answers, questionText } } = currentQuestion;
  const lastAnswer = recordedAnswers[recordedAnswers.length - 1]

  // Otherwise, show our quiz
  return (
    <StyledQuizSlide palette={props.palette}>
      <StyledQuizContent>
        <StyledQuizQuestion>
          <SmallText>{questionNumber + 1} of {questions.length}</SmallText>
          <Heading2 as="h1">{questionText}</Heading2>
          <ExtraSmallText>Tap to select your answer</ExtraSmallText>
        </StyledQuizQuestion>

        <StyledAnswerContainer>
          {
            answers.map((answer: any) => (
              <StyledAnswer
                key={answer.id}
                palette={props.palette}
                onClick={handleAnswerClick(answer)}
              >
                <p>{answer.answerText}</p>
              </StyledAnswer>
            ))
          }
        </StyledAnswerContainer>

        {
          isDisplayingAnswerResult &&
          <StyledAnswerPopover
            answer={lastAnswer}
            palette={props.palette}
          >
            <Heading1>
              {
                lastAnswer && lastAnswer.userAnswer.isCorrect
                  ? 'Correct'
                  : 'Incorrect'
              }
            </Heading1>

            {/* background svg */}
            <div />
          </StyledAnswerPopover>
        }
      </StyledQuizContent>
    </StyledQuizSlide>
  );
};

export default QuizSlide;
