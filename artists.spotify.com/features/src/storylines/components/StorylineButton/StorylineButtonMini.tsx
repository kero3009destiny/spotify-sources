import React from 'react';
import styled, { css } from 'styled-components';
import {
  ButtonIcon,
  IconExclamationAlt,
  Type,
  cssColorValue,
  body2LineHeight,
} from '@spotify-internal/encore-web';
import { Spinner } from '@mrkt/features/spinner';
import { useT } from '@mrkt/features/i18n';

const ButtonIconClickable = styled(ButtonIcon)`
  cursor: pointer;
`;

const StorylineButtonContainer = styled.span<{
  align: 'left' | 'right';
  highlight?: boolean;
}>`
  align-items: center;
  display: flex;
  flex-direction: ${props => (props.align === 'right' ? 'row-reverse' : 'row')};
  min-height: ${body2LineHeight}; /* line-height of the text */

  ${({ highlight }) =>
    highlight &&
    css`
      color: ${cssColorValue('textBrightAccent')};
    `}
`;

const IconMargin = styled.span<{ align: 'left' | 'right' }>`
  display: flex;
  align-self: center;
  margin-left: ${props => (props.align === 'left' ? 0 : '6px')};
  margin-right: ${props => (props.align === 'right' ? 0 : '6px')};
`;

type Props = {
  align: 'left' | 'right';
  posted?: boolean;
  processing?: boolean;
  error?: boolean;
  onEdit: () => void;
};

export function StorylineButtonMini(props: Props) {
  const { posted, processing, align, error, onEdit } = props;
  const t = useT();
  if (processing) {
    return (
      <ButtonIcon disabled data-slo-id="edit-storyline-button">
        <StorylineButtonContainer align={align} highlight>
          <IconMargin align={align}>
            <Spinner />
          </IconMargin>
          <Type as="p" condensed>
            {t(
              'STORYLINES_PROCESSING',
              'Processing',
              'text indicating the storyline is processing',
            )}
          </Type>
        </StorylineButtonContainer>
      </ButtonIcon>
    );
  }

  if (error) {
    return (
      <ButtonIconClickable onClick={onEdit} semanticColor="textNegative">
        <StorylineButtonContainer align={align} highlight>
          <IconMargin align={align}>
            <IconExclamationAlt semanticColor="textNegative" iconSize={16} />
          </IconMargin>
          <Type as="p" condensed semanticColor="textNegative">
            {t('STORYLINES_ERROR_EDIT', 'Error', 'error text')}
          </Type>
        </StorylineButtonContainer>
      </ButtonIconClickable>
    );
  }

  return (
    <ButtonIconClickable
      semanticColor="textBrightAccent"
      onClick={onEdit}
      data-testid="edit-storyline-button"
      data-slo-id="edit-storyline-button"
    >
      {posted
        ? t('STORYLINES_MANAGE', 'Manage', 'manage storyline button')
        : t('STORYLINES_ADD', 'Add', 'add a storyline button')}
    </ButtonIconClickable>
  );
}
