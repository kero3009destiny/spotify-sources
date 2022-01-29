import React, { forwardRef, ForwardRefRenderFunction } from 'react';

import {
  ArtistFilterFunction,
  EntityPacket,
  EntityPickerRefAPI,
} from './sharedTypes';

import {
  SearchEntityPicker,
  SearchEntityPickerProps,
} from './SearchEntityPicker';

export type { EntityPacket };

export type ArtistEntityPickerProps = Omit<
  SearchEntityPickerProps,
  'entityTypes' | 'adjustResults'
> & { adjustResults?: ArtistFilterFunction };

const _ArtistEntityPicker: ForwardRefRenderFunction<
  EntityPickerRefAPI,
  ArtistEntityPickerProps
> = (props, ref) => {
  return (
    <SearchEntityPicker
      {...props}
      ref={ref}
      adjustResults={
        props.adjustResults
          ? (_, results) => props.adjustResults!(results)
          : void 0
      }
      dataLimit={props.dataLimit ?? 50}
      entityTypes={['artist']}
    />
  );
};

export const ArtistEntityPicker = forwardRef(_ArtistEntityPicker);
