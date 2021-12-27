import React from 'react';
import styles from './tab.module.scss';
import cn from 'classnames';

const Tab = ({label, index, active, onClick}) => {
    
    const handleClick = () => {
        onClick(index);
    }
    
    return(
        <li className={cn('fw-normal size-4 size-3-mobile', styles.tab, {[styles.active]: active})} onClick={handleClick}>{label}</li>
    )
}

export default Tab;