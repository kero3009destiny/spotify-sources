import styled from 'styled-components';

import { Headline as HeadlineComponent } from 'components/atoms';
import { Modal as ModalComponent } from 'components/molecules/modal';
import { colors } from 'styles/variables';
import { minWidth } from 'styles/media-queries';

const SMALL_TOP_HEIGHT = 72;

export const Modal = styled(ModalComponent)`
  padding-left: 2rem;
  padding-right: 2rem;

  ${minWidth.sm`
    border: 0.1rem solid ${colors.grey400}
    padding-left: 4rem;
    padding-right: 4rem;
  `}

  ${minWidth.md`
    max-width: 84.9rem;
    padding-left: 9.9rem;
    padding-right: 9.9rem;
    width: 80%;
  `}

  & .close-button {
    height: 2.58rem;
    right: 2rem;
    top: 2rem;
    width: 2.58rem;

    ${minWidth.lg`
      height: 3.44rem;
      right: 4.5rem;
      top: 4.5rem;
      width: 3.44rem;
    `}
  }

  && {
    overflow-y: hidden;

    ${minWidth.md`
      overflow-y: auto;
    `}
  }
`;

export const Container = styled.div`
  padding-bottom: 6.4rem;
  padding-top: 1.6rem;

  ${minWidth.lg`
    padding-bottom: 6.9rem;
    padding-top: 8.3rem;
  `}
`;

export const Title = styled(HeadlineComponent)`
  color: ${colors.white};
  font-size: 2.8rem;
  letter-spacing: -0.132rem;
  line-height: 3.2rem;
  margin-bottom: 2.4rem;

  ${minWidth.lg`
    font-size: 3.2rem;
    letter-spacing: -0.1rem;
    margin-bottom: 3.2rem;
  `}
`;

export const Headline = styled(HeadlineComponent).attrs({
  tag: 'h3',
  styling: 'h3',
})`
  color: ${colors.white};
  font-size: 1.6rem;
  letter-spacing: -0.025rem;
  line-height: 2.4rem;
  margin-bottom: 3.2rem;
  position: relative;

  ${minWidth.lg`
    font-size: 4.4rem;
    letter-spacing: -0.15rem;
    line-height: 4.8rem;
    margin-bottom: 4rem;
  `}
`;

export const Content = styled.div`
  background-color: ${colors.black};
  flex: 1;
  overflow-y: auto;

  ${minWidth.lg`
    height: auto;
    margin: 0;
  `}
`;

export const ModalForm = styled.div`
  background-color: ${colors.black};
  bottom: 0;
  display: flex;
  flex-direction: column;
  grid-column: 1 / 13;
  height: calc(100vh - ${SMALL_TOP_HEIGHT}px);
  position: relative;
  width: 100%;
  ${props =>
    props.documentHeight
      ? `height: ${props.documentHeight - SMALL_TOP_HEIGHT}px;`
      : ''}

  ${minWidth.lg`
    grid-column: 7 / 13;
    height: auto;
    position: relative;
  `}

  ${minWidth.ml`
    grid-column: 8 / 13;
  `}

  ${minWidth.xl`
    grid-column: 9 / 13;
  `}
`;

export const EmptyForm = styled.div`
  min-height: 400px;
`;
