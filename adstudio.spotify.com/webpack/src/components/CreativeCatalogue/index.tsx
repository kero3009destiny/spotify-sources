import React, { FunctionComponent } from 'react';

import { AnalyticsContextProvider } from 'components/common/AnalyticsContext';
import { CataloguePageContainer } from 'components/common/CampaignHierarchy/PageContainer';
import {
  TableContextProvider,
  TableType,
} from 'components/common/Table/TableContext';

import { ConnectedCatalogueNavBar } from '../common/CampaignHierarchy/NavBar';
import { CreativeTableBrowser } from './CreativeTableBrowser/index';

import { ANALYTICS_CATEGORY } from './constants';
import { routes } from 'config/routes';

const CreativeCatalogue: FunctionComponent = () => (
  <TableContextProvider value={TableType.CATALOGUE}>
    <AnalyticsContextProvider value={{ category: ANALYTICS_CATEGORY }}>
      <CataloguePageContainer
        dataTestName="creative-catalogue"
        route={routes.CREATIVE_CATALOGUE}
      >
        <ConnectedCatalogueNavBar />
        <CreativeTableBrowser />
      </CataloguePageContainer>
    </AnalyticsContextProvider>
  </TableContextProvider>
);

export default CreativeCatalogue;
