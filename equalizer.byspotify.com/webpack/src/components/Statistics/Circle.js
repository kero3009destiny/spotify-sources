import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './circle.module.scss';
import {gsap, Power3} from 'gsap';
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

const Circle = ({percent, text, play, fadeUpDelay}) => {

    const progressRef = useRef(null);
    const progressJointRef = useRef(null);
    const valueRef = useRef(null);
    const jointsRef = useRef(null);
    
    const [tl] = useState(gsap.timeline({paused: true}));

    useEffect(() => {
        percent = parseFloat(percent);
        const perc = percent/100;
        const len = DrawSVGPlugin.getLength(progressRef.current) * perc;

        const valueStr = {
            current: 0
        }

        const decimals = (percent - Math.floor(percent)) !== 0;

        tl
        .fromTo(progressRef.current, 2, {drawSVG: 0, opacity: 1, visibility:"visible"}, {drawSVG: len, ease: Power3.easeInOut})
        .to(progressJointRef.current, {duration: 2, rotation: perc * 360, ease: Power3.easeInOut}, 0)
        .to(jointsRef.current, {duration: .5, opacity: 1, ease: Power3.easeInOut}, 0)
        .to(valueStr, {duration: 1.8, current: percent, ease: Power3.easeInOut, onUpdate: updateValueLabel, onUpdateParams: [valueStr, decimals]}, 0)
        
        return () => {
            tl.kill();
        }

    }, []);

    const updateValueLabel = (obj, decimals) => {
        if(obj.current < 1 && parseInt(percent) < 1)
            valueRef.current.innerHTML = `${obj.current.toFixed(1)}%`;
        else{
            
            if(decimals){
                valueRef.current.innerHTML = `${obj.current.toFixed(1)}%`;
            }else{
                valueRef.current.innerHTML = `${Math.round(obj.current)}%`;
            }
            
        }
            
    }

    useEffect(() => {
        if(play){
            tl.play();
        }
    }, [play])

    return(
        <div data-aos="fade-up" data-aos-once="true" data-aos-delay={fadeUpDelay} className={styles.container}>
            <div className={styles.circle}>
                <h4 ref={valueRef} className={cn("size-1 size-2-mobile text-center", styles.value)}>0%</h4>
                <p className={cn("line-140 fw-normal size-4-mobile text-center", styles.label)}>{text}</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                    <circle cx="5" cy="5" r="4.75" className={styles.background}/>
                    <circle ref={progressRef} cx="5" cy="5" r="4.75" className={styles.progress}/>
                </svg>
                <div ref={jointsRef} className={styles.joints}>
                    <div className={styles.joint}/>
                    <div ref={progressJointRef} className={styles.joint}/>
                </div>
            </div>
        </div>
    )
}

export default Circle;