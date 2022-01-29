import React from 'react';
import styled from 'styled-components';

import {
  IconAlbum,
  Type,
  gray10,
  spacer12,
} from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';

import { StorylineEntity } from '../../lib/types';

const ENTITY_IMAGE_SIZE = 48;

const Entity = styled.div`
  align-items: center;
  display: flex;
  height: ${ENTITY_IMAGE_SIZE}px;
  position: relative;
  z-index: 1;
`;

const EntityImage = styled.img`
  height: auto;
  width: ${ENTITY_IMAGE_SIZE}px;
`;

const EntityName = styled(Type.h2).attrs({
  variant: Type.body2,
  weight: Type.book,
  condensed: true,
})`
  margin-left: ${spacer12};
  text-align: left;
  text-shadow: 0 0 10px ${gray10};
  width: 180px;
`;

type Props = {
  entity: StorylineEntity;
};

export function EntityHeader({ entity }: Props) {
  const t = useT();
  return (
    <Entity>
      {entity.imageUrl ? (
        <EntityImage
          src={entity.imageUrl}
          alt={t('STORYLINES_ALBUM_COVER', 'Album cover', 'album cover')}
        />
      ) : (
        <IconAlbum
          aria-label={t(
            'STORYLINES_ICON_ALBUM',
            'IconAlbum',
            'icon for a music album',
          )}
          iconSize={64}
        />
      )}
      <EntityName>{entity.name}</EntityName>
    </Entity>
  );
}
