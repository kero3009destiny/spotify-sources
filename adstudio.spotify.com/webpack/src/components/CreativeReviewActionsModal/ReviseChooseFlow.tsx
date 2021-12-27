import React from 'react';
import i18n from 'i18next';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { i18nRequired } from 'validators/i18nRequired';

import {
  spacer12,
  spacer32,
  spacer48,
} from '@spotify-internal/encore-foundation';
import {
  IconMicrophone,
  IconPlaylist,
  semanticColors,
  Type,
} from '@spotify-internal/encore-web';
import { Panel } from '@spotify-internal/encore-web/advertising/components/Panel';

import ReviseChooseFlowRadio from './ReviseChooseFlowRadio';

import { FORM_NAMES } from 'config/revise';

import PropTypes from 'prop-types';

const StyledFlowTileTitle = styled(Type.h2)`
  margin: 0 ${spacer32};
  padding: ${spacer12} 0;
  text-align: center;
`;

const StyledPanel = styled(Panel)`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  width: 220px;
  height: 220px;
  padding: 0;
`;

const StyledFlowTileDescription = styled(Type.p)`
  margin: 0 ${spacer32};
  text-align: center;
`;

const createStyledIcon = (IconComponent: any) =>
  styled(IconComponent)`
    color: ${props => props.theme.colors.primaryColor};
  ` as any;

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  margin-top: ${spacer32};
  margin-bottom: ${spacer32};
` as any;

const StyledButtonMargin = styled(StyledButton)`
  margin-right: ${spacer48};
`;

const FlowTile = ({
  IconComponent,
  title,
  description,
  onClick,
  addMargin,
}: {
  IconComponent: React.Component;
  title: string;
  description: string;
  onClick: (event: MouseEvent) => null;
  addMargin: boolean;
}) => {
  const StyledIcon = createStyledIcon(IconComponent);
  const StyledPanelWrapper = addMargin ? StyledButtonMargin : StyledButton;
  return (
    <StyledPanelWrapper onClick={onClick}>
      <StyledPanel shadow border={false}>
        <StyledIcon iconSize={32} />
        <StyledFlowTileTitle variant={Type.heading4} weight={Type.bold}>
          {title}
        </StyledFlowTileTitle>
        <StyledFlowTileDescription
          variant={Type.body3}
          weight={Type.book}
          semanticColor={semanticColors.textSubdued}
        >
          {description}
        </StyledFlowTileDescription>
      </StyledPanel>
    </StyledPanelWrapper>
  );
};

FlowTile.propTypes = {
  IconComponent: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  addMargin: PropTypes.bool,
};

export interface OwnProps {
  handleFlowClick: (value: string) => void;
}

export const ChooseFlow = ({ handleFlowClick }: OwnProps) => {
  const options = [
    {
      key: FORM_NAMES.VOICEOVER_INSTRUCTIONS,
      radioValue: FORM_NAMES.VOICEOVER_INSTRUCTIONS,
      ctaText: i18n.t('I18N_VOICEOVER_CLIP', 'Voiceover clip'),
      subdescription: i18n.t(
        'I18N_VOICEOVER_CLIP_REVISION_DESCRIPTION',
        'You can update your script, or ask for a different tone, pace or pronunciation. Changes can take up to 48 hrs.',
      ),

      renderIcon: IconMicrophone,
      'data-test': 'reviseVOInstructions-radio',
    },
    {
      key: FORM_NAMES.REVISE_BG_MUSIC,
      radioValue: FORM_NAMES.REVISE_BG_MUSIC,
      ctaText: i18n.t('I18N_BACKGROUND_MUSIC', 'Background music & mixing'),
      subdescription: i18n.t(
        'I18N_BACKGROUND_MUSIC_REVISION_DESCRIPTION',
        'Instantly change your background music and adjust how it’s mixed with the voiceover clip.',
      ),

      renderIcon: IconPlaylist,
      'data-test': 'reviseBgMusic-radio',
    },
  ];

  return (
    <Field
      name={FORM_NAMES.REVISE_CATEGORY}
      data-lpignore="true"
      component={ReviseChooseFlowRadio}
      validate={i18nRequired}
      options={options}
      onChange={({ target: { value } }: { target: { value: string } }) => {
        handleFlowClick(value);
      }}
    />
  );
};

ChooseFlow.propTypes = {
  handleFlowClick: PropTypes.func.isRequired,
};
