import Button from 'react-bootstrap/lib/Button';
import PropTypes from 'prop-types';
import React from 'react';

const emptyFunction = () => {};

export default function YesNoButtonBar({
  onChange = emptyFunction,
  value,
  loading,
}) {
  return (
    <div className="yes-no-button-bar">
      <ul>
        <li>
          <Button
            bsStyle={value !== 0 ? 'success' : 'primary'}
            onClick={onChange.bind(undefined, { rating: 1.0 })}
            disabled={!!loading}
          >
            Yes
          </Button>
        </li>
        <li>
          <Button
            bsStyle={value === 0 ? 'success' : 'danger'}
            onClick={onChange.bind(undefined, { rating: 0 })}
            disabled={!!loading}
          >
            No
          </Button>
        </li>
      </ul>
    </div>
  );
}

YesNoButtonBar.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  loading: PropTypes.bool,
};



// WEBPACK FOOTER //
// ./src/components/YesNoButtonBar.js