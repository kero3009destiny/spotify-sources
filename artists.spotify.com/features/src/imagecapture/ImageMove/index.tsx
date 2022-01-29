// ignore-string-externalization
import React from 'react';

type ImageMoveProps = {
  className?: string;
};
export const ImageMove = ({ className }: ImageMoveProps) => (
  <svg
    className={className}
    width="81"
    height="81"
    viewBox="0 0 81 81"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M52.498 65.082L41.837 77.481V51.485h-1.5V77.48L29.635 65.082l-1.135.98L41.09 80.65l12.545-14.59zM29.515 38.998H3.52l12.399-10.661-.978-1.137L.35 39.745l14.59 12.59.98-1.136L3.518 40.498h25.997zM66.058 27l-.978 1.137 12.4 10.662H51.484v1.5H77.48L65.079 51l.981 1.137 14.589-12.591zM41.09 0L28.5 14.589l1.136.98 10.7-12.4v25.997h1.5V3.169L52.5 15.57l1.136-.979z"
      fill="#FFF"
      fillRule="evenodd"
    />
  </svg>
);
