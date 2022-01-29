// ignore-string-externalization
import '@spotify-internal/react-dates/initialize';
import React from 'react';
import router from 'next/router';
import moment from 'moment';
import type { SingleDatePickerShape, DateRangePickerShape } from 'react-dates';

import {
  SingleDatePicker,
  DateRangePicker,
} from '@spotify-internal/react-dates';
import { usePhrases } from './usePhrases';

const localeLoader = {
  ar: () =>
    import(/* webpackChunkName: "momentLocale-ar" */ 'moment/locale/ar'),
  zh: () =>
    import(/* webpackChunkName: "momentLocale-zh" */ 'moment/locale/zh-tw'),
  cs: () =>
    import(/* webpackChunkName: "momentLocale-cs" */ 'moment/locale/cs'),
  nl: () =>
    import(/* webpackChunkName: "momentLocale-nl" */ 'moment/locale/nl'),
  fi: () =>
    import(/* webpackChunkName: "momentLocale-fi" */ 'moment/locale/fi'),
  'fr-CA': () =>
    import(/* webpackChunkName: "momentLocale-fr-CA" */ 'moment/locale/fr-ca'),
  fr: () =>
    import(/* webpackChunkName: "momentLocale-fr" */ 'moment/locale/fr'),
  de: () =>
    import(/* webpackChunkName: "momentLocale-de" */ 'moment/locale/de'),
  el: () =>
    import(/* webpackChunkName: "momentLocale-el" */ 'moment/locale/el'),
  he: () =>
    import(/* webpackChunkName: "momentLocale-he" */ 'moment/locale/he'),
  hu: () =>
    import(/* webpackChunkName: "momentLocale-hu" */ 'moment/locale/hu'),
  id: () =>
    import(/* webpackChunkName: "momentLocale-id" */ 'moment/locale/id'),
  it: () =>
    import(/* webpackChunkName: "momentLocale-it" */ 'moment/locale/it'),
  ja: () =>
    import(/* webpackChunkName: "momentLocale-ja" */ 'moment/locale/ja'),
  ko: () =>
    import(/* webpackChunkName: "momentLocale-ko" */ 'moment/locale/ko'),
  ms: () =>
    import(/* webpackChunkName: "momentLocale-ms" */ 'moment/locale/ms'),
  pl: () =>
    import(/* webpackChunkName: "momentLocale-pl" */ 'moment/locale/pl'),
  pt: () =>
    import(/* webpackChunkName: "momentLocale-pt" */ 'moment/locale/pt'),
  ru: () =>
    import(/* webpackChunkName: "momentLocale-ru" */ 'moment/locale/ru'),
  es: () =>
    import(/* webpackChunkName: "momentLocale-es" */ 'moment/locale/es'),
  sv: () =>
    import(/* webpackChunkName: "momentLocale-sv" */ 'moment/locale/sv'),
  th: () =>
    import(/* webpackChunkName: "momentLocale-th" */ 'moment/locale/th'),
  tr: () =>
    import(/* webpackChunkName: "momentLocale-tr" */ 'moment/locale/tr'),
  vi: () =>
    import(/* webpackChunkName: "momentLocale-vi" */ 'moment/locale/vi'),
};

router.ready(async () => {
  const locale = router.locale;
  if (locale && locale in localeLoader) {
    const options = await localeLoader[locale as keyof typeof localeLoader]();
    moment.locale(locale, options);
  }
});

export function I18NSingleDatePicker(props: SingleDatePickerShape) {
  const phrases: SingleDatePickerShape['phrases'] = usePhrases();
  return <SingleDatePicker {...props} phrases={phrases} />;
}

export function I18NDateRangePicker(props: DateRangePickerShape) {
  const phrases: DateRangePickerShape['phrases'] = usePhrases();
  return <DateRangePicker {...props} phrases={phrases} />;
}
