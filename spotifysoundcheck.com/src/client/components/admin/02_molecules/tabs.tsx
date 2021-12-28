import React, {useState} from 'react';
import styled from 'styled-components';


type Tab = {
  label: string,
  callBack: () => void
}

interface ITabs {
  tabs: Tab[]
}

const StyledTabs = styled.ul`
  display: inline-flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
`;

interface IStyledTab {
  active: boolean
}
const StyledTab = styled.li`
  list-style: none;
  padding: 0;
  margin: 0 20px;
  font-size: 1.6rem;
  text-transform: capitalize;
  color: ${(p: IStyledTab) => p.active ? 'black' : 'grey'};
  border-bottom:  ${(p: IStyledTab) => p.active ? '5px solid black' : 'none'};
  padding-bottom: 10px;
  cursor: pointer;
  &:first-child{margin-left: 0;}
`;

const Tabs = (props: ITabs) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabHandler = (index: number, cb:() => void) => {
    setActiveTab(index);
    cb();
  }
  const getTabs = (tabs: any) => {
    return tabs.map((d:any, i:number) => {
      return (
        <StyledTab 
          onClick={
            () => {
              if (typeof d.callBack === 'function') {
                tabHandler(i, d.callBack)
              }
            } 
          }
          active={i === activeTab}
          key={i}
        >{d.label}</StyledTab>
      )
    })
  }
  return (
    <StyledTabs>
      {getTabs(props.tabs)}
    </StyledTabs>
  )
}

export default Tabs;