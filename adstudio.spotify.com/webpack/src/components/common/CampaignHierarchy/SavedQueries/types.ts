import { SavedQuery } from 'types/common/state/api/savedQueries';

export interface SavedQueryWithUrl extends SavedQuery {
  url: string;
  params: string;
}

export enum ViewOptions {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  CREATE = 'CREATE',
}
