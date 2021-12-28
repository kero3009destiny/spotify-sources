import React from 'react';
import SVG from 'react-inlinesvg';

interface IIconProps {
  src: string
}

const Icon = (props: IIconProps) => {
  return (
    <SVG src={props.src} />
  )
}

export default Icon;