import styled, { css } from 'styled-components';

import fluidScale from '../../../styled-lib/fluidScale'

// fluid type calculation
// font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width])));

interface ISharedHeadingStyledProps {
  uppercase?: boolean
}

// Universal heading styles
const sharedHeadingStyles = css`
  font-weight: 700;
  text-transform: ${(props: ISharedHeadingStyledProps) => props.uppercase && 'uppercase'};

  @media (max-width: 1024px) {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all;
    word-break: break-word;
    hyphens: auto;
  }
`;

// Mega Title
export const MegaTitleStyles = css`
  ${
    fluidScale({
      fontSize: { min: '200px', max: '600px' },
      lineHeight: { min: '179px', max: '433px' },
      letterSpacing: { min: '-5.93px', max: '-9.88px' }
    })
  };

  font-weight: 700; /* 900 */
`
export const MegaTitle = styled.h1`
  ${MegaTitleStyles};
`;

// Ultra Title
export const UltraTitleStyles = css`
  ${
    fluidScale({
      fontSize: { min: '300px', max: '500px' },
      lineHeight: { min: '279px', max: '533px' },
      letterSpacing: { min: '-5.93px', max: '-9.88px' }
    })
  };

  font-weight: 700; /* 900 */
`
export const UltraTitle = styled.h1`
  ${UltraTitleStyles};
`;

// Title
export const TitleStyles = css`
  ${sharedHeadingStyles};
  ${
    fluidScale({
      fontSize: { min: '90px', max: '192px' },
      lineHeight: { min: '86px', max: '159px' },
      letterSpacing: { min: '-3.33px', max: '-7.11px' }
    })
  };

  font-weight: 700; /* 900 */
`
export const Title = styled.h1`
  ${TitleStyles};
`;

// H1
export const Heading1Styles = css`
  ${sharedHeadingStyles};
  ${
    fluidScale({
      fontSize: { min: '54px', max: '140px' },
      lineHeight: { min: '56px', max: '143px' },
      letterSpacing: { min: '-0.59px', max: '-8px' }
    })
  };
`
export const Heading1 = styled.h1`
  ${Heading1Styles};
`;

// H2
export const Heading2Styles = css`
  ${sharedHeadingStyles};
  ${
    fluidScale({
      fontSize: { min: '38px', max: '72px' },
      lineHeight: { min: '46px', max: '80px' },
      letterSpacing: { min: '-1.58px', max: '-3px' }
    })
  };
`
export const Heading2 = styled.h2`
  ${Heading2Styles};
`;

// H3
export const Heading3Styles = css`
  ${sharedHeadingStyles};
  ${
    fluidScale({
      fontSize: { min: '24px', max: '48px' },
      lineHeight: { min: '32px', max: '60px' },
      letterSpacing: { min: '0px', max: '-2px' }
    })
  };
`
export const Heading3 = styled.h3`
  ${Heading3Styles};
`;

// H4
export const Heading4Styles = css`
  ${sharedHeadingStyles};
  ${
    fluidScale({
      fontSize: { min: '24px', max: '36px' },
      lineHeight: { min: '32px', max: '46px' },
      letterSpacing: { min: '0px', max: '0px' }
    })
  };

  @media (min-width: 1025px) {
    font-weight: 500;
  }
`
export const Heading4 = styled.h4`
  ${Heading4Styles};
`;

export default {
  Title,
  H1: Heading1,
  H2: Heading2,
  H3: Heading3,
  H4: Heading4
}
