import React, {useEffect, useState, useRef} from 'react';
import styles from './mobile-menu.module.scss';
import cn from 'classnames';
import {gsap} from 'gsap';
import { Link } from 'gatsby';
import Constants from '../../Constants';

const MobileMenu = ({open, onBackdropClick, eventPage}) => {

    let overlayTarget = null;
    let linkAboutRef = null;
    let linkEventsRef = null;
    let backdropRef = null;
    let navRef = null;

    const mounted = useRef(false);

    const [tl] = useState(gsap.timeline({paused: true}));
    
    useEffect(() => {
        gsap.set(linkAboutRef, {transform: "translateY(-20px)", autoAlpha: 0});
        gsap.set(linkEventsRef, {transform: "translateY(-20px)", autoAlpha: 0});
        gsap.set(backdropRef, {autoAlpha: 0});
        gsap.set(navRef, {autoAlpha: 0});
        
        tl
            .to(overlayTarget, {duration: .45, transform: "scaleY(1)"})
            .set(navRef, {autoAlpha: 1}, 0)
            .to(backdropRef, {duration: .45, autoAlpha: 1}, 0)
            .to(linkAboutRef, {duration: .25, transform: "translateY(0)", autoAlpha: 1}, .12)
            .to(linkEventsRef, {duration: .25, transform: "translateY(0)", autoAlpha: 1}, .18)
            .reverse();

        mounted.current = true;
    }, []);

    useEffect(() => {
        if(open){
            document.body.classList.add('no-scroll');
        }else{
            document.body.classList.remove('no-scroll');
        }
        tl.reversed(!open);
    }, [open]);

    const containerStyles = {
        display: "none"
    };

    return(
        <div style={!mounted.current ? containerStyles : null}>
            <div ref={e => overlayTarget = e} className={cn(styles.overlay, {[styles.eventPage]: eventPage})}></div>
            <div ref={e => backdropRef = e} onClick={onBackdropClick} className={cn(styles.backdrop, {[styles.open]: open})} />
            <div ref={e => navRef = e} className={cn(styles.nav, {[styles.eventPage]: eventPage})}>
                <Link ref={e => linkAboutRef = e} className="size-1" to={`/${Constants.PAGE_SLUG_ABOUT}`}>{Constants.UI_TEXT.PAGE_ABOUT}</Link>
                <Link ref={e => linkEventsRef = e} className="size-1" to={`/${Constants.PAGE_SLUG_EVENTS}`}>{Constants.UI_TEXT.PAGE_EVENTS}</Link>
            </div>
        </div>
    )
}

export default MobileMenu;