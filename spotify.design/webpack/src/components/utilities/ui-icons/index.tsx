import React from 'react';
import style from './style.module.css';

interface Props {
  className?: string;
}

interface RotateableIconProps extends Props {
  rotation?: number;
}

interface LogoProps extends Props {
  width?: number;
  height?: number;
}

export const Logo = ({ className = '', width, height }: LogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 638 120"
    width={width}
    height={height}
    role="img"
    className={className}
  >
    <path
      fill="currentColor"
      d="M312.3 27.6c-3.66 0-6.66 3-6.66 6.66s3 6.66 6.66 6.66 6.66-3 6.66-6.66a6.72 6.72 0 00-6.66-6.66zM95.52 53.22c-19.38-11.52-51.3-12.6-69.72-6.96a5.65 5.65 0 01-7.02-3.72 5.65 5.65 0 013.72-7.02c21.18-6.42 56.4-5.22 78.72 8.04a5.65 5.65 0 011.98 7.68 5.66 5.66 0 01-7.68 1.98zm-.66 16.98a4.7 4.7 0 01-6.42 1.56c-16.14-9.9-40.74-12.78-59.76-7.02a4.69 4.69 0 01-5.82-3.12 4.69 4.69 0 013.12-5.82c21.78-6.6 48.9-3.42 67.38 7.98a4.65 4.65 0 011.5 6.42zm-7.32 16.32a3.78 3.78 0 01-5.16 1.26c-14.1-8.64-31.8-10.56-52.68-5.76a3.73 3.73 0 01-4.5-2.82 3.73 3.73 0 012.82-4.5c22.86-5.22 42.48-3 58.26 6.66a3.8 3.8 0 011.26 5.16zM60 0C26.88 0 0 26.88 0 60c0 33.12 26.88 60 60 60 33.12 0 60-26.88 60-60 0-33.12-26.88-60-60-60zM163.26 55.38c-10.38-2.46-12.18-4.2-12.18-7.86 0-3.42 3.24-5.76 8.04-5.76 4.68 0 9.3 1.74 14.16 5.4.12.12.36.18.54.12.18 0 .36-.12.42-.3l5.04-7.14c.18-.3.18-.72-.12-.9a30.71 30.71 0 00-19.92-6.9c-11.16 0-19.02 6.72-19.02 16.32 0 10.32 6.72 13.92 18.36 16.74 9.9 2.28 11.58 4.2 11.58 7.62 0 3.78-3.36 6.12-8.82 6.12-6.06 0-10.98-2.04-16.5-6.84a.68.68 0 00-.48-.18c-.18 0-.36.12-.48.24l-5.7 6.72c-.24.3-.18.72.06.96a33.74 33.74 0 0022.86 8.76c12.06 0 19.86-6.6 19.86-16.8.06-8.46-5.1-13.26-17.7-16.32zM217.02 66.96c0 7.26-4.5 12.36-10.92 12.36-6.36 0-11.1-5.28-11.1-12.36 0-7.02 4.8-12.36 11.1-12.36 6.36 0 10.92 5.16 10.92 12.36zm-8.76-21.78c-5.22 0-9.48 2.04-13.02 6.3v-4.74c0-.36-.3-.66-.66-.66h-9.3c-.36 0-.66.3-.66.66v52.74c0 .36.3.66.66.66h9.3c.36 0 .66-.3.66-.66V82.8a16.63 16.63 0 0013.02 5.88c9.72 0 19.56-7.5 19.56-21.78 0-14.28-9.84-21.72-19.56-21.72zM253.02 79.38c-6.66 0-11.64-5.34-11.64-12.42 0-7.14 4.86-12.3 11.52-12.3 6.72 0 11.76 5.34 11.76 12.42-.06 7.14-4.92 12.3-11.64 12.3zm0-34.2c-12.48 0-22.32 9.6-22.32 21.9 0 12.18 9.72 21.66 22.14 21.66 12.54 0 22.38-9.6 22.38-21.84 0-12.18-9.78-21.72-22.2-21.72zM301.92 46.02h-10.2V35.58c0-.36-.3-.66-.66-.66h-9.3c-.36 0-.66.3-.66.66v10.44h-4.5c-.36 0-.66.3-.66.66v7.98c0 .36.3.66.66.66h4.44v20.64c0 8.34 4.14 12.54 12.36 12.54 3.3 0 6.06-.66 8.7-2.16a.66.66 0 00.36-.6v-7.62a.74.74 0 00-.3-.6c-.18-.12-.48-.12-.66-.06-1.8.9-3.54 1.32-5.46 1.32-3 0-4.32-1.38-4.32-4.38V55.2h10.2c.36 0 .66-.3.66-.66v-7.86c0-.36-.3-.66-.66-.66zM337.5 46.08v-1.26c0-3.78 1.44-5.46 4.68-5.46 1.92 0 3.48.36 5.22.96.24.06.42.06.6-.12.18-.12.3-.36.3-.54v-7.8c0-.3-.18-.54-.48-.66a26.08 26.08 0 00-7.74-1.08c-8.58 0-13.08 4.8-13.08 13.92v1.98h-4.44c-.36 0-.66.3-.66.66v8.04c0 .36.3.66.66.66H327v31.8c0 .36.3.66.66.66h9.3c.36 0 .66-.3.66-.66v-31.8h8.64l13.26 31.8c-1.5 3.36-3 4.02-5.04 4.02-1.62 0-3.36-.48-5.1-1.44a.58.58 0 00-.54-.06.8.8 0 00-.42.36l-3.12 6.9c-.12.3 0 .72.3.9 3.3 1.8 6.24 2.52 9.9 2.52 6.84 0 10.62-3.18 13.98-11.76l16.08-41.58a.87.87 0 00-.06-.66.72.72 0 00-.54-.3h-9.66c-.3 0-.54.18-.66.48l-9.84 28.2-10.86-28.26a.74.74 0 00-.66-.42H337.5zM316.86 46.02h-9.3c-.36 0-.66.3-.66.66v40.44c0 .36.3.66.66.66h9.3c.36 0 .66-.3.66-.66V46.68c0-.36-.3-.66-.66-.66zM393.9 79.62h-1.68v2.16h1.68c.84 0 1.38-.42 1.38-1.08 0-.72-.54-1.08-1.38-1.08zm1.14 3.12l1.86 2.58h-1.56l-1.68-2.4h-1.44v2.4h-1.32v-6.84h3.06c1.62 0 2.64.84 2.64 2.16 0 1.14-.66 1.8-1.56 2.1zm-1.44-6.54a5.83 5.83 0 00-5.88 5.94 5.8 5.8 0 005.82 5.88 5.83 5.83 0 005.88-5.94c0-3.3-2.52-5.88-5.82-5.88zm-.06 12.42a6.52 6.52 0 01-6.54-6.54c0-3.6 2.88-6.54 6.54-6.54a6.52 6.52 0 016.54 6.54 6.56 6.56 0 01-6.54 6.54zM431.46 81.3c10.32 0 19.02-6.96 19.02-20.94 0-14.1-8.52-21.18-18.84-21.18H420v42.18h11.46v-.06zm-19.2 6.84V32.28h19.56c14.16 0 26.58 9.72 26.58 28.08 0 18.3-12.54 27.84-26.7 27.84h-19.44v-.06zM492.84 65.34c-.18-5.46-3.72-9.72-10.38-9.72-6.24 0-10.02 4.8-10.32 9.72h20.7zm7.5 12c-2.1 6.72-8.22 12-17.04 12-10.14 0-19.08-7.38-19.08-20.28 0-11.88 8.58-20.04 18.12-20.04 11.64 0 18.18 8.04 18.18 19.86 0 .96-.06 1.92-.18 2.34h-28.56c.18 6.78 5.04 11.52 11.4 11.52 6.12 0 9.24-3.36 10.62-7.62l6.54 2.22zM511.98 75.96c.48 3.96 3.48 7.08 8.82 7.08 4.2 0 6.48-2.34 6.48-5.04 0-2.34-1.74-4.2-4.86-4.86l-6.48-1.44c-5.94-1.26-9.48-5.28-9.48-10.62 0-6.48 6.06-12 13.5-12 10.38 0 13.62 6.78 14.4 10.14l-6.54 2.46c-.3-1.98-1.92-6.3-7.86-6.3-3.78 0-6.3 2.46-6.3 5.04 0 2.28 1.44 3.96 4.32 4.56l6.12 1.32c6.84 1.5 10.5 5.7 10.5 11.28 0 5.34-4.5 11.76-13.86 11.76-10.38 0-14.82-6.72-15.42-11.04l6.66-2.34zM542.58 50.28h7.32V88.2h-7.32V50.28zm3.6-19.74c3 0 5.34 2.34 5.34 5.34a5.26 5.26 0 01-5.34 5.28 5.25 5.25 0 01-5.28-5.28c0-2.94 2.4-5.34 5.28-5.34zM587.16 67.98c0-7.32-4.44-12.12-10.8-12.12-6.54 0-10.98 4.8-10.98 12.12 0 7.38 4.26 12.12 10.98 12.12 6.42 0 10.8-4.8 10.8-12.12zm-22.2 20.58c.54 5.28 4.56 9.3 10.32 9.3 7.98 0 11.58-4.08 11.58-12.3V80.1c-1.8 3.48-5.94 6.24-11.58 6.24-10.08 0-17.4-7.62-17.4-18.36 0-10.26 7.02-18.42 17.4-18.42 5.82 0 9.78 2.22 11.64 6v-5.28h7.32v35.1c0 9.6-4.74 19.02-19.02 19.02-9.48 0-16.56-6-17.52-14.1l7.26-1.74zM612.06 88.14h-7.38V50.28h7.26v5.46c2.76-4.74 7.26-6.54 11.64-6.54 9.06 0 13.56 6.54 13.56 15v24.06h-7.38v-22.8c0-5.28-2.22-9.54-8.82-9.54-5.82 0-8.82 4.62-8.82 10.38v21.84h-.06z"
    />
  </svg>
);

