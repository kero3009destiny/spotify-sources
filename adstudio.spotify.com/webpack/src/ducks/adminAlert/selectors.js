import { parseAdminAlertJSON } from './mapper';

export const getAdminAlert = state => parseAdminAlertJSON(state.adminAlert);
