import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { IPalette } from '../../../../common/types';
import Answer from './answer';
import Question from './question';
import Results from './results';
import Throbber from '../../../../common/01_atoms/throbber';

interface IStyledQuizSlideProps {
  palette: IPalette;
}

const StyledQuizSlide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  position: relative;
  overflow: hidden;
  background-color: ${(props: IStyledQuizSlideProps) => props.palette.background};
`;

interface IQuizSlideProps {
  palette: IPalette;
  slide: any;
  onSlideEnd: any;
  lessonNumber: number;
}

const QuizSlide = (props: IQuizSlideProps) => {
  // We set a answer timeout (for measure in milliseconds) to use for setTimeout when continuing to next slide
  // We establish a var so that the answers can have their animation speeds match our timeout
  const answerTimeout = 300;
  // Questions come in as just IDs, so we need to fetch the relative data
  const { questions } = props.slide.fields;
  // We're going to start our QuizSlide current index at one (sometimes theres more than one question)
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  // We're going to fetch the relative question in our questions var pertaining to whatever index we're on (if it exists)
  // After we fetch, we set that question as our current question
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  // We'll also need to make sure we're not currently loading the question
  // NOTE: We set it to true by default because we know for a fact we're going to need to load the first question
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShowingResults, setIsShowingResults] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [recordedAnswers, setRecordedAnswers] = useState<any>([]);
  // The first thing we need to do before the rest of our logic is make sure we're not loading any data
  // Note: Make sure all state calls are above this or you'll get a rendering error
  const [correctAnswer,setcorrectAnswer] = useState();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (questions[questionNumber] !== undefined) {
      // NOTE: Even though isLoading is true by default, we still set it to true here for question after the first one
      setIsLoading(true);
      fetch(`/api/slide/${questions[questionNumber]}`, { signal })
        .then(res => res.json())
        .then(questionData => {
          setCurrentQuestion(questionData)
          setcorrectAnswer(questionData.fields.answers.find((answer: any) => answer.isCorrect));
        })
        .then(() => setIsLoading(false))
        .catch(res => {});
    }
    return () => {
      controller.abort();
    };
  }, [questionNumber]);

  if (isLoading) {
    return <Throbber />;
  }

  const onDragEnd = (index: number) => {
    // The result is going to give us an index, which we know is the index of the answer we want
    const selectedAnswer = currentQuestion.fields.answers[index];
    // This finds the FIRST answer who's isCorrect boolean is set to true
    setSelectedAnswer(selectedAnswer.id);
    setRecordedAnswers([
      ...recordedAnswers,
      {
        question: currentQuestion,
        userAnswer: selectedAnswer
      }
    ]);
    if (questions[questionNumber + 1] !== undefined) {
      setTimeout(() => {
        // Move to our next question
        setQuestionNumber(questionNumber + 1);
        // Reset our selected answer
        setSelectedAnswer(null);
      }, answerTimeout * 5);
    } else {
      setTimeout(() => setIsShowingResults(true), answerTimeout * 5);
    }
  };

  const onDrag = (index: number) => {
    //hover animation for naswer would go here.
    // console.log(index)
  }

  const {
    fields: { answers, questionText }
  } = currentQuestion;
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

  // Otherwise, show our quiz
  return (
    <StyledQuizSlide palette={props.palette} key={questionNumber}>
      <DragDropContext onDragEnd={(result: any) => onDragEnd(result)}>
        {answers.map((answer: any, index: any) => {
          return (
            <Answer
              key={answer.id}
              text={answer.answerText}
              id={index + 1}
              isCorrect={answer.isCorrect}
              isSelected={selectedAnswer === answer.id}
              palette={props.palette}
              animationTime={answerTimeout}
            />
          );
        })}
        <Question
          question={questionText}
          palette={props.palette}
          selectedCallback={(i:number) => onDragEnd(i)}
          hoverCallback={(i:number) => onDrag(i)}
          questionNumber={questionNumber}
          totalAnswers={answers.length}
          totalQuestions={questions.length}
        />
      </DragDropContext>
    </StyledQuizSlide>
  );
};

export default QuizSlide;
