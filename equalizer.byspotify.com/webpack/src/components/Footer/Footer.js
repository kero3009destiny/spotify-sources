import React from 'react';
import { graphql, useStaticQuery, Link } from "gatsby"
import styles from './footer.module.scss';
import spotifyLogo from '../../images/spotify-logo-white.svg';
import { LightOutlinedLink, ArrowButton } from '../Buttons';
import cn from 'classnames';
import { scrollTo } from '../../Utils';
import { URLS, ANIMATION } from '../../Constants';

const Footer = () => {

    const {allWordpressWpGlobal} = useStaticQuery(graphql`
    query FooterQuery {
        allWordpressWpGlobal(filter: {template: {regex: "/footer/"}}) {
          edges {
            node {
              title
              acf {
                body
                button
                title
                menu {
                  title
                  links {
                    url
                    label
                  }
                }
              }
            }
          }
        }
      }`
    );

    const {acf: {title, body, button, menu}} = allWordpressWpGlobal.edges[0].node;

    return(
        <footer className={cn("block-margin-top", styles.container)}>
            <div className="container relative">
                <div className={styles.scrolltop}><ArrowButton direction="up" onClick={() => scrollTo(0)} /></div>
                <div data-aos="fade-up" data-aos-once="true" className="row center">
                    <div className="col-12 text-center">
                        <h3 className="size-1">{title}</h3>
                        <p className={cn("size-2 size-2-mobile line-140", styles.text)}>{body}</p>
                        <LightOutlinedLink label={button} url={URLS.MAIL} />
                    </div>
                </div>
                <div className={cn("row", styles.menues)}>
                    <div data-aos="fade-up" data-aos-once="true" className={cn("col-3 col-12-mobile nopadding-mobile", styles.logoColumn)}>
                        <a className={styles.logoLink} href={URLS.SPOTIFY} title="Spotify"><img alt="" className={styles.logo} src={spotifyLogo} /></a>
                    </div>
                    {
                        
                        menu.map((node, index) => {
                            const p = new RegExp('http|mailto');

                            return(
                                <div key={index} className="col-3 col-12-mobile nopadding-mobile">
                                    <ul data-aos="fade-up" data-aos-once="true" data-aos-delay={(ANIMATION.DELAY * index) + 100} className={cn('size-4', styles.menu)}>
                                        <li className="fw-normal">{node.title}</li>
                                        {
                                            
                                            node.links.map(link => {
                                                return(
                                                    <li key={link.url} className="line-140">{p.test(link.url) ? <a href={link.url}>{link.label}</a> : <Link to={link.url}>{link.label}</Link>}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={cn('row', styles.copyright)}>
                    <div className="col-12">
                        <ul>
                            <li><a href={URLS.SPOTIFY}>© 2020 Spotify AB.</a></li>
                            <li><a href={URLS.SPOTIFY}>Legal</a></li>
                            <li><a href={URLS.SPOTIFY}>Cookies</a></li>
                            <li><a href={URLS.SPOTIFY}>Privacy policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;