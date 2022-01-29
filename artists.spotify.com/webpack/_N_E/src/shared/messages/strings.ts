import { useT } from '@mrkt/features/i18n';
export function useGetString() {
  var t = useT();
  return {
    dataDelayTitle: t('COMMON_MSG_69cad6', 'We’re having trouble updating stats in Spotify for Artists.', ''),
    dataDelaySubtitle: t('COMMON_MSG_6dce52', 'Hang tight while we fix a problem on our end.', ''),
    firstReleased: t('COMMON_MSG_cc1fb3', 'First Released', ''),
    firstReleasedTitle: t('COMMON_MSG_82f77a', 'The date a song was first released on Spotify.', ''),
    followers: t('COMMON_MSG_720ef5', 'Followers', ''),
    insightsError: t('COMMON_MSG_b13db4', 'Something went wrong. There’s a problem on our end and we can’t show these stats right now.', ''),
    listeners: t('COMMON_MSG_605606', 'Listeners', ''),
    releases: t('COMMON_MSG_4c8e6c', 'Releases', ''),
    saves: t('COMMON_MSG_b2435b', 'Saves', ''),
    songs: t('COMMON_MSG_b3ff75', 'songs', ''),
    streams: t('COMMON_MSG_b98dff', 'Streams', ''),
    views: t('COMMON_MSG_d2a387', 'Views', ''),
    worldwide: {
      code: 'worldwide',
      name: t('COMMON_MSG_e7a3fa', 'Worldwide', "Example Usage #1: listeners \u2022 last 28 days \u2022 worldwide.\n         Example Usage #2: A dropdown label that indicates all the\n         data shown on a given page is worldwide data.")
    }
  };
}
export function useGetStringLegacy() {
  var t = useT();
  return {
    // <StackedColumnChart /> & <StackedRowChart /> rely on `id` for scales
    age0To17: {
      id: 'messages.metric.age0To17',
      defaultMessage: t('COMMON_MSG_LEGACY_957f19', '<18', '')
    },
    age18To22: {
      id: 'messages.metric.age18To22',
      defaultMessage: t('COMMON_MSG_LEGACY_0899b7', '18-22', '')
    },
    age23To27: {
      id: 'messages.metric.age23To27',
      defaultMessage: t('COMMON_MSG_LEGACY_2afc78', '23-27', '')
    },
    age28To34: {
      id: 'messages.metric.age28To34',
      defaultMessage: t('COMMON_MSG_LEGACY_bb0990', '28-34', '')
    },
    age35To44: {
      id: 'messages.metric.age35To44',
      defaultMessage: t('COMMON_MSG_LEGACY_ebd277', '35-44', '')
    },
    age45To59: {
      id: 'messages.metric.age45To59',
      defaultMessage: t('COMMON_MSG_LEGACY_eb6717', '45-59', '')
    },
    age60To150: {
      id: 'messages.metric.age60To150',
      defaultMessage: t('COMMON_MSG_LEGACY_f862ba', '60+', '')
    },
    age60: {
      id: 'messages.metric.age60',
      defaultMessage: t('COMMON_MSG_LEGACY_f862ba', '60+', '')
    },
    ageUnknown: {
      id: 'messages.metric.ageUnknown',
      defaultMessage: t('COMMON_MSG_LEGACY_6d9752', 'Unknown', 'This text is displayed on a column chart that shows different age brackets of Spotify listeners (ex: "18 – 22"). "Unknown" appears when an age is not specified.')
    },
    // <ColumnChart /> & <RowChart /> rely on `id` for scales
    streamSources_catalog: {
      id: 'messages.metric.streamSourcesCatalog',
      defaultMessage: t('COMMON_MSG_LEGACY_2e5924', 'Your profile and catalog', '')
    },
    streamSources_user: {
      id: 'messages.metric.streamSourcesUser',
      defaultMessage: t('COMMON_MSG_LEGACY_e2b1d8', 'Listener’s own playlists and library', '')
    },
    streamSources_network: {
      id: 'messages.metric.streamSourcesNetwork',
      defaultMessage: t('COMMON_MSG_LEGACY_ebc9e1', 'Other listener’s playlists', '')
    },
    streamSources_personalized: {
      id: 'messages.metric.streamSourcesSpotifyPersonalized',
      defaultMessage: t('COMMON_MSG_LEGACY_d24278', 'Spotify algorithmic playlists', '')
    },
    streamSources_editorial: {
      id: 'messages.metric.streamSourcesSpotifyEditorial',
      defaultMessage: t('COMMON_MSG_LEGACY_f01ec1', 'Spotify editorial playlists', '')
    },
    streamSources_other: {
      id: 'messages.metric.streamSourcesOther',
      defaultMessage: t('COMMON_MSG_LEGACY_3e9cd8', 'Other', '')
    },
    streamSources_catalogTooltip: {
      id: 'messages.metric.streamSourcesCatalogTooltip',
      defaultMessage: t('COMMON_MSG_LEGACY_4714db', 'Streams from your profile or one of your releases', '')
    },
    streamSources_editorialTooltip: {
      id: 'messages.metric.streamSourceseditorialTooltip',
      defaultMessage: t('COMMON_MSG_LEGACY_0b2b78', 'Streams from playlists made by Spotify editors', '')
    },
    streamSources_personalizedTooltip: {
      id: 'messages.metric.streamSourcespersonalizedTooltip',
      defaultMessage: t('COMMON_MSG_LEGACY_22fb49', 'Streams from playlists made by Spotify algorithms', '')
    },
    streamSources_networkTooltip: {
      id: 'messages.metric.streamSourcesNetworkTooltip',
      defaultMessage: t('COMMON_MSG_LEGACY_747bdd', 'Streams from another listener’s personal playlist', '')
    },
    streamSources_otherTooltip: {
      id: 'messages.metric.streamSourcesOtherTooltip',
      defaultMessage: t('COMMON_MSG_LEGACY_1f8151', 'Streams that come from sources like smart speakers, TVs, or wearables', '')
    },
    streamSources_userTooltip: {
      id: 'messages.metric.streamSourcesUserTooltip',
      defaultMessage: t('COMMON_MSG_LEGACY_3619d6', 'Streams from a listener’s personal playlist', '')
    }
  };
}