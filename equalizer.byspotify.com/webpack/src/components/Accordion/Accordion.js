import React from 'react';
import { graphql, useStaticQuery } from "gatsby"
import Question from './Question';

const Accordion = () => {

    const {allWordpressWpFaq} = useStaticQuery(graphql`
        query FAQQuery {
            allWordpressWpFaq {
                edges {
                    node {
                        title
                        content
                        id
                    }
                }
            }
        }`
    );

    return(
        <div className="block-margin-top">
            { allWordpressWpFaq.edges.map(faqObj => <Question key={faqObj.node.id} question={faqObj.node.title} answer={faqObj.node.content} />) }
        </div>
    )
}



export default Accordion;