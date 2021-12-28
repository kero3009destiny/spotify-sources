import React, { useState } from 'react';
import ChartBarBig from '../02_molecules/chartBarBig';
import Tabs from '../02_molecules/tabs';
import styled from 'styled-components';

type TCharts = {
  title: string,
  percentage: number
}


const companyLeaderBoard = [
  {title: 'the brigade', percentage: 65},
  {title: 'sony of america', percentage: 47},
  {title: 'guh', percentage: 21},
  {title: 'the brigade 2', percentage: 100},
  {title: 'spotify', percentage: 0}
]

const regionLeaderBoard = [
  {title: 'United States of America', percentage: 43},
  {title: 'Albina', percentage: 84},
  {title: 'Sweden', percentage: 62},
  {title: 'Germany', percentage: 98},
  {title: 'Canada', percentage: 34}
]

const StyledLeaderboard = styled.section`
  padding: 40px 0 0;
  p{
    width: 100%;
    text-align:right;
    margin-bottom: 10px;
    padding-top: 30px;
  }
`;

const Leaderboard = () =>{
  const [view, setView] = useState(0);
  const createBarCharts = (data: TCharts[]) => {
    return data.map((d:any, i:number) => (
      <ChartBarBig
        title={d.title}
        percentage={d.percentage} 
        key={i}
      />
    ))
  }
  return (
    <StyledLeaderboard>
      <Tabs 
        tabs={
          [
            {
              label: 'Performance by Company',
              callBack: () => {
                setView(0)
              }
            },
            {
              label: 'Performance by Region',
              callBack: () => {
                setView(1)
              }
            }
          ]
        }
      />
      <p>% of Employees Completing Program</p>
      {view === 0 && createBarCharts(companyLeaderBoard)}
      {view === 1 && createBarCharts(regionLeaderBoard)}
    </StyledLeaderboard>
  )
}


export default Leaderboard;