/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useLayoutEffect } from "react"
import PropTypes from "prop-types"

import Header from "./Header"
import "../styles/default.scss";
import Footer from "./Footer";
import cn from 'classnames';
import AOS from "aos";
import "aos/dist/aos.css";

const Layout = ({ children, skipOffset = false }) => {

    useLayoutEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="site">
            <Header />
            <main className={cn({'page': !skipOffset})}>{children}</main>
            <Footer />
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default Layout
