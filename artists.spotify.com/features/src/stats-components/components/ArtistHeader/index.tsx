// ignore-string-externalization
import React from 'react';
import styled from 'styled-components';
import {
  screenSmMax,
  spacer16,
  spacer32,
} from '@spotify-internal/encore-web-v3';
import {
  EntityHeader,
  EntityImageWrapper,
  EntityImage,
  EntityTitle,
  EntityAttributeRow,
  EntityAttribute,
} from '@mrkt/features/StickyHeader';

const HEADER_HEIGHT = '196px';

const StyledWrapper = styled.div<{ stickyHeader?: boolean; hasTabs: boolean }>`
  @media (max-width: ${screenSmMax}) {
    margin-bottom: ${({ hasTabs }) => (!hasTabs ? 0 : spacer16)};
  }
  margin-bottom: ${({ stickyHeader, hasTabs }) =>
    hasTabs && (stickyHeader ? spacer16 : spacer32)};
`;

type AttributeItem = {
  label: React.ReactNode | string;
  value: React.ReactNode;
  hasPriority?: boolean;
};

type ArtistHeaderProps = {
  tabs?: React.ReactNode;
  type: 'Song' | 'Track' | 'Album' | 'EP' | 'Single' | 'Artist';
  metadata: {
    imgSrc: string;
    title: React.ReactNode | string;
    subtitle: React.ReactNode | string;
  };
  attributes?: AttributeItem[];
  actions?: React.ReactNode;
  className?: string;
  stickyHeader?: boolean;
  stickyOffsetTop?: string;
  stickyOffsetLeft?: string;
};

export function ArtistHeader(props: ArtistHeaderProps) {
  const {
    metadata: { imgSrc, title, subtitle },
    type,
    tabs,
    className,
    attributes,
    actions,
    stickyHeader,
    stickyOffsetTop,
    stickyOffsetLeft,
    ...otherProps
  } = props;

  return (
    <EntityHeader
      headerHeight={HEADER_HEIGHT}
      className={className}
      renderImage={() => (
        <StyledWrapper stickyHeader={stickyHeader} hasTabs={!!tabs}>
          <EntityImageWrapper stickyHeader={stickyHeader} hasTabs={!!tabs}>
            <EntityImage data-testid="entity-image" src={imgSrc} alt="" />
          </EntityImageWrapper>
        </StyledWrapper>
      )}
      renderTitle={() => (
        <EntityTitle
          type={type}
          title={title}
          byline={subtitle}
          stickyHeader={stickyHeader}
        />
      )}
      attributes={
        <StyledWrapper stickyHeader={stickyHeader} hasTabs={!!tabs}>
          <EntityAttributeRow>
            {attributes &&
              attributes.map(({ label, value, hasPriority }) => (
                <EntityAttribute
                  key={`${label} ${value}`}
                  label={label}
                  value={value}
                  hasPriority={hasPriority}
                />
              ))}
          </EntityAttributeRow>
        </StyledWrapper>
      }
      actions={actions}
      tabs={tabs}
      stickyHeader={stickyHeader}
      stickyOffsetTop={stickyOffsetTop}
      stickyOffsetLeft={stickyOffsetLeft}
      {...otherProps}
    />
  );
}
