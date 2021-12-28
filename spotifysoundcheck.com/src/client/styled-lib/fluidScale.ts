interface IScale {
  min: string,
  max: string
}

interface ITypeScale {
  fontSize: IScale,
  lineHeight: IScale,
  letterSpacing: IScale,
  viewports?: IScale
}

function getLineHeight (fontSize: string, lineHeight: string) {
  return `${parseInt(lineHeight, 10) / parseInt(fontSize, 10)}em`
}

function fluidTypeScale(scale: TypeScale) {
  const {
    fontSize,
    lineHeight,
    letterSpacing,
    viewports = { min: '480px', max: '1280px' }
  } = scale

  function fluidScale (min: string, max: string) {
    return `
      calc(
        ${min} + (${parseFloat(max)} - ${parseFloat(min)}) *
        ((100vw - ${viewports.min}) / (${parseInt(viewports.max, 10)} - ${parseInt(viewports.min, 10)}))
      )
    `
  }

  return `
    font-size: ${fluidScale(fontSize.min, fontSize.max)};
    line-height: ${fluidScale(
      getLineHeight(fontSize.min, lineHeight.min),
      getLineHeight(fontSize.max, lineHeight.max)
    )};
    letter-spacing: ${fluidScale(letterSpacing.min, letterSpacing.max)};

    @media (max-width: ${viewports.min}) {
      font-size: ${fontSize.min};
      line-height: ${getLineHeight(fontSize.min, lineHeight.min)};
      letter-spacing: ${letterSpacing.min};
    }

    @media (min-width: ${viewports.max}) {
      font-size: ${fontSize.max};
      line-height: ${getLineHeight(fontSize.max, lineHeight.max)};
      letter-spacing: ${letterSpacing.max};
    }
  `
}

export default fluidTypeScale