export const IconArrow = ({
  className = '',
  rotation,
}: RotateableIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    style={{ transform: `rotate(${rotation}deg)` }}
    className={className}
    fill="none"
  >
    <path stroke="currentColor" strokeWidth="1.4" d="M12 3v17M19 13l-7 7-7-7" />
  </svg>
);

export const IconChevron = ({
  className = '',
  rotation,
}: RotateableIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    style={{ transform: `rotate(${rotation}deg)` }}
    className={className}
  >
    <path fill="currentColor" d="M12 16L4.1049 7 3 8l9 10 9-10-1-1z" />
  </svg>
);

export const IconSkip = ({ className = '', rotation }: RotateableIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    style={{ transform: `rotate(${rotation}deg)` }}
    className={className}
  >
    <path fill="#191414" d="M9 18v-5l8 5V6l-8 5V6H7v12z" />
  </svg>
);

/** @TODO(pimdewit): needs re-exporting from vector software that is not Figma. */
export const IconShuffle = ({ className = '' }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className={className}
  >
    <g fill="currentColor" stroke="currentColor" strokeWidth=".2">
      <path d="M17.4491 6.70996h.17v2.29l4.76-2.75-4.76-2.79v2.25h-.16a6.50007 6.50007 0 00-4.95 2.29L5.79914 15.84a5.50032 5.50032 0 01-4.18 1.93v1a6.491 6.491 0 002.72046-.5974A6.48927 6.48927 0 006.55914 16.49l6.70996-7.85004a5.49034 5.49034 0 011.8779-1.42435 5.49043 5.49043 0 012.3021-.50565h0zM22.3798 17.7902l-4.76-2.79v2.25h-.17a5.48862 5.48862 0 01-2.302-.5057 5.48975 5.48975 0 01-1.878-1.4243l-1.27-1.39-.66.77 1.17 1.3a6.49996 6.49996 0 002.22 1.6817 6.50077 6.50077 0 002.72.5983h.17v2.25l4.76-2.74zM5.79914 8.15998l1.63 1.91.66-.77-1.53-1.79a6.49006 6.49006 0 00-4.94-2.28v1a5.50001 5.50001 0 014.18 1.93z" />
    </g>
  </svg>
);

