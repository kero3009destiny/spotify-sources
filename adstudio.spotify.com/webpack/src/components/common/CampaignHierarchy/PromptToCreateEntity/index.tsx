import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { ButtonPrimary } from '@spotify-internal/adstudio-shared/lib/components/CustomEncore';
import {
  black,
  spacer4,
  spacer24,
  spacer80,
} from '@spotify-internal/encore-foundation';
import { Type } from '@spotify-internal/encore-web';

import Cards from 'components/common/Cards';

import { TEST_IDS } from './constants';

const Centered = styled.div`
  margin-top: ${spacer80};
  text-align: center;
  width: 30rem;
  margin-left: calc(50vw - 15rem);
`;

const BoldHeading = styled(Type.h4)`
  font-weight: bold;
  color: ${black};
  padding-top: ${spacer24};
  padding-bottom: ${spacer4};
`;

const GreyText = styled(Type.p)`
  color: #7f7f7f;
  padding-bottom: ${spacer24};
`;

export interface PromptToCreateEntityProps {
  title: string;
  subtitle: string | ReactElement;
  ctaText: string;
  onClickCTA: () => void;
}

// TODO: Some of the copy here is still TBD
export const PromptToCreateEntity = ({
  title,
  subtitle,
  ctaText,
  onClickCTA,
}: PromptToCreateEntityProps) => (
  <Centered data-test={TEST_IDS.CREATIVE_EMPTY_STATE}>
    <Cards />
    <BoldHeading condensed variant={Type.heading4}>
      {title}
    </BoldHeading>
    <GreyText condensed variant={Type.body2}>
      {subtitle}
    </GreyText>
    <ButtonPrimary
      onClick={onClickCTA}
      buttonSize={ButtonPrimary.sm}
      buttonLegacy
    >
      {ctaText}
    </ButtonPrimary>
  </Centered>
);
