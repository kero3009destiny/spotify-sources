import {
  WriterEntity,
  RecordingEntity,
  RecordingSearchResult,
  WorkEntity,
  UserEntity,
  Playlist,
  StreamsByProduct,
  StreamingEntry,
  StreamsByRegion,
  PotentialMatch,
  TeamMember,
  TeamResponse,
  WriterCurationResponse,
  WriterResponse,
  TopWriters,
  Team,
  LatestReleaseRecording,
} from 'libs/services/s4pTypes';
import { WorkSuggestions, CatalogSuggestions } from 'libs/services/suggestionsTypes';
import { QuarterlyStreams, BarsByRegion } from 'typings';
import { SuggestionsByWork } from 'components/SuggestionsLoader';
import { AccessGroup, Invite, InviteStatus } from 'libs/services/teamManagementTypes';

const teamViewPermission = 'team.view';
const teamInvitePermission = 'team.invite';
const catalogViewPermission = 's4p.catalog.view';
const catalogSearchPermission = 's4p.catalog.search';
const analyticsViewPermission = 's4p.catalog.analytics';

const viewSongwriterPagePermission = 'songwriterpage.view';

export const mockTimelineChartData: StreamingEntry[] = [
  {
    value: 115,
    date: new Date('July 29, 2017'),
  },
  {
    value: 320,
    date: new Date('July 28, 2017'),
  },
  {
    value: 135,
    date: new Date('July 27, 2017'),
  },
  {
    value: 275,
    date: new Date('July 26, 2017'),
  },
  {
    value: 85,
    date: new Date('July 25, 2017'),
  },
  {
    value: 150,
    date: new Date('July 24, 2017'),
  },
  {
    value: 115,
    date: new Date('July 23, 2017'),
  },
  {
    value: 320,
    date: new Date('July 22, 2017'),
  },
  {
    value: 135,
    date: new Date('July 21, 2017'),
  },
  {
    value: 275,
    date: new Date('July 20, 2017'),
  },
  {
    value: 85,
    date: new Date('July 19, 2017'),
  },
  {
    value: 150,
    date: new Date('July 18, 2017'),
  },
  {
    value: 0,
    date: new Date('July 17, 2017'),
  },
  {
    value: 150,
    date: new Date('July 16, 2017'),
  },
];

export const mockCountryData: StreamsByRegion = {
  AD: mockTimelineChartData,
  DE: mockTimelineChartData.map((entry) => ({ value: entry.value * 2, date: entry.date })),
  FR: mockTimelineChartData.map((entry) => ({ value: entry.value * 3, date: entry.date })),
  JP: mockTimelineChartData.map((entry) => ({ value: entry.value * 4, date: entry.date })),
  US: mockTimelineChartData.map((entry) => ({ value: entry.value * 5, date: entry.date })),
  GLOBAL: mockTimelineChartData.map((entry) => ({ value: entry.value * 20, date: entry.date })),
};

export const mockWriters: WriterEntity[] = [
  {
    name: 'Jorge Luis Borges',
    ipi: '999999999',
    topWork: { title: 'The South', gid: 'a' },
    totalWorks: 30,
    totalStreamCount: 800,
    isControlled: true,
  },
  {
    name: 'Gabriel Garcia Marquez',
    ipi: '99999998',
    topWork: { title: '100 Years of Solitude', gid: 'b' },
    totalWorks: 31,
    totalStreamCount: 801,
    isControlled: false,
  },
  {
    name: 'Thom Yorke',
    ipi: '999999997',
    topWork: { title: 'Airbag', gid: 'c' },
    totalWorks: 199,
    totalStreamCount: 3245351,
    isControlled: true,
  },
  {
    name: 'Kevin Parker',
    ipi: '999999996',
    topWork: { title: 'Patience', gid: 'd' },
    totalWorks: 333,
    totalStreamCount: 5555555,
    isControlled: false,
  },
];

