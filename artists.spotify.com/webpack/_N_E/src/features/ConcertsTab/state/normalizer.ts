// ignore-string-externalization
import partnerConfig from '../partnerConfig';
import { parseDateFromString, formatConcertDateView, formatConcertDateStartTime, formatConcertDateIconMonth, formatConcertDateIconDay } from './dateUtils';
/**
 * Normalizes a single concert item from the BE; for use in selector
 * @param  {Object} item – The original payload
 * @return {Object} – Normalized data
 */

export function normalizeView(item) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  var concert = item.data;
  var concertDate = parseDateFromString(concert.startDate.localDate);
  var partnerId = concert.partnerConcerts && concert.partnerConcerts[0] ? concert.partnerConcerts[0].partnerId : ''; // @ts-ignore

  var partner = partnerConfig.partnersById[partnerId];
  var newItem = {
    id: concert.id,
    uri: "spotify:concert:".concat(concert.id),
    date: +concertDate,
    venue: concert.venue,
    location: concert.location,
    ticketingPartner: partner ? partner.displayName : partnerId,
    ticketingClickThru: item.clickThru,
    notInLineup: !!item.notInLineup
  };
  newItem.formatted = {
    date: formatConcertDateView(concertDate, locale),
    dateStartTime: formatConcertDateStartTime(concertDate, locale),
    dateIconMonth: formatConcertDateIconMonth(concertDate, locale),
    dateIconDay: formatConcertDateIconDay(concertDate, locale)
  };

  if (newItem.notInLineup) {
    newItem.hiddenPartnerName = item.hiddenConcerts[0].partner;
    newItem.hiddenPartnerClickThru = item.hiddenConcerts[0].partnerClickThru;
  }

  return newItem;
}
/* eslint-disable-next-line import/no-default-export */

export default normalizeView;