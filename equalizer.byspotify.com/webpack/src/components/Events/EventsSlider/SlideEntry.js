import React from 'react';
import styles from './slide-entry.module.scss';
import DateLabel from '../EventParts/DateLabel';
import EventBody from '../EventParts/EventBody';
import { DarkFilledLinkSmall, LightOutlinedLinkSmall } from '../../Buttons';
import Constants from '../../../Constants';
import { formatDate } from '../../../Utils';
import cn from 'classnames';

const SlideEntry = ({event, active}) => {
    const {title, slug, acf: {excerpt, date, location, image}} = event;
    
    return(
        <div className={cn(styles.container, {[styles.containerActive]: active})}>
            <DateLabel slide location={location} />
            <div className={cn(styles.left, {[styles.leftActive]: active})}>
                <EventBody slide title={title} formattedDate={formatDate(date)} excerpt={excerpt} />
                <div className={styles.button}>
                    {
                        active ? 
                        <DarkFilledLinkSmall descriptiveText="about this event" internalPath={`/${Constants.PAGE_SLUG_EVENTS}/${slug}`} label={Constants.UI_TEXT.READ_MORE} /> :
                        <LightOutlinedLinkSmall descriptiveText="about this event" dimmed internalPath={`/${Constants.PAGE_SLUG_EVENTS}/${slug}`} label={Constants.UI_TEXT.READ_MORE} />
                    }
                    
                </div>
            </div>
            <div className={styles.right}>
                <img alt="" src={image.localFile.childImageSharp.resolutions.src} className={styles.image} />
            </div>
        </div>
    )
}

export default SlideEntry;