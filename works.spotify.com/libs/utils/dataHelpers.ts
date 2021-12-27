import orderBy from 'lodash/orderBy';
import flatMap from 'lodash/flatMap';
import {
  RecordingEntity,
  StreamingEntry,
  StreamsByRegion,
  WriterBasicInfo,
  WriterEntity,
} from 'libs/services/s4pTypes';
import { SuggestionMatch, SuggestionsByWork } from 'components/SuggestionsLoader';
import { MatchingResult, RecordingMatch } from 'libs/services/suggestionsTypes';
import { BarsByRegion, QuarterlyStreams } from 'typings';

const parseQuarter = (date: Date) => Math.ceil((date.getUTCMonth() + 1) / 3);

const parseYear = (date: Date) => `${date.getUTCFullYear()}`.substr(2, 2);

// input: Array of objects with date and stream count (value) per day
// output: Array of objects with key, label, quarter, stream count (value) and last two digits of year
export const groupByQuarter = (data: StreamingEntry[]): QuarterlyStreams[] => {
  const reduced = data.reduce(
    (
      bars: {
        [key: string]: { key: string; year: string; quarter: number; label: string; value: number };
      },
      entry,
    ) => {
      const quarter = parseQuarter(entry.date);
      const year = parseYear(entry.date);
      const key = `${year}${quarter}`;
      const label = `Q${quarter} ${year}`;
      if (!bars[key]) bars[key] = { key, year, quarter, label, value: entry.value };
      else bars[key].value += entry.value;
      return bars;
    },
    {},
  );

  const quarters = Object.values(reduced);
  quarters.sort((a, b) =>
    a.year === b.year ? a.quarter - b.quarter : parseInt(a.year, 10) - parseInt(b.year, 10),
  );

  return quarters.map((q) => ({ ...q, quarter: q.quarter.toString() }));
};

export const groupCountriesByQuarter = (data: StreamsByRegion): BarsByRegion =>
  Object.keys(data).reduce((bars: { [country: string]: QuarterlyStreams[] }, country) => {
    bars[country] = groupByQuarter(data[country]);
    return bars;
  }, {});

// returns percentage change between first and second values
export const calculateDelta = (a: number, b: number) => {
  if (a === 0 && b === 0) return 0;
  else if (a === 0)
    // no streams in either week
    return null; // no streams in previous week
  return ((a - b) / (a / 100)) * -1;
};

export const calculateWeeklyDelta = (data: StreamingEntry[]) => {
  const reducer = (sum: number, entry: StreamingEntry) => sum + entry.value;
  const lastWeek = data.slice(0, 7).reduce(reducer, 0);
  const weekBefore = data.slice(7, 14).reduce(reducer, 0);

  const delta = calculateDelta(weekBefore, lastWeek);
  return delta === null ? delta : Math.round(delta);
};

export const aggregateSelectedCountries = (
  selectedCountries: string[],
  countryData: StreamsByRegion,
) => {
  const allEntries = selectedCountries
    .filter((country) => countryData[country] !== undefined)
    .reduce((acc: StreamingEntry[], country) => {
      acc.push(...countryData[country]);
      return acc;
    }, []);

  const mergedEntries = allEntries.reduce((acc: { [dateKey: string]: number }, entry) => {
    const dateKey = entry.date.toUTCString();
    if (acc[dateKey]) {
      acc[dateKey] += entry.value;
    } else {
      acc[dateKey] = entry.value;
    }
    return acc;
  }, {});

  return Object.keys(mergedEntries).map((date) => ({
    date: new Date(date),
    value: mergedEntries[date],
  }));
};

export const extractRecordingGidsFromMatches = (matches: RecordingMatch[]): string[] =>
  matches.reduce((list: string[], match) => [...list, match.recording.gid], []);

export const sumMatches = (suggestions: SuggestionsByWork) =>
  Object.values(suggestions).reduce(
    (sum, suggestion) => sum + Object.keys(suggestion.matches).length,
    0,
  );

export function contentDispositionToFilename(response: Response) {
  const fileName = response.headers.get('content-disposition') || '';
  return fileName.slice(21).replace(/"/g, '');
}

export function csvUrlFromCsv(csv: string) {
  return `data:application/csv;charset=utf-8,${encodeURIComponent(csv)}`;
}

function escapeCsvValue(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

export function csvUrlFromMatchingResult({ successful, failed }: MatchingResult) {
  const headerRow = [
    'Internal Work ID',
    'Work Title',
    'ISRC',
    'Matched or Failed',
    'Artist',
    'Album',
    'Label',
    'Release Date',
  ];
  const successfulRows = flatMap(successful, ({ matches, workNumber, title }) =>
    matches.map(({ isrc, artistName, albumName, labelName, releaseDate }: RecordingEntity) => [
      workNumber || '-',
      title,
      isrc || '-',
      'Matched',
      artistName,
      albumName,
      labelName || '-',
      releaseDate || '-',
    ]),
  );
  const failedRows = flatMap(failed, ({ matches, workNumber, title }) =>
    matches.map(({ isrc, artistName, albumName, labelName, releaseDate }: RecordingEntity) => [
      workNumber || '-',
      title,
      isrc || '-',
      'Failed',
      artistName,
      albumName,
      labelName || '-',
      releaseDate || '-',
    ]),
  );
  const rows = [headerRow, ...successfulRows, ...failedRows];
  const csvString = rows.map((row) => row.map(escapeCsvValue).join(',')).join('\r\n');

  return csvUrlFromCsv(csvString);
}

export function streamSumForMatches(matches: SuggestionMatch[]) {
  return matches.reduce((sum, match) => sum + match.totalStreamCount, 0);
}

export function sortSuggestionsByStreamCount(
  suggestions: SuggestionsByWork,
  sortOrder: 'ASC' | 'DESC',
) {
  return orderBy(
    suggestions,
    [(suggestion) => streamSumForMatches(Object.values(suggestion.matches))],
    // @ts-ignore
    [sortOrder.toLowerCase()],
  );
}

export function nameOrNotProvided(writer: WriterEntity | WriterBasicInfo) {
  if (!writer.name || !writer.name.trim()) {
    return 'Name Not Provided';
  } else {
    return writer.name;
  }
}

const DataHelpers = {
  groupByQuarter,
  groupCountriesByQuarter,
  calculateDelta,
  calculateWeeklyDelta,
  csvUrlFromMatchingResult,
  streamSumForMatches,
  sortSuggestionsByStreamCount,
  nameOrNotProvided,
};

export default DataHelpers;
