import { createContext } from 'react';

export enum TableType {
  CATALOGUE = 'CATALOGUE',
  ENTITY = 'ENTITY',
}

export const TableContext = createContext(TableType.CATALOGUE);

export const TableContextProvider = TableContext.Provider;

export const TableContextConsumer = TableContext.Consumer;
