import React from 'react';
import styled from 'styled-components';
import Button from '../../common/01_atoms/button';
import { ExtraSmallText, ExtraSmallTextStyles } from '../../common/01_atoms/text';
import Headings, { Heading4 } from '../01_atoms/heading';
import AdminBar from '../../client/03_organisms/adminBar';
import {darken} from 'polished';
import { sanitize } from 'dompurify';

import HeadphonesSVG from '../../../../static/images/icons/headphones.svg';

interface ILessonIntroProps {
  lesson: any
  isLoading: boolean;
}

interface IStyledLesson {
  background: string
}

const StyledLesson = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${(p: IStyledLesson) => p.background};
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 24px;
  padding: calc(56px + 30px) 30px 30px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StyledLessonDescription = styled.div`
  grid-column: 2 / span 5;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  > * {
    color: var(--color-SNOW);
  }

  @media (max-width: 1440px) {
    grid-column: 1 / span 6;
  }

  @media (max-width: 1024px) {
    grid-column: 1 / span 4;
  }
`;

const StyledLessonSummary = styled.div`
  grid-column: 8 / span 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  ${Heading4} {
    color: var(--color-SNOW);
  }

  & > * {
    max-width: 480px;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const StyledSummary = styled.div`
  > * {
    color: var(--color-SNOW);
  }

  p {
    ${ExtraSmallTextStyles};
  }
`;

const StyledLessonNumber = styled.small`
  color: ${props => props.color};
  font-weight: bold;
  margin-bottom: 1em;
`;

const StyledLessonTitle = styled(Headings.H3)`
  color: ${props => props.color};
`;

const StyledCTA = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  margin-top: 64px;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    margin-top: 30px;
    align-items: flex-start;
  }

  @media (max-width: 600px) {
    align-items: center;
  }
`;

interface IStyledHeadphoneContainerProps {
  isMobile?: boolean
}

const StyledHeadphoneContainer = styled.div<IStyledHeadphoneContainerProps>`
  display: ${p => p.isMobile ? 'none' : 'flex'};
  flex-wrap: no-wrap;
  justify-content: flex-start;
  align-items: center;
  margin-left: 24px;
  max-width: 400px;

  p {
    margin-left: 12px;
    color: var(--color-SNOW);
  }

  @media (max-width: 1024px) {
    margin-left: 0;
    margin-top: 40px;
    display: ${p => p.isMobile ? 'flex' : 'none'};
    grid-column: 1 / span 4;
    flex-direction: column;
    margin: 0 auto 60px;
    text-align: center;

    p {
      margin-left: 0;
      margin-top: 10px;
    }
  }
`

const LessonIntro = (props: ILessonIntroProps) => {
  // Destructure our fields from the lesson
  const {
    lessonID,
    fields: { title, palette, summary, description, lessonNumber, modules }
  } = props.lesson;

  return (
    <>
      <StyledLesson background={palette.background}>
        <StyledLessonDescription>
          <StyledHeadphoneContainer isMobile>
            <img src={HeadphonesSVG} alt="Put on your headphones" />
            <ExtraSmallText>Are your headphones on? They should be. Spotify Soundcheck is made for your ears.</ExtraSmallText>
          </StyledHeadphoneContainer>

          <StyledLessonNumber color={palette.foreground}>Lesson {lessonNumber}:</StyledLessonNumber>
          <StyledLessonTitle color={palette.foreground}>{title}</StyledLessonTitle>
          <p>{description}</p>
          <StyledCTA>
            <Button
              to={`/lesson/${lessonID}/${modules[0].id}`}
              fgColor={palette.foreground}
              bgColor={palette.background}
              label="Get Started"
              isDisabled={props.isLoading}
            />
            <StyledHeadphoneContainer>
              <img src={HeadphonesSVG} alt="Put on your headphones" />
              <ExtraSmallText>Are your headphones on? They should be. Spotify Soundcheck is made for your ears.</ExtraSmallText>
            </StyledHeadphoneContainer>
          </StyledCTA>
        </StyledLessonDescription>
        <StyledLessonSummary>
          <Heading4 as="h2">What you&rsquo;ll learn</Heading4>
          <StyledSummary dangerouslySetInnerHTML={{ __html: sanitize(summary) }} />
        </StyledLessonSummary>
      </StyledLesson>
    </>
  );
};

export default LessonIntro;

