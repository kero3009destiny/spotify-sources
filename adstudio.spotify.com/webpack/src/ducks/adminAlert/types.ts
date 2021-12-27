export const FETCH_ADMIN_ALERT_SUCCESS = 'FETCH_ADMIN_ALERT_SUCCESS';

export enum AdminAlertVariableType {
  DATE = 'date',
  DATETIME = 'datetime',
  TIME = 'time',
}

export type AdminAlertVariable = {
  name: string;
  type: AdminAlertVariableType;
  value: string;
};

export type AdminAlert = {
  alert: {
    key: string;
    variables?: AdminAlertVariable[];
  };
};
