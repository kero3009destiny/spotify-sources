import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown/with-html';
import gfm from 'remark-gfm';

const Markdown = (props) => {
  if (!props.source) {
    return null;
  }
  return (
    <ReactMarkdown plugins={[gfm]} children={props.source} style={{overflow: 'auto', height: 'inherit'}} allowDangerousHtml/>
  );
};

Markdown.propTypes = {
  source: PropTypes.string,
};

export default Markdown;
