import React, {useState} from 'react';
import styles from './tabs.module.scss';
import cn from 'classnames';
import Tab from './Tab';
import TabContent from './TabContent';
import { SwitchTransition, CSSTransition } from "react-transition-group";

const Tabs = ({data}) => {
    
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabClick = index => {
        setActiveTabIndex(index);
    }

    return(
        <div className="container">
            <div className="row">
                <ol className={cn('col-12', styles.tabs)}>
                    {
                        data.map((tab, index) => <Tab key={index} label={tab.tab_name} index={index} active={activeTabIndex === index} onClick={handleTabClick}/>)
                    }
                </ol>
            </div>
            <SwitchTransition mode={"out-in"}>
                <CSSTransition
                    key={data[activeTabIndex].tab_name}
                    addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                    }}
                    classNames={styles}
                >
                    <TabContent data={data[activeTabIndex]} />
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}

export default Tabs;