export const mockTopWorks: WorkEntity[] = [
  {
    gid: 'a',
    workNumber: 'a',
    title: 'All The Feels',
    titleCased: 'All The Feels',
    countryStreamCounts: 170700,
    iswc: 'T0728395581',
    writers: mockWriters,
    recordings: [],
    numberOfRecordings: 0,
  },
  {
    gid: 'b',
    workNumber: 'b',
    title: 'Never Gonna Give You Up',
    titleCased: 'Never Gonna Give You Up',
    countryStreamCounts: 66100,
    iswc: 'T0728395652',
    writers: [],
    recordings: [],
    numberOfRecordings: 0,
  },
  {
    gid: 'c',
    workNumber: 'c',
    title: 'Never Gonna Let You Down',
    titleCased: 'Never Gonna Let You Down',
    countryStreamCounts: 58600,
    iswc: 'T0728395577',
    writers: [],
    recordings: [],
    numberOfRecordings: 0,
  },
  {
    gid: 'd',
    workNumber: 'd',
    title: 'Never Gonna Run Around',
    titleCased: 'Never Gonna Run Around',
    countryStreamCounts: 47600,
    iswc: 'T0728395532',
    writers: mockWriters,
    recordings: [],
    numberOfRecordings: 0,
  },
  {
    gid: 'e',
    workNumber: 'e',
    title: 'Vegan Lyfe',
    titleCased: 'Vegan Lyfe',
    countryStreamCounts: 46800,
    iswc: 'T0728392222',
    writers: [],
    recordings: [],
    numberOfRecordings: 0,
  },
  {
    gid: 'f',
    workNumber: 'f',
    title: 'Juicy',
    titleCased: 'Juicy',
    countryStreamCounts: 33700,
    iswc: 'T0728395908',
    writers: [],
    recordings: [],
    numberOfRecordings: 0,
  },
  {
    gid: 'g',
    workNumber: 'g',
    title: 'My Humps',
    titleCased: 'My Humps',
    countryStreamCounts: 31100,
    iswc: 'T0728395443',
    writers: mockWriters,
    recordings: [],
    numberOfRecordings: 0,
  },
  {
    gid: 'h',
    workNumber: 'h',
    title: 'TGIF',
    titleCased: 'Tgif',
    countryStreamCounts: 28600,
    iswc: 'T0728395111',
    writers: [],
    recordings: [],
    numberOfRecordings: 0,
  },
  {
    gid: 'i',
    workNumber: 'i',
    title: 'Ice Ice Baby',
    titleCased: 'Ice Ice Baby',
    countryStreamCounts: 27600,
    iswc: 'T0728395543',
    writers: mockWriters,
    recordings: [],
    numberOfRecordings: 0,
  },
  {
    gid: 'j',
    workNumber: 'j',
    title: 'Sugah Daddy',
    titleCased: 'Sugah Daddy',
    countryStreamCounts: 16800,
    iswc: 'T0728395999',
    writers: [],
    recordings: [],
    numberOfRecordings: 0,
  },
];

export const mockRecordingGid = '5c20ccee809048e29b19d507469f9211';

export const mockRecording: RecordingEntity = {
  gid: mockRecordingGid,
  title: 'Redbone',
  artistName: 'Childish Gambino',
  albumName: 'Awaken My Love',
  isrc: 'USYAH1600107',
  popularity: 8000,
  totalStreamCount: 58349,
  totalStreamCount28Days: 58349,
  totalStreamCountAllTime: 98349,
  coverart300: 'https://i.scdn.co/image/602d096a35ab9a87bce500cc447c6970a41510af',
  labelName: 'Universal Music Group',
  licensorName: 'believe',
  releaseDate: '21 Sep 1977',
  audioPreview: '',
  matchSource: 'CW190192KOB_000.V21',
};

export const mockRecordings: RecordingEntity[] = [
  mockRecording,
  {
    gid: '5c20ccee809048e29b19d507469f9311',
    title: 'Redbone (Remix)',
    artistName: 'Childish Gambino',
    albumName: 'Awaken My Love',
    isrc: 'USYAH1600108',
    popularity: 34210,
    totalStreamCount: 4534,
    totalStreamCount28Days: 4534,
    totalStreamCountAllTime: 10000,
    coverart300: 'https://i.scdn.co/image/602d096a35ab9a87bce500cc447c6970a41510af',
    labelName: 'Universal Music Group',
    licensorName: 'believe',
    releaseDate: '21 Sep 1977',
    audioPreview: '',
    matchSource: 'manual',
  },
  {
    gid: '5c20ccee809048e29b19d507469f9411',
    title: 'Redbone (EDM Remix)',
    artistName: 'Childish Gambino',
    albumName: 'Awaken My Love',
    isrc: 'USYAH1600109',
    popularity: 342420,
    totalStreamCount: 222,
    totalStreamCount28Days: 222,
    totalStreamCountAllTime: 444,
    coverart300: 'https://i.scdn.co/image/602d096a35ab9a87bce500cc447c6970a41510af',
    labelName: 'Universal Music Group',
    licensorName: 'believe',
    releaseDate: '21 Sep 1977',
    audioPreview: '',
  },
  {
    gid: '5c20ccee809048e29b19d507469f9561',
    title: 'Redbone With A Super Long Title Oh My',
    artistName: 'Kanye West',
    albumName: 'Awaken My Love',
    isrc: 'USKYP1600107',
    popularity: 400,
    totalStreamCount: 7777554,
    totalStreamCount28Days: 7777554,
    totalStreamCountAllTime: 99999999,
    coverart300: 'https://i.scdn.co/image/602d096a35ab9a87bce500cc447c6970a41510af',
    labelName: 'Universal Music Group',
    licensorName: 'believe',
    releaseDate: '21 Sep 1977',
    audioPreview: '',
    matchSource: 'CW190192KOB_000.V21',
  },
  {
    gid: '5c20ccee809048e29b19d507469f9791',
    title: 'Redbone (Acoustic)',
    artistName: 'Neil Young',
    albumName: 'Awaken My Love',
    isrc: 'USYAH1600115',
    popularity: 800554,
    totalStreamCount: 69,
    totalStreamCount28Days: 69,
    totalStreamCountAllTime: 949,
    coverart300: 'https://i.scdn.co/image/602d096a35ab9a87bce500cc447c6970a41510af',
    labelName: 'Universal Music Group',
    licensorName: 'believe',
    releaseDate: '21 Sep 1977',
    audioPreview: '',
    matchSource: 'spotify',
  },
];

