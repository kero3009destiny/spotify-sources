/* eslint-disable react/display-name */
import React, {useRef, useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import cn from 'classnames';

import styles from './events-slider.module.scss';
import SlideEntry from './SlideEntry';
import { LightOutlinedLink, ArrowButton } from '../../Buttons';
import { datePassed } from '../../../Utils';
import Constants from '../../../Constants';
import { graphql, useStaticQuery } from "gatsby"

const EventsSlider = React.forwardRef((props, ref) => {

    const {allWordpressWpEvents} = useStaticQuery(graphql`
        query EventsSlider {
            allWordpressWpEvents(sort: {fields: acf___date, order: DESC}) {
                edges {
                    node {
                        title
                        id
                        slug
                        acf {
                            location
                            excerpt
                            date
                            button
                            image{
                                localFile {
                                    childImageSharp {
                                        resolutions(width: 415) {
                                            ...GatsbyImageSharpResolutions_withWebp
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

    const currentEvents = allWordpressWpEvents.edges.filter(eventObj => {
        const {acf: {date}} = eventObj.node;
        return !datePassed(date);
    });

    const swiper = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrevNextClick = direction => {
        if(direction === 'left'){
            swiper.current.slidePrev()
        }else{
            swiper.current.slideNext();
        }
    }

    useEffect(() => {
        return () => {
            if(swiper.current){
                swiper.current.destroy(true, false);
            }
        }
    }, []);

    return(
        <div ref={ref} className={cn("block-margin-top", styles.container)}>
            <h2 className={cn("size-1", styles.title)}>Current events</h2>
            <Swiper
                className={styles.swiper}
                onSwiper={s => {
                    swiper.current = s
                }} 
                onSlideChangeTransitionEnd={() => {
                    if(swiper.current){
                        setActiveIndex(swiper.current.realIndex);
                    }
                }}
                loop={true}
                speed={550}
                slidesPerView={1.23} 
                spaceBetween={20} 
                centeredSlides={true} 
                simulateTouch={false}
                breakpoints={{
                    768: {
                        spaceBetween: 0,
                        slidesPerView: 2
                    },
                    1025: {
                        slidesPerView: 1,
                        spaceBetween: 154
                    },
                    1200: {
                        slidesPerView: 1.3,
                        spaceBetween: 20
                    },
                    1440: {
                        slidesPerView: 1.5,
                        spaceBetween: 150
                    },
                    1600: {
                        spaceBetween: 150,
                        slidesPerView: 1.7
                    },
                    2000: {
                        spaceBetween: 150,
                        slidesPerView: 2,
                    }
                }}
            >
                {
                    currentEvents.map((eventObj, index) => {
                        return(
                            <SwiperSlide className={styles.slide} key={eventObj.node.id}>
                                <SlideEntry active={activeIndex === index} event={eventObj.node} />
                            </SwiperSlide>
                        )
                    })
                }
                <div className={cn(styles.prev)}>
                    <ArrowButton direction="left" onClick={handlePrevNextClick}/>
                </div>
                <div className={cn(styles.next)}>
                    <ArrowButton onClick={handlePrevNextClick} />
                </div>
            </Swiper>
            <div className={styles.button}>
                <LightOutlinedLink internalPath={`/${Constants.PAGE_SLUG_EVENTS}`} label={Constants.UI_TEXT.SEE_ALL_EVENTS} />
            </div>
        </div>
    )
});

export default EventsSlider;