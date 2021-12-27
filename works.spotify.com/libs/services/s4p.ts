import * as d3 from 'd3';
import URI from 'spotify-liburi';
import { roundDecimalToPercentage } from '../utils/numberHelpers';
import { csvUrlFromCsv, contentDispositionToFilename } from '../utils/dataHelpers';
import { DatePreset } from 'libs/utils/chartUtils';
import { get, post, assertSuccess, NotFoundError, ForbiddenError } from './request';
import { AuthRequestInit } from './auth';
import { QueryResult, useQuery, useQueryCache } from 'react-query';
import { mockWriterCuration } from 'mocks';
import { useInternalAdmin } from 'app/RemoteConfig';
import {
  AggregateStreams,
  BarGraphValue,
  WriterBasicInfo,
  StreamsByRegion,
  StreamsByRegionRaw,
  TimelineAnnotationsResponse,
  TimelineAnnotation,
  Team,
  TeamResponse,
  WorkEntity,
  RecordingSearchResult,
  UserEntity,
  WriterEntity,
  WrittenByPlaylist,
  SortOrder,
  WriterResponse,
  SongwriterPageStatusResponse,
  CsvResponse,
  WriterCurationResponse,
  TimeFilter,
  RecordingEntity,
  Playlist,
  PotentialMatch,
  Paging,
  Sorting,
  TopWriters,
  StreamsByProduct,
} from './s4pTypes';

export const teamViewPermission = 'team.view';
export const teamInvitePermission = 'team.invite';
export const catalogViewPermission = 's4p.catalog.view';
export const searchPermission = 's4p.catalog.search';
export const viewSongwriterPagePermission = 'songwriterpage.view';

export const BACKEND_URL = 'https://creator.wg.spotify.com/s4p-service';

const requestOptions: AuthRequestInit = { mode: 'cors' };

export function normalizeWriters(writers: WriterBasicInfo[]): WriterBasicInfo[] {
  return writers.reduce<WriterBasicInfo[]>((filtered, writer) => {
    if (!filtered.some((w) => w.ipi === writer.ipi && w.name === writer.name)) {
      filtered.push(writer);
    }

    return filtered;
  }, []);
}

const uriToGid = (trackUri: string): string => URI.idToHex(trackUri.replace('spotify:track:', ''));

const parseTime = d3.timeParse('%Y-%m-%d');

const parseTimelineDates = (streamsByCountry: StreamsByRegionRaw): StreamsByRegion => {
  return Object.entries(streamsByCountry).reduce<StreamsByRegion>(
    (parsed, [country, dataPoints]) => {
      parsed[country] = dataPoints.map((d) => ({
        date: parseTime(d.date) as Date,
        value: d.value,
      }));

      return parsed;
    },
    {},
  );
};

export function parseTimelineAnnotations(
  response: TimelineAnnotationsResponse,
): TimelineAnnotation[] {
  return response.annotations_by_date.map((annotation) => ({
    date: parseTime(annotation.date) as Date,
    type: annotation.annotation_type_id,
    metadata: annotation.annotation_metadata.map((meta) => ({
      name: meta.annotation_name,
      id: meta.annotation_id,
    })),
  }));
}

export const transformToCsvResponse = (parsedCsv: string, response: Response) => ({
  csvUrl: csvUrlFromCsv(parsedCsv),
  filename: contentDispositionToFilename(response),
});

const reformatAgeGroups = (label: string) => {
  switch (label) {
    case '0-17':
      return '<18';
    case '60-150':
      return '60+';
    default:
      return label;
  }
};

const reformatGenderGroups = (label: string) => {
  switch (label) {
    case 'neutral':
      return 'non-binary';
    case 'unknown':
      return 'not specified';
    default:
      return label;
  }
};

export const parseDemographics = (
  data: AggregateStreams,
  type: 'age' | 'gender',
): BarGraphValue[] => {
  const parsedData: BarGraphValue[] = [];
  Object.keys(data.percentages)
    .sort()
    .forEach((dataPoint) =>
      parsedData.push({
        key: dataPoint,
        label: type === 'age' ? reformatAgeGroups(dataPoint) : reformatGenderGroups(dataPoint),
        value: roundDecimalToPercentage(data.percentages[dataPoint]),
      }),
    );

  return parsedData;
};

