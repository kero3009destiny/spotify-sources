import React from 'react';

export default ({ className = '' }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="16" cy="16" r="16" fill="#EEEEEE" />
    <rect x="9.5" y="12.5" width="13" height="9" stroke="#181818" />
    <rect x="12.5" y="10.5" width="7" height="2" stroke="#181818" />
    <path
      d="M22.5 15C22.1667 15.3333 20.5 16.5 20.5 16.5L11.5 16.5L9.5 15"
      stroke="#181818"
    />
    <rect x="14" y="16" width="4" height="2" fill="#181818" />
  </svg>
);
