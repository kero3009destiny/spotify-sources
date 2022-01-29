/* eslint-disable react/prop-types */
import React from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import { IconArrowTopRight, IconMore, Type } from '@spotify-internal/encore-web';
import { useT } from '@mrkt/features/i18n';
import { sendEvent } from '@apps/artists-spotify-com-c/src/features/googleAnalytics';
import { spotifyOpenLink } from '../../../../shared/lib/urlHelpers';
import { TableRow, TableCell } from '../../../../shared/components/Table';
import CalendarIcon from '../../CalendarIcon';
import MediaWithDescription from '../../MediaWithDescription';
import Dropdown from './Dropdown';
import styles from './ConcertsListingRow.module.scss';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var Overflow = styled(Type.p).withConfig({
  displayName: "ConcertsListingRow__Overflow",
  componentId: "eiafl4-0"
})(["overflow:hidden;text-overflow:ellipsis;"]);
export var ConcertsListingRow = function ConcertsListingRow(props) {
  var data = props.data,
      isMobile = props.isMobile,
      isSmallScreen = props.isSmallScreen,
      onShowConcertDetails = props.onShowConcertDetails,
      renderConcertShare = props.renderConcertShare;
  var notInLineup = data.notInLineup,
      uri = data.uri,
      ticketingClickThru = data.ticketingClickThru;
  var t = useT();
  var messages = {
    share: {
      id: 'ConcertsListingRow.share',
      defaultMessage: 'Share'
    },
    reportProblem: {
      id: 'ConcertsListingRow.report',
      defaultMessage: t('84ab69', 'Report a problem', '')
    },
    viewDetails: {
      id: 'ConcertsListingRow.viewDetails',
      defaultMessage: t('73c88c', 'View details', '')
    }
  };

  var goToConcert = function goToConcert() {
    sendEvent({
      eventCategory: 'concerts',
      eventAction: 'click',
      eventLabel: 'Concert Row Open Link'
    });
    window.open(spotifyOpenLink(uri), '_blank');
  };

  var goToTicket = function goToTicket() {
    sendEvent({
      eventCategory: 'concerts',
      eventAction: 'click',
      eventLabel: 'Concert Row Ticket Link'
    });
    window.open(ticketingClickThru, '_blank');
  };

  var shareConcert = function shareConcert(ev) {
    /* istanbul ignore next */
    ev.stopPropagation();
    /* istanbul ignore next */

    ev.preventDefault();
    /* istanbul ignore next */

    renderConcertShare(uri);
  };

  var showDetails = function showDetails(ev) {
    /* istanbul ignore next */
    ev.stopPropagation();
    /* istanbul ignore next */

    ev.preventDefault();
    onShowConcertDetails(data);
  };

  return /*#__PURE__*/_jsxs(TableRow, {
    className: cn(styles.concert_table_row, styles.concert_table_row_profile, notInLineup && styles.not_in_lineup_row),
    "data-scroll-id": "cid-".concat(data.id),
    children: [(isMobile || isSmallScreen) && /*#__PURE__*/_jsx(TableCell, {
      truncate: true,
      children: /*#__PURE__*/_jsx(MediaWithDescription, {
        media: /*#__PURE__*/_jsx(CalendarIcon, {
          month: data.formatted.dateIconMonth,
          day: data.formatted.dateIconDay,
          variant: notInLineup ? 'inactive' : 'default'
        }),
        description: /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsx(Overflow, {
            condensed: true,
            color: "white",
            children: data.venue
          }), /*#__PURE__*/_jsx(Overflow, {
            condensed: true,
            color: "white",
            children: data.location
          }), /*#__PURE__*/_jsx(Overflow, {
            condensed: true,
            color: "white",
            variant: Type.body3,
            children: /*#__PURE__*/_jsx("a", {
              style: {
                color: 'inherit'
              },
              className: "no",
              href: data.ticketingClickThru,
              target: "_blank",
              rel: "noopener noreferrer",
              children: data.ticketingPartner
            })
          })]
        })
      })
    }), !isMobile && !isSmallScreen && /*#__PURE__*/_jsx(TableCell, {
      className: styles.concert_date_column // @ts-ignore
      ,
      onClick:
      /* istanbul ignore next */
      function onClick() {
        return goToConcert();
      },
      "data-link": "open-link",
      children: /*#__PURE__*/_jsx(MediaWithDescription, {
        media: /*#__PURE__*/_jsx(CalendarIcon, {
          month: data.formatted.dateIconMonth,
          day: data.formatted.dateIconDay,
          variant: notInLineup ? 'inactive' : 'default'
        }),
        description: /*#__PURE__*/_jsxs("div", {
          children: [/*#__PURE__*/_jsxs("div", {
            className: styles.link_out_container,
            children: [/*#__PURE__*/_jsx(Type, {
              as: "p",
              color: "white",
              weight: "bold",
              condensed: true,
              children: data.formatted.date
            }), /*#__PURE__*/_jsx(IconArrowTopRight, {
              iconSize: 16,
              className: styles.concert_date_hover
            })]
          }), /*#__PURE__*/_jsx(Overflow, {
            condensed: true,
            children: data.formatted.dateStartTime
          })]
        })
      })
    }), !isMobile && !isSmallScreen && /*#__PURE__*/_jsxs(TableCell, {
      truncate: true,
      className: styles.concert_text_column,
      children: [/*#__PURE__*/_jsx("div", {
        className: styles.concert_venue,
        children: data.venue
      }), /*#__PURE__*/_jsx("div", {
        className: styles.concert_venue,
        children: data.location
      })]
    }), !isMobile && !isSmallScreen && /*#__PURE__*/_jsx(TableCell // @ts-ignore
    , {
      onClick:
      /* istanbul ignore next */
      function onClick() {
        return goToTicket();
      },
      truncate: true,
      className: cn(styles.concert_text_column, styles.concert_ticket_partner),
      "data-link": "ticket-link",
      children: /*#__PURE__*/_jsxs("div", {
        className: styles.link_out_container,
        children: [/*#__PURE__*/_jsx("span", {
          children: data.ticketingPartner
        }), /*#__PURE__*/_jsx(IconArrowTopRight, {
          iconSize: 16,
          className: styles.concert_ticket_hover
        })]
      })
    }), !notInLineup && /*#__PURE__*/_jsx(TableCell, {
      className: styles.concert_action_menu,
      children: /*#__PURE__*/_jsxs(Dropdown, {
        trigger: /*#__PURE__*/_jsx(IconMore, {
          iconSize: 16
        }),
        isMobile: isMobile,
        children: [/*#__PURE__*/_jsx("button", {
          "data-testid": "shareButton",
          type: "button",
          className: styles.concert_action,
          onClick:
          /* istanbul ignore next */
          function onClick(e) {
            return shareConcert(e);
          },
          children: messages.share.defaultMessage
        }), /*#__PURE__*/_jsx("button", {
          type: "button",
          className: styles.concert_action,
          onClick:
          /* istanbul ignore next */
          function onClick(e) {
            return showDetails(e);
          },
          children: messages.viewDetails.defaultMessage
        })]
      })
    })]
  });
};
ConcertsListingRow.defaultProps = {
  onShowConcertDetails: function onShowConcertDetails() {}
};
/* eslint-disable-next-line import/no-default-export */

export default ConcertsListingRow;