enum SongwriterPageStatus {
  Enabled = 'ENABLED',
  Disabled = 'DISABLED',
}

export const mockLatestReleaseRecordings: LatestReleaseRecording[] = mockRecordings.map((rec) => ({
  ...rec,
  audioPreview: 'https://p.scdn.co/mp3-preview/e0aa16e00fa98f4d914848ea5c829187eadb7730',
  albumGid: '00fbbaae4f5c40ec887e3f4bfbabe0a0',
}));

export const mockWriterCuration: WriterCurationResponse = {
  creatorUri: 'spotify:creator:6e4ebdH7uY3Dq2YB5tqnJ6',
  displayName: 'Jorge Luis Borges',
  songwriterImageUrl: 'https://example.com/image.jpg',
  colorPalette: {
    textColorHex: '#434343',
    bgColorHex: '#ffbcac',
  },
  managingPublishers: [
    {
      publisherUri: 'spotify:publisher:pub1',
      publisherName: 'Pub1',
      writerIpis: ['1234'],
    },
    {
      publisherUri: 'spotify:publisher:pub2',
      publisherName: 'Pub2',
      writerIpis: ['1234'],
    },
  ],
  recordings: [
    {
      recording: mockRecordings[0],
      accessibleByTeam: true,
      isHidden: false,
      workGid: 'TST1111',
    },
    {
      recording: mockRecordings[1],
      accessibleByTeam: false,
      isHidden: false,
      workGid: 'TST2222',
    },
  ],
  permissions: {
    canPublishOrUnpublishPage: true,
  },
  songwriterPageStatus: SongwriterPageStatus.Enabled,
  collaborators: [],
  latestRelease: {
    title: 'Redbone',
    artistName: 'Childish Gambino',
    coverArt: 'https://i.scdn.co/image/602d096a35ab9a87bce500cc447c6970a41510af',
    releaseDate: { year: 2020, month: 10, day: 1 },
    recordings: mockLatestReleaseRecordings,
  },
  socialLinks: [{ username: 'wonho', type: 'instagram' }],
};

export const mockRecordingResult: RecordingSearchResult = {
  recording: mockRecording,
  workGid: 'RMM208744',
  workTitle: 'Redbone',
};

export const mockWork: WorkEntity = {
  workNumber: '12345',
  title: 'Test',
  titleCased: 'Test',
  gid: '5c20ccee809048e29b19d507469f9213',
  iswc: 'T9999999999',
  recordings: [mockRecording],
  numberOfRecordings: 1,
  writers: mockWriters,
  countryStreamCounts: 856550,
};

export const mockSuggestions: WorkSuggestions = {
  numberOfMatches: 24,
  matches: [{ recording: mockRecording, credits: [] }],
};

export const mockPotentialMatches: PotentialMatch[] = [
  { recording: mockRecording, credits: [], eligibilityStatus: 'ELIGIBLE' },
  { recording: mockRecordings[1], credits: [], eligibilityStatus: 'NOT_ELIGIBLE' },
  { recording: mockRecordings[2], credits: [], eligibilityStatus: 'ALREADY_MATCHED' },
];

export const mockPublisherTeam: Team = {
  organizationName: 'Test Publisher',
  organizationUri: 'spotify:publisher:6adw3zEfuLfi0RVPAJfFmf',
  resources: [],
  permissions: [catalogViewPermission, analyticsViewPermission],
};

export const mockSongwriterTeam: Team = {
  organizationName: 'Test Songwriter',
  organizationUri: 'spotify:songwriter:5adw3zEfuLfi0RVPAJfFng',
  resources: ['spotify:creator:47Zp1yxjAVecAqPzHj4nGS'],
  permissions: [viewSongwriterPagePermission],
};

export const mockPublisherTeamUser: UserEntity = {
  username: 'foo',
  employee: false,
  country: 'US',
  partnerUserIds: [],
  permissions: [
    teamInvitePermission,
    teamViewPermission,
    catalogViewPermission,
    catalogSearchPermission,
    analyticsViewPermission,
  ],
  team: mockPublisherTeam,
  email: 'foo@bar.net',
  fullName: 'Foo Bar',
};

export const mockSongwriterTeamUser: UserEntity = {
  username: 'foo',
  employee: false,
  country: 'US',
  partnerUserIds: [],
  permissions: [viewSongwriterPagePermission],
  team: mockSongwriterTeam,
  email: 'foo@bar.net',
  fullName: 'Foo Bar',
};

export const mockGenderData: QuarterlyStreams[] = [
  {
    key: 'female',
    label: 'female',
    value: 47,
  },
  {
    key: 'male',
    label: 'male',
    value: 51,
  },
  {
    key: 'neutral',
    label: 'non-binary',
    value: 1,
  },
  {
    key: 'unknown',
    label: 'not specified',
    value: 1,
  },
];

