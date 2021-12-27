import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import styles from './statistics.module.scss';
import {FilterSelect} from '../Select';
import Circle from './Circle';
import { useStaticQuery, graphql } from 'gatsby';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { shorthandYear } from '../../Utils';
import { ANIMATION } from '../../Constants';

gsap.registerPlugin(ScrollTrigger);

const Statistics = () => {
    
    const {allWordpressPage} = useStaticQuery(graphql`
    query StatisticsQuery {
        allWordpressPage(filter: {slug: {eq: "home"}}) {
          edges {
            node {
              acf {
                title
                text
                countries {
                  name
                  years {
                    year
                    circles {
                      percent
                      text
                    }
                  }
                }
              }
            }
          }
        }
      }
    `);

    const {countries, title, text} = allWordpressPage.edges[0].node.acf;
    const countryOptions = countries.map((country, index) => {
        return {
            label: country.name,
            value: index
        }
    })

    const [currentCountry, setCurrentCountry] = useState(countries[0]);
    const [currentYearIndex, setCurrentYearIndex] = useState(currentCountry.years.length - 1);
    const containerRef = useRef(null);
    const [triggered, setTriggered] = useState(false);
    let st;

    // console.log("Countries: ", countries);
    // console.log("Current country: ", currentCountry);
    // console.log("Current year: ", currentYearIndex);

    useEffect(() => {
        st = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top center-=140px",
            onEnter: () => {
                if(!triggered){
                    setTriggered(true);
                }
            }
          });
        return () => {
            st.kill();
        }
    }, []);
    
    const handleCountryChange = index => {
        setCurrentCountry(countries[index]);
        if(!countries[index].years[currentYearIndex]){
            setCurrentYearIndex(countries[index].years.length - 1);
        }
    }

    // const handleYearChange = index => {
    //     setCurrentYearIndex(index);
    // }

    return(
        <div ref={containerRef} className="container block-margin-top">
            <div className="row">
                <div className={cn("col-12", styles.text)}>
                    <h3 className="size-1">{title}</h3>
                    <p className="size-2 line-140">{shorthandYear(text, currentCountry.years[currentYearIndex].year)}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 text-center">
                    <FilterSelect onChange={handleCountryChange} options={countryOptions} />
                </div>
            </div>
            <div className="row center">
                <SwitchTransition mode={"out-in"}>
                    <CSSTransition
                        key={`${currentCountry.name}-${currentYearIndex}`}
                        addEndListener={(node, done) => {
                            node.addEventListener("transitionend", done, false);
                        }}
                        classNames={styles}
                    >
                        <div className={cn("col-12 col-12-mobile", styles.circles)}>
                            { currentCountry.years[currentYearIndex].circles.map((circle, index) => <Circle fadeUpDelay={ANIMATION.DELAY * index} play={triggered} key={index} percent={circle.percent} text={circle.text} />) }
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </div>
            {/* <div className="row center">
                <div className="col-12 desktop-nopadding">
                    <ul className={cn("size-4 size-3-mobile fw-normal", styles.years)}>
                        { currentCountry.years.map((yearObj, index) => <li className={cn({[styles.active]: index === currentYearIndex})} onClick={() => handleYearChange(index)} key={yearObj.year}>{yearObj.year}</li>) }
                    </ul>
                </div>
            </div> */}
        </div>
    )
}

export default Statistics;