export const getCurrentUser = async (): Promise<UserEntity> => {
  const response = await get(`${BACKEND_URL}/v3/currentUser`, requestOptions);

  assertSuccess(response);

  return await response.json();
};

export function useCurrentUser() {
  const response = useQuery(['current-user'], () => getCurrentUser());
  return response.data!;
}

export async function getCurrentTeams(): Promise<Team[]> {
  const response = await get(`${BACKEND_URL}/v3/teams/initial`, requestOptions);

  assertSuccess(response);

  return await response.json();
}

export function useCurrentTeams() {
  const response = useQuery(['current-teams'], () => getCurrentTeams());
  return response.data!;
}

export async function getTeamMembers(): Promise<TeamResponse> {
  const response = await get(`${BACKEND_URL}/v3/team`, requestOptions);

  if (!response.ok) {
    throw new Error('Failed loading the current user’s team');
  }

  return response.json();
}

export const searchWorks = async (query: string): Promise<WorkEntity[]> => {
  const parsedQuery = query.replace(/spotify:track:[a-z|A-Z|0-9]{22}/g, uriToGid);
  const params = new URLSearchParams();
  params.set('search-term', parsedQuery);
  const response = await get(`${BACKEND_URL}/v3/works/search/?${params}`, requestOptions);

  if (response.status === 403) {
    throw new ForbiddenError();
  }

  if (!response.ok) {
    throw new Error('Failed searching for works');
  }

  const data: WorkEntity[] = await response.json();

  data.forEach((work) => {
    work.writers = normalizeWriters(work.writers);
  });

  return data;
};

export const searchWriters = async (query: string): Promise<WriterEntity[]> => {
  const params = new URLSearchParams();
  params.set('search-term', query);
  const response = await get(`${BACKEND_URL}/v3/writer/search/?${params}`, requestOptions);

  if (!response.ok) {
    throw new Error('Failed searching for writers');
  }

  return await response.json();
};

export const searchRecordings = async (query: string): Promise<RecordingSearchResult[]> => {
  const params = new URLSearchParams();
  params.set('search-term', query);
  const response = await get(`${BACKEND_URL}/v3/recordings/search/?${params}`, requestOptions);

  if (response.status === 403) {
    throw new ForbiddenError();
  }

  if (!response.ok) {
    throw new Error('Failed searching for recordings');
  }

  return await response.json();
};

export const searchTeams = async (name: string): Promise<Team[]> => {
  const response = await get(
    `${BACKEND_URL}/v3/team/search?name=${encodeURIComponent(name)}`,
    requestOptions,
  );
  return await response.json();
};

export const getWork = async (workGid: string): Promise<WorkEntity> => {
  const response = await get(`${BACKEND_URL}/v3/work/${workGid}`, requestOptions);

  assertSuccess(response);

  const work: WorkEntity = await response.json();
  work.writers = normalizeWriters(work.writers);

  return work;
};

export function useWork(workGid: string): WorkEntity {
  const response = useQuery(['workEntity', workGid], () => getWork(workGid));
  return response.data!;
}

export function useWorkCache(workGid: string): (updated: WorkEntity) => void {
  const queryCache = useQueryCache();
  return (updated) => {
    queryCache.setQueryData(['workEntity', workGid], updated);
    queryCache.refetchQueries((query) =>
      query.queryKey.some((v) => typeof v === 'string' && v.includes(workGid)),
    );
  };
}

type WorkCountResponse = {
  numberOfWorks: number;
};

const getNumberOfWorks = async (country: string): Promise<WorkCountResponse> => {
  const response = await get(`${BACKEND_URL}/v3/works/count?country=${country}`, requestOptions);
  return await response.json();
};

export function useNumberOfWorks(country: string): WorkCountResponse {
  const workCountResponse = useQuery(['numberOfWorks', country], () => getNumberOfWorks(country));
  return workCountResponse.data!;
}

export const getSongwriterPageStatus = async (
  ipi: string,
): Promise<SongwriterPageStatusResponse | null> => {
  const response = await get(`${BACKEND_URL}/v3/writer/${ipi}/songwriter-page`);

  if (response.status === 404) {
    return null;
  } else if (!response.ok) {
    throw new Error('Failed to load songwriter page status');
  }

  return response.json();
};

