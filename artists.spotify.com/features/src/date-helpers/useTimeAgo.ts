// ignore-string-externalization
import {
  useDateTimeFormatter,
  useRelativeTimeFormatter,
} from '@mrkt/features/i18n';

export function useTimeAgo() {
  // use numeric: auto to format "1 day ago" to "Yesterday";
  const relativeFormat = useRelativeTimeFormatter({ numeric: 'auto' });
  const dateFormat = useDateTimeFormatter({
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (timestampMillis: number) => {
    const distanceToNow = Date.now() - timestampMillis;

    const secondsAgo = distanceToNow / 1000;
    if (secondsAgo < 60) {
      const out = -Math.floor(secondsAgo);
      return relativeFormat.format(out, 'seconds');
    }

    const minsAgo = distanceToNow / 60000;
    if (minsAgo < 60) {
      const out = -Math.floor(minsAgo);
      return relativeFormat.format(out, 'minutes');
    }

    const hoursAgo = distanceToNow / 3600000;
    if (hoursAgo < 24) {
      const out = -Math.floor(hoursAgo);
      return relativeFormat.format(out, 'hours');
    }

    const daysAgo = Math.floor(distanceToNow / 86400000);
    if (daysAgo < 8) {
      const out = -daysAgo;
      return relativeFormat.format(out, 'days');
    }

    return dateFormat.format(new Date(timestampMillis));
  };
}