export const mockAgeData: QuarterlyStreams[] = [
  {
    key: '0-17',
    label: '<18',
    value: 4,
  },
  {
    key: '18-22',
    label: '18-22',
    value: 18,
  },
  {
    key: '23-27',
    label: '23-27',
    value: 24,
  },
  {
    key: '28-34',
    label: '28-34',
    value: 25,
  },
  {
    key: '35-44',
    label: '35-44',
    value: 16,
  },
  {
    key: '45-59',
    label: '45-59',
    value: 9,
  },
  {
    key: '60-150',
    label: '60+',
    value: 2,
  },
  {
    key: 'unknown',
    label: 'unknown',
    value: 0,
  },
];

export const mockCountryQuarterData: BarsByRegion = {
  US: [
    { key: '164', label: 'Q4 16', year: '16', quarter: '4', value: 1000 },
    { key: '171', label: 'Q1 17', year: '17', quarter: '1', value: 1000 },
    { key: '172', label: 'Q2 17', year: '17', quarter: '2', value: 2000 },
    { key: '173', label: 'Q3 17', year: '17', quarter: '3', value: 1000 },
    { key: '174', label: 'Q4 17', year: '17', quarter: '4', value: 1000 },
  ],
  DE: [
    { key: '164', label: 'Q4 16', year: '16', quarter: '4', value: 100 },
    { key: '171', label: 'Q1 17', year: '17', quarter: '1', value: 100 },
    { key: '172', label: 'Q2 17', year: '17', quarter: '2', value: 200 },
    { key: '173', label: 'Q3 17', year: '17', quarter: '3', value: 100 },
    { key: '174', label: 'Q4 17', year: '17', quarter: '4', value: 500 },
  ],
  GB: [
    { key: '164', label: 'Q4 16', year: '16', quarter: '4', value: 400 },
    { key: '171', label: 'Q1 17', year: '17', quarter: '1', value: 300 },
    { key: '172', label: 'Q2 17', year: '17', quarter: '2', value: 150 },
    { key: '173', label: 'Q3 17', year: '17', quarter: '3', value: 600 },
    { key: '174', label: 'Q4 17', year: '17', quarter: '4', value: 100 },
  ],
};

