import React from 'react';
import { useT } from '@mrkt/features/i18n';
import { TableRow, TableHeadCell } from '../../../../shared/components/Table';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var ConcertsListingHeader = function ConcertsListingHeader(props) {
  var isMobile = props.isMobile;
  var t = useT();
  var messages = {
    date: {
      id: 'ConcertsListingHeader.date',
      defaultMessage: t('31a3a5', 'date', '')
    },
    dateTitle: {
      id: 'ConcertsListingHeader.date.title',
      defaultMessage: t('5d89c5', 'Concert Date', '')
    },
    venue: {
      id: 'ConcertsListingHeader.venue',
      defaultMessage: t('8a5c04', 'venue', '')
    },
    venueTitle: {
      id: 'ConcertsListingHeader.venue.title',
      defaultMessage: t('8736b3', 'Concert Venue and Location', '')
    },
    ticketingPartner: {
      id: 'ConcertsListingHeader.venue',
      defaultMessage: t('bd194f', 'ticketing partner', '')
    },
    ticketingPartnerTitle: {
      id: 'ConcertsListingHeader.ticketingPartner.title',
      defaultMessage: t('4e8ab1', 'Ticketing Partner', '')
    }
  };
  return /*#__PURE__*/_jsxs(TableRow, {
    children: [/*#__PURE__*/_jsx(TableHeadCell, {
      title: messages.dateTitle.defaultMessage,
      children: messages.date.defaultMessage
    }), !isMobile &&
    /*#__PURE__*/
    // @ts-ignore
    _jsx(TableHeadCell, {
      title: messages.venueTitle.defaultMessage,
      children: messages.venue.defaultMessage
    }), !isMobile &&
    /*#__PURE__*/
    // @ts-ignore
    _jsx(TableHeadCell, {
      title: messages.ticketingPartnerTitle.defaultMessage,
      children: messages.ticketingPartner.defaultMessage
    })]
  });
};

/* eslint-disable-next-line import/no-default-export */
export default ConcertsListingHeader;