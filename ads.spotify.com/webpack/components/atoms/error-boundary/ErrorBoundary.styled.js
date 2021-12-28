import styled from 'styled-components';

import { Headline as HeadlineComponent } from 'components/atoms/headline';

export const Error = styled.div`
  align-items: center;
  background-color: tomato;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 11.2rem 0;
`;

export const Headline = styled(HeadlineComponent).attrs({
  tag: 'p',
  styling: 'h2',
})`
  text-align: center;
`;

export const Description = styled(HeadlineComponent).attrs({
  tag: 'p',
  styling: 'h3',
})``;

export const ErrorMessage = styled(HeadlineComponent).attrs({
  tag: 'p',
  styling: 'h3',
})`
  margin-top: 3.2rem;
  padding: 0 3.2rem;
`;

export const HintMessage = styled(HeadlineComponent).attrs({
  tag: 'p',
  styling: 'h4',
})`
  padding: 0 3.2rem;
`;
