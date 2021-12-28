import styled from 'styled-components';

import { Headline } from 'components/atoms';
import { AudioWithTranscript as AudioWithTranscriptComponent } from 'components/molecules/audio-with-transcript';
import { container, columnsGutter } from 'styles/grid';
import { colors } from 'styles/variables';
import { minWidth } from 'styles/media-queries';

export const Root = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor || ''};
  padding-top: 5.6rem;

  ${minWidth.lg`
    padding-top: 16rem;
  `}
`;

export const Container = styled.div`
  ${container}
  ${columnsGutter}

  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

export const Wrapper = styled.div`
  grid-column: 1 / 13;

  ${minWidth.lg`
    grid-column: 4 / 12;
  `}
`;

export const Title = styled(Headline).attrs({
  tag: 'h3',
  styling: 'h2',
})`
  color: ${({ textColor }) => textColor || colors.black};
`;

export const AudioWithTranscript = styled(AudioWithTranscriptComponent)`
  ${props => (props.bottomSpacing ? '' : `padding-bottom: 0;`)};
`;
