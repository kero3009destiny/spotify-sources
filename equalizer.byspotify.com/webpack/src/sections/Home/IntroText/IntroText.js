import React from 'react';
import styles from './introtext.module.scss';
import { GradientLink } from '../../../components/Buttons';
import Constants from '../../../Constants';
import cn from 'classnames';

const IntroText = ({body, currentEvents, onClick}) => {
    return(
        <div data-aos="fade-up" data-aos-once="true" className={cn("container", styles.container)}>
            <div className="row center">
                <div className="col-8 col-12-mobile text-center">
                    <h1 className="size-1 line-110 line-120-mobile">{body}</h1>
                    {currentEvents > 0 && <div className={styles.button}>
                        {/* <GradientLink internalPath={`/${Constants.PAGE_SLUG_EVENTS}`} label="See our current events" currentEvents={currentEvents} /> */}
                        <GradientLink onClick={onClick} label={Constants.UI_TEXT.SEE_CURRENT_EVENTS} currentEvents={currentEvents} />
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default IntroText;