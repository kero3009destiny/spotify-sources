import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import * as gtag from "../analytics/gtag"

import Header from "./atoms/header"
import Footer from "./atoms/footer"
import "./layout.css"

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false)
  const [isBouncing, setIsBouncing] = React.useState(false)
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const handleScroll = () => {
    window.innerWidth <= 768
      ? window.scrollY > document.querySelector("header").offsetHeight
        ? setCollapsed(true)
        : setCollapsed(false)
      : setCollapsed(false)
  }

  React.useEffect(() => {
    window.addEventListener("scroll", () => !!isBouncing || setIsBouncing(true))
  }, [])

  React.useEffect(() => {
    const scroll = window.scrollY
    const handler = setTimeout(() => {
      window.scrollY === scroll &&
        gtag.event({
          action: `scroll-${window.location.pathname === "/terms" ? 1 : 0}`,
          category: "home",
          label: "preencha",
        })
      setIsBouncing(false)
    }, 3000)
    return () => {
      clearTimeout(handler)
    }
  }, [isBouncing])

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <Container>
        <Header
          collapsed={collapsed}
          siteTitle={data.site.siteMetadata.title}
        />
        <Content>{children}</Content>
      </Container>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

const Container = styled.div`
  display: flex;
  background-color: #ffbf58;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`

const Content = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 960px;
  padding: 30px 7.5%;
  min-height: calc(100vh - 273px);
  @media screen and (min-width: 768px) {
    min-height: calc(100vh - 66px);
  }
`
