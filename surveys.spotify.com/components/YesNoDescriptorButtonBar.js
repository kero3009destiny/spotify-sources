import Button from 'react-bootstrap/lib/Button';
import PropTypes from 'prop-types';
import React from 'react';

const emptyFunction = () => {
};

const FlatButton = ({isFlat, ...props}) => (<Button
  {...props}
  className={isFlat ? 'flat-btn' : ''}
>
  {props.children}
</Button>);

FlatButton.propTypes = {
  isFlat: PropTypes.bool,
  bsStyle: PropTypes.string,
  onClick: PropTypes.any,
  disabled: PropTypes.bool,
};

export default function YesNoDescriptorButtonBar({
     onChange = emptyFunction,
     loading,
   }) {
  return (
    <div className="yes-no-button-bar">
      <ul>
        <li>
          <FlatButton
            isFlat
            bsStyle={'primary'}
            onClick={onChange.bind(undefined, {rating: 1.0})}
            disabled={!!loading}
          >
            Yes
          </FlatButton>
        </li>

        <li>
          <FlatButton
            isFlat
            bsStyle={'primary'}
            onClick={onChange.bind(undefined, {rating: 0.0})}
            disabled={!!loading}
          >
            No
          </FlatButton>
        </li>

        <li>
          <FlatButton
            isFlat
            bsStyle={'primary'}
            onClick={onChange.bind(undefined, {rating: 0.5})}
            disabled={!!loading}
          >
            Unsure
          </FlatButton>
        </li>
      </ul>
    </div>
  );
}

YesNoDescriptorButtonBar.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  loading: PropTypes.bool,
};



// WEBPACK FOOTER //
// ./src/components/YesNoDescriptorButtonBar.js