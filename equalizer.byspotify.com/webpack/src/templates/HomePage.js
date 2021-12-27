import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'
import IntroText from "../sections/Home/IntroText"
import Accordion from "../components/Accordion"
import Tabs from "../sections/Home/Tabs"
import Playlists from "../sections/Home/Playlists/Playlists"
import SpotifyForArtists from "../components/SpotifyForArtists/SpotifyForArtists"
import LetsGetCreative from "../components/LetsGetCreative"
import EventsSlider from "../components/Events/EventsSlider/EventsSlider"
import Statistics from "../components/Statistics"
import ScrollGallery from "../sections/Home/ScrollGallery"
import { scrollTo } from "../Utils"

const HomePage = ({data, pageContext}) => {
    
    const pageData = data.allWordpressPage.edges[0].node;
    const eventsRef = React.createRef();

    const handleCurrentEventsClick = () => {
        scrollTo(eventsRef.current.offsetTop)
    }

    // console.log("current events: ", pageContext.currentEvents);
    
    return(
        <Layout>
            <SEO title={""} />
            <IntroText onClick={handleCurrentEventsClick} body={pageData.acf.intro_text} currentEvents={pageContext.currentEvents} />
            <ScrollGallery />
            <Tabs data={pageData.acf.intro_tabs} />
            {pageContext.currentEvents > 0 && <EventsSlider ref={eventsRef} />}
            <LetsGetCreative />
            <Playlists data={pageData.acf.playlists} />
            <Statistics />
            <Accordion />
            <SpotifyForArtists />
        </Layout>
    )
}

export const query = graphql`
query HomePageQuery {
    allWordpressPage(filter: {slug: {eq: "home"}}) {
      edges {
        node {
          title
          wordpress_id
          acf {
            intro_text
            images_slideshow {
              image {
                source_url
                media_details {
                    height
                    width
                }
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 526) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                id
              }
            }
            intro_tabs {
              tab_name
              title
              body
              button_label
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 640) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                id
              }
            }
            playlists {
              playlist_1
              playlist_2
              playlist_3
              text
              title
              button
            }
          }
        }
      }
    }
  }
`
export default HomePage;
