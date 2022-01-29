import React, { ForwardRefRenderFunction, useMemo, forwardRef } from 'react';

import debounce from 'lodash/debounce';

import {
  SearchEntityFilterFunction,
  EntityPacket,
  EntityType,
  EntityPickerRefAPI,
  EntityResponse,
} from './sharedTypes';
import { adjustEntityResponse, runSearch } from './searchUtils';
import { EntityPicker, EntityPickerProps } from './EntityPickerGeneric';

export type { EntityPacket };

export type SearchEntityPickerProps = {
  entityTypes: EntityType[];
  useProxy?: boolean;
  dataLimit?: number;
  adjustResults?: SearchEntityFilterFunction;
  defaultResults?: EntityResponse;
} & Omit<EntityPickerProps, 'getEntities' | 'defaultResults'>;

const _SearchEntityPicker: ForwardRefRenderFunction<
  EntityPickerRefAPI,
  SearchEntityPickerProps
> = (props, ref) => {
  const {
    entityTypes,
    useProxy,
    adjustResults,
    defaultResults: defaultResultsRaw,
    ...restProps
  } = props;

  const executeSearch = useMemo(
    () =>
      debounce(
        (search, options) => runSearch(entityTypes, search, options),
        300,
      ),
    [entityTypes],
  );

  const defaultResults = useMemo(
    () =>
      defaultResultsRaw
        ? adjustEntityResponse(entityTypes, defaultResultsRaw)
        : [],
    [defaultResultsRaw],
  );

  const getEntities = (search: string) =>
    new Promise<EntityResponse>(res => {
      executeSearch(search, {
        limit: props.dataLimit ?? 13,
        onComplete: res,
        useProxy,
      });
    }).then(results => {
      if (adjustResults) {
        for (const type of entityTypes) {
          const entities = results[`${type}s`];
          if (!entities) {
            continue;
          }
          if ('items' in entities) {
            entities.items =
              adjustResults(type, entities.items) ?? entities.items;
          } else if (Array.isArray(entities)) {
            results[`${type}s`] = adjustResults(type, entities) ?? entities;
          }
        }
      }

      return adjustEntityResponse(entityTypes, results);
    });

  return (
    <EntityPicker
      {...restProps}
      ref={ref}
      getEntities={getEntities}
      defaultResults={defaultResults}
    />
  );
};

export const SearchEntityPicker = forwardRef(_SearchEntityPicker);
