import React from 'react';

interface Props {
  className?: string;
}

export const IllustrationAuthentication = ({ className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 112 116"
    className={className}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      fill="none"
      strokeLinejoin="round"
      strokeWidth="3.4"
      d="M3 93c-8 29 17 27 22 3 1-8 6-31-1-37-11-9-11 27-11 33 1 14 10 27 25 19 10-5 18-22 21-33 3-10 9-28 2-37-9-13-19-3-23 9-7 21 5 70 34 55 22-10 30-54 31-76 1-8 2-26-10-27-11-1-16 20-17 28-2 11-2 26 5 36 7 9 25 15 29-1"
    />
  </svg>
);
