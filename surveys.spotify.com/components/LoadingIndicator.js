import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export default function Loading({
  className,
  size,
  style = {},
  ...transferredProps
}) {
  const containerStyle = { ...style };
  if (typeof size !== 'undefined') {
    containerStyle.height = size;
    containerStyle.width = size;
  }

  const svgProps = {...transferredProps};
  delete svgProps.error;

  return (
    <div className={classNames('loading-indicator', className)}>
      <div className="image-container" style={containerStyle}>
        <svg
          width="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          {...svgProps}
        >
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="none"
            className="bk"
          />
          <g>
            <animate
              attributeName="opacity"
              dur="1.8s"
              repeatCount="indefinite"
              begin="0s"
              keyTimes="0;0.33;1"
              values="1;1;0"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#1DB954"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
            >
              <animate
                attributeName="r"
                dur="1.8s"
                repeatCount="indefinite"
                begin="0s"
                keyTimes="0;0.33;1"
                values="0;22;44"
              />
            </circle>
          </g>
          <g>
            <animate
              attributeName="opacity"
              dur="1.8s"
              repeatCount="indefinite"
              begin="0.9s"
              keyTimes="0;0.33;1"
              values="1;1;0"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#1ed760"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
            >
              <animate
                attributeName="r"
                dur="1.8s"
                repeatCount="indefinite"
                begin="0.9s"
                keyTimes="0;0.33;1"
                values="0;22;44"
              />
            </circle>
          </g>
        </svg>
      </div>
    </div>
  );
}

Loading.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};



// WEBPACK FOOTER //
// ./src/components/LoadingIndicator.js