export const mockCatalogSuggestionsResponse: CatalogSuggestions = {
  numberOfMatches: 13,
  catalogSuggestions: [
    {
      work: {
        gid: 'OLE438218',
        numberOfRecordings: 0,
        workNumber: '438218',
        title: 'NEIGHBORHOOD SUPA STARZ (AKA NEIGHBORHOOD SUPASTARS)',
        titleCased: 'Neighborhood Supa Starz (Aka Neighborhood Supastars)',
        iswc: '',
        countryStreamCounts: 1512,
        recordings: [
          {
            gid: 'd5feed914b8e477480f7851435d60556',
            isrc: 'USKO10500828',
            popularity: 11160439,
            title: 'Neighborhood Supa Starz',
            artistName: 'The Game',
            albumName: 'Untold Story - Chopped & Screwed',
            coverart300: 'https://i.scdn.co/image/b7913e14eae695d3fcc0a0822f8914102d9443d1',
            coverart640: 'https://i.scdn.co/image/9d96afb5e67480a7fe31138f1ae1437b98af5049',
            totalStreamCount: 86,
            totalStreamCount28Days: 86,
            totalStreamCountAllTime: 444,
            audioPreview: '',
          },
          {
            gid: '2301f9b407bb4b5d988b29063249eab6',
            isrc: 'USKO10407336',
            popularity: 16462516,
            title: 'Neighborhood Supa Starz',
            artistName: 'The Game',
            albumName: 'Untold Story',
            coverart300: '',
            coverart640: '',
            totalStreamCount: 32,
            totalStreamCount28Days: 32,
            totalStreamCountAllTime: 349,
            audioPreview: '',
          },
          {
            gid: 'b051721d02844112892aaf7926ea667d',
            isrc: 'US25T9920173',
            popularity: 19869928,
            title: 'Neighborhood Supa Stars',
            artistName: 'The Game',
            albumName: 'Q.B. 2 Compton',
            coverart300: 'https://i.scdn.co/image/860aebbf6c4948c972998fd11557a875f802d681',
            coverart640: 'https://i.scdn.co/image/132b8e45ea08741ae4cfece77d011780c5beaf6d',
            totalStreamCount: 20,
            totalStreamCount28Days: 20,
            totalStreamCountAllTime: 345,
            audioPreview: '',
          },
        ],
        writers: [
          { name: 'JAYCEON TERRELL TAYLOR', ipi: '425729840' },
          { name: 'JOSEPH TOM', ipi: '247436164' },
        ],
      },
      matches: [
        {
          recording: {
            gid: '3cefa2595d3d4f5eb3c5e3d3c855c561',
            isrc: 'QMFMF1373857',
            popularity: 17,
            title: 'Neighborhood Superstars (feat. Jt the Bigga Figga)',
            artistName: 'The Game',
            albumName: 'Untold Story',
            coverart300: 'https://i.scdn.co/image/bb6165993773d9e5dc4bfc5083f0af8f0d3ca4af',
            coverart640: 'https://i.scdn.co/image/16b2bf521c5fc262d1250f473b4504b054d8b235',
            totalStreamCount: 1276,
            totalStreamCount28Days: 1276,
            totalStreamCountAllTime: 3454,
            audioPreview: 'https://p.scdn.co/mp3-preview/e0aa16e00fa98f4d914848ea5c829187eadb7730',
            labelName: 'GetLow Records',
            releaseDate: '',
          },
          credits: ['The Game', 'JT The Bigga Figga'],
        },
      ],
    },
    {
      work: {
        gid: 'OLE157352',
        workNumber: '157352',
        title: 'FURNACE FAN',
        titleCased: 'Furnace Fan',
        iswc: '',
        countryStreamCounts: 3052,
        recordings: [],
        numberOfRecordings: 0,
        writers: [{ name: 'ROBERT EARL KEEN JR', ipi: '205495771' }],
      },
      matches: [
        {
          recording: {
            gid: 'be16b220371c4271a21730bbcd370e2d',
            isrc: 'USKO10600632',
            popularity: 24,
            title: 'Furnace Fan',
            artistName: 'Robert Earl Keen',
            albumName: 'Live At The Ryman',
            coverart300: 'https://i.scdn.co/image/caf4eaa28d765a03e86fcb4505e2fdc1dfbc8dd2',
            coverart640: 'https://i.scdn.co/image/25b97ddb13b1e7686f365b1e290b45bc276bf729',
            totalStreamCount: 3052,
            totalStreamCount28Days: 3052,
            totalStreamCountAllTime: 98349,
            audioPreview: 'https://p.scdn.co/mp3-preview/978125afc600236268b1ec54e5ef305fdb32ea5b',
            labelName: 'Koch Records',
            releaseDate: '11 Jul 2006',
          },
          credits: ['Robert Earl Keen'],
        },
      ],
    },
    {
      work: {
        gid: 'OLE157350',
        workNumber: '157350',
        title: 'FARM FRESH ONIONS',
        titleCased: 'Farm Fresh Onions',
        iswc: '',
        countryStreamCounts: 810,
        recordings: [],
        numberOfRecordings: 0,
        writers: [{ name: 'ROBERT EARL KEEN JR', ipi: '205495771' }],
      },
      matches: [
        {
          recording: {
            gid: 'fb2a1347d14b4e7888f5e90cd1fbce04',
            isrc: 'USKO10302422',
            popularity: 10,
            title: 'Farm Fresh Onions',
            artistName: 'Robert Earl Keen',
            albumName: 'Farm Fresh Onions',
            coverart300: 'https://i.scdn.co/image/d3e3ef643734060c69f4abc7fc1d3f1b27bc2b32',
            coverart640: 'https://i.scdn.co/image/a67662f1deadaec8239a2187e9b39da35e8129a3',
            totalStreamCount: 360,
            totalStreamCount28Days: 360,
            totalStreamCountAllTime: 555,
            audioPreview: 'https://p.scdn.co/mp3-preview/aa2c1662b5532dd82e0e34d7e7641158836a3529',
            labelName: 'Audium Entertainment LLC',
            releaseDate: '7 Oct 2003',
          },
          credits: ['Robert Earl Keen'],
        },
        {
          recording: {
            gid: '6476108798104d90b98a94a591efcc48',
            isrc: 'USKO10600638',
            popularity: 12,
            title: 'Farm Fresh Onions',
            artistName: 'Robert Earl Keen',
            albumName: 'Live At The Ryman',
            coverart300: 'https://i.scdn.co/image/caf4eaa28d765a03e86fcb4505e2fdc1dfbc8dd2',
            coverart640: 'https://i.scdn.co/image/25b97ddb13b1e7686f365b1e290b45bc276bf729',
            totalStreamCount: 450,
            totalStreamCount28Days: 4500,
            totalStreamCountAllTime: 9000,
            audioPreview: 'https://p.scdn.co/mp3-preview/1cd8f18684c1c193f7062515f66365891c9bf492',
            labelName: 'Koch Records',
            releaseDate: '11 Jul 2006',
          },
          credits: ['Robert Earl Keen'],
        },
      ],
    },
    {
      work: {
        gid: 'OLE525306',
        workNumber: '525306',
        title: 'AIMLESSLY DRIFTING',
        titleCased: 'Aimlessly Drifting',
        iswc: '',
        countryStreamCounts: 901,
        recordings: [],
        numberOfRecordings: 0,
        writers: [{ name: 'CHUCK BERRY', ipi: '2948497' }],
      },
      matches: [
        {
          recording: {
            gid: '72ae86e3f5254323be2268f7a7cc1519',
            isrc: 'USMC17302961',
            popularity: 12,
            title: "Aimlessly Driftin'",
            artistName: 'Chuck Berry',
            albumName: 'Bio',
            coverart300: 'https://i.scdn.co/image/1d0686d667fda4fa27777fa99b381927c7b6d36f',
            coverart640: 'https://i.scdn.co/image/59203b47000d9c672127d5afdbe06f7d654022f7',
            totalStreamCount: 901,
            totalStreamCount28Days: 901,
            totalStreamCountAllTime: 98349,
            audioPreview: 'https://p.scdn.co/mp3-preview/58fbcbaf72877272a21b0b8f49daaef5e0e811ab',
            labelName: 'Geffen',
            releaseDate: '1 Jan 1973',
          },
          credits: ['Chuck Berry', 'Esmond Edwards'],
        },
      ],
    },
    {
      work: {
        gid: 'OLE438455',
        workNumber: '438455',
        title: 'BRIDGE OF BODIES (HELL ON WHEELS SOUNDTRACK)',
        titleCased: 'Bridge of Bodies (Hell on Wheels Soundtrack)',
        iswc: '',
        countryStreamCounts: 445,
        recordings: [],
        numberOfRecordings: 0,
        writers: [
          { name: 'GUSTAVO A SANTAOLALLA', ipi: '351399451' },
          { name: 'KEVIN D KINER', ipi: '204808882' },
        ],
      },
      matches: [
        {
          recording: {
            gid: 'cc156b18857948419efb69706096d415',
            isrc: 'USKO11201655',
            popularity: 12,
            title: 'Bridge of Bodies',
            artistName: 'Kevin Kiner; Gustavo Santaolalla',
            albumName: 'Hell On Wheels - Season One',
            coverart300: 'https://i.scdn.co/image/4f635170ebe7c1edc8948652c106fcd7480fc521',
            coverart640: 'https://i.scdn.co/image/b7c66b016129c29d58e85b07c719bac2685d4e84',
            totalStreamCount: 445,
            totalStreamCount28Days: 445,
            totalStreamCountAllTime: 98349,
            audioPreview: 'https://p.scdn.co/mp3-preview/0a298faf0f527f3fd7440a560816633feffbee82',
            labelName: 'eOne Music',
            releaseDate: '7 Aug 2012',
          },
          credits: ['Kevin Kiner; Gustavo Santaolalla'],
        },
      ],
    },
    {
      work: {
        gid: 'OLE10014073',
        numberOfRecordings: 0,
        workNumber: '10014073',
        title: 'I CAN MAKE IT',
        titleCased: 'I Can Make It',
        iswc: '',
        countryStreamCounts: 2688,
        recordings: [],
        writers: [{ name: 'BRYAN C POPIN', ipi: '349457917' }],
      },
      matches: [
        {
          recording: {
            gid: 'd730364ea45e45c9bf01a957952a3c74',
            isrc: 'US5ED1300162',
            popularity: 11,
            title: 'I Can Make It (Radio Edit)',
            artistName: 'Bryan Popin',
            albumName: 'I Can Make It - Single',
            coverart300: 'https://i.scdn.co/image/92f30dc3786eeffe55e97f28a110a9b7fc5f6c38',
            coverart640: 'https://i.scdn.co/image/42d984fadacfb2853c85b0101cd69926df793063',
            totalStreamCount: 409,
            totalStreamCount28Days: 409,
            totalStreamCountAllTime: 98349,
            audioPreview: 'https://p.scdn.co/mp3-preview/826c01e086572750f479c5f59bdd6e68e89c44e8',
            labelName: 'eOne Music',
            releaseDate: '13 Aug 2013',
          },
          credits: ['Bryan Popin', 'Byron "Mr. Talkbox" Chambers'],
        },
        {
          recording: {
            gid: '4c7cd25723ad45dab7108d6beae328a8',
            isrc: 'US5ED1200196',
            popularity: 21,
            title: 'I Can Make It (feat. Byron "Mr. Talkbox" Chambers)',
            artistName: 'Bryan Popin',
            albumName: 'You Can Make It',
            coverart300: 'https://i.scdn.co/image/68b6369eb23c1d66e668b50b87437d355b70bf7e',
            coverart640: 'https://i.scdn.co/image/bc5fbb23ff155678d3041368a80e0a0f1f7e5300',
            totalStreamCount: 2024,
            totalStreamCount28Days: 2024,
            totalStreamCountAllTime: 98349,
            audioPreview: 'https://p.scdn.co/mp3-preview/bf46063f9399a10bce7c5233cd3ff656df69a7fa',
            labelName: 'eOne Music',
            releaseDate: '22 Oct 2013',
          },
          credits: ['Bryan Popin', 'Byron "Mr. Talkbox" Chambers'],
        },
      ],
    },
    {
      work: {
        gid: 'OLE438452',
        numberOfRecordings: 0,
        workNumber: '438452',
        title: 'TOWNSPEOPLE RETURN (HELL ON WHEELS SOUNDTRACK)',
        titleCased: 'Townspeople Return (Hell on Wheels Soundtrack)',
        iswc: '',
        countryStreamCounts: 567,
        recordings: [],
        writers: [
          { name: 'GUSTAVO A SANTAOLALLA', ipi: '351399451' },
          { name: 'KEVIN D KINER', ipi: '204808882' },
        ],
      },
      matches: [
        {
          recording: {
            gid: '2fe0d60e762a434fad102becd2f969da',
            isrc: 'USKO11201652',
            popularity: 13,
            title: 'Townspeople Return',
            artistName: 'Kevin Kiner; Gustavo Santaolalla',
            albumName: 'Hell On Wheels - Season One',
            coverart300: 'https://i.scdn.co/image/4f635170ebe7c1edc8948652c106fcd7480fc521',
            coverart640: 'https://i.scdn.co/image/b7c66b016129c29d58e85b07c719bac2685d4e84',
            totalStreamCount: 567,
            totalStreamCount28Days: 567,
            totalStreamCountAllTime: 98349,
            audioPreview: 'https://p.scdn.co/mp3-preview/1ef2edb736037d8d41e49f62048470895f2e28dc',
            labelName: 'eOne Music',
            releaseDate: '7 Aug 2012',
          },
          credits: ['Kevin Kiner; Gustavo Santaolalla'],
        },
      ],
    },
    {
      work: {
        gid: 'OLE438574',
        numberOfRecordings: 0,
        workNumber: '438574',
        title: 'GOLD RUSH',
        titleCased: 'Gold Rush',
        iswc: '',
        countryStreamCounts: 22609,
        recordings: [],
        writers: [
          { name: 'CALVIN C BROADUS', ipi: '280556949' },
          { name: 'DAVID KEITH WILLIAMS', ipi: '' },
          { name: 'RALPH J WHEELER', ipi: '340391292' },
          { name: 'REGGIE VANTERPOOL', ipi: '340389762' },
          { name: 'RICARDO EMMANUEL BROWN', ipi: '356439538' },
          { name: 'JAMARR ANTONIO STAMPS', ipi: '340026023' },
        ],
      },
      matches: [
        {
          recording: {
            gid: '3e1f8ab4fadc4912802996f4557664de',
            isrc: 'USRC11700039',
            popularity: 30,
            title: 'Gold Rush',
            artistName: 'Charlie Wilson',
            albumName: 'In It To Win It',
            coverart300: 'https://i.scdn.co/image/e0e2c15d539b738f6e7324bbee39e19653482057',
            coverart640: 'https://i.scdn.co/image/c7cc3190200cace558d7f530e220d8b2e1cff3a0',
            totalStreamCount: 6732,
            totalStreamCount28Days: 6732,
            totalStreamCountAllTime: 98349,
            audioPreview: 'https://p.scdn.co/mp3-preview/6eef55b28e601a41d6240a8bd4159a8272300ccf',
            labelName: 'RCA Records Label',
            releaseDate: '17 Feb 2017',
          },
          credits: [
            'Charlie Wilson',
            'Snoop Dogg',
            'Rob Knox',
            'Eric Hudson',
            'Bryan Jackson',
            'Mahin Wilson',
            'Michael Paran',
            'Daryl Camper',
            'Calvin Broadus',
          ],
        },
        {
          recording: {
            gid: 'e7e0f7d6ce6d4c899dea513a4805c6ae',
            isrc: 'USKO10403710',
            popularity: 35,
            title: 'Gold Rush',
            artistName: 'Snoop Dogg',
            albumName: 'Tha Doggfather',
            coverart300: 'https://i.scdn.co/image/b5ce765405292fc9a014020d846366f73fc810e9',
            coverart640: 'https://i.scdn.co/image/3b78f02ad0f7d2e77d1aeeaf1ce8bc8f7728b112',
            totalStreamCount: 15877,
            totalStreamCount28Days: 15877,
            totalStreamCountAllTime: 98349,
            audioPreview: 'https://p.scdn.co/mp3-preview/0ddc61b587bb40f420f8783b3476e068cc482165',
            labelName: 'Death Row Records',
            releaseDate: '',
          },
          credits: ['Snoop Dogg'],
        },
      ],
    },
    {
      work: {
        gid: 'OLE438453',
        numberOfRecordings: 0,
        workNumber: '438453',
        title: 'WELL DONE ELAM (HELL ON WHEELS SOUNDTRACK)',
        titleCased: 'Well Done Elam (Hell on Wheels Soundtrack)',
        iswc: '',
        countryStreamCounts: 484,
        recordings: [],
        writers: [
          { name: 'GUSTAVO A SANTAOLALLA', ipi: '351399451' },
          { name: 'KEVIN D KINER', ipi: '204808882' },
        ],
      },
      matches: [
        {
          recording: {
            gid: 'ac743c30be34424995ab4610484bc1f7',
            isrc: 'USKO11201653',
            popularity: 12,
            title: 'Well Done Elam',
            artistName: 'Kevin Kiner; Gustavo Santaolalla',
            albumName: 'Hell On Wheels - Season One',
            coverart300: 'https://i.scdn.co/image/4f635170ebe7c1edc8948652c106fcd7480fc521',
            coverart640: 'https://i.scdn.co/image/b7c66b016129c29d58e85b07c719bac2685d4e84',
            totalStreamCount: 484,
            totalStreamCount28Days: 484,
            totalStreamCountAllTime: 98349,
            audioPreview: 'https://p.scdn.co/mp3-preview/0e941f2e7740e995d1ef700a6c517661c1a83c48',
            labelName: 'eOne Music',
            releaseDate: '7 Aug 2012',
          },
          credits: ['Kevin Kiner; Gustavo Santaolalla'],
        },
      ],
    },
    {
      work: {
        gid: 'OLE438458',
        numberOfRecordings: 0,
        workNumber: '438458',
        title: 'PEPPER JUICE (HELL ON WHEELS SOUNDTRACK)',
        titleCased: 'Pepper Juice (Hell on Wheels Soundtrack)',
        iswc: '',
        countryStreamCounts: 475,
        recordings: [],
        writers: [
          { name: 'GUSTAVO A SANTAOLALLA', ipi: '351399451' },
          { name: 'KEVIN D KINER', ipi: '204808882' },
        ],
      },
      matches: [
        {
          recording: {
            gid: '188920f8b3594031ad50ce6308ec059f',
            isrc: 'USKO11201658',
            popularity: 12,
            title: 'Pepper Juice',
            artistName: 'Kevin Kiner; Gustavo Santaolalla',
            albumName: 'Hell On Wheels - Season One',
            coverart300: 'https://i.scdn.co/image/4f635170ebe7c1edc8948652c106fcd7480fc521',
            coverart640: 'https://i.scdn.co/image/b7c66b016129c29d58e85b07c719bac2685d4e84',
            totalStreamCount: 475,
            totalStreamCount28Days: 475,
            totalStreamCountAllTime: 98349,
            audioPreview: 'https://p.scdn.co/mp3-preview/1c5441db561c9aab42944f5f8f2af140a128ebf2',
            labelName: 'eOne Music',
            releaseDate: '7 Aug 2012',
          },
          credits: ['Kevin Kiner; Gustavo Santaolalla'],
        },
      ],
    },
  ],
};