export type GetWriterParams = {
  page: number;
  sortKey: string;
  sortOrder: SortOrder;
  pageSize: number;
  ipi: string;
  worksQuery: string;
};

export const getWriter = async ({
  ipi,
  sortKey,
  sortOrder,
  pageSize,
  page,
  worksQuery,
}: GetWriterParams): Promise<WriterResponse> => {
  // ElasticSearch orders a descending string sort from Z -> A, while our UI uses the opposite; we switch the sortOrder sent to the request when sorting by title
  let actualSortOrder = sortOrder;
  if (sortKey === 'title') {
    actualSortOrder = sortOrder === 'DESC' ? 'ASC' : 'DESC';
  }

  const params = `results-per-page=${pageSize}&page=${page}&sort-by=${sortKey}&sort-order=${actualSortOrder}&works-query=${worksQuery}`;
  const response = await get(`${BACKEND_URL}/v3/writer/${ipi}?${params}`, requestOptions);

  assertSuccess(response);

  if (!response.ok) {
    throw new Error('Failed to load writer details');
  }

  return await response.json();
};

export const useWriter = ({
  ipi,
  sortKey,
  sortOrder,
  pageSize,
  page,
  worksQuery,
}: GetWriterParams) => {
  const writer = useQuery(['writerWorks', ipi, sortKey, sortOrder, page, worksQuery], () =>
    getWriter({ ipi, sortKey, sortOrder, pageSize, page, worksQuery }),
  );

  return writer.data!;
};

export const getWriterWorksCsv = async (
  writerIpi: string,
  sortKey: string,
  sortOrder: SortOrder,
  numResults: number,
  page: number,
): Promise<CsvResponse> => {
  const response = await get(
    `${BACKEND_URL}/v3/writer/${writerIpi}/download-csv?sort-by=${sortKey}&sort-order=${sortOrder}&results-per-page=${numResults}&page=${page}`,
    requestOptions,
  );

  const parsedCsv = await response.text();

  return transformToCsvResponse(parsedCsv, response);
};

export const getWriterTimelineStreams = async (
  ipi: string,
  startDate: string,
  endDate: string,
): Promise<StreamsByRegion> => {
  const parameters = `start-date=${startDate}&end-date=${endDate}`;
  const response = await get(
    `${BACKEND_URL}/v3/writer/${ipi}/timeline/streams?${parameters}`,
    requestOptions,
  );
  assertSuccess(response);
  const parsedResponse = await response.json();
  return parseTimelineDates(parsedResponse.data);
};

export const getWriterTimelineStreamsCsv = async (
  ipi: string,
  startDate: string,
  endDate: string,
  comparedCountries: string[],
): Promise<CsvResponse> => {
  const parameters = `start-date=${startDate}&end-date=${endDate}&compared-countries=${comparedCountries.join()}`;
  const response = await get(
    `${BACKEND_URL}/v3/writer/${ipi}/timeline/streams/download-csv?${parameters}`,
    requestOptions,
  );
  assertSuccess(response);
  const parsedCsv = await response.text();

  return transformToCsvResponse(parsedCsv, response);
};

export const getWriterCurationForCreator = async (
  creatorUri: string,
): Promise<WriterCurationResponse> => {
  const response = await get(`${BACKEND_URL}/v3/creator/${creatorUri}/curation`);

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('Invalid URI');
    } else {
      throw new Error('The request failed, please try again later');
    }
  }

  return response.json();
};

export function useCuration(creatorUri: string): WriterCurationResponse {
  const internalAdmin = useInternalAdmin();
  const useTestData = internalAdmin && window.location.search.indexOf('test_curation_data') > -1;

  const { data } = useQuery(['songwriterPageCurationForCreator', creatorUri], () =>
    getWriterCurationForCreator(creatorUri),
  );

  return {
    ...data!,
    ...(useTestData
      ? {
          collaborators: mockWriterCuration.collaborators,
          latestRelease: mockWriterCuration.latestRelease,
        }
      : {}),
  }!;
}

