import React, {useState} from 'react';
import VideoPoster from './VideoPoster';
import YoutubePlayer from './YoutubePlayer';

const Video = ({imageSrc, youtubeId}) => {
    const [play, setPlay] = useState(false);

    const handlePlayClick = () => {
        setPlay(true);
    }

    return(
        <>
            <VideoPoster fluid={imageSrc} onClick={handlePlayClick} />
            <YoutubePlayer videoId={youtubeId} play={play} />
        </>
    )
}

export default Video;