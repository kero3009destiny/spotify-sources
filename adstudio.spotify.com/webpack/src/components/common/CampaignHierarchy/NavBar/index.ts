import { CatalogueNavBar } from './CatalogueNavBar';
import { ConnectedNavBarHOC as connectedNavBarHOC } from './ConnectedNavBarHOC';

export { CatalogueNavBar } from './CatalogueNavBar';
export { ConnectedNavBarHOC } from './ConnectedNavBarHOC';

export const ConnectedCatalogueNavBar = connectedNavBarHOC(CatalogueNavBar);