export async function updateDisplayName(creatorUri: string, displayName: string): Promise<void> {
  const response = await post(`${BACKEND_URL}/v3/creator/${creatorUri}/display-name`, {
    body: JSON.stringify({
      displayName,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to save display name');
  }
}

export const hideWorkForSongwriterPage = async (
  creatorUri: string,
  workGid: string,
): Promise<boolean> => {
  const response = await post(`${BACKEND_URL}/v3/creator/${creatorUri}/work/${workGid}/hide`);

  if (!response.ok) {
    throw new Error('The request failed, please try again later');
  }
  return true;
};

export const showWorkForSongwriterPage = async (
  creatorUri: string,
  workGid: string,
): Promise<boolean> => {
  const response = await post(`${BACKEND_URL}/v3/creator/${creatorUri}/work/${workGid}/unhide`);

  if (!response.ok) {
    throw new Error('The request failed, please try again later');
  }
  return true;
};

export const publishSongwriterPage = async (creatorUri: string): Promise<boolean> => {
  const response = await post(`${BACKEND_URL}/v3/creator/${creatorUri}/publish`);

  if (!response.ok) {
    throw new Error('The request failed, please try again later');
  }
  return true;
};

export const unpublishSongwriterPage = async (creatorUri: string): Promise<boolean> => {
  const response = await post(`${BACKEND_URL}/v3/creator/${creatorUri}/unpublish`);

  if (!response.ok) {
    throw new Error('The request failed, please try again later');
  }
  return true;
};

export const saveSongwriterImage = async (
  creatorUri: string,
  uploadToken: string,
): Promise<void> => {
  const response = await post(`${BACKEND_URL}/v3/creator/${creatorUri}/save-songwriter-image`, {
    body: JSON.stringify({
      token: uploadToken,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to save songwriter image');
  }
};

const getWorkTimelineStreams = async (
  workGid: string,
  startDate: string,
  endDate: string,
): Promise<StreamsByRegion> => {
  const parameters = `start-date=${startDate}&end-date=${endDate}`;
  const response = await get(
    `${BACKEND_URL}/v3/work/${workGid}/timeline/streams?${parameters}`,
    requestOptions,
  );
  assertSuccess(response);
  const parsedResponse = await response.json();
  return parseTimelineDates(parsedResponse.data);
};

const getWorkTimelineStreamsCsv = async (
  workGid: string,
  startDate: string,
  endDate: string,
  comparedCountries: string[],
): Promise<CsvResponse> => {
  const parameters = `start-date=${startDate}&end-date=${endDate}&compared-countries=${comparedCountries.join()}`;
  const response = await get(
    `${BACKEND_URL}/v3/work/${workGid}/timeline/streams/download-csv?${parameters}`,
    requestOptions,
  );
  assertSuccess(response);
  const parsedCsv = await response.text();

  return transformToCsvResponse(parsedCsv, response);
};

export const getWorkTimelineAnnotations = async (
  workGid: string,
  timeFilter: TimeFilter,
): Promise<TimelineAnnotation[]> => {
  const response = await get(
    `${BACKEND_URL}/v3/work/${workGid}/timeline/annotation?time-filter=${timeFilter}`,
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to load work timeline annotations');
  }

  if (response.status === 204) {
    return [];
  }

  const annotations: TimelineAnnotationsResponse = await response.json();

  return parseTimelineAnnotations(annotations);
};

export const getRecording = async (
  workGid: string,
  recordingGid: string,
): Promise<RecordingEntity> => {
  const response = await get(
    `${BACKEND_URL}/v3/work/${workGid}/recording/${recordingGid}`,
    requestOptions,
  );

  assertSuccess(response);

  return response.json();
};

const getRecordingTimelineStreams = async (
  workGid: string,
  recordingGid: string,
  startDate: string,
  endDate: string,
): Promise<StreamsByRegion> => {
  const parameters = `start-date=${startDate}&end-date=${endDate}`;
  const response = await get(
    `${BACKEND_URL}/v3/work/${workGid}/recording/${recordingGid}/timeline/streams?${parameters}`,
    requestOptions,
  );
  assertSuccess(response);
  const parsedResponse = await response.json();
  return parseTimelineDates(parsedResponse.data);
};

const getRecordingTimelineStreamsCsv = async (
  workGid: string,
  recordingGid: string,
  startDate: string,
  endDate: string,
  comparedCountries: string[],
): Promise<CsvResponse> => {
  const parameters = `start-date=${startDate}&end-date=${endDate}&compared-countries=${comparedCountries.join()}`;
  const response = await get(
    `${BACKEND_URL}/v3/work/${workGid}/recording/${recordingGid}/timeline/streams/download-csv?${parameters}`,
    requestOptions,
  );
  assertSuccess(response);

  const parsedCsv = await response.text();

  return transformToCsvResponse(parsedCsv, response);
};

export type GetSortedWorksOptions = {
  sortOrder: SortOrder;
  numResults: number;
  page: number;
  country: string;
  datePreset: DatePreset;
};

export const getSortedWorks = async ({
  sortOrder,
  numResults,
  page,
  country,
  datePreset,
}: GetSortedWorksOptions): Promise<WorkEntity[]> => {
  const params = new URLSearchParams();
  params.set('sort-order', sortOrder);
  params.set('results-per-page', String(numResults));
  params.set('time-filter', datePreset);
  params.set('page', String(page));
  params.set('country', country);

  const response = await get(`${BACKEND_URL}/v3/works?${params}`, requestOptions);

  if (response.status === 403) {
    throw new ForbiddenError();
  }

  if (!response.ok) {
    throw new Error('Failed to load works');
  }

  const works: WorkEntity[] = await response.json();

  works.forEach((work) => {
    work.writers = normalizeWriters(work.writers);
  });

  return works;
};

export function useSortedWorks(params: GetSortedWorksOptions): WorkEntity[] {
  const worksResponse = useQuery(['sortedWorks', params], () => getSortedWorks(params));
  return worksResponse.data!;
}

export const getCatalogCsv = async (
  sortOrder: SortOrder,
  numResults: number,
  page: number,
  country: string,
  datePreset: string,
): Promise<CsvResponse> => {
  const response = await get(
    `${BACKEND_URL}/v3/works/download-csv?sort-order=${sortOrder}&results-per-page=${numResults}&page=${page}&country=${country}&time-filter=${datePreset}`,
    requestOptions,
  );

  if (response.status === 403) {
    throw new ForbiddenError();
  }

  const parsedCsv = await response.text();
  return transformToCsvResponse(parsedCsv, response);
};

const getRecordingAgeData = async (
  workGid: string,
  recordingGid: string,
  startDate: string,
  endDate: string,
): Promise<BarGraphValue[]> => {
  const parameters = `start-date=${startDate}&end-date=${endDate}`;
  const response = await get(
    `${BACKEND_URL}/v3/work/${workGid}/recording/${recordingGid}/aggregate/streams/age?${parameters}`,
    requestOptions,
  );

  if (response.status === 204 || response.status === 404) {
    throw new NotFoundError();
  }

  const parsedResponse = await response.json();
  return parseDemographics(parsedResponse, 'age');
};

const getRecordingGenderData = async (
  workGid: string,
  recordingGid: string,
  startDate: string,
  endDate: string,
): Promise<BarGraphValue[]> => {
  const parameters = `start-date=${startDate}&end-date=${endDate}`;
  const response = await get(
    `${BACKEND_URL}/v3/work/${workGid}/recording/${recordingGid}/aggregate/streams/gender?${parameters}`,
    requestOptions,
  );

  if (response.status === 204 || response.status === 404) {
    throw new NotFoundError();
  }

  const parsedResponse = await response.json();
  return parseDemographics(parsedResponse, 'gender');
};

export const getTopPlaylists = async (workGid: string): Promise<Playlist[]> => {
  const parameters = 'time-filter=28day'; // currently the only option we want to show
  const response = await get(
    `${BACKEND_URL}/v3/work/${workGid}/top-playlists?${parameters}`,
    requestOptions,
  );
  if (response.status !== 200) {
    throw new Error(response.status.toString());
  }

  return await response.json();
};

export const getTopPlaylistsCsv = async (workGid: string): Promise<CsvResponse> => {
  const parameters = 'time-filter=28day'; // currently the only option we want to show
  const response = await get(
    `${BACKEND_URL}/v3/work/${workGid}/top-playlists/download-csv?${parameters}`,
    requestOptions,
  );
  if (response.status !== 200) throw new Error(response.status.toString());

  const parsedCsv = await response.text();
  return transformToCsvResponse(parsedCsv, response);
};

export type WriterCatalogFilter = 'all' | 'controlled' | 'uncontrolled' | 'with-songwriter-page';

export type WriterCatalogParams = {
  paging: Paging;
  sorting: Sorting;
  filter: WriterCatalogFilter;
};

export const getWriterCatalog = async ({
  paging,
  sorting,
  filter,
}: WriterCatalogParams): Promise<TopWriters> => {
  const response = await get(
    `${BACKEND_URL}/v3/writers?results-per-page=${paging.resultsPerPage}&page=${paging.page}&sort-by=${sorting.key}&sort-order=${sorting.order}&control-status=${filter}`,
  );

  if (response.status === 403) {
    throw new ForbiddenError();
  }

  if (!response.ok) {
    throw new Error('Error fetching songwriters');
  }

  return await response.json();
};

export function useWriterCatalog(writerCatalogParams: WriterCatalogParams) {
  const result = useQuery(['writerCatalog', writerCatalogParams], () =>
    getWriterCatalog(writerCatalogParams),
  );
  return result.data!;
}

export const getWriterCatalogCsv = async ({
  paging,
  sorting,
  filter,
}: WriterCatalogParams): Promise<CsvResponse> => {
  const response = await get(
    `${BACKEND_URL}/v3/writers/download-csv?results-per-page=${paging.resultsPerPage}&page=${paging.page}&sort-by=${sorting.key}&sort-order=${sorting.order}&control-status=${filter}`,
  );

  if (response.status === 403) {
    throw new ForbiddenError();
  }

  const parsedCsv = await response.text();

  return transformToCsvResponse(parsedCsv, response);
};

type WriterCountResponse = {
  numberOfWriters: number;
};

const getNumberOfWriters = async (filter: WriterCatalogFilter): Promise<WriterCountResponse> => {
  const response = await get(`${BACKEND_URL}/v3/writers/count?control-status=${filter}`);

  if (!response.ok) {
    throw new Error('Error fetching songwriters');
  }

  return await response.json();
};

export function useNumberOfWriters(filter: WriterCatalogFilter) {
  const result = useQuery(['numberOfWriters', filter], () => getNumberOfWriters(filter));
  return result.data!;
}

export const getStreamsByProductForWork = async (
  workGid: string,
  startDate: string,
  endDate: string,
): Promise<StreamsByProduct> => {
  const params = new URLSearchParams();
  params.set('start-date', startDate);
  params.set('end-date', endDate);
  const response = await get(
    `${BACKEND_URL}/v3/work/${workGid}/aggregate/streams/product?${params}`,
  );

  if (response.status === 204 || response.status === 404) {
    throw new NotFoundError();
  }

  if (!response.ok) {
    throw new Error('Error fetching streams by product');
  }

  return await response.json();
};

export const getTrackEligibility = async (
  trackUri: string,
  workGid: string,
): Promise<PotentialMatch> => {
  const response = await get(
    `${BACKEND_URL}/v3/work/${workGid}/suggestions/eligibility?track=${trackUri}`,
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('Invalid URI');
    } else {
      throw new Error('The request failed, please try again later');
    }
  }
  return await response.json();
};

export const getWrittenByPlaylist = async (creatorUri: string): Promise<WrittenByPlaylist> => {
  const response = await get(`${BACKEND_URL}/v3/creator/${creatorUri}/playlist`, requestOptions);

  assertSuccess(response);

  return response.json();
};

export function useWrittenByPlaylist(
  creatorUri: string,
  dependencies: any[] = [],
): QueryResult<WrittenByPlaylist> {
  return useQuery(['writtenByPlaylist', creatorUri, ...dependencies], () =>
    getWrittenByPlaylist(creatorUri),
  );
}

const S4PService = {
  getCurrentUser,
  searchWorks,
  searchWriters,
  searchRecordings,
  getWork,
  getWriter,
  getWriterWorksCsv,
  getWriterTimelineStreams,
  getWriterTimelineStreamsCsv,
  getWorkTimelineStreams,
  getWorkTimelineStreamsCsv,
  getWorkTimelineAnnotations,
  getRecording,
  getRecordingTimelineStreams,
  getRecordingTimelineStreamsCsv,
  getStreamsByProductForWork,
  getSortedWorks,
  getRecordingAgeData,
  getRecordingGenderData,
  getTopPlaylists,
  getSongwriterPageStatus,
  getTrackEligibility,
};

export default S4PService;
