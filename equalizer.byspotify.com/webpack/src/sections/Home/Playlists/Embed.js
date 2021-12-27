import React from 'react';
import styles from './embed.module.scss';
import { URLS } from '../../../Constants';

const Embed = ({uri, load}) => {
    const playlistId = uri.split(':').pop();
    
    return(
        <div className={styles.outer}>
            <div className={styles.container}>
                {
                    load ?
                    <iframe title="Spotify Playlist Player" src={`${URLS.EMBED}${playlistId}`} width="333" height="413" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe> :
                    <p>Loading playlists...</p>
                }
            </div>
        </div>
    )
}

export default Embed;