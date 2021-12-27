import React from 'react';
import styles from './imageset.module.scss';
import cn from 'classnames';
import Img from 'gatsby-image';

const ImageSet = ({images}) => {
    
    return(
        <>
            {
                images.map((imageObj, index) => {
                    return(
                        <div className={styles.container} key={index}>
                            <div className={cn(styles.box, {[styles.boxAlt]: index % 2 == 0})} />
                            {/* <img alt="" src={imageObj.image.localFile.childImageSharp.fluid.src} className={styles.image} /> */}
                            <Img fluid={imageObj.image.localFile.childImageSharp.fluid} alt="" className={styles.image} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default ImageSet;