import React from 'react';
import styles from './date-label.module.scss';
import cn from 'classnames';
import Constants from '../../../Constants';

const DateLabel = ({location, passed, dark = false, slide = false}) => {
    return(
        <div className={cn('size-5 fw-normal', styles.location, {[styles.locationSlide]: slide}, {[styles.locationDark]: dark})}>{passed ? Constants.UI_TEXT.PAST_EVENT : location}</div>
    )
}

export default DateLabel;