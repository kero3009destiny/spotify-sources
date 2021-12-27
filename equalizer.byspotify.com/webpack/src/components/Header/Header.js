import { Link, graphql, useStaticQuery } from "gatsby"
import React, {useState} from "react"
import styles from './header.module.scss';
import cn from 'classnames';
import Hamburger from "./Hamburger";
import MobileMenu from "../MobileMenu/MobileMenu";
import { Location } from '@reach/router'
import { eventSlug } from "../../Utils";
import { URLS } from "../../Constants";


const Header = () => {

    const {allWordpressPage} = useStaticQuery(graphql`
        query LinksQuery {
            allWordpressPage(filter: {slug: {nin: "home"}}) {
                edges {
                    node {
                        title
                        slug,
                        id
                    }
                }
            }
        }`
    );

    const [open, setIsOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsOpen(prevState => !prevState);
    }

    return(
        <Location>
            {({ location }) => {
                const eventPage = eventSlug(location.pathname);
                
                return(
                    <>
                        <MobileMenu eventPage={eventPage} open={open} onBackdropClick={handleToggleMenu} />
                        <header className={cn(styles.header, {[styles.eventPage]: eventPage})}>
                            <div className={cn("container", styles.container)}>
                                <div className="row">
                                    <div className={cn("col-4 col-3-mobile", styles.column)}>
                                        <a aria-label="Go to Spotify website" className={styles.logoLink} href={URLS.SPOTIFY}>
                                            <div className={styles.logo} />
                                        </a>
                                    </div>
                                    <div className={cn("col-4 col-6-mobile", styles.column)}>
                                        <Link to="/">
                                            <div className={styles.equalizer} />
                                        </Link>
                                    </div>
                                    
                                    <div className={cn("col-4 col-3-mobile", styles.column, styles.columnTop)}>
                                        <nav className={cn("hide-mobile", styles.nav)}>
                                            {
                                                allWordpressPage.edges.map(pageObj => {
                                                    return <Link key={pageObj.node.id} to={`/${pageObj.node.slug}`} activeClassName={styles.nav__linkActive} className={cn('size-4 fw-normal', styles.nav__link)}>{pageObj.node.title}</Link>
                                                })
                                            }
                                        </nav>
                                        <Hamburger eventPage={eventPage} open={open} onClick={handleToggleMenu} />
                                    </div>
                                </div>
                            </div>
                        </header>
                    </>
                )
            }}
        </Location>
    )
}

export default Header
