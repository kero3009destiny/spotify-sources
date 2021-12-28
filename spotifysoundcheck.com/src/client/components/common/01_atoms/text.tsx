import styled, { css } from 'styled-components';
import fluidScale from '../../../styled-lib/fluidScale'

// Universal text styles

// use a <p> tag to get these styles
export const NormalTextStyles = css`
  ${
    fluidScale({
      fontSize: { min: '20px', max: '30px' },
      lineHeight: { min: `32px`, max: `44px` },
      letterSpacing: { min: `0px`, max: `0px` }
    })
  };
`;
export const NormalText = styled.p`
  ${NormalTextStyles};
`


// use a <small> tag get these styles
export const SmallTextStyles = css`
  ${
    fluidScale({
      fontSize: { min: '20px', max: '24px' },
      lineHeight: { min: `32px`, max: `34px` },
      letterSpacing: { min: `0px`, max: `0px` }
    })
  };
`;
export const SmallText = styled.p`
  ${SmallTextStyles};
`


export const ExtraSmallTextStyles = css`
  font-size: 15px;
  line-height: ${18 / 15}em;
`;
export const ExtraSmallText = styled.p`
  ${ExtraSmallTextStyles};
`
