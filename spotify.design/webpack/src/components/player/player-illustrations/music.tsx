import React from 'react';

interface Props {
  className?: string;
}

export const IllustrationMusic = ({ className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 142 140"
    className={className}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3.6"
      d="M63 60c-14-2-50 2-58-6-7-6 36 48 31 70s-43 10-31-13c5-11 22-13 28-1"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3.6"
      d="M58 56c-7-6 37 48 32 69-6 22-40 12-32-12 5-14 23-14 30 3M139 14c-17-3-30-3-40-12-8-7 40 64 36 79-6 25-49 12-36-14 6-12 25-15 33-1"
    />
  </svg>
);