export const mockCatalogSuggestions: SuggestionsByWork = {
  '11e381d7f7bb4eeca580219d6e4fc8cf': {
    gid: '11e381d7f7bb4eeca580219d6e4fc8cf',
    iswc: '',
    title: 'IN MY FEELINGS',
    titleCased: 'In My Feelings',
    countryStreamCounts: 113477124,
    recordings: [],
    numberOfRecordings: 0,
    workNumber: 'WW015172068000',
    writers: [
      { name: 'Noah Shebib', ipi: '10001' },
      { name: 'Aubrey Graham', ipi: '10101' },
    ],
    matches: {
      '580a0edd888a4279b04493c3cb223f47': {
        gid: '580a0edd888a4279b04493c3cb223f47',
        credits: ['Noah Shebib', 'Aubrey Graham', 'Kiki'],
        albumName: 'Scorpion',
        artistName: 'Drake',
        coverart300: 'https://i.scdn.co/image/f12257240bbec6ddfa780253ac939e646eba2a36',
        coverart640: 'https://i.scdn.co/image/542d705154be4049fc927050d006987e63739bbd',
        isrc: 'USCM51800206',
        title: 'In My Feelings',
        totalStreamCount: 113477124,
        totalStreamCount28Days: 113477124,
        totalStreamCountAllTime: 9834999999,
        audioPreview: '',
      },
    },
  },
};

