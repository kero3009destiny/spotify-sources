import i18n from 'i18next';

import { dateFormatter } from 'components/common/FormatDate';

import {
  AdminAlert,
  AdminAlertVariable,
  AdminAlertVariableType,
} from './types';

const localizeDate = (
  date: string,
  dateFormat: string = 'MMM D, YYYY',
): string => dateFormatter(date, dateFormat);

const localizeTime = (
  time: string,
  date: string = '1970-01-01',
  timeFormat: string = 'LT',
): string => dateFormatter(`${date}T${time}:00Z`, timeFormat);

const localizeDateTime = (name: string, datetime: string): object => {
  const [date, time] = datetime.split(' ');
  return {
    [`${name}Date`]: localizeDate(date),
    [`${name}Time`]: localizeTime(time, date),
  };
};

/**
 *
 * @param json
 */
export const parseAdminAlertJSON = (
  json: AdminAlert | boolean,
): string | boolean => {
  if (typeof json !== 'object') {
    return false;
  }

  const { alert } = json;
  // Reduce the array of variables to an object
  const variables = (alert.variables || []).reduce(
    (acc, { name, type, value }: AdminAlertVariable) => {
      switch (type) {
        // Localize dates and times
        case AdminAlertVariableType.DATE:
          return {
            ...acc,
            [name]: localizeDate(value),
          };
        case AdminAlertVariableType.TIME:
          return {
            ...acc,
            [name]: localizeTime(value),
          };
        case AdminAlertVariableType.DATETIME:
          return {
            ...acc,
            ...localizeDateTime(name, value),
          };
        default:
          return {
            ...acc,
            [name]: value,
          };
      }
    },
    {},
  );

  // return the I18Nized string
  const text = i18n.t(alert.key || '', '', variables);

  // If we have no content here, alert on-call
  if (!text) {
    throw new Error(
      `Admin alert for input ${JSON.stringify(alert)} cannot be parsed.`,
    );
  }

  return text;
};
