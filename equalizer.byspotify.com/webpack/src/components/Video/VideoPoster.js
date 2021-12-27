import React from 'react';
import styles from './video-poster.module.scss';

const VideoPoster = ({fluid, onClick}) => {
    return(
        <div className={styles.container}>
            <div className={styles.play} onClick={onClick} />
            <img alt="" className={styles.image} src={fluid.src} />
        </div>
    )
}

export default VideoPoster;