import { RecordingEntity, WorkEntity } from 'libs/services/s4pTypes';

type EntityWithStreams = {
  totalStreamCount: number;
};

type EntityWithTitle = {
  title: string;
};

type EntityWithNestedRecordings = {
  recording: RecordingEntity;
};

export const sortEntitiesByTitle = <T extends EntityWithTitle>(
  entities: T[],
  sortOrder = 'DESC',
) => {
  const sortFunc =
    sortOrder === 'DESC'
      ? (a: any, b: any) => a.title.localeCompare(b.title)
      : (a: any, b: any) => b.title.localeCompare(a.title);

  return [...entities].sort(sortFunc);
};

export const sortEntitiesByStreamCount = <T extends EntityWithStreams>(
  entities: T[],
  sortOrder = 'DESC',
) => {
  const sortFunc =
    sortOrder === 'DESC'
      ? (a: any, b: any) => b.totalStreamCount - a.totalStreamCount
      : (a: any, b: any) => a.totalStreamCount - b.totalStreamCount;

  return [...entities].sort(sortFunc);
};

export const sortWorksByStreamCount = (works: WorkEntity[], sortOrder = 'DESC') => {
  const sortFunc =
    sortOrder === 'DESC'
      ? (a: any, b: any) => b.countryStreamCounts - a.countryStreamCounts
      : (a: any, b: any) => a.countryStreamCounts - b.countryStreamCounts;

  return [...works].sort(sortFunc);
};

export const sortNestedRecordingsByStreamCount = <T extends EntityWithNestedRecordings>(
  entities: T[],
  sortOrder = 'DESC',
  sortKey = 'totalStreamCount',
) => {
  const sortFunc =
    sortOrder === 'DESC'
      ? (a: any, b: any) => b.recording[sortKey] - a.recording[sortKey]
      : (a: any, b: any) => a.recording[sortKey] - b.recording[sortKey];

  return [...entities].sort(sortFunc);
};

// TODO: Remove this hack once backend search improvements are made
export const sortByExactWorkNumberAndStreamCount = (query: string, works: WorkEntity[]) => {
  const sortedByStream = sortWorksByStreamCount(works);
  sortedByStream.sort((a, b) => (a.workNumber === query ? -1 : b.workNumber === query ? 1 : 0));
  return sortedByStream;
};

export const pluralizeWithS = (count: number, word: string) =>
  count === 1 ? `1 ${word}` : `${count.toLocaleString()} ${word}s`;

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
export function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function isSongwriterTeamUser(teamUri: string) {
  return teamUri.startsWith('spotify:songwriter');
}

const Utils = {
  sortEntitiesByStreamCount,
  sortNestedRecordingsByStreamCount,
  pluralizeWithS,
};

export default Utils;
