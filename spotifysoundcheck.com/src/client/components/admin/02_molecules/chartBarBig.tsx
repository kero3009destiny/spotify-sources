import React from 'react';
import styled from 'styled-components';

interface IChartBarBig {
  percentage: number
  title: string
}

interface IStyledChartBarBig {
  percentage: number
}

const StyledChartBarBig = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  position:relative;
  z-index: 0;
  h3{
    width: 200px;
    text-align: left;
    margin: 0;
  }
`;

const StyledBar = styled.div`
  padding: 20px;
  width: 100%;
  background: black;
  position: relative;
  h4{
    color:var(--color-SNOW);
    position: relative;
    z-index: 1;
    text-align: right;
    margin: 0;
  }
  &:before{
    content: '';
    width: ${(p: IStyledChartBarBig) => p.percentage}%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: var(--color-BRAND-GREEN);
    z-index: 0;
  }
`;

const chartBarBig = (props:IChartBarBig) => {
  return (
    <StyledChartBarBig>
      <h3>{props.title}</h3>
      <StyledBar percentage={props.percentage}>
        <h4>{props.percentage}%</h4>
      </StyledBar>
    </StyledChartBarBig>
  )
}

export default chartBarBig;