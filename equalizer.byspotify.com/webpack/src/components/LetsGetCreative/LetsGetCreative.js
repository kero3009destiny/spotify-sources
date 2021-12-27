import React from 'react';
import cn from 'classnames';
import styles from './lets-get-creative.module.scss';
import { useStaticQuery, graphql } from 'gatsby';
import { DarkOutlinedLink } from '../Buttons';
import Video from '../Video';
import { ANIMATION } from '../../Constants';

const LetsGetCreative = ({removeTopMargin = false}) => {

    const {allWordpressWpGlobal} = useStaticQuery(graphql`
    query LetsGetCreativeQuery {
        allWordpressWpGlobal(filter: {template: {regex: "/lets-get-creative/"}}) {
          edges {
            node {
              acf {
                button
                button_url
                text
                title
                youtube_id
                placeholder_image {
                  localFile {
                    childImageSharp {
                        fixed(width: 640) {
                        ...GatsbyImageSharpFixed_withWebp
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

    const data = allWordpressWpGlobal.edges[0].node.acf;
    const {fixed} = data.placeholder_image.localFile.childImageSharp;

    return(
        <div className={cn("container", styles.container, {[styles.containerMt0]: removeTopMargin})}>
            <div className="row">
                <div data-aos="fade-up" data-aos-once="true" className={cn('col-6 col-12-mobile', styles.left)}>
                    <h3 className={cn('size-1', styles.title)}>{data.title}</h3>
                    <p className={cn('size-2 line-140', styles.text)}>{data.text}</p>
                    <div className="hide-mobile">
                        <DarkOutlinedLink label={data.button} url={data.button_url} />
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-once="true" data-aos-delay={ANIMATION.DELAY} className={cn("col-6 col-12-mobile", styles.right)}>
                    <div className={styles.video}>
                        <Video imageSrc={fixed} youtubeId={data.youtube_id} />
                    </div>
                    <div className={cn("hide-desktop", styles.buttonMobile)}>
                        <DarkOutlinedLink label={data.button} url={data.button_url} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LetsGetCreative;