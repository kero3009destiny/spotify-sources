const NextI18Next = require('next-i18next').default;
const {
  defaultLocale: { id: defaultLocaleID },
} = require('./config');
const localeCodes = require('./config').supportedLocaleCodes;

module.exports = new NextI18Next({
  defaultLanguage: defaultLocaleID,
  fallbackLng: defaultLocaleID,
  localePath: 'public/i18n-dictionary',
  otherLanguages: localeCodes.slice(1),
  react: {
    useSuspense: false,
  },
});
