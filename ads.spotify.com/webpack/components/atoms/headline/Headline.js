import PropTypes from 'prop-types';
import React from 'react';
import capitalize from 'lodash/capitalize';
import get from 'lodash/get';
import snakeCase from 'lodash/snakeCase';

import * as Styled from './Headline.styled';

const anchorIdSupport = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const getChildrenText = children => {
  if (!children) return '';

  return (
    React.Children.map(children, child => {
      if (typeof child === 'string') return child;

      if (get(child, 'props.dangerouslySetInnerHTML')) {
        const div = document.createElement('div');
        // eslint-disable-next-line no-underscore-dangle
        div.innerHTML = get(child, 'props.dangerouslySetInnerHTML.__html');

        return div.innerText || '';
      }

      return getChildrenText(get(child, 'props.children'));
    }) || []
  ).join('');
};

function Headline({
  tag = 'h1',
  styling = 'h1',
  className = null,
  children,
  forwardedRef,
  style,
  id,
}) {
  const HeadlineSelected = Styled[capitalize(styling)] || Styled.H1;

  return (
    <HeadlineSelected
      id={id}
      ref={forwardedRef}
      as={tag}
      className={className}
      style={style}
    >
      {anchorIdSupport.includes(tag) && (
        <Styled.AnchorId id={snakeCase(getChildrenText(children))} />
      )}
      {children}
    </HeadlineSelected>
  );
}

Headline.propTypes = {
  tag: PropTypes.string,
  styling: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default React.forwardRef((props, ref) => (
  <Headline {...props} forwardedRef={ref} />
));
