import React, {useRef, useState} from "react";
import DataGroupContainer from '../04_ecosystems/dataGroupContainer';
// import Logo from '../01_atoms/logo';
import styled from 'styled-components';


const sample = [
  {
    title: 'hello world', 
    stats: [
      {stat: 50, label: 'world'},
      {stat: 60, label: 'world2'},
      {stat: 880, label: 'world3'}
    ]
  },
  {
    title: 'some random title here', 
    stats: [
      {stat: 80, label: 'world'},
      {stat: 80, label: 'world2'},
      {stat: 80, label: 'world3', type: 'pie'}
    ],
  },
  {
    title: 'jamboreeee', 
    stats: [
      {stat: 80, label: 'world'},
      {stat: 80, label: 'world2'},
      {stat: 80, label: 'world3'}
    ]
  }
]

const StyledInput = styled.input`
  border: 1px solid black;
  padding: 10px;
  font-size: 2.4rem;
  display: block;
`;

const Dashboard = () => {
  const inputRef = useRef(null);
  const [inputState, setInputState] = useState('');
  

  const filterData = () => {
    if (inputState.length > 0) {
      return sample.filter((d:any) => d.title.indexOf(inputState) !== -1)
    } else {
      return sample;
    }
  }
  
  return (
    <DataGroupContainer data={filterData()} keys={sample[0]} type="companies" />
  )
}

export default Dashboard;