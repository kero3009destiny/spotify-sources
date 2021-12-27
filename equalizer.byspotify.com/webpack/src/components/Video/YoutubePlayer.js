import React from 'react';
import styles from './youtube-player.module.scss';
import cn from 'classnames';

const YoutubePlayer = ({videoId, play}) => {
    return(
        <div className={cn(styles.container, {[styles.show] : play})}>
            <div className={styles.video}>
                {play ? <iframe title="Youtube Video" width="420" height="315" allow="autoplay; encrypted-media" allowFullScreen src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0`}></iframe> : null}
            </div>
        </div>
    )
}

export default YoutubePlayer;