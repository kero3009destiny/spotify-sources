import i18n from 'i18next';

const CarouselContent = [
  {
    paragraph: i18n.t(
      'I18N_IT_S_REALLY_EXCITING_TO_S',
      'It’s really exciting to see how our Spotify Ad Studio campaigns impact streaming behavior, even after people hear the ad. These campaigns live on and have an impact far beyond a click.',
    ),

    author: i18n.t('I18N_MARIAH_CZAP', 'Mariah Czap,'),
    cite: i18n.t(
      'I18N_DIGITAL_MARKETING_MANAGER',
      'Digital Marketing Manager, Yep Roc Records',
    ),
    logo:
      'https://adstudio.scdn.co/assets/streaming-conversion-metrics/yep_roc_logo_black_sm.png',
    alt: i18n.t('I18N_YEP_ROC_RECORDS_LOGO', 'Yep Roc Records Logo'),
  },

  {
    paragraph: i18n.t(
      'I18N_WITH_SPOTIFY_AD_STUDIO_W',
      'With Spotify Ad Studio, we’re able to understand deeper actions for an artist like how fans are adding a song to their playlist or "hearting" a song. Those are the holy grail of metrics for artists to know.',
    ),

    author: i18n.t('I18N_CONOR_CLARK', 'Conor Clark,'),
    cite: i18n.t('I18N_CEO_WAVO', 'CEO, Wavo'),
    logo:
      'https://adstudio.scdn.co/assets/streaming-conversion-metrics/wavo-logo-black.png',
    alt: i18n.t('I18N_WAVO_LOGO', 'Wavo Logo'),
  },

  {
    paragraph: i18n.t(
      'I18N_SPOTIFY_AD_STUDIO_IS_A_GR',
      'Spotify Ad Studio is a great tool to reach listeners and build our artists’ exposure on an increasingly important platform.',
    ),

    author: i18n.t('I18N_JIMMY_BRUNETTI', 'Jimmy Brunetti,'),
    cite: i18n.t(
      'I18N_VP_OF_MARKETING_CROSHAL',
      'VP of Marketing, Croshal Entertainment Group',
    ),
    logo:
      'https://adstudio.scdn.co/assets/streaming-conversion-metrics/ceg_logo_sm.png',
    alt: i18n.t(
      'I18N_CROSHAL_ENTERTAINMENT_GRO',
      'Croshal Entertainment Group Logo',
    ),
  },
];

export default CarouselContent;
