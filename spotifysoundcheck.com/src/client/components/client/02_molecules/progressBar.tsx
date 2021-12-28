import { IPalette } from '../../common/types';
import React from 'react';
import styled from 'styled-components';

interface IStyledProgressBarWrapperProps {
  isHighlighted: boolean;
  palette: IPalette;
}

const StyledProgressBarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: 3vw;

  p {
    padding-right: 16px;
    white-space: nowrap;
    margin-bottom: 0;
    color: ${(props: IStyledProgressBarWrapperProps) =>
      props.isHighlighted ? props.palette.foreground : 'var(--color-SNOW)'};
    text-transform: capitalize;
    flex-grow: 1;
    text-align: right;
  }

  @media (max-width: 1024px) {
    flex-direction: row-reverse;

    p {
      padding-right: 0;
      padding-left: 16px;
      text-align: left;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 6vw;

    p {
      padding-left: 0;
    }
  }
`;

interface IStyledProgressProps {
  percentage: number;
  isHighlighted: boolean;
  palette: IPalette;
}

const StyledProgressBar = styled.div`
  width: 33%;
  display: block;
  height: 16px;
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;

  &::after {
    content: ' ';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props: IStyledProgressProps) => props.percentage}%;
    height: 100%;
    background-color: ${(props: IStyledProgressProps) =>
      props.isHighlighted ? props.palette.foreground : 'var(--color-SNOW)'};
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

interface IProgressBarProps {
  label: string;
  metric: number | string;
  percentage: number;
  isHighlighted?: boolean;
  palette: IPalette;
}

const ProgressBar = (props: IProgressBarProps) => {
  const { label, metric, percentage, isHighlighted = false, palette } = props;
  return (
    <StyledProgressBarWrapper isHighlighted={isHighlighted} palette={palette}>
      <p>
        {label} {`${metric}%`}
      </p>
      <StyledProgressBar percentage={percentage} isHighlighted={isHighlighted} palette={palette} />
    </StyledProgressBarWrapper>
  );
};

export default ProgressBar;