export const IconClipboard = ({ className = '' }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    className={className}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.4"
      d="M13.31 10.87a3.8 3.8 0 010 5.36L9.75 19.8a3.94 3.94 0 01-5.55 0v0a3.94 3.94 0 010-5.55L7 11.41"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.4"
      d="M10.69 13.13a3.8 3.8 0 010-5.36l3.56-3.57a3.94 3.94 0 015.55 0v0a3.94 3.94 0 010 5.55L17 12.58"
    />
  </svg>
);

export const IconCheckmark = ({ className = '' }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className={className}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      d="M5.5 12.6l4.2 5 9-10.7"
    />
  </svg>
);

export const IconClose = ({ className = '' }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className={className}
  >
    <path
      stroke="currentColor"
      strokeWidth="1.4"
      d="M1.4 22.6L22.6 1.4m-21.2 0l21.2 21.2L1.4 1.4z"
    />
  </svg>
);

export const IconPause = ({ className = '' }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className={className}
  >
    <path fill="currentColor" d="M5 3h4v18H5zM15 3h4v18h-4z" />
  </svg>
);

export const IconPlay = ({ className = '' }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className={className}
  >
    <path fill="currentColor" d="M20 11.6L6 20V4z" />
  </svg>
);

export const IconPlayCircular = ({ className = '' }: Props) => (
  <div className={`${style.iconPlay} ${className}`}>
    <IconPlay />
  </div>
);
