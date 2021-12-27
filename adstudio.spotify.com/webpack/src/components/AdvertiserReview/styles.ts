import styled, { css } from 'styled-components';

import { Icons } from '@spotify-internal/adstudio-tape';
import {
  gray50,
  gray80,
  spacer8,
  spacer16,
  spacer32,
  Type,
} from '@spotify-internal/encore-web';

import { DraftReviewAd } from './DraftReviewAd';
import { ScriptReviewAd } from './ScriptReviewAd';
import { VoiceoverReviewAd } from './VoiceoverReviewAd';

export const ReviewablePanel = styled.div`
  > div:not(:first-of-type) {
    border-top: 1px solid ${gray80};
  }
`;

export const ReviewRowCss = css`
  padding-right: ${spacer16};
`;

export const StyledVoiceoverReviewAd = styled(VoiceoverReviewAd)`
  ${ReviewRowCss}
`;

export const StyledScriptReviewAd = styled(ScriptReviewAd)`
  ${ReviewRowCss}
`;

export const StyledDraftReviewAd = styled(DraftReviewAd)`
  ${ReviewRowCss}
`;

export const TopPanel = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0;
`;

export const TitleSection = styled.div`
  text-align: left;
  h3 {
    font-size: ${spacer32};
  }
`;

export const SeeAllSection = styled.div`
  text-align: right;
  padding: ${spacer8};
`;

export const InlineBodyType = styled(Type.p)`
  display: inline;
`;

export const StyledChevronDown = styled(Icons.IconChevronDown)`
  display: inline;
  margin-left: 4px;
  position: relative;
  top: 6px;
  color: ${gray50};
`;

export const StyledChevronUp = styled(Icons.IconChevronUp)`
  display: inline;
  margin-left: 4px;
  position: relative;
  top: 6px;
  color: ${gray50};
`;

export const SeeAllOrHideButton = styled.span`
  cursor: pointer;
`;
