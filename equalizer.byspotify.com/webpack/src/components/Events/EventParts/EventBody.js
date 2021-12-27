import React from 'react';
import cn from 'classnames';
import styles from './event-body.module.scss';

const EventBody = ({title, formattedDate, excerpt, slide = false}) => {
    return(
        <div className={cn(styles.body, {[styles.bodySlide]: slide})}>
            <h4 className={cn('size-2 size-2-mobile', styles.title)}>{title}</h4>
            <p className={cn('size-4 size-3-mobile fw-normal', styles.date)}>{formattedDate}</p>
            <p className={cn('size-4-mobile line-140', styles.excerpt)}>{excerpt}</p>
        </div>
    )
}

export default EventBody;