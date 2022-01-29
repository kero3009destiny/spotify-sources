import React, { FunctionComponent } from 'react';

import styled from 'styled-components';
import { Container } from '@mrkt/features/badge/BadgeWithText/Container';
import { useT } from '@mrkt/features/i18n';
import { Badge } from '@mrkt/features/badge';

import {
  Type,
  black,
  spacer4,
  spacer8,
  spacer16,
  gray50,
} from '@spotify-internal/encore-web';

import { EntityPacket } from './sharedTypes';

const EntityOption = styled.div`
  display: flex;
  z-index: 99999;
`;

const StyledBadge = styled(Badge)`
  height: ${props => (props.variant === 'user' ? null : '50px')};
  width: ${props => (props.variant === 'user' ? null : '50px')};
  margin-right: ${spacer16};
`;

const TextContainer = styled.div`
  display: inline;
  flex-direction: column;
  /* min-width: 0 is needed to support truncating text within flex children */
  min-width: 0;
  color: ${black};
`;

const ComboboxOption = styled.div`
  z-index: 99999;
`;

const TextWithSubtextContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* min-width: 0 is needed to support truncating text within flex children */
  min-width: 0;
  color: ${black};

  & > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > :nth-child(2) {
    color: ${gray50};
  }
`;

export const EntityGroupTitle = styled(Type).attrs({
  as: 'h1',
})`
  padding: ${spacer8} ${spacer8} ${spacer4} ${spacer8};
  text-transform: uppercase;
  font-size: 14px;
  pointer-events: none;
  color: ${gray50};
`;

export const NoResultsEntityOptionDisplay: FunctionComponent<{
  inputValue: string;
}> = props => {
  const t = useT();

  return (
    <EntityOption data-testid="entity-option">
      <Container>
        <TextContainer
          dangerouslySetInnerHTML={{
            __html: t(
              'ARTIST_SEARCH_COMBOBOX_EMPTY_STATE',
              'No results for <b>{inputValue}</b>',
              'there are no results for this search value',
              { inputValue: props.inputValue },
            ),
          }}
        />
      </Container>
    </EntityOption>
  );
};

type EntityDisplayProps = {
  entityOption: EntityPacket;
  displaySubtext?: boolean;
  enableSubDisplays: boolean;
};

const getSubtextForEntity = (entityOption: EntityPacket): string => {
  if (entityOption.variant === 'album') {
    return entityOption.entity.artists?.[0]?.name ?? '';
  } else if (entityOption.variant === 'playlist') {
    return entityOption.entity?.owner?.display_name ?? '';
  } else if (entityOption.variant === 'track') {
    const artist = entityOption.entity.album?.artists?.[0]?.name;
    const album = entityOption.entity.album?.name;

    if (artist && album) {
      return `${artist} - ${album}`;
    }
  } else if (entityOption.variant === 'show') {
    return entityOption.entity.publisher;
  }

  return '';
};

const EntityOptionSubtextDisplay: FunctionComponent<{
  entityOption: EntityPacket;
}> = props => {
  const entityOption = props.entityOption;
  const text = getSubtextForEntity(entityOption);

  return text ? <span>{text}</span> : null;
};

export const EntityOptionDisplay: FunctionComponent<EntityDisplayProps> =
  props => {
    const { entityOption, enableSubDisplays } = props;
    const { imageUrl, name, variant } = entityOption;

    const isHumanVariant = variant === 'artist' || variant === 'user';

    return (
      <EntityOption data-slo-id="entity-option" data-testid="entity-option">
        <Container>
          <StyledBadge
            imgSrc={imageUrl}
            // round if a human, square-ish otherwise
            variant={isHumanVariant ? variant : 'label'}
            circle={isHumanVariant}
            initial={name}
          />
          {enableSubDisplays && getSubtextForEntity(entityOption) ? (
            <TextWithSubtextContainer>
              <div>{name}</div>
              <EntityOptionSubtextDisplay entityOption={entityOption} />
            </TextWithSubtextContainer>
          ) : (
            <TextContainer>{name}</TextContainer>
          )}
        </Container>
      </EntityOption>
    );
  };

export const ComboboxDisplay: FunctionComponent<{ value: string }> = props => {
  const { value } = props;

  return (
    <ComboboxOption>
      <TextContainer>{value}</TextContainer>
    </ComboboxOption>
  );
};