export const mockTopPlaylists: Playlist[] = [
  {
    playlistId: 'spotify:user:spotify:playlist:37i9dQZF1DWVA1Gq4XHa6U',
    title: 'Gold School',
    dateAdded: '2018-08-04',
    totalStreamCount: 49799,
    pictureUri: 'https://pl.scdn.co/images/pl/default/67ad096ab1f1331a2b21c0cb759233b0abbbaabd',
    type: 'Editorial',
    recordings: [mockRecording],
  },
  {
    playlistId: 'spotify:user:spotify:playlist:47i9dQZF1DWWB1Gq4XHa6U',
    title: 'Discover Weekly',
    dateAdded: '2017-06-02',
    totalStreamCount: 4569032,
    pictureUri: '',
    type: 'Personalized',
    recordings: mockRecordings,
  },
  {
    playlistId: 'spotify:user:spotify:playlist:3ZEKx5sywOH0L1iUbEOtoO',
    title: 'Freaking Sick Playlist Bro',
    dateAdded: '2018-02-11',
    totalStreamCount: 35000000,
    pictureUri: 'https://i.scdn.co/image/ce3c065190e8fefff422d3d31dbf30eef984f3a4',
    type: 'Listener',
    recordings: mockRecordings,
  },
];

export const mockStreamsByProduct: StreamsByProduct = {
  percentages: {
    paid: 0.5,
    free: 0.5,
  },
  totalCount: 1000,
};

export const mockTeamMembers: TeamMember[] = [
  {
    userName: 'bobo',
    fullName: 'Robert O',
    email: 'bobo9000@yerp.com',
    groups: ['Publishing Editors'],
  },
  {
    userName: 'smolboi',
    fullName: 'Little Guy',
    email: 'fred@portland.gov',
    groups: ['Publishing Editors', 'Publishing Admins'],
  },
];

export const mockTeamResponse: TeamResponse = {
  members: mockTeamMembers,
  totalMemberCount: mockTeamMembers.length,
};

export const mockPendingInvites: Invite[] = [
  {
    accessGroup: AccessGroup.PublishingEditor,
    company: 'duck tales',
    email: 'ken@drick.com',
    fullName: 'kendrick duckworth',
    inviteId: '123456789',
    role: 'Songwriter',
    status: InviteStatus.PENDING,
    organizationUri: 'spotify:publisher:duck',
  },
];

export const mockWriterResponse: WriterResponse = {
  size: 50,
  offset: 10,
  numberOfWorks: 50,
  writer: mockWriters[0],
  works: mockTopWorks,
};

export const mockTopWriters: TopWriters = {
  numberOfWriters: 50,
  writers: mockWriters,
};
