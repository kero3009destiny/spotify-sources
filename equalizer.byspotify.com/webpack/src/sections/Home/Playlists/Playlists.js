import React, {useState, useEffect, useRef} from 'react';
import styles from './playlists.module.scss';
import { LightOutlinedLink } from '../../../components/Buttons';
import cn from 'classnames';
import Embed from './Embed';
import { URLS, ANIMATION } from '../../../Constants';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Playlists = ({data}) => {
    
    const content = data[0];

    const [load, setLoad] = useState(false);
    const containerRef = useRef(null);

    let st;

    useEffect(() => {
        st = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top bottom",
            onEnter: () => {
                setLoad(true);
            }
        });

        return () => {
            st.kill();
        }
    }, []);

    return(
        <div className={styles.outer}>
            <div ref={containerRef} className={cn('container block-margin-top', styles.container)}>
                <div className="row">
                    <div className={cn("col-12", styles.text)}>
                        <h3 className="size-1">{content.title}</h3>
                        <p className="size-2 line-140">{content.text}</p>
                    </div>
                </div>
                <div className={cn("row", styles.playlists)}>
                    <div data-aos="fade-up" data-aos-once="true" data-aos-delay={ANIMATION.DELAY * 0} className="col-4 col-12-mobile">
                        <Embed load={load} uri={content.playlist_1} />
                    </div>
                    <div data-aos="fade-up" data-aos-once="true" data-aos-delay={ANIMATION.DELAY * 1} className="col-4 col-12-mobile">
                        <Embed load={load} lazy uri={content.playlist_2} />
                    </div>
                    <div data-aos="fade-up" data-aos-once="true" data-aos-delay={ANIMATION.DELAY * 2} className="col-4 col-12-mobile">
                        <Embed load={load} lazy uri={content.playlist_3} />
                    </div>
                </div>
                <div className="row">
                    <div className={cn("col-12", styles.button)}>
                        <LightOutlinedLink url={URLS.SPOTIFY} label={content.button} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Playlists;