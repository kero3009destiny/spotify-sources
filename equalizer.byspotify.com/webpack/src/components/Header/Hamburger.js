import React from 'react';
import styles from './hamburger.module.scss';
import cn from 'classnames';

const Hamburger = ({open, onClick, eventPage}) => {

    return(
        <div onClick={onClick} className={cn(styles.container, {[styles.open]: open}, {[styles.eventPage]: eventPage})}>
            <div className={styles.inner}>
                <div className={cn(styles.line, styles.top)}/>
                <div className={cn(styles.line, styles.bottom)}/>
            </div>
        </div>
    )
}

export default Hamburger;