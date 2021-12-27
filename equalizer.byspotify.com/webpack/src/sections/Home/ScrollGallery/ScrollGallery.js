import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import styles from './scrollgallery.module.scss';
import ImageSet from './ImageSet';
import cn from 'classnames';

import {gsap, Power3} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { useStaticQuery, graphql } from 'gatsby';

const SPEED = {
    DESKTOP: .75,
    MOBILE: .5,
}

const ScrollGallery = () => {

    const {allWordpressPage} = useStaticQuery(graphql`
    query ScrollGallery {
        allWordpressPage(filter: {slug: {eq: "home"}}) {
          edges {
            node {
              acf {
                images_slideshow {
                  image {
                    localFile {
                      childImageSharp {
                        fluid(maxHeight:615) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `);

    const tl = useRef(gsap.timeline({paused: true}));
    const speed = useRef(SPEED.DESKTOP);
    const smallScreen = useRef(typeof window !== `undefined` ? window.innerWidth <= 1024 : false);
    const animationStarted = useRef(false);

    const [fadeIn, setFadeIn] = useState(false);

    const containerRef = useRef(null);
    const imageset1 = useRef(null);
    const imageset2 = useRef(null);
    const pos1 = useRef(null);
    const pos2 = useRef(null);

    const requestRef = React.useRef()
    
    const paused = useRef(false);

    let st;

    const updateTransformPositions = () => {
        pos1.current = {
            x: 0,
            max: imageset1.current.offsetWidth,
            min: imageset1.current.offsetWidth * -1
        }

        pos2.current = {
            x: 0,
            max: 0,
            min: imageset2.current.offsetWidth * -2
        }
    }

    useLayoutEffect(() => {

        // eslint-disable-next-line no-unused-vars
        const updateSize = (e = null, initial = false) => {
            if(window.innerWidth <= 1024){
                // small screen
                if(!smallScreen.current || initial){
                    smallScreen.current = true;
                    speed.current = SPEED.MOBILE;
                    updateTransformPositions();
                }
            }else{
                // large screen
                if(smallScreen.current || initial){
                    smallScreen.current = false;
                    speed.current = SPEED.DESKTOP;
                    updateTransformPositions();
                }
            }
        }
        window.addEventListener('resize', updateSize);
        updateSize(null, true);
        
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {

        // document.addEventListener('click', () => {
        //     console.log("click!");
        //     paused.current = !paused.current;
        // })

        st = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top bottom",
            onEnter: () => {
            //   console.log("onEnter");
              startAnimation();
            },
            onEnterBack: () => {
                // console.log("onEnterBack");
                paused.current = false;
                startAnimation();
            },
            onLeave: () => {
                // console.log("onLeave, pause now")
                pauseAnimation();
            }
        });
        

        setFadeIn(true);

        tl.current
            .to(containerRef.current, 1, {opacity: 1, ease: Power3.easeInOut, onUpdate: checkProgress})
            .play(0);
        
        return () => {
            st.kill();
            cancelAnimationFrame(requestRef.current);
        }
    }, []);

    const checkProgress = () => {
        if(tl.current.progress() >= .2 && !animationStarted.current){
            animationStarted.current = true;
            startAnimation();
        }
    }

    const startAnimation = () => {

        if(paused.current || !animationStarted.current){
            return false;
        }

        paused.current = false;
        requestRef.current = requestAnimationFrame(animate);
    }

    const pauseAnimation = () => {
        
        if(paused.current){
            return false;
        }

        paused.current = true;
        cancelAnimationFrame(requestRef.current)
    }

    const animate = () => {
        
        if(pos1.current.x <= pos1.current.min){
            pos1.current.x = pos1.current.max;
        }

        if(pos2.current.x <= pos2.current.min){
            pos2.current.x = pos2.current.max;
        }

        imageset1.current.style.transform = `matrix(1, 0, 0, 1, ${pos1.current.x}, 0)`;
        imageset2.current.style.transform = `matrix(1, 0, 0, 1, ${pos2.current.x}, 0)`;

        pos1.current.x -= speed.current;
        pos2.current.x -= speed.current;

        requestRef.current = requestAnimationFrame(animate);
    }

    const {images_slideshow} = allWordpressPage.edges[0].node.acf;

    return(
        <div ref={containerRef} className={styles.container}>
            <div ref={imageset1} className={cn(styles.wrapper, {[styles.fadeIn]: fadeIn})}>
                <ImageSet images={images_slideshow} />
            </div>
            <div ref={imageset2} className={styles.wrapper}>
                <ImageSet images={images_slideshow} />
            </div>
        </div>
    )
}

export default ScrollGallery;