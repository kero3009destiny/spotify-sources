import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import uniqueId from 'lodash/uniqueId';

import * as Styled from './Checkbox.styled';

function Checkbox({
  className = null,
  text = '',
  value,
  checked = false,
  onChange,
  ...props
}) {
  const [id, setId] = useState('');

  useEffect(() => {
    // The setId function is wrapped inside useEffect to avoid different id's
    // between the server side rendering and the client rendering
    setId(uniqueId('checkbox-'));
  }, []);

  return (
    <Styled.Container role="group" aria-label={text}>
      <Styled.Checkbox htmlFor={id} className={className}>
        <input
          checked={checked}
          id={id}
          name={value}
          value={value}
          type="checkbox"
          onChange={onChange}
          {...props}
        />
        {/* eslint-disable-next-line react/self-closing-comp */}
        <div></div>
        {/* 👆 This empty div is the actual checkbox, it's styles depend on the - */}
        {/* parent's state (focused, disabled...), that's why it's not a styled component */}
        <span>{text}</span>
      </Styled.Checkbox>
    </Styled.Container>
  );
}

Checkbox.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  checked: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

export default Checkbox;
