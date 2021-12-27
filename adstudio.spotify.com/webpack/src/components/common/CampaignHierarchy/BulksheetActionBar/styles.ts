import styled from 'styled-components';

import { plum } from '@spotify-internal/encore-advertising-web/cjs/styles/colors';
import {
  ButtonPrimary,
  ButtonTertiary,
  DialogConfirmation,
  spacer8,
  spacer16,
  spacer24,
  spacer40,
} from '@spotify-internal/encore-web';

// this can be replaced with a standard ButtonPrimary after the v4 migration
// FIXME: https://jira.spotify.net/browse/MADS-175
export const TextTransformlessButton = styled(ButtonPrimary)`
  text-transform: none;
  letter-spacing: 0;
  display: flex;
  gap: ${spacer8};
  align-items: center;
  padding: 12px 20px;
`;

export const EntityCountContainer = styled.div`
  display: flex;
  gap: ${spacer24};
`;

export const CountryTargetingContainer = styled.div`
  margin-top: ${spacer40};
`;

export const InputContainer = styled.div`
  display: flex;
  gap: ${spacer16};
`;

export const StyledButtonTertiary = styled(ButtonTertiary)`
  text-transform: none;
  display: flex;
  gap: ${spacer8};
  letter-spacing: normal;
  align-items: center;
  padding: 0;
  color: ${plum};
`;

export const AutosuggestContainer = styled.div`
  flex-grow: 1;
`;

export const StyledDialogConfirmation = styled(DialogConfirmation)`
  width: 794px;
  max-width: 80vw;
`;
