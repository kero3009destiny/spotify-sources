import React, { FunctionComponent } from 'react';

import { AnalyticsContextProvider } from 'components/common/AnalyticsContext';
import { ConnectedCatalogueNavBar } from 'components/common/CampaignHierarchy/NavBar';
import { CataloguePageContainer } from 'components/common/CampaignHierarchy/PageContainer';
import {
  TableContextProvider,
  TableType,
} from 'components/common/Table/TableContext';

import { FlightTableBrowser } from './FlightTableBrowser/index';

import { ANALYTICS_CATEGORY } from './constants';
import { routes } from 'config/routes';

const FlightCatalogue: FunctionComponent = () => (
  <TableContextProvider value={TableType.CATALOGUE}>
    <AnalyticsContextProvider value={{ category: ANALYTICS_CATEGORY }}>
      <CataloguePageContainer
        dataTestName="flight-catalogue"
        route={routes.FLIGHT_CATALOGUE}
      >
        <ConnectedCatalogueNavBar />
        <FlightTableBrowser />
      </CataloguePageContainer>
    </AnalyticsContextProvider>
  </TableContextProvider>
);

export default FlightCatalogue;
