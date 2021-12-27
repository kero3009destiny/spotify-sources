import React from 'react';
import styles from './spotify-for-artists.module.scss';
import { useStaticQuery, graphql } from 'gatsby';
import spotifyForArtistsLogo from '../../images/spotify-for-artists-logo.svg';
import { LightOutlinedLink } from '../Buttons';
import cn from 'classnames';
import { URLS } from '../../Constants';

const SpotifyForArtists = () => {

    const {allWordpressWpGlobal} = useStaticQuery(graphql`
    query SpotifyForArtists {
        allWordpressWpGlobal(filter: {template: {regex: "/spotify-for-artists/"}}) {
          edges {
            node {
              acf {
                button
                text
                title
                image {
                    localFile {
                      childImageSharp {
                        fixed(width: 660) {
                          ...GatsbyImageSharpFixed_withWebp
                        }
                      }
                    }
                  }
              }
            }
          }
        }
      }`
    );

    const data = allWordpressWpGlobal.edges[0].node.acf;
    const {fixed} = data.image.localFile.childImageSharp;
    
    const leftStyle = {
        backgroundImage: `url(${fixed.src})`
    };

    return(
        <div className="container block-margin-top">
            <div className="row">
                <div className="col-12">
                    <div className={styles.container}>
                        <div className={styles.left} style={leftStyle}>
                            <img alt="" className={styles.logo} src={spotifyForArtistsLogo} />
                        </div>
                        <div className={styles.right}>
                            <h3 className="size-2 size-2-mobile line-120">{data.title}</h3>
                            <p className={cn("size-3 size-3-mobile line-150 line-140-mobile", styles.text)}>{data.text}</p>
                            <LightOutlinedLink mobile label={data.button} url={URLS.SPOTIFY} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default SpotifyForArtists;