import * as React from 'react';
import {
  IconArrowTopRight,
  Type,
  azure,
} from '@spotify-internal/encore-web-v3';
import { useDateTimeFormatter, useNumberFormatter } from '@mrkt/features/i18n';
import {
  EM_DASH,
  formatNumberWithFallback,
  isPersonalizedPlaylist,
  parseDate,
  generateOpenLink,
  intlDateFormatTitleOptions,
} from '../utils/';

const formatTitle = (titleText: $TSFixMe, t: $TSFixMe) => (
  <React.Fragment>
    {/* insert truncation here */}
    {titleText}
    {/* @ts-ignore */}
    {!isPersonalizedPlaylist(titleText, t) && (
      <IconArrowTopRight iconSize={16} className="topRightArrow" />
    )}
  </React.Fragment>
);

const generateSubtitle = (
  followers: $TSFixMe,
  isAlgotorial: $TSFixMe,
  t: $TSFixMe,
  numberFormatter: $TSFixMe,
) => (
  <React.Fragment>
    {followers !== undefined && (
      <React.Fragment>
        <Type condensed>
          {t('GENERATE_SUBTITLE_a03c25', '{numFollowers} followers', '', {
            numFollowers: formatNumberWithFallback(followers, numberFormatter),
          })}
        </Type>{' '}
        •{' '}
      </React.Fragment>
    )}
    {isAlgotorial ? (
      <Type color={azure}>
        {t('GENERATE_SUBTITLE_9f1667', 'Personalized', '')}
      </Type>
    ) : (
      t('GENERATE_SUBTITLE_adc5f5', 'Editorial', '')
    )}
  </React.Fragment>
);

const getTimeAgoString = (date: $TSFixMe, timeAgo: $TSFixMe) => {
  const now = Date.now();
  const then = new Date(date).getTime();
  const daysAgo = Math.floor((now - then) / 86400000);

  if (daysAgo < 8) {
    return timeAgo(then);
  }

  // fallback to em dash for dates outside of the 7 day range
  return EM_DASH;
};

export function useRecentlyAddedTableNormalizer(
  data: $TSFixMe,
  t: $TSFixMe,
  timeAgo: $TSFixMe,
) {
  const numberFormatter = useNumberFormatter();
  const tooltipDateFormatter = useDateTimeFormatter(intlDateFormatTitleOptions);

  return data
    .slice()
    .sort((a: $TSFixMe, b: $TSFixMe) => {
      const dateA = new Date(a.dateAdded);
      const dateB = new Date(b.dateAdded);
      if (dateA > dateB) {
        return -1;
      }

      if (dateA < dateB) {
        return 1;
      }

      return 0;
    })
    .map((item: $TSFixMe) => {
      const dateAdded = item.dateAdded
        ? parseDate(item.dateAdded)
        : item.dateAdded;
      const btnText = {
        active: item.isAlgotorial
          ? t('ALGOTORIAL_PLAYLIST_76a2f6', 'Unique Link Copied', '')
          : t('ALGOTORIAL_PLAYLIST_3115a3', 'Link Copied', ''),
        default: item.isAlgotorial
          ? t('ALGOTORIAL_PLAYLIST_519ee1', 'Copy Unique Link', '')
          : t('ALGOTORIAL_PLAYLIST_c38d4c', 'Copy Link', ''),
      };

      return {
        ...item,
        btnText,
        dateAdded: getTimeAgoString(item.dateAdded, timeAgo),
        key: item.uri,
        originalValues: { ...item },
        thumbnailSubtitleKey: generateSubtitle(
          item.followers,
          item.isAlgotorial,
          t,
          numberFormatter,
        ),
        title: formatTitle(item.title, t),
        titleText: {
          title: item.title,
          dateAdded: tooltipDateFormatter.format(dateAdded),
        },
        shareableLink: item.isAlgotorial
          ? item.shareableLink
          : generateOpenLink(item.uri),
      };
    });
}
