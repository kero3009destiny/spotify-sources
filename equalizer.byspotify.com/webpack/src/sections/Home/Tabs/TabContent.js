import React from 'react';
import styles from './tabcontent.module.scss';
import cn from 'classnames';
import Img from 'gatsby-image';
import { DarkOutlinedLink } from '../../../components/Buttons';
import Constants, { ANIMATION } from '../../../Constants';

const TabContent = ({data}) => {
    
    const {fluid} = data.image.localFile.childImageSharp;

    return(
        <div className={cn("row", styles.container)}>
            <div data-aos="fade-up" data-aos-once="true" className={cn("col-6 col-12-mobile", styles.left)}>
                <h3 className={cn("size-1 line-110 line-120-mobile col-10 col-12-mobile desktop-nopadding", styles.title)}>{data.title}</h3>
                <p className={cn("size-2 line-140", styles.body)}>{data.body}</p>
                <DarkOutlinedLink descriptiveText={`at ${Constants.PAGE_SLUG_ABOUT} page`} internalPath={`/${Constants.PAGE_SLUG_ABOUT}`} label={data.button_label} />
            </div>
            <div data-aos="fade-up" data-aos-once="true" data-aos-delay={ANIMATION.DELAY} className={cn("col-6 col-12-mobile", styles.right)}>
                <Img alt="" fluid={fluid} key={fluid.src} />
            </div>
        </div>
    )
}

export default TabContent;