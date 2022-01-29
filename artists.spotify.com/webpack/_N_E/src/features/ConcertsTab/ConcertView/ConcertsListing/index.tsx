import React, { useState } from 'react';
import flatMap from 'lodash/flatMap';
import { Type, ButtonTertiary } from '@spotify-internal/encore-web';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { Table } from '../../../../shared/components/Table';
import ConcertsAlert from '../../ConcertsAlert';
import partnerConfig from '../../partnerConfig';
import { ConcertsListingColgroup } from './ConcertsListingColgroup';
import { ConcertsListingHeader } from './ConcertsListingHeader';
import { ConcertsListingRow } from './ConcertsListingRow';
import { ConcertsListingEmptyRow } from './ConcertsListingEmptyRow';
import ConcertsListingRowNotInLineupMessage from './ConcertsListingRowNotInLineupMessage';
import { ConcertShare } from './ConcertShare'; // eslint-disable-next-line import/no-named-as-default

import ConcertDetailsHOC from './ConcertDetails';
import { useT } from '@mrkt/features/i18n';
import styles from './index.module.scss';
import { Screen } from '../../../../shared/lib/useViewport';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var ConcertsListing = function ConcertsListing(props) {
  var t = useT();
  var messages = {
    emptyConcerts: {
      id: 'app.Concerts.emptyConcerts',
      defaultMessage: t('53e6f8', "Looks like you don't have concerts listed with our partners.", '')
    },
    addOnSongkick: {
      id: 'app.Concerts.addOnSongkick',
      defaultMessage: t('781eae', 'Add on Songkick', '')
    }
  };

  var _useState = useState(false),
      showShareModal = _useState[0],
      setShowShareModal = _useState[1];

  var _useState2 = useState(''),
      shareUri = _useState2[0],
      setShareUri = _useState2[1];

  var _useState3 = useState(false),
      showConcertDetails = _useState3[0],
      setShowConcertDetails = _useState3[1];

  var _useState4 = useState(null),
      detailsConcert = _useState4[0],
      setDetailsConcert = _useState4[1];

  var openConcertDetails = function openConcertDetails(concertData) {
    setShowConcertDetails(true);
    setDetailsConcert(concertData);
  };

  var closeConcertDetails = function closeConcertDetails() {
    setShowConcertDetails(false);
    setDetailsConcert(null);
  };

  var handleReportFromDetails = function handleReportFromDetails(partner) {
    closeConcertDetails();
    props.onReportAProblem(partner);
  };

  var handleOpenPartnerSettings = function handleOpenPartnerSettings() {
    closeConcertDetails();
    props.onOpenPartnerSettings();
  };

  var emptySet = function emptySet() {
    return ['e', 'm', 'p', 't', 'y', 's', 'a', 'd'];
  };

  var listingSort = function listingSort() {
    var concerts = props.concerts,
        sortDescending = props.sortDescending;
    return concerts.slice().sort(function (a, b) {
      var elementA = a.date || 0;
      var elementB = b.date || 0;

      if (elementA !== elementB) {
        if (sortDescending) {
          return elementA < elementB ? 1 : -1;
        }

        return elementA < elementB ? -1 : 1;
      }

      return 0;
    });
  };

  var toggleShareConcert = function toggleShareConcert(uri) {
    setShowShareModal(!showShareModal);
    setShareUri(uri);
  };

  var trackAddOnSongkick = function trackAddOnSongkick() {
    return sendEvent({
      eventCategory: 'concerts',
      eventAction: 'click',
      eventLabel: 'Concerts Empty Table Add On Songkick'
    });
  };

  var viewport = props.viewport,
      concerts = props.concerts,
      partners = props.partners;
  var empty = concerts.length === 0;
  var extraSmall = viewport <= Screen.XS;
  var small = viewport <= Screen.SM;
  var medium = viewport <= Screen.MD;
  var partnerForConcert = showConcertDetails ? // the BE sends back formatted ticketing partner names.
  // we should either lower case it, currently done,
  // or we should use the partner config to match by partnerName
  // until there proves a case otherwise, let's just stick to what we got
  partners.find(function (partner) {
    return partner.partnerName === detailsConcert.ticketingPartner.toLowerCase();
  }) || {} : {};
  return /*#__PURE__*/_jsxs("section", {
    className: styles.concerts_section,
    children: [empty && /*#__PURE__*/_jsx(ConcertsAlert, {
      message: /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx(Type, {
          as: "p",
          weight: "bold",
          condensed: true,
          children: t('4690b9', 'No upcoming concerts', '')
        }), /*#__PURE__*/_jsx(Type, {
          as: "p",
          condensed: true,
          children: t('c40788', 'You can add a concert on Songkick.', '')
        }), /*#__PURE__*/_jsx(Type, {
          as: "p",
          condensed: true,
          children: t('195976', 'For problems with your concerts, contact the ticket partner.', '')
        })]
      }),
      link: /*#__PURE__*/_jsx(ButtonTertiary, {
        className: styles.add_on_songkick_link,
        buttonSize: ButtonTertiary.lg,
        semanticColor: "textBrightAccent",
        rel: "noopener noreferrer",
        target: "_blank",
        onClick: function onClick() {
          return trackAddOnSongkick();
        },
        "data-link": "add-on-songkick",
        href: partnerConfig.songkickTourboxLink,
        children: messages.addOnSongkick.defaultMessage
      })
    }), /*#__PURE__*/_jsx(Table, {
      colgroup: /*#__PURE__*/_jsx(ConcertsListingColgroup, {
        isMobile: extraSmall,
        isSmallScreen: small,
        isMediumScreen: medium
      }),
      head: /*#__PURE__*/_jsx(ConcertsListingHeader, {
        isMobile: extraSmall || small
      }),
      body: empty ? emptySet().map(function (x) {
        return /*#__PURE__*/_jsx(ConcertsListingEmptyRow, {
          isMobile: extraSmall,
          isSmallScreen: small
        }, x);
      }) : flatMap(listingSort(), function (row) {
        return row.notInLineup ? [/*#__PURE__*/_jsx(ConcertsListingRow, {
          data: row,
          isMobile: extraSmall,
          isSmallScreen: small,
          renderConcertShare: toggleShareConcert
        }, row.id), /*#__PURE__*/_jsx(ConcertsListingRowNotInLineupMessage, {
          partnerName: row.ticketingPartner,
          partnerContactUrl: row.ticketingClickThru,
          hiddenPartnerName: row.hiddenPartnerName,
          hiddenPartnerContactUrl: row.hiddenPartnerClickThru,
          isMobile: extraSmall
        }, "".concat(row.id, "-inactive"))] : /*#__PURE__*/_jsx(ConcertsListingRow, {
          data: row,
          isMobile: extraSmall,
          isSmallScreen: small,
          renderConcertShare: toggleShareConcert,
          onShowConcertDetails: openConcertDetails
        }, row.id);
      })
    }), showShareModal && /*#__PURE__*/_jsx(ConcertShare, {
      uri: shareUri,
      toggleShare: toggleShareConcert // @ts-ignore
      ,
      isMobile: extraSmall
    }), showConcertDetails &&
    /*#__PURE__*/
    // gonna need all connected ticketing partners
    // in order to give the details to the relevant concert
    _jsx(ConcertDetailsHOC, {
      onClose: closeConcertDetails,
      onReportAProblem: handleReportFromDetails,
      onOpenPartnerSettings: handleOpenPartnerSettings,
      venue: detailsConcert.venue,
      connectedPartner: partnerForConcert,
      ticketingClickThru: detailsConcert.ticketingClickThru,
      date: detailsConcert.formatted.date,
      startTime: detailsConcert.formatted.dateStartTime,
      month: detailsConcert.formatted.dateIconMonth,
      day: detailsConcert.formatted.dateIconDay
    })]
  });
};
ConcertsListing.defaultProps = {
  onReportAProblem: function onReportAProblem() {},
  onOpenPartnerSettings: function onOpenPartnerSettings() {}
};
/* eslint-disable-next-line import/no-default-export */

export default ConcertsListing;